import { ArrowRight, ExternalLink } from 'lucide-react';
import { profile, specialties } from '@/lib/profile';

export default function Hero() {
  return (
    <section id="top" className="bg-gradient-to-b from-slate-50 to-white px-4 pt-20 pb-24">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-2xl font-semibold text-white">
          MM
        </div>

        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-indigo-600">
          {profile.location} &middot; {profile.role}
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {profile.fullName}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          I lead backend development for a cloud-native rule engine platform serving 20,000+
          customers at 99.9% uptime &mdash; with {profile.yearsExperience}+ years building scalable,
          high-availability systems in Java, Spring Boot, and distributed microservices.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {specialties.map((item) => (
            <span
              key={item}
              className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#chat"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            Chat with my Digital Twin <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-600 hover:text-indigo-600"
          >
            Connect on LinkedIn <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
