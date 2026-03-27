import Link from 'next/link'
import { SearchBar } from '../search/SearchBar'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-6">
        <Link
          href="/"
          className="shrink-0 text-amber-400 font-bold text-lg tracking-tight hover:text-amber-300 transition-colors"
        >
          Mejores Ofertas
        </Link>
        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}
