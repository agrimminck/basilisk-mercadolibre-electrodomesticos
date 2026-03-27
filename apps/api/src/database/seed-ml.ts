/**
 * Seed inicial de productos para el site LATAM (MercadoLibre).
 *
 * IDs de MercadoLibre Chile verificados (marzo 2026).
 * Para actualizar: buscar el producto en mercadolibre.cl y copiar el ID
 * de la URL del producto: /p/MLC[ID] o /MLC-[ID]
 *
 * Uso: npx ts-node -r tsconfig-paths/register src/database/seed-ml.ts
 */
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

const ML_AFFILIATE_ID = process.env.ML_AFFILIATE_ID ?? ''
const ML_DEFAULT_SITE = process.env.ML_DEFAULT_SITE ?? 'MLC'

const SITE_DOMAIN: Record<string, string> = {
  MLA: 'www.mercadolibre.com.ar',
  MLB: 'www.mercadolivre.com.br',
  MLM: 'www.mercadolibre.com.mx',
  MLC: 'www.mercadolibre.cl',
}

function MlUrl(itemId: string, siteId: string): string {
  const domain = SITE_DOMAIN[siteId] ?? SITE_DOMAIN.MLC
  const base = `https://${domain}/p/${itemId}`
  return ML_AFFILIATE_ID ? `${base}?referral=${ML_AFFILIATE_ID}` : base
}

// Imagen genérica de ML CDN usando el item ID como placeholder
function MlImageUrl(itemId: string): string {
  return `https://http2.mlstatic.com/D_NQ_NP_${itemId}-O.webp`
}

const CATEGORIES = [
  { name: 'Monitors', slug: 'monitors', description: 'Gaming monitors — refresh rate, resolution, and response time compared.' },
  { name: 'GPUs', slug: 'gpus', description: 'Graphics cards for every budget, from 1080p to 4K gaming.' },
  { name: 'Peripherals', slug: 'peripherals', description: 'Gaming mice trusted by competitive players.' },
  { name: 'Keyboards', slug: 'keyboards', description: 'Mechanical and optical gaming keyboards for every play style.' },
  { name: 'Headsets', slug: 'headsets', description: 'Gaming headsets with spatial audio, wireless freedom, and pro-grade mics.' },
  { name: 'Gaming Chairs', slug: 'gaming-chairs', description: 'Chairs built for long sessions — ergonomics and comfort reviewed.' },
]

