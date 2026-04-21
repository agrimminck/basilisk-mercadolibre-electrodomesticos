import { getCategoryBySlug, getCategories } from '../../lib/meli/meli-client'
import { buildCategoryUrl } from '../../lib/utils/affiliate'
import { getCategoryDescription } from '../../lib/data/category-descriptions'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((cat) => ({ category: cat.slug }))
}

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = await getCategoryBySlug(category)
  return {
    title: `${cat.name} — Top Electro Hogar`,
    description: `Encontrá las mejores ofertas en ${cat.name} en MercadoLibre Chile. Compará precios y comprá con envío a todo el país.`,
    openGraph: {
      title: `${cat.name} — Top Electro Hogar`,
      description: `Encontrá las mejores ofertas en ${cat.name} en MercadoLibre Chile.`,
      url: `/${category}`,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = await getCategoryBySlug(category)
  const meliUrl = buildCategoryUrl(cat.slug)
  const desc = getCategoryDescription(cat.slug)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://web-ten-beige-23.vercel.app'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.name} — Top Electro Hogar`,
    description: `Encontrá las mejores ofertas en ${cat.name} en MercadoLibre Chile.`,
    url: `${siteUrl}/${category}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: cat.name,
          item: `${siteUrl}/${category}`,
        },
      ],
    },
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb + header */}
      <section className="border-b border-teh-rule dark:border-teh-d-rule bg-teh-bg dark:bg-teh-d-bg">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <p className="text-xs text-teh-ink-muted dark:text-teh-d-ink-muted mb-3">
            <a href="/" className="hover:text-teh-accent dark:hover:text-teh-d-accent transition-colors">Inicio</a>
            <span className="mx-1.5">›</span>
            {cat.name}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-teh-ink dark:text-teh-d-ink">
            {cat.name}
          </h1>
          <p className="mt-3 text-teh-ink-soft dark:text-teh-d-ink-soft text-sm max-w-2xl leading-relaxed">
            {desc.intro}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="bg-teh-surface dark:bg-teh-d-surface border border-teh-rule dark:border-teh-d-rule rounded-xl p-5 space-y-4 sticky top-24">
              <h2 className="text-xs font-semibold text-teh-ink-muted dark:text-teh-d-ink-muted uppercase tracking-wider">
                Encontrarás
              </h2>
              <ul className="space-y-2.5">
                {desc.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-teh-ink-soft dark:text-teh-d-ink-soft text-sm">
                    <span className="text-teh-accent dark:text-teh-d-accent mt-0.5 shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 flex flex-col items-center gap-6">
            <div className="w-full bg-teh-surface dark:bg-teh-d-surface border border-teh-rule dark:border-teh-d-rule rounded-xl p-6 text-center space-y-4">
              <p className="text-teh-ink-soft dark:text-teh-d-ink-soft text-sm">
                Explorá todos los productos disponibles en MercadoLibre Chile
              </p>
              <a
                href={meliUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-teh-accent dark:bg-teh-d-accent hover:opacity-90 text-white font-semibold py-3 px-10 rounded-xl text-base transition-opacity"
              >
                Ver ofertas en MercadoLibre →
              </a>
              <p className="text-xs text-teh-ink-muted dark:text-teh-d-ink-muted">
                Serás redirigido a MercadoLibre Chile
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
