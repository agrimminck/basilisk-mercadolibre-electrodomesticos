import Link from 'next/link'
import { getCategoryProducts, getCategory } from '../../lib/meli/meli-client'
import { ProductGrid } from '../../components/products/ProductGrid'
import { FilterPanel } from '../../components/search/FilterPanel'
import type { Metadata } from 'next'
import type { SearchFilters } from '../../types/index'

type Props = {
  params: Promise<{ category: string }>
  searchParams: Promise<Record<string, string>>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = await getCategory(category)
  return {
    title: cat.name,
    description: `Explora los mejores productos de ${cat.name} en MercadoLibre Chile.`,
    openGraph: {
      title: cat.name,
      description: `Explora los mejores productos de ${cat.name} en MercadoLibre Chile.`,
      url: `/${category}`,
    },
  }
}

function parseFilters(sp: Record<string, string>): SearchFilters {
  const filters: SearchFilters = {}
  if (sp.sort === 'price_asc' || sp.sort === 'price_desc') filters.sort = sp.sort
  if (sp.condition === 'new' || sp.condition === 'used') filters.condition = sp.condition
  if (sp.price_min) filters.priceMin = Number(sp.price_min)
  if (sp.price_max) filters.priceMax = Number(sp.price_max)
  return filters
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params
  const sp = await searchParams
  const offset = Number(sp.offset ?? '0')
  const limit = 20

  const filters = parseFilters(sp)
  const [cat, result] = await Promise.all([
    getCategory(category),
    getCategoryProducts(category, offset, limit, filters),
  ])

  const prevOffset = Math.max(0, offset - limit)
  const nextOffset = offset + limit
  const hasNext = nextOffset < result.total
  const hasPrev = offset > 0

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">{cat.name}</h1>
        <p className="text-slate-500 text-sm mt-1">
          {result.total.toLocaleString('es-CL')} productos
        </p>
      </div>

      <FilterPanel basePath={`/${category}`} params={sp} filters={filters} />

      <ProductGrid products={result.products} />

      {(hasPrev || hasNext) && (
        <div className="flex justify-between pt-4">
          {hasPrev ? (
            <Link
              href={`/${category}?offset=${prevOffset}`}
              className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
            >
              ← Anterior
            </Link>
          ) : (
            <span />
          )}
          {hasNext && (
            <Link
              href={`/${category}?offset=${nextOffset}`}
              className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
            >
              Siguiente →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
