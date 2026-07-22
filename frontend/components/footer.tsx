import { Mail, ExternalLink } from 'lucide-react';
import { profile } from '@/lib/profile';

export default function Footer() {
  return (
    <footer className="relative border-t border-hairline px-4 py-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-zinc-500 sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {profile.fullName}
        </p>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <ExternalLink className="h-4 w-4" /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
