import { getCategoryBySlug, getCategories, getProduct, VIRTUAL_CATEGORY_IDS } from '../../lib/meli/meli-client'
import { buildCategoryUrl } from '../../lib/utils/affiliate'
import { getCategoryDescription } from '../../lib/data/category-descriptions'
import { getCategoryProducts } from '../../lib/data/category-products'
import { FeaturedProductCard } from '../../components/products/FeaturedProductCard'
import { ProductPlaceholder } from '../../components/ui/ProductPlaceholder'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { FeaturedProduct } from '../../lib/data/featured-products'
import Link from 'next/link'

export const revalidate = 3600

export async function generateStaticParams() {
  const categories = await getCategories()
  const base = categories.map((cat) => ({ category: cat.slug }))
  const virtual = Object.keys(VIRTUAL_CATEGORY_IDS).map((slug) => ({ category: slug }))
  return [...base, ...virtual]
}

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  let cat
  try {
    cat = await getCategoryBySlug(category)
  } catch {
    return {}
  }
  return {
    title: `${cat.name} — Top Electro Hogar`,
    description: `Encontrá las mejores ofertas en ${cat.name} en MercadoLibre Chile. Compará precios y comprá con envío a todo el país.`,
    alternates: { canonical: `/${cat.slug}` },
    openGraph: {
      title: `${cat.name} — Top Electro Hogar`,
      description: `Encontrá las mejores ofertas en ${cat.name} en MercadoLibre Chile.`,
      url: `/${cat.slug}`,
    },
  }
}

const CATEGORY_ICONS: Record<string, number> = {
  'electrodomesticos': 0,
  'lavadoras': 1,
  'electronica-audio-y-video': 2,
  'refrigeradores': 3,
  'computacion': 6,
  'celulares-y-telefonia': 7,
}

const FILTER_PILLS = ['Todos', 'En oferta', 'Nuevos', "Editor's picks"]

