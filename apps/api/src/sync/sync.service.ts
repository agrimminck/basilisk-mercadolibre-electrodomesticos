import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AmazonService } from '../amazon/amazon.service'
import { ProductEntity } from '../products/product.entity'
import { CategoryEntity } from '../categories/category.entity'

export interface SyncResult {
  asin: string
  action: 'created' | 'updated' | 'skipped'
  productId: string
  name: string
}

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name)

  constructor(
    private readonly amazonService: AmazonService,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  /**
   * Sincroniza un producto desde Amazon por ASIN.
   * Si ya existe en DB, actualiza precio, imagen y disponibilidad.
   * Si no existe, lo crea en la categoría indicada.
   *
   * @param asin - Amazon Standard Identification Number
   * @param categorySlug - slug de la categoría donde crear el producto si es nuevo
   */
  async SyncByAsin(asin: string, categorySlug: string): Promise<SyncResult> {
    const amazonProduct = await this.amazonService.GetProductByAsin(asin)
    if (!amazonProduct) {
      throw new NotFoundException(`Product with ASIN ${asin} not found on Amazon`)
    }

    const existing = await this.productRepo.findOne({ where: { asin } })

    if (existing) {
      await this.productRepo.update(existing.id, {
        price: amazonProduct.price,
        imageUrl: amazonProduct.imageUrl,
        available: amazonProduct.available,
        rating: amazonProduct.rating,
        reviewCount: amazonProduct.reviewCount,
        affiliateUrl: amazonProduct.affiliateUrl,
      })

      this.logger.log(`Updated product: ${existing.name} (${asin})`)
      return { asin, action: 'updated', productId: existing.id, name: existing.name }
    }

    const category = await this.categoryRepo.findOne({ where: { slug: categorySlug } })
    if (!category) {
      throw new NotFoundException(`Category not found: ${categorySlug}`)
    }

    const created = this.productRepo.create({
      asin,
      name: amazonProduct.name,
      slug: amazonProduct.slug,
      description: amazonProduct.description,
      imageUrl: amazonProduct.imageUrl,
      price: amazonProduct.price,
      currency: amazonProduct.currency,
      affiliateUrl: amazonProduct.affiliateUrl,
      categoryId: category.id,
      rating: amazonProduct.rating,
      reviewCount: amazonProduct.reviewCount,
      available: amazonProduct.available,
    })
    await this.productRepo.save(created)

    this.logger.log(`Created product: ${created.name} (${asin})`)
    return { asin, action: 'created', productId: created.id, name: created.name }
  }

  /**
   * Busca en Amazon por keyword y sincroniza todos los resultados.
   * Útil para poblar una categoría nueva en batch.
   */
  async SyncByKeyword(keyword: string, categorySlug: string, searchIndex = 'Electronics'): Promise<SyncResult[]> {
    const category = await this.categoryRepo.findOne({ where: { slug: categorySlug } })
    if (!category) {
      throw new NotFoundException(`Category not found: ${categorySlug}`)
    }

    const amazonProducts = await this.amazonService.SearchProducts(keyword, searchIndex)
    if (amazonProducts.length === 0) {
      this.logger.warn(`No results from Amazon for keyword: "${keyword}"`)
      return []
    }

    const results: SyncResult[] = []

    for (const amazonProduct of amazonProducts) {
      const existing = await this.productRepo.findOne({ where: { asin: amazonProduct.asin } })

      if (existing) {
        await this.productRepo.update(existing.id, {
          price: amazonProduct.price,
          imageUrl: amazonProduct.imageUrl,
          available: amazonProduct.available,
          rating: amazonProduct.rating,
          reviewCount: amazonProduct.reviewCount,
          affiliateUrl: amazonProduct.affiliateUrl,
        })
        results.push({ asin: amazonProduct.asin, action: 'updated', productId: existing.id, name: existing.name })
        continue
      }

      const created = this.productRepo.create({
        asin: amazonProduct.asin,
        name: amazonProduct.name,
        slug: amazonProduct.slug,
        description: amazonProduct.description,
        imageUrl: amazonProduct.imageUrl,
        price: amazonProduct.price,
        currency: amazonProduct.currency,
        affiliateUrl: amazonProduct.affiliateUrl,
        categoryId: category.id,
        rating: amazonProduct.rating,
        reviewCount: amazonProduct.reviewCount,
        available: amazonProduct.available,
      })

      try {
        await this.productRepo.save(created)
        results.push({ asin: amazonProduct.asin, action: 'created', productId: created.id, name: created.name })
      } catch {
        // slug duplicado — el producto ya existe con otro ASIN idéntico, ignorar
        this.logger.warn(`Skipped duplicate slug for ASIN ${amazonProduct.asin}`)
        results.push({ asin: amazonProduct.asin, action: 'skipped', productId: '', name: amazonProduct.name })
      }
    }

    return results
  }
}
