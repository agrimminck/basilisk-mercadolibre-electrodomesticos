import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { api } from '../../../lib/api'
import { ProductGrid } from '../../../components/product/product-grid'

interface Params {
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await api.categories.bySlug(slug).catch(() => null)
  if (!category) return {}

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gamegear-eight.vercel.app'
  const url = `${BASE_URL}/categoria/${category.slug}`

  return {
    title: category.name,
    description: category.description ?? undefined,
    openGraph: {
      title: category.name,
      description: category.description ?? undefined,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: category.name,
      description: category.description ?? undefined,
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params

  const [category, products] = await Promise.all([
    api.categories.bySlug(slug).catch(() => null),
    api.products.byCategory(slug).catch(() => []),
  ])

  if (!category) {
    notFound()
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">{category.name}</h1>
      {category.description && (
        <p className="text-[var(--color-muted)] mb-8">{category.description}</p>
      )}
      <ProductGrid products={products} />
    </section>
  )
}
