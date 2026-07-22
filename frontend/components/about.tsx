import Reveal from '@/components/reveal';
import { profile, workingStyle } from '@/lib/profile';

export default function About() {
  return (
    <section id="about" className="px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-3">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                About
              </h2>
              <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                Backend engineer, now building production AI.
              </p>

              <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
                <p>
                  I&apos;m {profile.fullName}, a {profile.priorRole} with{' '}
                  {profile.yearsExperience}+ years of backend experience, based in{' '}
                  {profile.location} &mdash; now pivoting into AI Engineering. I&apos;ve led the
                  backend of a cloud-native rule engine platform for Athena One, a major US
                  healthcare product, designing scalable, high-availability solutions serving over
                  20,000 customers at 99.9% uptime.
                </p>
                <p>
                  Today I&apos;m channeling that same rigor into AI: building LLM-powered products,
                  retrieval-augmented generation systems, and agentic workflows &mdash; grounded in
                  Python, FastAPI, and AWS Bedrock, and deployed serverlessly with Terraform. This
                  very site is one of them: a digital twin running on Lambda + Bedrock.
                </p>
                <p>
                  I&apos;ve worked across cross-functional agile teams, consistently delivering
                  high-quality, on-time results &mdash; recognized with multiple &ldquo;Exceeding
                  Expectations&rdquo; appraisals and always eager for the next challenge in a
                  collaborative, international environment.
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
                  How I work
                </h3>
                <ul className="mt-4 space-y-3">
                  {workingStyle.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-hairline pt-4">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
                    Education
                  </h3>
                  <p className="mt-2 text-sm text-zinc-300">
                    {profile.education.degree}
                    <br />
                    {profile.education.institution}, {profile.education.year}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
