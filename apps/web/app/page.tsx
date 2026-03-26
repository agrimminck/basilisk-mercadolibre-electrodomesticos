import type { Metadata } from 'next'
import Link from 'next/link'
import { api } from '../lib/api'
import { ProductGrid } from '../components/product/product-grid'

export const metadata: Metadata = {
  title: 'GameGear — Gaming Hardware Reviews & Comparisons',
  description:
    'Honest comparisons of monitors, GPUs, peripherals and more. No paid ads. Real recommendations.',
}

const CATEGORIES = [
  { slug: 'monitors', label: 'Monitors', icon: '🖥️' },
  { slug: 'gpus', label: 'Graphics Cards', icon: '🎮' },
  { slug: 'peripherals', label: 'Peripherals', icon: '🖱️' },
  { slug: 'gaming-chairs', label: 'Gaming Chairs', icon: '🪑' },
] as const

export default async function HomePage() {
  const featured = await api.products.list().catch(() => [])

  return (
    <>
      {/* Hero */}
      <section className="px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          The Gaming Hardware You Need
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
          Honest comparisons of monitors, GPUs, peripherals and more. No paid ads.
        </p>
        <Link
          href="/categoria/monitors"
          className="mt-8 inline-block rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          Explore categories
        </Link>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">What are you looking for?</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/categoria/${category.slug}`}
              className="flex flex-col items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center hover:border-[var(--color-accent)] transition-colors"
            >
              <span className="text-4xl" role="img" aria-label={category.label}>
                {category.icon}
              </span>
              <span className="text-sm font-medium text-white">{category.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-white mb-8">Top Picks</h2>
          <ProductGrid products={featured.slice(0, 8)} />
        </section>
      )}
    </>
  )
}
