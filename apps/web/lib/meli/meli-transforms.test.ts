import { describe, it, expect } from 'vitest'
import { toSlug, transformProduct, transformCategory, transformSiteCategory } from './meli-transforms'
import type { MeliRawItem, MeliRawCategory, MeliRawSiteCategory } from './meli-client'

function rawItem(overrides: Partial<MeliRawItem> = {}): MeliRawItem {
  return {
    id: 'MLC123',
    title: 'Refrigerador Samsung 350L',
    price: 599990,
    currency_id: 'CLP',
    thumbnail: 'http://http2.mlstatic.com/foo.jpg',
    permalink: 'https://articulo.mercadolibre.cl/MLC-123',
    category_id: 'MLC1576',
    condition: 'new',
    available_quantity: 10,
    sold_quantity: 25,
    attributes: [
      { id: 'BRAND', name: 'Marca', value_name: 'Samsung' },
      { id: 'COLOR', name: 'Color', value_name: null },
    ],
    ...overrides,
  }
}

describe('toSlug', () => {
  it('lowercases and dashes spaces', () => {
    expect(toSlug('Hola Mundo')).toBe('hola-mundo')
  })

  it('strips diacritics including ñ', () => {
    expect(toSlug('Refrigerador con Año y Cómputo')).toBe('refrigerador-con-ano-y-computo')
  })

  it('drops non-alphanumeric symbols', () => {
    expect(toSlug('Lavadora 7kg @#$ ¡oferta!')).toBe('lavadora-7kg-oferta')
  })

  it('collapses repeated whitespace', () => {
    expect(toSlug('  foo   bar  ')).toBe('foo-bar')
  })

  it('truncates at 80 chars', () => {
    const long = 'a'.repeat(120)
    expect(toSlug(long).length).toBe(80)
  })

  it('returns empty for fully invalid input', () => {
    expect(toSlug('@@@///')).toBe('')
  })
})

describe('transformProduct', () => {
  it('maps shape MeLi → Product', () => {
    const p = transformProduct(rawItem())
    expect(p).toMatchObject({
      id: 'MLC123',
      title: 'Refrigerador Samsung 350L',
      slug: 'refrigerador-samsung-350l',
      price: 599990,
      currency: 'CLP',
      categoryId: 'MLC1576',
      condition: 'new',
    })
  })

  it('upgrades http thumbnail to https', () => {
    const p = transformProduct(rawItem())
    expect(p.thumbnail.startsWith('https://')).toBe(true)
    expect(p.pictures[0].startsWith('https://')).toBe(true)
  })

  it('filters attributes with null value_name', () => {
    const p = transformProduct(rawItem())
    expect(p.attributes).toEqual([{ id: 'BRAND', name: 'Marca', value: 'Samsung' }])
  })

  it('propagates optional originalPrice', () => {
    const p = transformProduct(rawItem({ original_price: 799990 }))
    expect(p.originalPrice).toBe(799990)
  })
})

describe('transformCategory', () => {
  it('maps full category', () => {
    const raw: MeliRawCategory = {
      id: 'MLC1576',
      name: 'Refrigeradores',
      total_items_in_this_category: 4200,
      thumbnail: 'https://x/y.jpg',
      children_categories: [],
    }
    expect(transformCategory(raw)).toEqual({
      id: 'MLC1576',
      name: 'Refrigeradores',
      slug: 'refrigeradores',
      totalItems: 4200,
      thumbnail: 'https://x/y.jpg',
    })
  })
})

describe('transformSiteCategory', () => {
  it('maps minimal site category', () => {
    const raw: MeliRawSiteCategory = { id: 'MLC1051', name: 'Electrodomésticos y Aire Acondicionado' }
    expect(transformSiteCategory(raw)).toEqual({
      id: 'MLC1051',
      name: 'Electrodomésticos y Aire Acondicionado',
      slug: 'electrodomesticos-y-aire-acondicionado',
    })
  })
})
