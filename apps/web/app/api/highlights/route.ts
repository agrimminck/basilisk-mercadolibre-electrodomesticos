import { NextRequest, NextResponse } from 'next/server'
import { getAccessToken } from '../../../lib/meli/meli-auth'
import { getCategoryBySlug, getProduct } from '../../../lib/meli/meli-client'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  const limit = req.nextUrl.searchParams.get('limit') ?? '8'

  let resolvedCategoryId = req.nextUrl.searchParams.get('category') ?? 'MLC5726'
  let resolvedSlugInfo: unknown = null

  if (slug) {
    try {
      const cat = await getCategoryBySlug(slug)
      resolvedCategoryId = cat.id
      resolvedSlugInfo = { slug: cat.slug, name: cat.name, id: cat.id }
    } catch (err) {
      return NextResponse.json({ error: `slug resolution failed: ${String(err)}` }, { status: 400 })
    }
  }

  const token = await getAccessToken()
  const highlightsRes = await fetch(
    `https://api.mercadolibre.com/highlights/MLC/category/${resolvedCategoryId}?limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )
  const highlightsData = await highlightsRes.json()

  // Test /products/{id} for first highlight ID to see catalog product shape
  const firstId: string = (highlightsData?.content ?? [])[0]?.id ?? ''
  let catalogProduct: unknown = null
  let catalogStatus = 0
  if (firstId) {
    const catRes = await fetch(
      `https://api.mercadolibre.com/products/${firstId}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    )
    catalogStatus = catRes.status
    catalogProduct = await catRes.json()
  }

  return NextResponse.json({
    resolvedCategoryId,
    resolvedSlugInfo,
    highlightsStatus: highlightsRes.status,
    firstHighlightId: firstId,
    catalogProductStatus: catalogStatus,
    catalogProduct,
  })
}
