import { getCategories } from '../lib/meli/meli-client'
import { SearchBar } from '../components/search/SearchBar'
import { FeaturedProductCard } from '../components/products/FeaturedProductCard'
import { featuredProducts } from '../lib/data/featured-products'
import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Ofertas Chile — Notebooks, Celulares y más en MercadoLibre',
  description:
    'Explorá ofertas en notebooks, celulares, televisores, electrodomésticos y más en MercadoLibre Chile. Compará precios y encontrá lo que buscás.',
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

      {/* Destacados */}
      <section>
        <h2 className="text-xl font-semibold text-slate-200 mb-5">Destacados</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {featuredProducts.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section>
        <h2 className="text-xl font-semibold text-slate-200 mb-5">
          Categorías
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.id}`}
              className="bg-zinc-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 hover:text-amber-400 hover:border-amber-400/40 transition-all duration-150 truncate"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
