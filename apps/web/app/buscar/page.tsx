import { searchProducts } from '../../lib/meli/meli-client'
import { ProductGrid } from '../../components/products/ProductGrid'
import { SearchBar } from '../../components/search/SearchBar'
import { FilterPanel } from '../../components/search/FilterPanel'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { SearchFilters } from '../../types/index'

type Props = {
  searchParams: Promise<Record<string, string>>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams
  return { title: sp.q ? `"${sp.q}" — Búsqueda` : 'Búsqueda' }
}

function parseFilters(sp: Record<string, string>): SearchFilters {
  const filters: SearchFilters = {}
  if (sp.sort === 'price_asc' || sp.sort === 'price_desc') filters.sort = sp.sort
  if (sp.condition === 'new' || sp.condition === 'used') filters.condition = sp.condition
  if (sp.price_min) filters.priceMin = Number(sp.price_min)
  if (sp.price_max) filters.priceMax = Number(sp.price_max)
  return filters
}

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams
  const query = sp.q?.trim() ?? ''
  const offset = Number(sp.offset ?? '0')
  const limit = 20

  if (!query) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col items-center gap-6">
        <p className="text-slate-400">¿Qué estás buscando?</p>
        <SearchBar />
      </div>
    )
  }

  const filters = parseFilters(sp)
  const result = await searchProducts(query, offset, limit, filters)
  const prevOffset = Math.max(0, offset - limit)
  const nextOffset = offset + limit
  const hasNext = nextOffset < result.total
  const hasPrev = offset > 0

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">
          Resultados para{' '}
          <span className="text-amber-400">&ldquo;{query}&rdquo;</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {result.total.toLocaleString('es-CL')} resultados
        </p>
      </div>

      <FilterPanel basePath="/buscar" params={sp} filters={filters} />

      <ProductGrid products={result.products} />

      {(hasPrev || hasNext) && (
        <div className="flex justify-between pt-4">
          {hasPrev ? (
            <Link
              href={`/buscar?q=${encodeURIComponent(query)}&offset=${prevOffset}`}
              className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
            >
              ← Anterior
            </Link>
          ) : (
            <span />
          )}
          {hasNext && (
            <Link
              href={`/buscar?q=${encodeURIComponent(query)}&offset=${nextOffset}`}
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
