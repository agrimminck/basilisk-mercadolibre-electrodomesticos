import { describe, it, expect, beforeEach, vi } from 'vitest'

async function loadWithAffiliateId(id: string | undefined) {
  vi.resetModules()
  if (id === undefined) delete process.env.MELI_AFFILIATE_ID
  else process.env.MELI_AFFILIATE_ID = id
  return import('./affiliate')
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('buildSearchUrl', () => {
  it('appends affiliate id and dashes query', async () => {
    const { buildSearchUrl } = await loadWithAffiliateId('AFF1')
    expect(buildSearchUrl('refrigerador samsung')).toBe(
      'https://listado.mercadolibre.cl/refrigerador-samsung?meli_affiliate_id=AFF1'
    )
  })

  it('still attaches affiliate query when input has special chars', async () => {
    const { buildSearchUrl } = await loadWithAffiliateId('AFF1')
    // Spaces are pre-dashed before encoding; periods + uppercase pass through.
    expect(buildSearchUrl('aire acondicionado 12.000 BTU')).toBe(
      'https://listado.mercadolibre.cl/aire-acondicionado-12.000-BTU?meli_affiliate_id=AFF1'
    )
  })
})

describe('buildCategoryUrl', () => {
  it('appends affiliate id', async () => {
    const { buildCategoryUrl } = await loadWithAffiliateId('AFF2')
    expect(buildCategoryUrl('electrodomesticos')).toBe(
      'https://listado.mercadolibre.cl/electrodomesticos?meli_affiliate_id=AFF2'
    )
  })
})

describe('buildProductUrl', () => {
  it('adds ?meli_affiliate_id to clean permalink', async () => {
    const { buildProductUrl } = await loadWithAffiliateId('AFF3')
    expect(buildProductUrl('https://articulo.mercadolibre.cl/MLC-123')).toBe(
      'https://articulo.mercadolibre.cl/MLC-123?meli_affiliate_id=AFF3'
    )
  })

  it('uses & when permalink already has query params (preserve)', async () => {
    const { buildProductUrl } = await loadWithAffiliateId('AFF3')
    const url = buildProductUrl('https://articulo.mercadolibre.cl/MLC-123?utm_source=newsletter')
    expect(url).toBe(
      'https://articulo.mercadolibre.cl/MLC-123?utm_source=newsletter&meli_affiliate_id=AFF3'
    )
    expect(url).toContain('utm_source=newsletter')
  })

  it('falls back to empty affiliate id when env missing', async () => {
    const { buildProductUrl } = await loadWithAffiliateId(undefined)
    expect(buildProductUrl('https://articulo.mercadolibre.cl/MLC-1')).toBe(
      'https://articulo.mercadolibre.cl/MLC-1?meli_affiliate_id='
    )
  })
})
