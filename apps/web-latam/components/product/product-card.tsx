import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '../../i18n/navigation'
import type { Product } from '@affiliate-gaming/shared'

interface ProductCardProps {
  product: Product
}

// Maps next-intl locale to Intl.NumberFormat locale string
function IntlLocale(locale: string): string {
  if (locale === 'pt') return 'pt-BR'
  if (locale === 'en') return 'en-US'
  return 'es-CL'
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('product')
  const locale = useLocale()
  const productUrl = `/producto/${product.slug}` as const

  return (
    <article className="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-accent)] transition-colors">
      <Link
        href={productUrl}
        className="relative aspect-square block overflow-hidden bg-[var(--color-bg)]"
      >
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
              <span>
                ({product.reviewCount.toLocaleString()} {t('reviews')})
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-white">
            {new Intl.NumberFormat(IntlLocale(locale), {
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
              {t('viewOnStore')}
            </a>
          ) : (
            <span className="text-xs text-[var(--color-muted)]">{t('notAvailable')}</span>
          )}
        </div>
      </div>
    </article>
  )
}
