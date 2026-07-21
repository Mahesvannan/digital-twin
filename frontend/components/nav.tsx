const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#chat', label: 'Chat' },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <a href="#top" className="text-lg font-semibold text-slate-900">
          Mahes<span className="text-indigo-600">.</span>
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#chat"
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
        >
          Chat now
        </a>
      </div>
    </header>
  );
}
