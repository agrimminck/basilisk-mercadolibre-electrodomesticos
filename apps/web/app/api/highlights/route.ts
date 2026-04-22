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

  // Test getProduct for first 3 highlight IDs to diagnose if /items/{id} fails
  const testIds: string[] = (highlightsData?.content ?? []).slice(0, 3).map((c: { id: string }) => c.id)
  const productTests = await Promise.allSettled(testIds.map((id) => getProduct(id)))
  const productResults = productTests.map((r, i) =>
    r.status === 'fulfilled'
      ? { id: testIds[i], ok: true, title: r.value.title, price: r.value.price }
      : { id: testIds[i], ok: false, error: String((r as PromiseRejectedResult).reason) }
  )

  return NextResponse.json({
    resolvedCategoryId,
    resolvedSlugInfo,
    highlightsStatus: highlightsRes.status,
    highlightsCount: testIds.length,
    productTests: productResults,
  })
}