async function hydrateCategoryProducts(slug: string): Promise<FeaturedProduct[]> {
  const curated = getCategoryProducts(slug)
  if (curated.length === 0) return []
  const results = await Promise.allSettled(curated.map((c) => getProduct(c.mlcId)))
  const products: FeaturedProduct[] = []
  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    if (result.status === 'rejected') continue
    const p = result.value
    const c = curated[i]
    const product: FeaturedProduct = {
      id: c.id,
      title: p.title,
      price: p.price,
      currency: p.currency,
      thumbnail: p.thumbnail,
      permalink: p.permalink,
      condition: p.condition,
    }
    if (c.badge) product.badge = c.badge
    products.push(product)
  }
  return products
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  let cat
  try {
    cat = await getCategoryBySlug(category)
  } catch {
    notFound()
  }
  const meliUrl = buildCategoryUrl(cat.slug)
  const desc = getCategoryDescription(cat.slug)
  const iconSeed = CATEGORY_ICONS[cat.slug] ?? 0
  const products = await hydrateCategoryProducts(cat.slug)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://web-ten-beige-23.vercel.app'
  const jsonLdPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.name} — Top Electro Hogar`,
    description: `Encontrá las mejores ofertas en ${cat.name} en MercadoLibre Chile.`,
    url: `${siteUrl}/${cat.slug}`,
  }
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: cat.name, item: `${siteUrl}/${cat.slug}` },
    ],
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      {/* Category header */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-8 border-b border-teh-rule dark:border-teh-d-rule">
        <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-3.5">
          <Link href="/" className="hover:text-teh-ink-soft dark:hover:text-teh-d-ink-soft transition-colors">
            Catálogo
          </Link>
          {' / '}
          <span className="text-teh-ink-soft dark:text-teh-d-ink-soft">{cat.name}</span>
        </div>
        <div className="flex justify-between items-end gap-12">
          <div>
            <h1 className="font-serif text-[48px] lg:text-[56px] font-normal tracking-tight mb-3 leading-none text-teh-ink dark:text-teh-d-ink">
              {cat.name}
            </h1>
            <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft max-w-[540px]">
              {desc.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Filter toolbar */}
      <section className="max-w-7xl mx-auto px-6 py-3.5 border-b border-teh-rule dark:border-teh-d-rule flex justify-between items-center">
        <div className="flex gap-2 font-mono text-xs tracking-wide text-teh-ink-soft dark:text-teh-d-ink-soft flex-wrap">
          {FILTER_PILLS.map((label, i) => (
            <span
              key={label}
              className={
                i === 0
                  ? 'px-3 py-1.5 bg-teh-ink dark:bg-teh-d-ink text-teh-bg dark:text-teh-d-bg cursor-pointer'
                  : 'px-3 py-1.5 border border-teh-rule dark:border-teh-d-rule hover:border-teh-ink-soft dark:hover:border-teh-d-ink-soft cursor-pointer transition-colors'
              }
            >
              {label}
            </span>
          ))}
        </div>
        <div className="text-xs text-teh-ink-muted dark:text-teh-d-ink-muted font-mono text-[11px] hidden sm:block">
          precios desde MercadoLibre Chile
        </div>
      </section>

      {/* Main layout: sidebar + content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr]">

        {/* Sidebar */}
        <aside className="pt-8 pb-12 px-6 lg:pl-6 lg:pr-8 border-b lg:border-b-0 lg:border-r border-teh-rule dark:border-teh-d-rule">
          <div className="space-y-7">
            {desc.highlights.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-[13px] text-teh-ink-soft dark:text-teh-d-ink-soft">
                <span className="text-teh-accent dark:text-teh-d-accent mt-0.5 shrink-0">→</span>
                {item}
              </div>
            ))}

            <div className="pt-6 border-t border-teh-rule-soft dark:border-teh-d-rule-soft">
              <div className="p-4 bg-teh-tag dark:bg-teh-d-tag text-xs leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">
                <div className="font-mono text-[10px] tracking-wide uppercase text-teh-accent2 dark:text-teh-d-accent2 mb-1.5 font-semibold">
                  Consejo de compra
                </div>
                Comparamos todos los precios en tiempo real para mostrarte siempre la mejor oferta disponible.
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="pt-8 pb-14 px-6 lg:pl-8 lg:pr-6">
          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {products.length > 0
              ? products.map((product, i) => (
                  <FeaturedProductCard key={product.id} product={product} index={i + 1} />
                ))
              : Array.from({ length: 8 }).map((_, i) => (
                  <a
                    key={i}
                    href={meliUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="relative flex flex-col p-3 bg-teh-surface dark:bg-teh-d-surface border border-teh-rule-soft dark:border-teh-d-rule-soft hover:border-teh-accent/40 dark:hover:border-teh-d-accent/40 transition-colors group"
                  >
                    <div className="relative aspect-square mb-3 bg-teh-bgalt dark:bg-teh-d-bgalt overflow-hidden">
                      <ProductPlaceholder seed={iconSeed} tone="#ede4d4" />
                      <div className="absolute top-2 right-2 font-mono text-[9px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider">
                        {String(i + 1).padStart(3, '0')}
                      </div>
                    </div>
                    <div className="text-[13px] font-medium leading-snug min-h-[36px] mb-2.5 text-teh-ink dark:text-teh-d-ink">
                      {cat.name}
                    </div>
                    <div className="pt-2.5 border-t border-teh-rule-soft dark:border-teh-d-rule-soft flex justify-between items-center">
                      <span className="font-mono text-[9px] tracking-wider text-teh-ink-soft dark:text-teh-d-ink-soft">MercadoLibre</span>
                      <span className="text-teh-accent dark:text-teh-d-accent font-medium text-[11px]">Ver oferta →</span>
                    </div>
                  </a>
                ))
            }
          </div>

          {/* Main CTA */}
          <div className="border-t border-teh-rule dark:border-teh-d-rule pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[13px] text-teh-ink-soft dark:text-teh-d-ink-soft">
                Explorá el catálogo completo de {cat.name} en MercadoLibre Chile
              </p>
              <p className="text-[11px] font-mono text-teh-ink-muted dark:text-teh-d-ink-muted mt-1">
                Serás redirigido a MercadoLibre Chile
              </p>
            </div>
            <a
              href={meliUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="shrink-0 bg-teh-ink dark:bg-teh-d-ink text-teh-bg dark:text-teh-d-bg px-6 py-3.5 text-[13px] font-medium tracking-wide hover:opacity-90 transition-opacity"
            >
              Ver todos en MercadoLibre →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
