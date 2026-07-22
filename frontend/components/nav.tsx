const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#chat', label: 'Chat' },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-ink/70 backdrop-blur-xl">
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#top" className="group flex items-center gap-2 text-lg font-semibold text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-bold text-ink">
            M
          </span>
          Mahes<span className="gradient-text">.</span>
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#chat"
          className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-ink shadow-[0_0_20px_-4px_rgba(139,92,246,0.6)] transition-shadow hover:shadow-[0_0_28px_-2px_rgba(139,92,246,0.8)]"
        >
          Chat with my Twin
        </a>
      </div>
    </header>
  );
}
