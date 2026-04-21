import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '../../types/index'
import { Badge } from '../ui/Badge'

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/producto/${product.id}`}
      className="group flex flex-col bg-teh-surface dark:bg-teh-d-surface border border-teh-rule dark:border-teh-d-rule rounded-xl overflow-hidden hover:border-teh-accent/50 dark:hover:border-teh-d-accent/50 transition-all duration-200 hover:shadow-md"
    >
      <div className="relative aspect-square bg-teh-bgalt dark:bg-teh-d-bgalt overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col gap-2 p-3 flex-1">
        <p className="text-teh-ink dark:text-teh-d-ink text-sm leading-snug line-clamp-2">
          {product.title}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-teh-accent dark:text-teh-d-accent font-bold text-base">
            {formatPrice(product.price, product.currency)}
          </span>
          <Badge condition={product.condition} />
        </div>
      </div>
    </Link>
  )
}
