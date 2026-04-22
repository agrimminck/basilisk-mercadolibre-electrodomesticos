import { NextRequest, NextResponse } from 'next/server'
import { getCategoryBySlug, getHighlights } from '../../../lib/meli/meli-client'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  const limit = parseInt(req.nextUrl.searchParams.get('limit') ?? '8', 10)

  let categoryId = req.nextUrl.searchParams.get('category') ?? 'MLC5726'
  let slugInfo: unknown = null

  if (slug) {
    try {
      const cat = await getCategoryBySlug(slug)
      categoryId = cat.id
      slugInfo = { slug: cat.slug, name: cat.name, id: cat.id }
    } catch (err) {
      return NextResponse.json({ error: `slug resolution failed: ${String(err)}` }, { status: 400 })
    }
  }

  const products = await getHighlights(categoryId, limit)
  return NextResponse.json({ categoryId, slugInfo, count: products.length, products })
}
