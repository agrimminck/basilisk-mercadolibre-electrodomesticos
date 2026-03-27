import type { MetadataRoute } from 'next'
import { api } from '../lib/api'
import { routing } from '../i18n/routing'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    api.products.list().catch(() => []),
    api.categories.list().catch(() => []),
  ])

  const staticRoutes: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    categories.map((category) => ({
      url: `${BASE_URL}/${locale}/categoria/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  )

  const productRoutes: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    products.map((product) => ({
      url: `${BASE_URL}/${locale}/producto/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  )

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}
