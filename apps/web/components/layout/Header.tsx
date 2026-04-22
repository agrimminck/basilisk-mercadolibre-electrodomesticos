import Link from 'next/link'
import { SearchBar } from '../search/SearchBar'
import { ThemeToggle } from '../ui/ThemeToggle'

const NAV_LINKS = [
  { href: '/', label: 'Catálogo' },
  { href: '/electrodomesticos', label: 'Ofertas' },
  { href: '/electronica-audio-y-video', label: 'Televisores' },
  { href: '/computacion', label: 'Computación' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="border-b border-teh-rule dark:border-teh-d-rule bg-teh-bgalt dark:bg-teh-d-bgalt text-[11px] tracking-wider uppercase text-teh-ink-soft dark:text-teh-d-ink-soft text-center py-2.5 font-medium">
        Envío a todo Chile · comparamos precios en MercadoLibre en tiempo real
      </div>

      {/* Main nav */}
      <div className="bg-teh-surface/95 dark:bg-teh-d-surface/95 backdrop-blur border-b border-teh-rule dark:border-teh-d-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4 min-w-0">

          {/* Left: nav links (lg+) OR wordmark (< lg) */}
          <div className="flex items-center gap-6 min-w-0 flex-1">
            {/* Nav links desktop */}
            <nav className="hidden lg:flex gap-6 text-[13px] font-medium text-teh-ink-soft dark:text-teh-d-ink-soft tracking-wide shrink-0">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:text-teh-ink dark:hover:text-teh-d-ink transition-colors whitespace-nowrap"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Wordmark mobile/tablet (< lg) */}
            <Link
              href="/"
              className="lg:hidden font-brand font-bold text-[18px] tracking-tight text-teh-ink dark:text-teh-d-ink hover:opacity-80 transition-opacity shrink-0"
            >
              Top Electro <span className="text-teh-accent dark:text-teh-d-accent">Hogar</span>
            </Link>
          </div>

          {/* Center wordmark desktop (lg+) */}
          <Link
            href="/"
            className="hidden lg:block font-brand font-bold text-[20px] tracking-tight text-teh-ink dark:text-teh-d-ink hover:opacity-80 transition-opacity shrink-0"
          >
            Top Electro <span className="text-teh-accent dark:text-teh-d-accent">Hogar</span>
          </Link>

          {/* Right: search (lg+) + search icon (< lg) + toggle */}
          <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
            {/* Full search bar on large screens */}
            <div className="hidden lg:block w-48 xl:w-56 shrink-0">
              <SearchBar />
            </div>

            {/* Search icon link on small/medium screens */}
            <Link
              href="/buscar"
              aria-label="Buscar"
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-teh-ink-muted dark:text-teh-d-ink-muted hover:text-teh-ink dark:hover:text-teh-d-ink hover:bg-teh-bgalt dark:hover:bg-teh-d-bgalt transition-colors shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Link>

            <ThemeToggle />
          </div>

        </div>
      </div>
    </header>
  )
}
