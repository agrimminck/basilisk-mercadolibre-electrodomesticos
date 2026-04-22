import { getCatalogProduct, getHighlights } from '../../../lib/meli/meli-client'
import { buildProductUrl } from '../../../lib/utils/affiliate'
import { ProductImageCarousel } from '../../../components/products/ProductImageCarousel'
import { ProductCard } from '../../../components/products/ProductCard'
import type { Metadata } from 'next'

export const revalidate = 300

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await getCatalogProduct(id)
  const price = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: product.currency,
    maximumFractionDigits: 0,
  }).format(product.price)
  const description = `${price} — ${product.condition === 'new' ? 'Nuevo' : 'Usado'}. Cómpralo en MercadoLibre Chile.`
  return {
    title: product.title,
    description,
    openGraph: {
      title: product.title,
      description,
      url: `/producto/${id}`,
      images: [{ url: product.thumbnail, width: 400, height: 400, alt: product.title }],
    },
  }
}

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await getCatalogProduct(id)

  const related = product.categoryId
    ? (await getHighlights(product.categoryId, 5)).filter(p => p.id !== id).slice(0, 4)
    : []

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Top: carousel + info */}
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-12">
        <ProductImageCarousel pictures={product.pictures} title={product.title} />

        <div className="flex flex-col gap-6">
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-teh-accent dark:text-teh-d-accent mb-2">
              {product.condition === 'new' ? 'Nuevo' : 'Usado'} · MercadoLibre Chile
            </div>
            <h1 className="font-serif text-2xl lg:text-3xl font-normal leading-snug tracking-tight text-teh-ink dark:text-teh-d-ink">
              {product.title}
            </h1>
          </div>

          <div className="font-serif text-4xl font-medium tracking-tight text-teh-ink dark:text-teh-d-ink">
            {formatPrice(product.price, product.currency)}
          </div>

          <a
            href={buildProductUrl(product.permalink)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="bg-teh-ink dark:bg-teh-d-ink text-teh-bg dark:text-teh-d-bg px-6 py-3.5 text-[13px] font-medium tracking-wide hover:opacity-90 transition-opacity text-center"
          >
            Comprar en MercadoLibre →
          </a>

          <div className="text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted font-mono tracking-wide">
            Serás redirigido a MercadoLibre Chile para completar la compra.
          </div>

          {/* Lo que tienes que saber */}
          {product.mainFeatures.length > 0 && (
            <div className="border-t border-teh-rule-soft dark:border-teh-d-rule-soft pt-5">
              <h2 className="font-mono text-[10px] tracking-[0.18em] uppercase text-teh-ink-muted dark:text-teh-d-ink-muted mb-3">
                Lo que tienes que saber
              </h2>
              <ul className="space-y-2">
                {product.mainFeatures.map((feat, i) => (
                  <li key={i} className="flex gap-2 text-[13px] text-teh-ink-soft dark:text-teh-d-ink-soft leading-snug">
                    <span className="text-teh-accent dark:text-teh-d-accent shrink-0 mt-0.5">·</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Características */}
      {product.attributes.length > 0 && (
        <section className="border-t border-teh-rule dark:border-teh-d-rule pt-10 mb-12">
          <h2 className="font-mono text-[10px] tracking-[0.18em] uppercase text-teh-ink-muted dark:text-teh-d-ink-muted mb-5">
            Características
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0">
            {product.attributes.slice(0, 20).map((attr) => (
              <div key={attr.id} className="flex gap-4 py-2.5 border-b border-teh-rule-soft dark:border-teh-d-rule-soft">
                <dt className="text-[12px] text-teh-ink-muted dark:text-teh-d-ink-muted shrink-0 w-36 truncate font-mono">
                  {attr.name}
                </dt>
                <dd className="text-[13px] text-teh-ink dark:text-teh-d-ink">{attr.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Productos relacionados */}
      {related.length > 0 && (
        <section className="border-t border-teh-rule dark:border-teh-d-rule pt-10">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-teh-ink-muted dark:text-teh-d-ink-muted mb-1.5">
            También te puede interesar
          </div>
          <h2 className="font-serif text-2xl font-normal tracking-tight text-teh-ink dark:text-teh-d-ink mb-6">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i + 1} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
