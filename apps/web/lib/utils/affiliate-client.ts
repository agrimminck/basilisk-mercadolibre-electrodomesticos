const AFFILIATE_ID = process.env.NEXT_PUBLIC_MELI_AFFILIATE_ID?.trim() ?? ''

export function buildProductUrlClient(permalink: string): string {
  const sep = permalink.includes('?') ? '&' : '?'
  return `${permalink}${sep}meli_affiliate_id=${AFFILIATE_ID}`
}
