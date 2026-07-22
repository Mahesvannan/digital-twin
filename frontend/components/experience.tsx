import { CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/reveal';
import { stats, highlights } from '@/lib/profile';

export default function Experience() {
  return (
    <section id="experience" className="px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Experience
          </h2>
          <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Senior Software Engineer &mdash; Cloud-Native Rule Engine Platform
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="glass glass-hover rounded-2xl p-6 text-center">
                <p className="gradient-text text-4xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 glass rounded-2xl p-8">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
              Highlights
            </h3>
            <ul className="mt-4 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