// Productos gaming para LATAM con Item IDs de MercadoLibre Chile
const PRODUCTS = [
  // ── Monitors ──────────────────────────────────────────────────────────────
  {
    categorySlug: 'monitors',
    externalId: 'MLC43957987',
    name: 'Monitor Gamer LG 27" QHD 165Hz IPS',
    slug: 'lg-27-qhd-165hz-ips-mlc',
    description: 'Panel IPS de 27" con resolución QHD y 165Hz de tasa de refresco. 1ms GtG y tecnología Nano IPS para colores vívidos. Ideal para gaming competitivo.',
    price: 289000,
    currency: 'CLP',
    rating: 4.6,
    reviewCount: 380,
  },
  {
    categorySlug: 'monitors',
    externalId: 'MLC966607758',
    name: 'Monitor Samsung Odyssey G5 32" Curvo 144Hz',
    slug: 'samsung-odyssey-g5-32-curvo-mlc',
    description: 'Panel VA curvo 1000R de 32" con resolución QHD y 144Hz. AMD FreeSync Premium y 1ms MPRT. Una pantalla inmersiva para gaming y entretenimiento.',
    price: 229000,
    currency: 'CLP',
    rating: 4.5,
    reviewCount: 520,
  },
  {
    categorySlug: 'monitors',
    externalId: 'MLC1053405766',
    name: 'Monitor AOC 24" FHD 144Hz IPS',
    slug: 'aoc-24-fhd-144hz-ips-mlc',
    description: 'Panel IPS de 24" Full HD con 144Hz y 1ms GtG. Compatible con FreeSync. Opción entry-level para gaming competitivo sin sacrificar fluidez.',
    price: 139000,
    currency: 'CLP',
    rating: 4.4,
    reviewCount: 890,
  },
  // ── GPUs ──────────────────────────────────────────────────────────────────
  {
    categorySlug: 'gpus',
    externalId: 'MLC28671631',
    name: 'Placa de Video Gigabyte RTX 4060 8GB',
    slug: 'gigabyte-rtx-4060-8gb-mlc',
    description: 'Arquitectura NVIDIA Ada Lovelace con 8GB GDDR6. DLSS 3 con Frame Generation para rendimiento excelente en 1080p. TDP de solo 115W.',
    price: 398000,
    currency: 'CLP',
    rating: 4.5,
    reviewCount: 210,
  },
  {
    categorySlug: 'gpus',
    externalId: 'MLC28151835',
    name: 'Placa de Video Gigabyte RX 7700 XT Gaming OC 12GB',
    slug: 'msi-rx-7700-xt-12gb-mlc',
    description: 'AMD RDNA 3 con 12GB GDDR6. Rendimiento sólido en 1080p y bueno en 1440p. FSR 3 compatible para mayor framerate en títulos soportados.',
    price: 379000,
    currency: 'CLP',
    rating: 4.4,
    reviewCount: 145,
  },
  // ── Peripherals (mice) ────────────────────────────────────────────────────
  {
    categorySlug: 'peripherals',
    externalId: 'MLC28566394',
    name: 'Mouse Gamer Logitech G Pro X Superlight 2',
    slug: 'logitech-g-pro-x-superlight-2-mlc',
    description: 'Solo 60g con sensor HERO 2 25K. Elegido por jugadores profesionales de FPS. 95 horas de batería sin compromisos en precisión.',
    price: 149000,
    currency: 'CLP',
    rating: 4.8,
    reviewCount: 430,
  },
  {
    categorySlug: 'peripherals',
    externalId: 'MLC2858868082',
    name: 'Mouse Gamer Razer DeathAdder V3 HyperSpeed',
    slug: 'razer-deathadder-v3-hyperspeed-mlc',
    description: 'Forma ergonómica para diestros con sensor Focus Pro 30K. Diseño refinado durante una década. El DeathAdder en su mejor versión.',
    price: 99000,
    currency: 'CLP',
    rating: 4.7,
    reviewCount: 310,
  },
  {
    categorySlug: 'peripherals',
    externalId: 'MLC1404546103',
    name: 'Mouse Gamer Zowie EC2-C',
    slug: 'zowie-ec2-c-mlc',
    description: 'Sin software, sin RGB, plug-and-play. Sensor 3610, cable paracord y la forma EC ergonómica usada por pros de CS2 y Valorant.',
    price: 49000,
    currency: 'CLP',
    rating: 4.5,
    reviewCount: 270,
  },
  // ── Keyboards ─────────────────────────────────────────────────────────────
  {
    categorySlug: 'keyboards',
    externalId: 'MLC15761142',
    name: 'Teclado Gamer HyperX Alloy Origins Core TKL',
    slug: 'hyperx-alloy-origins-core-tkl-mlc',
    description: 'Switches HyperX Red lineales en estructura de acero. Software NGENUITY para RGB. Uno de los mejores TKL económicos con build quality sólida.',
    price: 69000,
    currency: 'CLP',
    rating: 4.7,
    reviewCount: 560,
  },
  {
    categorySlug: 'keyboards',
    externalId: 'MLC582583056',
    name: 'Teclado Gamer Corsair K70 RGB MK.2',
    slug: 'corsair-k70-rgb-mk2-mlc',
    description: 'Marco de aluminio aeronáutico con switches Cherry MX. RGB por tecla, controles multimedia dedicados y puerto USB pass-through.',
    price: 119000,
    currency: 'CLP',
    rating: 4.5,
    reviewCount: 780,
  },
  // ── Headsets ──────────────────────────────────────────────────────────────
  {
    categorySlug: 'headsets',
    externalId: 'MLC2001372111',
    name: 'Auriculares Gamer HyperX Cloud Alpha Wireless',
    slug: 'hyperx-cloud-alpha-wireless-mlc',
    description: 'El confort Cloud con 300 horas de batería inalámbrica. Drivers de doble cámara que reducen distorsión. Ideal para sesiones largas de gaming.',
    price: 158000,
    currency: 'CLP',
    rating: 4.7,
    reviewCount: 420,
  },
  {
    categorySlug: 'headsets',
    externalId: 'MLC20600435',
    name: 'Auriculares Gamer Logitech G535 Lightspeed',
    slug: 'logitech-g535-lightspeed-mlc',
    description: 'Solo 236g — uno de los headsets inalámbricos más livianos. LIGHTSPEED, 33 horas de batería y micrófono claro. Perfecto para quienes son sensibles al peso.',
    price: 89000,
    currency: 'CLP',
    rating: 4.4,
    reviewCount: 310,
  },
  // ── Gaming Chairs ─────────────────────────────────────────────────────────
  {
    categorySlug: 'gaming-chairs',
    externalId: 'MLC18714196',
    name: 'Silla Gamer Secretlab Titan Evo 2022',
    slug: 'secretlab-titan-evo-2022-mlc',
    description: 'Espuma cold-cure, almohadilla de cuello con imán y soporte lumbar en 4 vías. El estándar de referencia para sillas gamer — usada por organizaciones de esports.',
    price: 599000,
    currency: 'CLP',
    rating: 4.6,
    reviewCount: 250,
  },
  {
    categorySlug: 'gaming-chairs',
    externalId: 'MLC24716072',
    name: 'Silla Gamer DXRacer Formula Series',
    slug: 'dxracer-formula-series-mlc',
    description: 'La silla que inició la categoría. Diseño bucket seat, soporte de espalda alta y apoyabrazos ajustables. Clásico del setup gaming.',
    price: 249000,
    currency: 'CLP',
    rating: 4.2,
    reviewCount: 870,
  },
]

async function SeedMl(): Promise<void> {
  await dataSource.initialize()
  console.log('Connected to database')

  const categoryRepo = dataSource.getRepository(CategoryEntity)
  const productRepo = dataSource.getRepository(ProductEntity)

  // Upsert categories (shared with Amazon site)
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

  // Upsert ML products
  let created = 0
  let skipped = 0
  for (const product of PRODUCTS) {
    const categoryId = categoryMap.get(product.categorySlug)
    if (!categoryId) continue

    const exists = await productRepo.findOne({ where: { externalId: product.externalId } })
    if (exists) {
      console.log(`Skipped existing product: ${product.name}`)
      skipped++
      continue
    }

    const entity = productRepo.create({
      externalId: product.externalId,
      affiliateSource: 'mercadolibre',
      name: product.name,
      slug: product.slug,
      description: product.description,
      imageUrl: MlImageUrl(product.externalId),
      price: product.price,
      currency: product.currency,
      affiliateUrl: MlUrl(product.externalId, ML_DEFAULT_SITE),
      categoryId,
      rating: product.rating,
      reviewCount: product.reviewCount,
      available: true,
    })
    await productRepo.save(entity)
    created++
    console.log(`Created ML product: ${product.name}`)
  }

  console.log(`Seed ML complete — created: ${created}, skipped: ${skipped}`)
  await dataSource.destroy()
}

SeedMl().catch((err: unknown) => {
  console.error('Seed ML failed:', err)
  process.exit(1)
})
