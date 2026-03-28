import { getCategories } from '../lib/meli/meli-client'
import { buildCategoryUrl } from '../lib/utils/affiliate'
import { SearchBar } from '../components/search/SearchBar'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Mejores Ofertas — MercadoLibre Chile',
}

export default async function HomePage() {
  const categories = await getCategories()

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* Hero */}
      <section className="flex flex-col items-center gap-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-slate-100">
          Encontrá las mejores ofertas
        </h1>
        <p className="text-slate-400 text-sm max-w-md">
          Explorá miles de productos en MercadoLibre Chile
        </p>
        <SearchBar />
      </section>

      {/* Categorías */}
      <section>
        <h2 className="text-xl font-semibold text-slate-200 mb-5">
          Categorías
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.slice(0, 10).map((cat) => (
            <a
              key={cat.id}
              href={buildCategoryUrl(cat.slug)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="bg-zinc-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 hover:text-amber-400 hover:border-amber-400/40 transition-all duration-150 truncate"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
