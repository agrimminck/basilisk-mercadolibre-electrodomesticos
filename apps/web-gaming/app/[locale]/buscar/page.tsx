import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { api } from '../../../lib/api'
import { ProductGrid } from '../../../components/product/product-grid'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams
  const query = q?.trim() ?? ''
  const t = await getTranslations('search')

  return {
    title: query ? t('title', { query }) : 'Search',
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''
  const t = await getTranslations('search')

  const products = query ? await api.products.search(query).catch(() => []) : []

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">
        {t('title', { query })}
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-16 space-y-2">
          <p className="text-[var(--color-muted)] text-lg">{t('empty', { query })}</p>
          <p className="text-[var(--color-muted)] text-sm">{t('emptyHint')}</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  )
}
