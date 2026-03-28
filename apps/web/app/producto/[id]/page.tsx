import Image from 'next/image'
import { getProduct } from '../../../lib/meli/meli-client'
import { buildProductUrl } from '../../../lib/utils/affiliate'
import { Badge } from '../../../components/ui/Badge'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)
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
  const product = await getProduct(id)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Imagen */}
        <div className="relative aspect-square bg-slate-800 rounded-2xl overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-3">
            <h1 className="text-xl font-semibold text-slate-100 leading-snug flex-1">
              {product.title}
            </h1>
            <Badge condition={product.condition} />
          </div>

          <p className="text-3xl font-bold text-amber-400">
            {formatPrice(product.price, product.currency)}
          </p>

          <a
            href={buildProductUrl(product.permalink)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-center py-3 px-6 rounded-xl transition-colors"
          >
            Comprar en MercadoLibre
          </a>

          {product.attributes.length > 0 && (
            <div className="border-t border-slate-800 pt-5">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Características
              </h2>
              <dl className="space-y-2">
                {product.attributes.slice(0, 10).map((attr) => (
                  <div key={attr.id} className="flex gap-3 text-sm">
                    <dt className="text-slate-500 shrink-0 w-36 truncate">{attr.name}</dt>
                    <dd className="text-slate-300">{attr.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
