import { getCatalogProduct } from '../../../lib/meli/meli-client'
import { buildProductUrl } from '../../../lib/utils/affiliate'
import { ProductImageCarousel } from '../../../components/products/ProductImageCarousel'
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

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Carousel */}
        <ProductImageCarousel pictures={product.pictures} title={product.title} />

        {/* Info */}
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

          <div className="text-[12px] text-teh-ink-muted dark:text-teh-d-ink-muted font-mono tracking-wide">
            Serás redirigido a MercadoLibre Chile para completar la compra.
          </div>
        </div>
      </div>
    </div>
  )
}
