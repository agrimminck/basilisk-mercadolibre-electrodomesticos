import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import { CategoryEntity } from '../categories/category.entity'
import { ProductEntity } from '../products/product.entity'

dotenv.config()

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [CategoryEntity, ProductEntity],
  synchronize: true,
})

const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG ?? 'gamegear-20'

function AmazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${PARTNER_TAG}`
}

function AmazonImageUrl(asin: string): string {
  return `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SCLZZZZZZZ_.jpg`
}

const CATEGORIES = [
  {
    name: 'Monitors',
    slug: 'monitors',
    description: 'Gaming monitors — refresh rate, resolution, and response time compared.',
  },
  {
    name: 'GPUs',
    slug: 'gpus',
    description: 'Graphics cards for every budget, from 1080p to 4K gaming.',
  },
  {
    name: 'Peripherals',
    slug: 'peripherals',
    description: 'Gaming mice, keyboards, and headsets trusted by competitive players.',
  },
  {
    name: 'Gaming Chairs',
    slug: 'gaming-chairs',
    description: 'Chairs built for long sessions — ergonomics and comfort reviewed.',
  },
]

// ASIN → real Amazon product IDs (US)
const PRODUCTS = [
  // ── Monitors ──────────────────────────────────────────────────────────────
  {
    categorySlug: 'monitors',
    asin: 'B09B3HPQLG',
    name: 'LG 27GP850-B 27" QHD IPS 165Hz',
    slug: 'lg-27gp850-b',
    description:
      'Fast IPS panel with 1ms GtG response time, 165Hz refresh rate, and Nano IPS technology for vivid colors. A top pick for competitive gaming without breaking the bank.',
    price: 279.99,
    rating: 4.6,
    reviewCount: 8420,
  },
  {
    categorySlug: 'monitors',
    asin: 'B08LWZXHXJ',
    name: 'ASUS ROG Swift PG279QM 27" QHD 240Hz',
    slug: 'asus-rog-swift-pg279qm',
    description:
      'WQHD IPS monitor at 240Hz with NVIDIA G-Sync and DisplayHDR 400. Built for high-refresh competitive play with excellent color accuracy.',
    price: 499.99,
    rating: 4.5,
    reviewCount: 3210,
  },
  {
    categorySlug: 'monitors',
    asin: 'B088HH6LW5',
    name: 'Samsung Odyssey G7 32" QHD 240Hz',
    slug: 'samsung-odyssey-g7-32',
    description:
      '1000R curved VA panel at 240Hz with 1ms response time. Exceptional contrast ratio and HDR600 support make this one of the best curved gaming monitors available.',
    price: 449.99,
    rating: 4.4,
    reviewCount: 12800,
  },
  // ── GPUs ──────────────────────────────────────────────────────────────────
  {
    categorySlug: 'gpus',
    asin: 'B0BKYHKFFX',
    name: 'ASUS Dual GeForce RTX 4070 12GB',
    slug: 'asus-dual-rtx-4070',
    description:
      'NVIDIA Ada Lovelace architecture with 12GB GDDR6X. Excellent 1440p performance with DLSS 3 and Frame Generation support. Runs cool and quiet under load.',
    price: 549.99,
    rating: 4.7,
    reviewCount: 5670,
  },
  {
    categorySlug: 'gpus',
    asin: 'B0CJM71P92',
    name: 'XFX Speedster MERC 310 RX 7800 XT 16GB',
    slug: 'xfx-merc310-rx-7800-xt',
    description:
      'AMD RDNA 3 with 16GB GDDR6 — more VRAM than the competition at this price. Dominates at 1440p and holds up well at 4K. No ray-tracing tax.',
    price: 479.99,
    rating: 4.5,
    reviewCount: 2890,
  },
  {
    categorySlug: 'gpus',
    asin: 'B0C7BKBY5Y',
    name: 'MSI Gaming GeForce RTX 4060 Ti 8GB',
    slug: 'msi-gaming-rtx-4060-ti',
    description:
      'The sweet spot for 1080p at max settings and solid 1440p gaming. DLSS 3 and low power draw (160W) make it ideal for mid-range builds.',
    price: 369.99,
    rating: 4.4,
    reviewCount: 4120,
  },
  // ── Peripherals ───────────────────────────────────────────────────────────
  {
    categorySlug: 'peripherals',
    asin: 'B09LMXMK5X',
    name: 'Logitech G Pro X Superlight 2',
    slug: 'logitech-g-pro-x-superlight-2',
    description:
      'Weighs just 60g with the HERO 2 25K sensor. Preferred by pro FPS players worldwide. 95-hour battery life and zero compromises on tracking accuracy.',
    price: 159.99,
    rating: 4.8,
    reviewCount: 9340,
  },
  {
    categorySlug: 'peripherals',
    asin: 'B0B6YSZFKQ',
    name: 'Razer DeathAdder V3 HyperSpeed',
    slug: 'razer-deathadder-v3-hyperspeed',
    description:
      'Ergonomic right-handed shape with Focus Pro 30K optical sensor. The DeathAdder design has been refined over a decade — this is its best version yet.',
    price: 99.99,
    rating: 4.7,
    reviewCount: 6780,
  },
  {
    categorySlug: 'peripherals',
    asin: 'B075HD6S3J',
    name: 'SteelSeries Rival 650 Wireless',
    slug: 'steelseries-rival-650-wireless',
    description:
      'Dual-sensor system for near-zero lift-off distance. Adjustable weight system and customizable RGB. Reliable 24-hour wireless battery with 15-minute quick charge.',
    price: 119.99,
    rating: 4.3,
    reviewCount: 3210,
  },
  // ── Gaming Chairs ─────────────────────────────────────────────────────────
  {
    categorySlug: 'gaming-chairs',
    asin: 'B09BS1NKJT',
    name: 'Secretlab Titan Evo 2022 Series',
    slug: 'secretlab-titan-evo-2022',
    description:
      'Cold-cure foam, magnetic memory foam neck pillow, and 4-way lumbar support. The benchmark for gaming chairs — used by esports organizations globally.',
    price: 429.00,
    rating: 4.6,
    reviewCount: 7120,
  },
  {
    categorySlug: 'gaming-chairs',
    asin: 'B07X9PVPJH',
    name: 'Corsair TC100 RELAXED Gaming Chair',
    slug: 'corsair-tc100-relaxed',
    description:
      'High-density foam with a wider, relaxed fit design. Adjustable lumbar pillow and headrest, 90–165° recline, and a solid steel frame at an accessible price.',
    price: 249.99,
    rating: 4.2,
    reviewCount: 5430,
  },
  {
    categorySlug: 'gaming-chairs',
    asin: 'B00K3PN4DY',
    name: 'DXRacer Formula Series Gaming Chair',
    slug: 'dxracer-formula-series',
    description:
      'The chair that launched the gaming chair category. Bucket seat design, high back support, and adjustable armrests. Fits up to 5\'11" / 200 lbs.',
    price: 329.00,
    rating: 4.1,
    reviewCount: 18900,
  },
]

async function Seed(): Promise<void> {
  await dataSource.initialize()
  console.log('Connected to database')

  const categoryRepo = dataSource.getRepository(CategoryEntity)
  const productRepo = dataSource.getRepository(ProductEntity)

  // Upsert categories
  const categoryMap = new Map<string, string>()
  for (const cat of CATEGORIES) {
    let entity = await categoryRepo.findOne({ where: { slug: cat.slug } })
    if (!entity) {
      entity = categoryRepo.create(cat)
      await categoryRepo.save(entity)
      console.log(`Created category: ${cat.name}`)
    } else {
      console.log(`Skipped existing category: ${cat.name}`)
    }
    categoryMap.set(cat.slug, entity.id)
  }

  // Upsert products
  for (const product of PRODUCTS) {
    const categoryId = categoryMap.get(product.categorySlug)
    if (!categoryId) continue

    const exists = await productRepo.findOne({ where: { asin: product.asin } })
    if (exists) {
      const newImageUrl = AmazonImageUrl(product.asin)
      if (exists.imageUrl !== newImageUrl) {
        exists.imageUrl = newImageUrl
        await productRepo.save(exists)
        console.log(`Updated image for: ${product.name}`)
      } else {
        console.log(`Skipped existing product: ${product.name}`)
      }
      continue
    }

    const entity = productRepo.create({
      asin: product.asin,
      name: product.name,
      slug: product.slug,
      description: product.description,
      imageUrl: AmazonImageUrl(product.asin),
      price: product.price,
      currency: 'USD',
      affiliateUrl: AmazonUrl(product.asin),
      categoryId,
      rating: product.rating,
      reviewCount: product.reviewCount,
      available: true,
    })
    await productRepo.save(entity)
    console.log(`Created product: ${product.name}`)
  }

  console.log('Seed complete')
  await dataSource.destroy()
}

Seed().catch((err: unknown) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
