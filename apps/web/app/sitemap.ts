import type { MetadataRoute } from 'next'

const CATEGORY_SLUGS = [
  'computacion',
  'celulares-y-smartphones',
  'electrodomesticos',
  'television-audio-y-video',
  'herramientas-y-construccion',
  'deportes-y-fitness',
  'videojuegos-y-consolas',
  'ropa-y-accesorios',
  'hogar-y-muebles',
  'autos-motos-y-otros',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const categoryUrls: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${siteUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categoryUrls,
  ]
}
