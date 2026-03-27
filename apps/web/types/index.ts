export interface Product {
  id: string
  title: string
  slug: string
  price: number
  currency: string
  thumbnail: string
  permalink: string
  categoryId: string
  condition: 'new' | 'used'
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
  totalItems: number
  thumbnail?: string
}

export interface SearchResult {
  query: string
  total: number
  offset: number
  limit: number
  products: Product[]
}

export interface ApiResponse<T> {
  data: T
  error?: string
}
