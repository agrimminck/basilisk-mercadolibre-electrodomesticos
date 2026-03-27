import type { Product, Category, SearchResult } from '../../types/index'
import type { MeliRawItem, MeliRawCategory, MeliRawSearchResponse } from './meli-client'

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

export function transformProduct(raw: MeliRawItem): Product {
  return {
    id: raw.id,
    title: raw.title,
    slug: toSlug(raw.title),
    price: raw.price,
    currency: raw.currency_id,
    thumbnail: raw.thumbnail.replace('http://', 'https://'),
    permalink: raw.permalink,
    categoryId: raw.category_id,
    condition: raw.condition,
    availableQuantity: raw.available_quantity,
    soldQuantity: raw.sold_quantity,
    attributes: raw.attributes
      .filter((a) => a.value_name !== null)
      .map((a) => ({
        id: a.id,
        name: a.name,
        value: a.value_name as string,
      })),
  }
}

export function transformCategory(raw: MeliRawCategory): Category {
  return {
    id: raw.id,
    name: raw.name,
    slug: toSlug(raw.name),
    totalItems: raw.total_items_in_this_category,
    thumbnail: raw.thumbnail,
  }
}

export function transformSearchResult(
  raw: MeliRawSearchResponse,
  query: string
): SearchResult {
  return {
    query,
    total: raw.paging.total,
    offset: raw.paging.offset,
    limit: raw.paging.limit,
    products: raw.results.map(transformProduct),
  }
}
