export interface Product {
  id: string
  asin: string // Amazon Standard Identification Number
  name: string
  slug: string
  description: string
  imageUrl: string
  price: number
  currency: string
  affiliateUrl: string
  categoryId: string
  rating: number | null
  reviewCount: number | null
  available: boolean
  createdAt: Date
  updatedAt: Date
}
