import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '../../i18n/navigation'
import { api } from '../../lib/api'
import { ProductGrid } from '../../components/product/product-grid'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('home.hero')
  return {
    title: 'GameGear LATAM — Hardware Gaming en Mercado Libre',
    description: t('subtitle'),
  }
}

const CATEGORIES = [
  { slug: 'monitors', key: 'monitors', icon: '🖥️' },
  { slug: 'gpus', key: 'gpus', icon: '🎮' },
  { slug: 'peripherals', key: 'peripherals', icon: '🖱️' },
  { slug: 'keyboards', key: 'keyboards', icon: '⌨️' },
  { slug: 'headsets', key: 'headsets', icon: '🎧' },
  { slug: 'gaming-chairs', key: 'gamingChairs', icon: '🪑' },
] as const

export default async function HomePage() {
  const t = await getTranslations('home')
  const featured = await api.products.list().catch(() => [])

  return (
    <>
      {/* Hero */}
      <section className="px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {t('hero.title')}
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <Link
          href="/categoria/monitors"
          className="mt-8 inline-block rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          {t('hero.cta')}
        </Link>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">{t('categories.title')}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/categoria/${category.slug}`}
              className="flex flex-col items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center hover:border-[var(--color-accent)] transition-colors"
            >
              <span className="text-4xl" role="img" aria-label={t(`categories.${category.key}`)}>
                {category.icon}
              </span>
              <span className="text-sm font-medium text-white">
                {t(`categories.${category.key}`)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-white mb-8">{t('topPicks')}</h2>
          <ProductGrid products={featured.slice(0, 8)} />
        </section>
      )}
    </>
  )
}
