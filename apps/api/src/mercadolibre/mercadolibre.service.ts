import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { ProductEntity as Product } from '../products/product.entity'

// ─── Tipos internos de la API pública de MercadoLibre ─────────────────────────

interface MlSearchResult {
  id: string
  title: string
  price: number
  currency_id: string
  thumbnail: string
  permalink: string
  available_quantity: number
  seller_reputation?: {
    level_id: string
  }
}

interface MlSearchResponse {
  results: MlSearchResult[]
}

interface MlItemResponse {
  id: string
  title: string
  price: number
  currency_id: string
  pictures: Array<{ url: string }>
  permalink: string
  available_quantity: number
  status: string
}

// Sites soportados y sus dominios de ML
const SITE_DOMAINS: Record<string, string> = {
  MLA: 'www.mercadolibre.com.ar',
  MLB: 'www.mercadolivre.com.br',
  MLM: 'www.mercadolibre.com.mx',
  MLC: 'www.mercadolibre.cl',
}

// ─── Servicio ──────────────────────────────────────────────────────────────────

@Injectable()
export class MercadoLibreService {
  private readonly logger = new Logger(MercadoLibreService.name)
  private readonly baseUrl = 'https://api.mercadolibre.com'

  constructor(private readonly config: ConfigService) {}

  /**
   * Busca productos en MercadoLibre por keyword y site.
   * Devuelve un array vacío en caso de error.
   *
   * @param keyword - término de búsqueda
   * @param siteId - identificador del site (MLA, MLB, MLM, MLC)
   */
  async SearchProducts(keyword: string, siteId = 'MLA'): Promise<Product[]> {
    this.logger.log(`Searching ML products: "${keyword}" in ${siteId}`)

    let data: MlSearchResponse
    try {
      const res = await fetch(
        `${this.baseUrl}/sites/${siteId}/search?q=${encodeURIComponent(keyword)}&limit=10`,
      )
      if (!res.ok) {
        this.logger.error(`ML search HTTP ${res.status} for "${keyword}"`)
        return []
      }
      data = (await res.json()) as MlSearchResponse
    } catch (err) {
      this.logger.error(`ML search network error: ${String(err)}`)
      return []
    }

    const affiliateId = this.config.get<string>('ML_AFFILIATE_ID') ?? ''
    return data.results.map((item) => this.MapSearchResultToProduct(item, siteId, affiliateId))
  }

  /**
   * Obtiene un producto de MercadoLibre por su Item ID.
   * Devuelve null si no existe o hay error.
   *
   * @param itemId - ID del producto (ej: MLA1234567890)
   * @param siteId - identificador del site para construir el affiliate URL
   */
  async GetProductById(itemId: string, siteId = 'MLA'): Promise<Product | null> {
    this.logger.log(`Fetching ML product: ${itemId}`)

    let data: MlItemResponse
    try {
      const res = await fetch(`${this.baseUrl}/items/${itemId}`)
      if (!res.ok) {
        this.logger.error(`ML item HTTP ${res.status} for ${itemId}`)
        return null
      }
      data = (await res.json()) as MlItemResponse
    } catch (err) {
      this.logger.error(`ML item network error: ${String(err)}`)
      return null
    }

    const affiliateId = this.config.get<string>('ML_AFFILIATE_ID') ?? ''
    return this.MapItemToProduct(data, siteId, affiliateId)
  }

  /**
   * Construye el affiliate URL de MercadoLibre agregando el tracking ID.
   *
   * Ejemplo:
   *   permalink = "https://www.mercadolibre.com.ar/..."
   *   affiliateId = "mi-affiliate-id"
   *   → "https://www.mercadolibre.com.ar/...?referral=mi-affiliate-id"
   */
  BuildAffiliateUrl(permalink: string, affiliateId: string): string {
    if (!affiliateId) return permalink
    const separator = permalink.includes('?') ? '&' : '?'
    return `${permalink}${separator}referral=${affiliateId}`
  }

  // ─── Helpers privados ──────────────────────────────────────────────────────

  private MapSearchResultToProduct(
    item: MlSearchResult,
    siteId: string,
    affiliateId: string,
  ): Product {
    const now = new Date()
    const affiliateUrl = this.BuildAffiliateUrl(item.permalink, affiliateId)
    const slug = BuildMlSlug(item.title, item.id)

    return {
      id: item.id,
      externalId: item.id,
      affiliateSource: 'mercadolibre',
      name: item.title,
      slug,
      description: '',
      imageUrl: item.thumbnail.replace('I.jpg', 'O.jpg'), // full-size image
      price: item.price,
      currency: item.currency_id,
      affiliateUrl,
      categoryId: '',
      rating: null,
      reviewCount: null,
      available: item.available_quantity > 0,
      createdAt: now,
      updatedAt: now,
      category: undefined as never,
    }
  }

  private MapItemToProduct(item: MlItemResponse, siteId: string, affiliateId: string): Product {
    const now = new Date()
    const affiliateUrl = this.BuildAffiliateUrl(item.permalink, affiliateId)
    const slug = BuildMlSlug(item.title, item.id)
    const imageUrl = item.pictures?.[0]?.url ?? ''

    return {
      id: item.id,
      externalId: item.id,
      affiliateSource: 'mercadolibre',
      name: item.title,
      slug,
      description: '',
      imageUrl,
      price: item.price,
      currency: item.currency_id,
      affiliateUrl,
      categoryId: '',
      rating: null,
      reviewCount: null,
      available: item.status === 'active' && item.available_quantity > 0,
      createdAt: now,
      updatedAt: now,
      category: undefined as never,
    }
  }
}

// ─── Utilidades de módulo ──────────────────────────────────────────────────────

/**
 * Genera un slug SEO-friendly a partir del título y el Item ID de ML.
 * El ID al final garantiza unicidad.
 *
 * Ejemplo:
 *   "Monitor Gamer LG 27" 165Hz" + "MLA1234567890" → "monitor-gamer-lg-27-165hz-mla1234567890"
 */
function BuildMlSlug(title: string, itemId: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)

  return `${base}-${itemId.toLowerCase()}`
}
