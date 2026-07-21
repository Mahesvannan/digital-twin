import { CheckCircle2 } from 'lucide-react';
import { stats, highlights, techStack } from '@/lib/profile';

export default function Experience() {
  return (
    <section id="experience" className="bg-slate-50 px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Experience</h2>
        <p className="mt-3 text-2xl font-semibold text-slate-900">
          Senior Software Engineer &mdash; Cloud-Native Rule Engine Platform
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center"
            >
              <p className="text-3xl font-semibold text-indigo-600">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Highlights</h3>
          <ul className="mt-4 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Tech stack</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((group) => (
              <div key={group.category} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold text-slate-900">{group.category}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
