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

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://web-ten-beige-23.vercel.app'
  const lastmod = new Date().toISOString()

  const urls = [
    { loc: `${siteUrl}/`, priority: '1.0' },
    ...CATEGORY_SLUGS.map((slug) => ({ loc: `${siteUrl}/${slug}`, priority: '0.8' })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
