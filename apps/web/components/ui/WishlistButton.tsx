'use client'

import { useWishlist } from './WishlistContext'
import type { Product } from '../../types/index'

export function WishlistButton({ product }: { product: Product }) {
  const { isInWishlist, addItem, removeItem } = useWishlist()
  const saved = isInWishlist(product.id)

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (saved) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? 'Quitar de lista' : 'Guardar en lista'}
      className="absolute top-2 right-2 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-teh-bg/90 dark:bg-teh-d-bg/90 backdrop-blur-sm border border-teh-rule dark:border-teh-d-rule hover:border-teh-accent dark:hover:border-teh-d-accent transition-colors"
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={saved ? 'text-teh-accent dark:text-teh-d-accent' : 'text-teh-ink-muted dark:text-teh-d-ink-muted'}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}
