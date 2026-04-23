'use client'

import Link from 'next/link'
import { useWishlist } from './WishlistContext'

export function WishlistNavIcon() {
  const { items } = useWishlist()
  const count = items.length

  return (
    <Link
      href="/lista"
      aria-label={`Mi lista (${count} productos)`}
      className="relative flex items-center justify-center w-8 h-8 rounded-lg text-teh-ink-muted dark:text-teh-d-ink-muted hover:text-teh-ink dark:hover:text-teh-d-ink hover:bg-teh-bgalt dark:hover:bg-teh-d-bgalt transition-colors shrink-0"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-teh-accent dark:bg-teh-d-accent text-white font-mono text-[9px] font-bold">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  )
}
