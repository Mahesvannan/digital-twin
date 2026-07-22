# AI-native dark portfolio redesign — design

**Date:** 2026-07-21
**Scope:** `frontend/` only. No backend, Terraform, or chat-API changes.

## Goal

Rebuild the digital-twin site's UI into a professional, "stunning" AI-native dark
portfolio that repositions Maheswaren Manivannan's story around his pivot from
backend engineering into AI engineering — consistent with the updated
`backend/data/summary.txt`.

## Decisions (locked with user)

- **Aesthetic:** Dark premium / AI-native. Dark-only (no theme toggle — YAGNI).
- **Positioning:** Lead with the AI pivot; backend shown as the proven foundation.

## Visual system

- **Theme:** Deep near-black base (~`#0a0a0f`). Hero backed by a soft aurora
  gradient blur (violet → indigo → cyan) fading into the dark. Optional faint
  grid/dotted texture.
- **Surfaces:** Glassmorphism cards — translucent `white/5` fills, `white/10`
  hairline borders, backdrop blur, subtle hover lift.
- **Accent:** Violet→cyan gradient used sparingly — name, key headings, primary
  CTA, chat send button. Everything else restrained zinc/slate greys.
- **Type:** Geist Sans (already wired in `layout.tsx`), larger tighter-tracked
  hero. Geist Mono for small technical labels (skill tags, section eyebrows).
- **Motion:** Fade-up-on-scroll for sections, slow-drifting aurora, hover lifts,
  animated gradient on the hero name. CSS-first; add Framer Motion only if CSS
  can't do it cleanly. Respect `prefers-reduced-motion`.

## Sections

1. **Nav** — glassy sticky bar, gradient monogram logo, links (+ new **Skills**
   link), gradient "Chat" pill.
2. **Hero** — glowing avatar orb, eyebrow `AI ENGINEER · BERLIN`, large gradient
   name, pivot headline ("Backend engineer with 10+ years, now building
   production AI"), featured AI specialty chips, two CTAs, aurora glow behind.
3. **About** — reframed pivot-story copy (backend depth → AI focus). Glass
   side-card for "How I work" + Education.
4. **Skills (NEW)** — centerpiece. Featured **AI Engineering** cluster (Python,
   FastAPI, LLM Engineering, RAG, Agentic AI, Prompt Engineering, AWS Bedrock)
   as glowing gradient cards; backend stack below as "Proven foundation."
5. **Experience** — same stats/highlights/tech data, restyled as glass stat
   tiles with gradient numbers.
6. **Chat** — redesigned `twin.tsx`: glass panel, gradient header, refined
   bubbles, animated typing dots, glowing focus ring, suggested-question chips
   on the empty state. **Fetch/session logic unchanged.**
7. **Footer** — minimal dark, gradient hairline top border.

## Data (`lib/profile.ts`)

- Add an `aiSkills` structure: a featured AI cluster and a "foundation" backend
  cluster (can reuse/adapt existing `techStack`).
- Update hero/about copy strings to the pivot framing.
- Keep existing `stats`, `highlights`, `techStack`, `workingStyle`, `profile`,
  `specialties` (adjust `specialties` toward AI-first if needed for the hero).

## Constraints & guardrails

- **Next.js version caveat:** `frontend/AGENTS.md` warns this Next.js (16) has
  breaking changes from training-data assumptions — check
  `node_modules/next/dist/docs/` before writing frontend code.
- Static export (`output: 'export'`) must still build (`npm run build`).
- `twin.tsx` keeps its exact `fetch`/`session_id` logic; only markup/styling
  changes.
- No new dependencies unless Framer Motion is genuinely needed.
- No backend, Terraform, or API changes.

## Success criteria

- `npm run build` succeeds (static export).
- Dark AI-native aesthetic applied across all sections.
- New Skills section foregrounds the AI stack; backend shown as foundation.
- Chat widget visually redesigned, functionally identical.
- Respects `prefers-reduced-motion`.
