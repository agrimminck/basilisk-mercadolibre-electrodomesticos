import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryEntity } from '../categories/category.entity'
import { ProductEntity } from '../products/product.entity'

const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG ?? 'gamegear0b-20'

function AmazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${PARTNER_TAG}`
}

function AmazonImageUrl(asin: string): string {
  return `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SCLZZZZZZZ_.jpg`
}

const CATEGORIES = [
  { name: 'Monitors', slug: 'monitors', description: 'Gaming monitors — refresh rate, resolution, and response time compared.' },
  { name: 'GPUs', slug: 'gpus', description: 'Graphics cards for every budget, from 1080p to 4K gaming.' },
  { name: 'Peripherals', slug: 'peripherals', description: 'Gaming mice, keyboards, and headsets trusted by competitive players.' },
  { name: 'Gaming Chairs', slug: 'gaming-chairs', description: 'Chairs built for long sessions — ergonomics and comfort reviewed.' },
]

const PRODUCTS = [
  { categorySlug: 'monitors', asin: 'B09B3HPQLG', name: 'LG 27GP850-B 27" QHD IPS 165Hz', slug: 'lg-27gp850-b', description: 'Fast IPS panel with 1ms GtG response time, 165Hz refresh rate, and Nano IPS technology for vivid colors.', price: 279.99, rating: 4.6, reviewCount: 8420 },
  { categorySlug: 'monitors', asin: 'B08LWZXHXJ', name: 'ASUS ROG Swift PG279QM 27" QHD 240Hz', slug: 'asus-rog-swift-pg279qm', description: 'WQHD IPS monitor at 240Hz with NVIDIA G-Sync and DisplayHDR 400.', price: 499.99, rating: 4.5, reviewCount: 3210 },
  { categorySlug: 'monitors', asin: 'B088HH6LW5', name: 'Samsung Odyssey G7 32" QHD 240Hz', slug: 'samsung-odyssey-g7-32', description: '1000R curved VA panel at 240Hz with 1ms response time and HDR600 support.', price: 449.99, rating: 4.4, reviewCount: 12800 },
  { categorySlug: 'gpus', asin: 'B0BKYHKFFX', name: 'ASUS Dual GeForce RTX 4070 12GB', slug: 'asus-dual-rtx-4070', description: 'NVIDIA Ada Lovelace architecture with 12GB GDDR6X. Excellent 1440p performance with DLSS 3.', price: 549.99, rating: 4.7, reviewCount: 5670 },
  { categorySlug: 'gpus', asin: 'B0CJM71P92', name: 'XFX Speedster MERC 310 RX 7800 XT 16GB', slug: 'xfx-merc310-rx-7800-xt', description: 'AMD RDNA 3 with 16GB GDDR6 — more VRAM than the competition at this price.', price: 479.99, rating: 4.5, reviewCount: 2890 },
  { categorySlug: 'gpus', asin: 'B0C7BKBY5Y', name: 'MSI Gaming GeForce RTX 4060 Ti 8GB', slug: 'msi-gaming-rtx-4060-ti', description: 'Sweet spot for 1080p at max settings and solid 1440p gaming with DLSS 3.', price: 369.99, rating: 4.4, reviewCount: 4120 },
  { categorySlug: 'peripherals', asin: 'B09LMXMK5X', name: 'Logitech G Pro X Superlight 2', slug: 'logitech-g-pro-x-superlight-2', description: 'Weighs just 60g with the HERO 2 25K sensor. Preferred by pro FPS players worldwide.', price: 159.99, rating: 4.8, reviewCount: 9340 },
  { categorySlug: 'peripherals', asin: 'B0B6YSZFKQ', name: 'Razer DeathAdder V3 HyperSpeed', slug: 'razer-deathadder-v3-hyperspeed', description: 'Ergonomic right-handed shape with Focus Pro 30K optical sensor.', price: 99.99, rating: 4.7, reviewCount: 6780 },
  { categorySlug: 'peripherals', asin: 'B075HD6S3J', name: 'SteelSeries Rival 650 Wireless', slug: 'steelseries-rival-650-wireless', description: 'Dual-sensor system for near-zero lift-off distance with 24-hour wireless battery.', price: 119.99, rating: 4.3, reviewCount: 3210 },
  { categorySlug: 'gaming-chairs', asin: 'B09BS1NKJT', name: 'Secretlab Titan Evo 2022 Series', slug: 'secretlab-titan-evo-2022', description: 'Cold-cure foam, magnetic memory foam neck pillow, and 4-way lumbar support.', price: 429.00, rating: 4.6, reviewCount: 7120 },
  { categorySlug: 'gaming-chairs', asin: 'B07X9PVPJH', name: 'Corsair TC100 RELAXED Gaming Chair', slug: 'corsair-tc100-relaxed', description: 'High-density foam with a wider, relaxed fit design and 90–165° recline.', price: 249.99, rating: 4.2, reviewCount: 5430 },
  { categorySlug: 'gaming-chairs', asin: 'B00K3PN4DY', name: 'DXRacer Formula Series Gaming Chair', slug: 'dxracer-formula-series', description: 'The chair that launched the gaming chair category with bucket seat design.', price: 329.00, rating: 4.1, reviewCount: 18900 },
]

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name)

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.FixAffiliateUrls()

    const count = await this.categoryRepo.count()
    if (count > 0) return

    this.logger.log('Empty database detected — running seed...')

    const categoryMap = new Map<string, string>()
    for (const cat of CATEGORIES) {
      const entity = this.categoryRepo.create(cat)
      await this.categoryRepo.save(entity)
      categoryMap.set(cat.slug, entity.id)
      this.logger.log(`Created category: ${cat.name}`)
    }

    for (const product of PRODUCTS) {
      const categoryId = categoryMap.get(product.categorySlug)
      if (!categoryId) continue
      const entity = this.productRepo.create({
        ...product,
        imageUrl: AmazonImageUrl(product.asin),
        affiliateUrl: AmazonUrl(product.asin),
        currency: 'USD',
        categoryId,
        available: true,
      })
      await this.productRepo.save(entity)
      this.logger.log(`Created product: ${product.name}`)
    }

    this.logger.log('Seed complete')
  }

  // Fixes affiliateUrl for any products seeded before AMAZON_PARTNER_TAG was set
  private async FixAffiliateUrls(): Promise<void> {
    const products = await this.productRepo.find()
    let fixed = 0
    for (const product of products) {
      const expected = AmazonUrl(product.asin)
      if (product.affiliateUrl !== expected) {
        product.affiliateUrl = expected
        await this.productRepo.save(product)
        fixed++
      }
    }
    if (fixed > 0) {
      this.logger.log(`Fixed affiliateUrl for ${fixed} products (partner tag: ${PARTNER_TAG})`)
    }
  }
}
