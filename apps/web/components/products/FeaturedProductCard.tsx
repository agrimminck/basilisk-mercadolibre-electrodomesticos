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
      className="group flex flex-col bg-teh-surface dark:bg-teh-d-surface border border-teh-rule dark:border-teh-d-rule rounded-xl overflow-hidden hover:border-teh-accent/50 dark:hover:border-teh-d-accent/50 transition-all duration-200 hover:shadow-md"
    >
      <div className="relative aspect-square bg-teh-bgalt dark:bg-teh-d-bgalt overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-teh-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 p-3 flex-1">
        <p className="text-teh-ink dark:text-teh-d-ink text-sm leading-snug line-clamp-2">
          {product.title}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-teh-accent dark:text-teh-d-accent font-bold text-base">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-xs text-teh-ink-muted dark:text-teh-d-ink-muted group-hover:text-teh-accent dark:group-hover:text-teh-d-accent transition-colors">
            Ver oferta →
          </span>
        </div>
      </div>
    </a>
  )
}
