import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '../../../../i18n/navigation'
import { api } from '../../../../lib/api'
import { JsonLd } from '../../../../components/seo/json-ld'

interface Params {
  locale: string
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

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gamegear-eight.vercel.app'
  const url = `${BASE_URL}/product/${product.slug}`

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url,
      type: 'website',
      images: product.imageUrl ? [{ url: product.imageUrl, alt: product.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
    alternates: {
      canonical: url,
    },
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

  const t = await getTranslations('product')
  const category = product.category

  return (
    <>
      <JsonLd product={product} />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <nav className="mb-6 text-sm text-[var(--color-muted)]" aria-label="breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">
            {t('breadcrumb.home')}
          </Link>
          {category && (
            <>
              <span className="mx-2">/</span>
              <Link
                href={`/categoria/${category.slug}`}
                className="hover:text-white transition-colors"
              >
                {category.name}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-6"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl text-[var(--color-muted)]">
                🎮
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-white">{product.name}</h1>

            {product.rating !== null && (
              <div className="mt-3 flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <span className="text-yellow-400">★</span>
                <span>{Number(product.rating).toFixed(1)}</span>
                {product.reviewCount !== null && (
                  <span>
                    ({product.reviewCount.toLocaleString('en-US')} {t('reviews')})
                  </span>
                )}
              </div>
            )}

            <p className="mt-6 text-[var(--color-muted)] leading-relaxed">{product.description}</p>

            <div className="mt-auto pt-8 flex items-center gap-6">
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
                  {t('viewOnAmazon')} →
                </a>
              ) : (
                <span className="text-sm text-[var(--color-muted)]">{t('notAvailable')}</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
