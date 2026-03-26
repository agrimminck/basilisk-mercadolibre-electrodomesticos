import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { api } from '../../../lib/api'
import { JsonLd } from '../../../components/seo/json-ld'

interface Params {
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await api.products.bySlug(slug).catch(() => null)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const product = await api.products.bySlug(slug).catch(() => null)

  if (!product) {
    notFound()
  }

  return (
    <>
      <JsonLd product={product} />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <nav className="mb-6 text-sm text-[var(--color-muted)]" aria-label="breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <h1 className="text-3xl font-bold text-white">{product.name}</h1>

        {product.rating !== null && (
          <div className="mt-3 flex items-center gap-2 text-sm text-[var(--color-muted)]">
            <span className="text-yellow-400">★</span>
            <span>{Number(product.rating).toFixed(1)}</span>
            {product.reviewCount !== null && (
              <span>({product.reviewCount.toLocaleString('en-US')} reviews)</span>
            )}
          </div>
        )}

        <p className="mt-6 text-[var(--color-muted)] leading-relaxed">{product.description}</p>

        <div className="mt-8 flex items-center gap-6">
          <span className="text-3xl font-bold text-white">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: product.currency,
            }).format(Number(product.price))}
          </span>

          {product.available ? (
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              View on Amazon →
            </a>
          ) : (
            <span className="text-sm text-[var(--color-muted)]">Currently unavailable</span>
          )}
        </div>
      </section>
    </>
  )
}
