import { getCategories } from '../lib/meli/meli-client'
import { SearchBar } from '../components/search/SearchBar'
import { FeaturedProductCard } from '../components/products/FeaturedProductCard'
import { featuredProducts } from '../lib/data/featured-products'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Top Electro Hogar — Electrodomésticos en MercadoLibre Chile',
  description:
    'Explorá refrigeradores, lavadoras, televisores, cocinas y más electrodomésticos en MercadoLibre Chile. Compará precios y encontrá la mejor oferta.',
}

export default async function HomePage() {
  const categories = await getCategories()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://web-ten-beige-23.vercel.app'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Top Electro Hogar',
    url: siteUrl,
    description: 'Los mejores precios en electrodomésticos en MercadoLibre Chile.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/buscar?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-teh-bg dark:bg-teh-d-bg border-b border-teh-rule dark:border-teh-d-rule">
        <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col items-center gap-6 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-teh-ink dark:text-teh-d-ink leading-tight max-w-2xl">
            Los mejores precios en electrodomésticos
          </h1>
          <p className="text-teh-ink-soft dark:text-teh-d-ink-soft text-base max-w-md leading-relaxed">
            Refrigeradores, lavadoras, cocinas y más — todo en MercadoLibre Chile
          </p>
          <SearchBar />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-14">

        {/* Categorías */}
        <section>
          <h2 className="font-serif text-2xl text-teh-ink dark:text-teh-d-ink mb-6">Categorías</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categories.slice(0, 10).map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="bg-teh-surface dark:bg-teh-d-surface border border-teh-rule dark:border-teh-d-rule rounded-xl px-4 py-3 text-sm text-teh-ink-soft dark:text-teh-d-ink-soft hover:text-teh-accent dark:hover:text-teh-d-accent hover:border-teh-accent/40 dark:hover:border-teh-d-accent/40 transition-all duration-150 truncate"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Destacados */}
        <section>
          <h2 className="font-serif text-2xl text-teh-ink dark:text-teh-d-ink mb-6">Destacados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {featuredProducts.map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
