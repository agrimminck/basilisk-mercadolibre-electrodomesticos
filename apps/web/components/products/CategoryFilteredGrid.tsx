'use client'

import { useState } from 'react'
import type { Product } from '../../types/index'
import { FeaturedProductCard } from './FeaturedProductCard'
import { ProductPlaceholder } from '../ui/ProductPlaceholder'

type FilterKey = 'Todos' | 'En oferta' | 'Nuevos' | "Editor's picks"

const FILTERS: FilterKey[] = ['Todos', 'En oferta', 'Nuevos', "Editor's picks"]

function applyFilter(products: Product[], filter: FilterKey): Product[] {
  switch (filter) {
    case 'En oferta':
      return products.filter((p) => p.originalPrice != null && p.originalPrice > p.price)
    case 'Nuevos':
      return products.filter((p) => p.condition === 'new')
    case "Editor's picks":
      return products.slice(0, 4)
    default:
      return products
  }
}

type Props = {
  products: Product[]
  meliUrl: string
  catName: string
  iconSeed: number
}

export function CategoryFilteredGrid({ products, meliUrl, catName, iconSeed }: Props) {
  const [active, setActive] = useState<FilterKey>('Todos')
  const filtered = applyFilter(products, active)

  return (
    <>
      {/* Filter pills */}
      <div className="flex gap-2 font-mono text-xs tracking-wide text-teh-ink-soft dark:text-teh-d-ink-soft flex-wrap mb-6 pb-4 border-b border-teh-rule dark:border-teh-d-rule">
        {FILTERS.map((label) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={
              label === active
                ? 'px-3 py-1.5 bg-teh-ink dark:bg-teh-d-ink text-teh-bg dark:text-teh-d-bg'
                : 'px-3 py-1.5 border border-teh-rule dark:border-teh-d-rule hover:border-teh-ink-soft dark:hover:border-teh-d-ink-soft cursor-pointer transition-colors'
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-10">
        {filtered.length > 0
          ? filtered.map((product, i) => (
              <FeaturedProductCard key={product.id} product={product} index={i + 1} />
            ))
          : products.length > 0
          ? (
              <div className="col-span-full py-12 text-center font-mono text-[13px] text-teh-ink-muted dark:text-teh-d-ink-muted">
                No hay productos en esta categoría para el filtro seleccionado.
              </div>
            )
          : Array.from({ length: 8 }).map((_, i) => (
              <a
                key={i}
                href={meliUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="relative flex flex-col p-3 bg-teh-surface dark:bg-teh-d-surface border border-teh-rule-soft dark:border-teh-d-rule-soft hover:border-teh-accent/40 dark:hover:border-teh-d-accent/40 transition-colors group"
              >
                <div className="relative aspect-square mb-3 bg-teh-bgalt dark:bg-teh-d-bgalt overflow-hidden">
                  <ProductPlaceholder seed={iconSeed} tone="#ede4d4" />
                  <div className="absolute top-2 right-2 font-mono text-[9px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider">
                    {String(i + 1).padStart(3, '0')}
                  </div>
                </div>
                <div className="text-[13px] font-medium leading-snug min-h-[36px] mb-2.5 text-teh-ink dark:text-teh-d-ink">
                  {catName}
                </div>
                <div className="pt-2.5 border-t border-teh-rule-soft dark:border-teh-d-rule-soft flex justify-between items-center">
                  <span className="font-mono text-[9px] tracking-wider text-teh-ink-soft dark:text-teh-d-ink-soft">MercadoLibre</span>
                  <span className="text-teh-accent dark:text-teh-d-accent font-medium text-[11px]">Ver oferta →</span>
                </div>
              </a>
            ))
        }
      </div>
    </>
  )
}
