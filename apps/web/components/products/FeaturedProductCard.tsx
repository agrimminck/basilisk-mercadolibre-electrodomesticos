import Link from 'next/link'
import type { Product } from '../../types/index'

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

type Props = {
  product: Product
  index?: number
}

export function FeaturedProductCard({ product, index }: Props) {
  return (
    <Link
      href={`/producto/${product.id}${product.categoryId ? `?cat=${product.categoryId}` : ''}`}
      className="relative flex flex-col p-3.5 bg-teh-surface dark:bg-teh-d-surface border border-teh-rule-soft dark:border-teh-d-rule-soft hover:border-teh-accent/40 dark:hover:border-teh-d-accent/40 transition-colors group"
    >
      <div className="relative aspect-square mb-3.5 bg-white dark:bg-zinc-900 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
        />
        {index !== undefined && (
          <div className="absolute top-2.5 right-2.5 font-mono text-[9px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider">
            {String(index).padStart(2, '0')}
          </div>
        )}
      </div>

      <div className="text-sm font-medium leading-snug min-h-[38px] mb-3 text-teh-ink dark:text-teh-d-ink">
        {product.title}
      </div>

      <div className="flex items-baseline gap-2 mt-auto mb-3.5">
        <span className="font-serif text-xl font-medium tracking-tight text-teh-ink dark:text-teh-d-ink">
          {formatPrice(product.price, product.currency)}
        </span>
      </div>

      <div className="pt-3 border-t border-teh-rule-soft dark:border-teh-d-rule-soft flex justify-between items-center text-xs">
        <span className="font-mono text-[10px] tracking-wider text-teh-ink-soft dark:text-teh-d-ink-soft">
          MercadoLibre
        </span>
        <span className="text-teh-accent dark:text-teh-d-accent font-medium">
          Ver oferta →
        </span>
      </div>
    </Link>
  )
}
