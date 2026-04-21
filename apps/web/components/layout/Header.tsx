import Link from 'next/link'
import { SearchBar } from '../search/SearchBar'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-teh-surface/95 dark:bg-teh-d-surface/95 backdrop-blur border-b border-teh-rule dark:border-teh-d-rule">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
        <Link
          href="/"
          className="shrink-0 font-brand font-bold text-lg text-teh-ink dark:text-teh-d-ink hover:text-teh-accent dark:hover:text-teh-d-accent transition-colors"
        >
          Top Electro Hogar
        </Link>
        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
