import Twin from '@/components/twin';

export default function ChatSection() {
  return (
    <section id="chat" className="bg-white px-4 py-24">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Chat</h2>
          <p className="mt-3 text-2xl font-semibold text-slate-900">Talk to my Digital Twin</p>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Ask about my background, tech stack, or experience &mdash; this is an AI trained on my own
            career details, answering as me.
          </p>
        </div>

        <div className="mt-10 h-[600px]">
          <Twin />
        </div>
      </div>
    </section>
  );
}
