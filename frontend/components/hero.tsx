import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { profile, specialties, heroHeadline, heroSummary } from '@/lib/profile';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-20 pb-16">
      <div className="aurora" />
      <div className="grid-texture" />

      <div className="container relative z-10 mx-auto max-w-5xl text-center">
        <div className="mx-auto mb-8 h-28 w-28 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 p-[3px] shadow-[0_0_55px_-8px_rgba(139,92,246,0.75)]">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-ink">
            <Image
              src="/profile.png"
              alt={profile.fullName}
              fill
              sizes="112px"
              priority
              className="object-cover"
            />
          </div>
        </div>

        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-hairline bg-glass px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]" />
          {profile.role} &middot; {profile.location}
        </p>

        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          <span className="gradient-text">{profile.fullName}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-zinc-200 sm:text-2xl">
          {heroHeadline}
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
          {heroSummary}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {specialties.map((item) => (
            <span
              key={item}
              className="rounded-full border border-hairline bg-glass px-4 py-1.5 font-mono text-xs text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#chat"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_0_30px_-6px_rgba(139,92,246,0.7)] transition-transform hover:scale-[1.03]"
          >
            Chat with my Digital Twin <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-glass px-7 py-3.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-violet-400/50 hover:text-white"
          >
            Connect on LinkedIn <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
