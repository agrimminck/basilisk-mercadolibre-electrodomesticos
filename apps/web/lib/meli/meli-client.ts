import type { Product, Category } from '../../types/index'
import { transformProduct, transformCategory, transformSiteCategory } from './meli-transforms'
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

export interface MeliRawSiteCategory {
  id: string
  name: string
}

interface MeliRawSiteResponse {
  id: string
  name: string
  categories: MeliRawSiteCategory[]
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

// ─── Public API ──────────────────────────────────────────────────────────────

export async function getProduct(itemId: string): Promise<Product> {
  const url = buildUrl(`/items/${itemId}`)
  const raw = await apiFetch<MeliRawItem>(url)
  return transformProduct(raw)
}

export async function getCategories(): Promise<Category[]> {
  const url = buildUrl(`/sites/${SITE_ID}`)
  const raw = await apiFetch<MeliRawSiteResponse>(url)
  return raw.categories.map(transformSiteCategory)
}

export async function getCategory(categoryId: string): Promise<Category> {
  const url = buildUrl(`/categories/${categoryId}`)
  const raw = await apiFetch<MeliRawCategory>(url)
  return transformCategory(raw)
}
