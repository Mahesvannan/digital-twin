import Twin from '@/components/twin';
import Reveal from '@/components/reveal';

export default function ChatSection() {
  return (
    <section id="chat" className="relative overflow-hidden px-4 py-24">
      <div className="aurora !opacity-30" />
      <div className="container relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Chat
            </h2>
            <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Talk to my Digital Twin
            </p>
            <p className="mx-auto mt-3 max-w-xl text-zinc-400">
              Ask about my background, AI work, or tech stack &mdash; this is an AI trained on my own
              career details, answering as me.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 h-[600px]">
            <Twin />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
