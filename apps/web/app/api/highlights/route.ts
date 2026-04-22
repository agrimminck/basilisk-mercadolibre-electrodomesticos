import { NextRequest, NextResponse } from 'next/server'
import { getAccessToken } from '../../../lib/meli/meli-auth'
import { getCategoryBySlug } from '../../../lib/meli/meli-client'

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
  const res = await fetch(
    `https://api.mercadolibre.com/highlights/MLC/category/${resolvedCategoryId}?limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )
  const data = await res.json()
  return NextResponse.json({ resolvedCategoryId, resolvedSlugInfo, highlightsStatus: res.status, data })
}
