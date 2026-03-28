const AFFILIATE_ID = process.env.MELI_AFFILIATE_ID?.trim() ?? ''

export function buildSearchUrl(query: string): string {
  const slug = query.trim().replace(/\s+/g, '-')
  return `https://listado.mercadolibre.cl/${encodeURIComponent(slug)}?meli_affiliate_id=${AFFILIATE_ID}`
}

export function buildCategoryUrl(categorySlug: string): string {
  return `https://listado.mercadolibre.cl/${encodeURIComponent(categorySlug)}?meli_affiliate_id=${AFFILIATE_ID}`
}

export function buildProductUrl(permalink: string): string {
  const sep = permalink.includes('?') ? '&' : '?'
  return `${permalink}${sep}meli_affiliate_id=${AFFILIATE_ID}`
}
