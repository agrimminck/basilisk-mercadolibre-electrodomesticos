import type { Product, Category } from '@affiliate-gaming/shared'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api'
const AFFILIATE_SOURCE = 'mercadolibre'

async function fetchApi<T>(path: string, revalidate = 3600): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    next: { revalidate },
    signal: AbortSignal.timeout(10_000),
  })
  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${path}`)
  }
  return response.json() as Promise<T>
}

export const api = {
  products: {
    list: (): Promise<Product[]> =>
      fetchApi(`/products?source=${AFFILIATE_SOURCE}`),
    bySlug: (slug: string): Promise<Product> =>
      fetchApi(`/products/${slug}`),
    byCategory: (categorySlug: string): Promise<Product[]> =>
      fetchApi(`/products?category=${categorySlug}&source=${AFFILIATE_SOURCE}`),
    search: (q: string): Promise<Product[]> =>
      fetchApi(`/products?q=${encodeURIComponent(q)}&source=${AFFILIATE_SOURCE}`, 0),
  },
  categories: {
    list: (): Promise<Category[]> => fetchApi('/categories'),
    bySlug: (slug: string): Promise<Category> => fetchApi(`/categories/${slug}`),
  },
}
