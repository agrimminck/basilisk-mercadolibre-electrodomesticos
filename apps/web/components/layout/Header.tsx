import Link from 'next/link'
import { SearchBar } from '../search/SearchBar'
import { ThemeToggle } from '../ui/ThemeToggle'

const NAV_LINKS = [
  { href: '/', label: 'Catálogo' },
  { href: '/electrodomesticos-y-aires-acondicionado', label: 'Ofertas' },
  { href: '/television-audio-y-video', label: 'Televisores' },
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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          {/* Left nav */}
          <nav className="hidden md:flex gap-6 text-[13px] font-medium text-teh-ink-soft dark:text-teh-d-ink-soft tracking-wide">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-teh-ink dark:hover:text-teh-d-ink transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Center wordmark */}
          <Link href="/" className="font-brand font-bold text-[20px] tracking-tight text-teh-ink dark:text-teh-d-ink hover:opacity-80 transition-opacity shrink-0">
            Top Electro <span className="text-teh-accent dark:text-teh-d-accent">Hogar</span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block w-56">
              <SearchBar />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
