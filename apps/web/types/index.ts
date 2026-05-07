export interface Product {
  id: string
  title: string
  slug: string
  price: number
  currency: string
  thumbnail: string
  pictures: string[]
  mainFeatures: string[]
  permalink: string
  categoryId: string
  condition: 'new' | 'used'
  originalPrice?: number
  availableQuantity: number
  soldQuantity: number
  attributes: ProductAttribute[]
}

export interface ProductAttribute {
  id: string
  name: string
  value: string
}

export interface Category {
  id: string
  name: string
  slug: string
  totalItems?: number
  thumbnail?: string
}

export interface ApiResponse<T> {
  data: T
  error?: string
}
