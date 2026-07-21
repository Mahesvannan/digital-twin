# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An "AI Digital Twin" chatbot: a FastAPI backend on AWS Lambda + Bedrock, and a static-exported
Next.js frontend, deployed via Terraform to S3/CloudFront/API Gateway. It answers as the site
owner, grounded only in the persona files under `backend/data/`.

## Commands

### Backend (`backend/`, uv-managed, Python 3.12)
```bash
uv sync                                    # install deps from pyproject.toml/uv.lock
uv run uvicorn server:app --reload --port 8000   # run API locally (or: uv run server.py)
```
There is no test suite or linter configured for the backend.

Local dev reads/writes conversation memory as JSON files in `../memory` (relative to `backend/`,
overridable via `MEMORY_DIR`); it only talks to S3 when `USE_S3=true` (set by Terraform in
deployed environments, not by default locally). Bedrock calls always hit real AWS — there is no
mock/offline mode, so local runs need valid AWS credentials with Bedrock access.

### Frontend (`frontend/`, Next.js 16 / React 19)
```bash
npm install
npm run dev      # http://localhost:3000, expects backend at NEXT_PUBLIC_API_URL or localhost:8000
npm run build    # static export to frontend/out/ (next.config.ts sets output: 'export')
npm run lint
```
No test runner is configured.

### Building the Lambda deployment package
```bash
cd backend && uv run deploy.py
```
This requires **Docker running** — it builds dependencies inside the official
`public.ecr.aws/lambda/python:3.12` image (`linux/amd64`) so wheels match the Lambda runtime, then
zips `server.py`, `lambda_handler.py`, `context.py`, `resources.py`, and `data/` into
`lambda-deployment.zip`. It installs from `requirements.txt`, **not** `pyproject.toml` — the two
dependency lists have drifted (see Gotchas).

### Terraform (`terraform/`)
Environments are Terraform workspaces (`dev`, `test`, `prod`):
```bash
terraform init
terraform workspace select <env>   # or: terraform workspace new <env>
terraform apply -var="project_name=twin" -var="environment=<env>"
# prod uses its own tfvars file:
terraform apply -var-file=prod.tfvars -var="project_name=twin" -var="environment=prod"
```

### End-to-end deploy / destroy (`scripts/`)
```bash
scripts/deploy.sh <dev|test|prod> [project_name]    # or deploy.ps1 on Windows
scripts/destroy.sh <dev|test|prod> [project_name]   # or destroy.ps1
```
`deploy.sh` does the full pipeline: builds the Lambda zip → `terraform apply` in the target
workspace → writes the resulting API Gateway URL into `frontend/.env.production` → `npm run build`
→ syncs `frontend/out/` to the frontend S3 bucket. `destroy.sh` empties both S3 buckets (required
before Terraform can delete non-empty buckets) before running `terraform destroy`. Both default to
`dev`; touching `prod` requires passing it explicitly, but destroy still runs with `-auto-approve`
once invoked — treat it as irreversible.

## Architecture

**Request flow:** browser → CloudFront (+ S3 static frontend) → API Gateway (HTTP API) → Lambda
(`lambda_handler.py` wraps `server.py`'s FastAPI app with Mangum) → AWS Bedrock (`converse` API,
Amazon Nova model). Conversation history is persisted per `session_id`, either as local JSON files
or in an S3 "memory" bucket, and is re-sent (last 50 messages) as conversation context on every
call — there is no vector store or RAG, just a sliding window of raw history plus a fixed system
prompt.

**Persona/prompt construction** (`backend/resources.py` → `backend/context.py` → `server.py`):
`resources.py` reads `data/facts.json`, `data/summary.txt`, `data/style.txt`, and parses
`data/linkedin.pdf` (via `pypdf`) **once at module import time** — not per-request. `context.py`'s
`prompt()` re-assembles these into the system prompt on every call (so the *current datetime* is
fresh even though the persona facts are frozen at process start). `server.py` injects this as the
first message in the Bedrock conversation rather than using Bedrock's dedicated `system` parameter
(there's a comment noting this as a known simplification). **To change what the twin knows, edit
the files under `backend/data/` and redeploy** — editing the prompt template itself is a separate
concern in `context.py`.

**Config split between local and deployed environments:** locally, behavior is driven by
`backend/.env` (gitignored) — CORS origins, region, etc. In deployed environments, Terraform
injects `CORS_ORIGINS`, `S3_BUCKET`, `USE_S3=true`, and `BEDROCK_MODEL_ID` directly into the Lambda
environment (see `terraform/main.tf`, `aws_lambda_function.api`). When changing backend
env-dependent behavior, check both `server.py`'s `os.getenv(...)` calls and the corresponding
Terraform variables/tfvars — they are two independent sources that must be kept in sync manually.

**Terraform** (`terraform/main.tf`) provisions per environment: two S3 buckets (private "memory",
public static-website "frontend"), a Lambda function + IAM role (attached with broad
`AmazonBedrockFullAccess`/`AmazonS3FullAccess` managed policies), an API Gateway HTTP API with
throttling that scales by environment, a CloudFront distribution in front of the frontend bucket,
and optional Route53/ACM resources for a custom domain (gated by `use_custom_domain`, only
meaningful in `prod.tfvars`). ACM certs for CloudFront must be in `us-east-1` regardless of the
primary region, hence the aliased `aws.us_east_1` provider.

**Frontend** (`frontend/`) is a single-page chat widget (`components/twin.tsx`) rendered on
`app/page.tsx`, using plain `fetch` against `NEXT_PUBLIC_API_URL`. Because `next.config.ts` sets
`output: 'export'`, the entire app builds to static files (`out/`) with no Next.js server at
runtime — it's just uploaded to S3. `frontend/.env.production` is generated by `scripts/deploy.sh`
from the live Terraform API Gateway output; don't hand-edit it expecting it to persist.

## Gotchas specific to this repo

- **Two backend dependency manifests that have drifted**: `pyproject.toml`/`uv.lock` (uv-managed,
  local dev) includes an unused `openai` dependency; `requirements.txt` (used by the Docker-based
  Lambda build in `deploy.py`) does not. The running code only ever calls Bedrock, never OpenAI —
  treat `OPENAI_API_KEY`/`openai` as dead weight, not a real integration point.
- **Bedrock model ID has three independent defaults** that can silently disagree: `server.py`'s
  `os.getenv` fallback, `terraform/variables.tf`'s default, and `terraform/prod.tfvars`. In deployed
  environments Terraform's env var always wins; the code fallback only matters for bare local runs
  without `.env` set.
- **`frontend/` has its own `CLAUDE.md`** (which imports `frontend/AGENTS.md`) stating this Next.js
  version has breaking changes from training-data assumptions and to check
  `node_modules/next/dist/docs/` before writing frontend code — that instruction takes precedence
  for anything under `frontend/`.
- **No automated tests exist anywhere in this repo** (backend or frontend) — don't assume a test
  command exists; if asked to verify behavior, run the dev servers directly instead.
