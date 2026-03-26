import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Game<span className="text-[var(--color-accent)]">Gear</span>
        </Link>

        <nav aria-label="main navigation">
          <ul className="flex items-center gap-6 text-sm text-[var(--color-muted)]">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/categoria/monitors" className="hover:text-white transition-colors">
                Categories
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
