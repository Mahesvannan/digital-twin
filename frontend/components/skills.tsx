import { Sparkles } from 'lucide-react';
import Reveal from '@/components/reveal';
import { aiSkills, techStack } from '@/lib/profile';

export default function Skills() {
  return (
    <section id="skills" className="relative px-4 py-14 sm:py-16">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Skills
          </h2>
          <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Building with AI, on a proven engineering foundation.
          </p>
        </Reveal>

        {/* Featured AI cluster */}
        <div className="mt-10 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-violet-400" />
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300">
            AI Engineering
          </h3>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiSkills.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 60}>
              <div className="gradient-border glass glass-hover h-full rounded-2xl p-5">
                <p className="text-base font-semibold text-white">{skill.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{skill.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Foundation */}
        <div className="mt-14">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
            Proven foundation
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((group, i) => (
              <Reveal key={group.category} delay={i * 50}>
                <div className="glass glass-hover h-full rounded-2xl p-5">
                  <p className="text-sm font-semibold text-zinc-100">{group.category}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-hairline bg-glass px-3 py-1 font-mono text-xs text-zinc-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
