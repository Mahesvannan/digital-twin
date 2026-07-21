import { profile, workingStyle } from '@/lib/profile';

export default function About() {
  return (
    <section id="about" className="bg-white px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-600">About</h2>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              Backend engineer turned cloud-native systems builder.
            </p>

            <div className="mt-6 space-y-4 leading-relaxed text-slate-600">
              <p>
                I&apos;m {profile.fullName}, a {profile.role} based in {profile.location}. Today, I
                lead the backend development of a cloud-native rule engine platform for Athena One, a
                major US healthcare product &mdash; designing scalable, high-availability solutions
                that serve over 20,000 customers with 99.9% uptime.
              </p>
              <p>
                Over {profile.yearsExperience}+ years, I&apos;ve delivered high-performance applications
                across distributed microservices architectures, incorporating observability tooling and
                security-first CI/CD pipelines to keep releases fast, automated, and safe.
              </p>
              <p>
                I&apos;ve worked across cross-functional agile teams, consistently delivering
                high-quality, on-time results &mdash; recognized with multiple &ldquo;Exceeding
                Expectations&rdquo; appraisals and always eager for the next engineering challenge in a
                collaborative, international environment.
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                How I work
              </h3>
              <ul className="mt-4 space-y-3">
                {workingStyle.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-600" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-slate-200 pt-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Education
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  {profile.education.degree}
                  <br />
                  {profile.education.institution}, {profile.education.year}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
