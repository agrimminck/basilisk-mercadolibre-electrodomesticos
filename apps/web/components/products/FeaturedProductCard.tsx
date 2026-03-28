import { buildProductUrl } from '../../lib/utils/affiliate'
import type { FeaturedProduct } from '../../lib/data/featured-products'

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

type FeaturedProductCardProps = {
  product: FeaturedProduct
}

export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const href = buildProductUrl(product.permalink)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group flex flex-col bg-zinc-900 border border-slate-800 rounded-xl overflow-hidden hover:border-amber-400/40 transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/5"
    >
      <div className="relative aspect-square bg-slate-800 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-200"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-amber-400 text-zinc-900 text-xs font-bold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 p-3 flex-1">
        <p className="text-slate-200 text-sm leading-snug line-clamp-2 group-hover:text-white transition-colors">
          {product.title}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-amber-400 font-bold text-base">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-xs text-slate-500 group-hover:text-amber-400/70 transition-colors">
            Ver en ML →
          </span>
        </div>
      </div>
    </a>
  )
}
