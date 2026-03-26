import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@affiliate-gaming/shared'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const productUrl = `/product/${product.slug}`

  return (
    <article className="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-accent)] transition-colors">
      <Link href={productUrl} className="relative aspect-square block overflow-hidden bg-[var(--color-bg)]">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-[var(--color-muted)]">
            🎮
          </div>
        )}
      </Link>

      <div className="flex flex-col gap-2 p-4">
        <Link href={productUrl}>
          <h3 className="text-sm font-medium text-white line-clamp-2 hover:text-[var(--color-accent)] transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.rating !== null && (
          <div className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
            <span className="text-yellow-400">★</span>
            <span>{Number(product.rating).toFixed(1)}</span>
            {product.reviewCount !== null && (
              <span>({product.reviewCount.toLocaleString('en-US')} reviews)</span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-white">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: product.currency,
              maximumFractionDigits: 0,
            }).format(Number(product.price))}
          </span>

          {product.available ? (
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="rounded-lg bg-[var(--color-accent)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              View on Amazon
            </a>
          ) : (
            <span className="text-xs text-[var(--color-muted)]">Unavailable</span>
          )}
        </div>
      </div>
    </article>
  )
}
