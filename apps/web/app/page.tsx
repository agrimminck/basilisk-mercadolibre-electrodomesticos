import { getCategories, getCategory, getHighlights } from '../lib/meli/meli-client'
import { FeaturedProductCard } from '../components/products/FeaturedProductCard'
import { ProductPlaceholder } from '../components/ui/ProductPlaceholder'
import { NewsletterBanner } from '../components/ui/NewsletterBanner'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Top Electro Hogar — Electrodomésticos en MercadoLibre Chile',
  description:
    'Explorá refrigeradores, lavadoras, televisores, cocinas y más electrodomésticos en MercadoLibre Chile. Compará precios y encontrá la mejor oferta.',
}

const CATEGORY_ICONS: Record<string, number> = {
  'electrodomesticos': 0,
  'lavadoras': 1,
  'electronica-audio-y-video': 2,
  'refrigeradores': 3,
  'computacion': 6,
  'celulares-y-telefonia': 7,
}

const SECTION_TONES = ['#ede4d4', '#e6dccd', '#e4dcc8', '#ecdfcc', '#efe5d3']

function formatHeroPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)
}

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    getCategories(),
    getHighlights('MLC5726', 8),
  ])

  const topCategories = categories.slice(0, 5)
  const topCategoriesDetailed = await Promise.all(topCategories.map((cat) => getCategory(cat.id)))
  const heroProduct = featuredProducts[0] ?? null

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://web-ten-beige-23.vercel.app'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Top Electro Hogar',
    url: siteUrl,
    description: 'Los mejores precios en electrodomésticos en MercadoLibre Chile.',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/buscar?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-14 border-b border-teh-rule dark:border-teh-d-rule">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-teh-accent dark:text-teh-d-accent font-semibold mb-6">
              · Selección curada de electrodomésticos
            </div>
            <h1 className="font-serif text-5xl lg:text-[64px] font-normal leading-[0.98] tracking-tight mb-6">
              Lo esencial,<br />
              <span className="italic text-teh-accent dark:text-teh-d-accent">bien escogido.</span>
            </h1>
            <p className="text-base lg:text-[17px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft max-w-[440px] mb-8">
              Comparamos precios en MercadoLibre Chile para que solo veas los
              electrodomésticos que valen la pena tener en casa.
            </p>
            <div className="flex gap-3 items-center flex-wrap">
              <Link
                href="/electrodomesticos"
                className="bg-teh-ink dark:bg-teh-d-ink text-teh-bg dark:text-teh-d-bg px-6 py-3.5 text-[13px] font-medium tracking-wide hover:opacity-90 transition-opacity"
              >
                Explorar el catálogo →
              </Link>
              <Link
                href="/"
                className="border border-teh-rule dark:border-teh-d-rule px-6 py-3.5 text-[13px] font-medium tracking-wide text-teh-ink-soft dark:text-teh-d-ink-soft hover:border-teh-ink-soft dark:hover:border-teh-d-ink-soft transition-colors"
              >
                Ver categorías
              </Link>
            </div>
            <div className="mt-10 flex gap-8 text-xs text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wide">
              {([['916', 'productos'], ['34', 'marcas'], ['8.9k', 'reviews leídos']] as [string, string][]).map(([n, l]) => (
                <div key={l}>
                  <strong className="block font-serif text-[22px] font-medium text-teh-ink dark:text-teh-d-ink">{n}</strong>
                  {l}
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block" style={{ aspectRatio: '1 / 1.05' }}>
            <div className="relative w-full h-full bg-teh-bgalt dark:bg-teh-d-bgalt overflow-hidden">
              {heroProduct
                ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={heroProduct.thumbnail}
                      alt={heroProduct.title}
                      className="w-full h-full object-contain p-10 mix-blend-multiply dark:mix-blend-normal"
                    />
                  )
                : <ProductPlaceholder seed={0} tone="#e8dfcc" />
              }
              <div className="absolute bottom-6 left-6 font-mono text-[11px] text-teh-ink-soft dark:text-teh-d-ink-soft tracking-wide">
                <div className="opacity-60 mb-0.5">N°001</div>
                <div className="max-w-[200px] leading-tight">
                  {heroProduct?.title ?? 'Mademsa Frost 317L Silver'}
                </div>
                <div className="text-teh-accent dark:text-teh-d-accent mt-1">
                  {heroProduct
                    ? `→ desde ${formatHeroPrice(heroProduct.price, heroProduct.currency)}`
                    : '→ desde $389.990'
                  }
                </div>
              </div>
              <div className="absolute top-6 right-6 font-mono text-[10px] tracking-wider text-teh-ink-muted dark:text-teh-d-ink-muted">
                [ 01 / 04 ]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-b border-teh-rule dark:border-teh-d-rule">
        <div className="flex justify-between items-baseline mb-10">
          <div>
            <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-1.5">§ 01</div>
            <h2 className="font-serif text-4xl font-normal tracking-tight text-teh-ink dark:text-teh-d-ink">Por categoría</h2>
          </div>
          <Link
            href="/"
            className="text-[13px] text-teh-ink-soft dark:text-teh-d-ink-soft border-b border-teh-rule dark:border-teh-d-rule pb-0.5 hover:text-teh-ink dark:hover:text-teh-d-ink transition-colors"
          >
            Ver todas →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {topCategoriesDetailed.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="relative block p-5 pt-7 bg-teh-surface dark:bg-teh-d-surface border border-teh-rule-soft dark:border-teh-d-rule-soft min-h-[200px] hover:border-teh-accent/40 dark:hover:border-teh-d-accent/40 transition-colors group"
            >
              <div className="h-[90px] mb-4 flex items-center justify-center">
                <div className="w-4/5 h-full">
                  {cat.thumbnail
                    ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={cat.thumbnail.replace('http://', 'https://')}
                          alt={cat.name}
                          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                        />
                      )
                    : (
                        <ProductPlaceholder
                          seed={CATEGORY_ICONS[cat.slug] ?? i}
                          tone={SECTION_TONES[i % SECTION_TONES.length]}
                        />
                      )
                  }
                </div>
              </div>
              <div className="text-[14px] font-medium mb-1 text-teh-ink dark:text-teh-d-ink group-hover:text-teh-accent dark:group-hover:text-teh-d-accent transition-colors">
                {cat.name}
              </div>
              <div className="absolute top-4 right-4 font-mono text-[10px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider">
                0{i + 1}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products — only rendered when ML API returns live data */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 border-b border-teh-rule dark:border-teh-d-rule">
          <div className="flex justify-between items-baseline mb-10">
            <div>
              <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-1.5">§ 02</div>
              <h2 className="font-serif text-4xl font-normal tracking-tight text-teh-ink dark:text-teh-d-ink">
                Esta semana <em className="text-teh-accent dark:text-teh-d-accent">recomendamos</em>
              </h2>
              <div className="text-[13px] text-teh-ink-soft dark:text-teh-d-ink-soft mt-2 max-w-[560px]">
                Productos seleccionados con los mejores precios en MercadoLibre Chile.
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.slice(0, 8).map((product, i) => (
              <FeaturedProductCard key={product.id} product={product} index={i + 1} />
            ))}
          </div>
        </section>
      )}

      <NewsletterBanner />

      {/* Editorial strip */}
      <section className="bg-teh-bgalt dark:bg-teh-d-bgalt border-b border-teh-rule dark:border-teh-d-rule">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-center">
            <div className="aspect-[4/3] bg-teh-surface dark:bg-teh-d-surface overflow-hidden">
              <ProductPlaceholder seed={5} tone="#f5f1ea" />
            </div>
            <div>
              <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-3">
                § 03 · guía
              </div>
              <h3 className="font-serif text-[36px] lg:text-[42px] font-normal leading-[1.05] tracking-tight mb-5 text-teh-ink dark:text-teh-d-ink">
                Cómo elegir un<br />refrigerador que<br />
                <em className="text-teh-accent dark:text-teh-d-accent">no te canses de ver</em>.
              </h3>
              <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft mb-6 max-w-[480px]">
                Tamaño, clase energética, ruido, acabados. Una guía corta y honesta,
                sin tecnicismos innecesarios, para acertar a la primera.
              </p>
              <Link
                href="/electrodomesticos"
                className="text-[13px] font-medium border-b border-teh-accent dark:border-teh-d-accent pb-0.5 text-teh-ink dark:text-teh-d-ink hover:text-teh-accent dark:hover:text-teh-d-accent transition-colors"
              >
                Ver electrodomésticos — mejor precio →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
