import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '../../types/index'

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

type ProductCardProps = {
  product: Product
  index?: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <Link
      href={`/producto/${product.id}`}
      className="relative flex flex-col p-3 bg-teh-surface dark:bg-teh-d-surface border border-teh-rule-soft dark:border-teh-d-rule-soft hover:border-teh-accent/40 dark:hover:border-teh-d-accent/40 transition-colors group"
    >
      <div className="relative aspect-square mb-3 bg-teh-bgalt dark:bg-teh-d-bgalt overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
        />
        {product.condition === 'new' && (
          <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-teh-accent dark:bg-teh-d-accent text-white font-mono text-[9px] font-medium tracking-wider">
            Nuevo
          </div>
        )}
        {index !== undefined && (
          <div className="absolute top-2 right-2 font-mono text-[9px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider">
            {String(index).padStart(3, '0')}
          </div>
        )}
      </div>

      <div className="text-[13px] font-medium leading-snug min-h-[36px] mb-2.5 text-teh-ink dark:text-teh-d-ink">
        {product.title}
      </div>

      <div className="flex items-baseline gap-1.5 mt-auto mb-2.5">
        <span className="font-serif text-[17px] font-medium tracking-tight text-teh-ink dark:text-teh-d-ink">
          {formatPrice(product.price, product.currency)}
        </span>
      </div>

      <div className="pt-2.5 border-t border-teh-rule-soft dark:border-teh-d-rule-soft flex justify-between items-center">
        <span className="font-mono text-[9px] tracking-wider text-teh-ink-soft dark:text-teh-d-ink-soft">
          MercadoLibre
        </span>
        <span className="text-teh-accent dark:text-teh-d-accent font-medium text-[11px]">
          Ver oferta →
        </span>
      </div>
    </Link>
  )
}
