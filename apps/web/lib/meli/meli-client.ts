import type { Product, Category, SearchResult, SearchFilters } from '../../types/index'
import { transformProduct, transformCategory, transformSearchResult } from './meli-transforms'
import { getAccessToken } from './meli-auth'

// ─── Raw ML API types ────────────────────────────────────────────────────────

export interface MeliRawItem {
  id: string
  title: string
  price: number
  currency_id: string
  thumbnail: string
  permalink: string
  category_id: string
  condition: 'new' | 'used'
  available_quantity: number
  sold_quantity: number
  attributes: Array<{
    id: string
    name: string
    value_name: string | null
  }>
}

export interface MeliRawCategory {
  id: string
  name: string
  total_items_in_this_category: number
  thumbnail?: string
  children_categories: Array<{ id: string; name: string; total_items_in_this_category: number }>
}

export interface MeliRawSearchResponse {
  query: string
  paging: {
    total: number
    offset: number
    limit: number
  }
  results: MeliRawItem[]
}

// ─── Client ──────────────────────────────────────────────────────────────────

const BASE_URL = 'https://api.mercadolibre.com'
const SITE_ID = (process.env.MELI_DEFAULT_SITE ?? 'MLC').trim()

function buildUrl(path: string, params: Record<string, string> = {}): string {
  const url = new URL(`${BASE_URL}${path}`)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  return url.toString()
}

async function apiFetch<T>(url: string): Promise<T> {
  const token = await getAccessToken()
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': 'affiliate-gaming/1.0',
    },
    next: { revalidate: 300 },
  })
  if (!res.ok) {
    throw new Error(`MeliClient error ${res.status}: ${res.statusText} — ${url}`)
  }
  return res.json() as Promise<T>
}

// ─── Filter helpers ───────────────────────────────────────────────────────────

function buildFilterParams(filters: SearchFilters): Record<string, string> {
  const params: Record<string, string> = {}

  if (filters.sort && filters.sort !== 'relevance') {
    params.sort = filters.sort
  }

  if (filters.condition) {
    params.condition = filters.condition
  }

  if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
    const min = filters.priceMin !== undefined ? String(filters.priceMin) : '*'
    const max = filters.priceMax !== undefined ? String(filters.priceMax) : '*'
    params.price = `${min}-${max}`
  }

  return params
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function searchProducts(
  query: string,
  offset: number = 0,
  limit: number = 20,
  filters: SearchFilters = {}
): Promise<SearchResult> {
  const url = buildUrl(`/sites/${SITE_ID}/search`, {
    q: query,
    offset: String(offset),
    limit: String(limit),
    ...buildFilterParams(filters),
  })
  const raw = await apiFetch<MeliRawSearchResponse>(url)
  return transformSearchResult(raw, query)
}

export async function getCategoryProducts(
  categoryId: string,
  offset: number = 0,
  limit: number = 20,
  filters: SearchFilters = {}
): Promise<SearchResult> {
  const url = buildUrl(`/sites/${SITE_ID}/search`, {
    category: categoryId,
    offset: String(offset),
    limit: String(limit),
    ...buildFilterParams(filters),
  })
  const raw = await apiFetch<MeliRawSearchResponse>(url)
  return transformSearchResult(raw, categoryId)
}

export async function getProduct(itemId: string): Promise<Product> {
  const url = buildUrl(`/items/${itemId}`)
  const raw = await apiFetch<MeliRawItem>(url)
  return transformProduct(raw)
}

export async function getCategories(): Promise<Category[]> {
  const url = buildUrl(`/sites/${SITE_ID}/categories`)
  const raw = await apiFetch<MeliRawCategory[]>(url)
  return raw.map(transformCategory)
}

export async function getCategory(categoryId: string): Promise<Category> {
  const url = buildUrl(`/categories/${categoryId}`)
  const raw = await apiFetch<MeliRawCategory>(url)
  return transformCategory(raw)
}
