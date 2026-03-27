import type { Category } from './category'

export type AffiliateSource = 'amazon' | 'mercadolibre'

export interface Product {
  id: string
  externalId: string        // ASIN para Amazon, Item ID para MercadoLibre
  affiliateSource: AffiliateSource
  name: string
  slug: string
  description: string
  imageUrl: string
  price: number
  currency: string          // 'USD', 'ARS', 'BRL', 'MXN', etc.
  affiliateUrl: string
  categoryId: string
  category?: Pick<Category, 'id' | 'name' | 'slug'>
  rating: number | null
  reviewCount: number | null
  available: boolean
  createdAt: Date
  updatedAt: Date
}
