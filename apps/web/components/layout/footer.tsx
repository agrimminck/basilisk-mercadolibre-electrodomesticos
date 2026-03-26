import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium text-[var(--color-muted)]">
            Honest comparisons for real gamers.
          </p>
          <nav aria-label="footer navigation">
            <ul className="flex gap-6 text-xs text-[var(--color-muted)]">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <p className="text-xs text-[var(--color-muted)] max-w-md">
            As an Amazon Associate, we earn commissions from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  )
}
