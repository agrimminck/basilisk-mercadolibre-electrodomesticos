'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { Product } from '../../types/index'

export interface WishlistItem {
  id: string
  title: string
  price: number
  currency: string
  thumbnail: string
  permalink: string
  categoryId: string
}

interface WishlistContextValue {
  items: WishlistItem[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearAll: () => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

const STORAGE_KEY = 'teh-wishlist'

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items, hydrated])

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      if (prev.some(i => i.id === product.id)) return prev
      return [...prev, {
        id: product.id,
        title: product.title,
        price: product.price,
        currency: product.currency,
        thumbnail: product.thumbnail,
        permalink: product.permalink,
        categoryId: product.categoryId,
      }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const isInWishlist = useCallback((id: string) => {
    return items.some(i => i.id === id)
  }, [items])

  const clearAll = useCallback(() => setItems([]), [])

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, clearAll }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
