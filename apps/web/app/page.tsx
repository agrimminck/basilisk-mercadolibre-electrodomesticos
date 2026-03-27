import Link from 'next/link'
import { getCategories, getCategoryProducts } from '../lib/meli/meli-client'
import { ProductGrid } from '../components/products/ProductGrid'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Mejores Ofertas — MercadoLibre Chile',
}

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getCategoryProducts('MLC1055', 0, 8), // Computación como destacados
  ])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
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

      {/* Productos destacados */}
      <section>
        <h2 className="text-xl font-semibold text-slate-200 mb-5">
          Computación — Destacados
        </h2>
        <ProductGrid products={featured.products} />
      </section>
    </div>
  )
}
