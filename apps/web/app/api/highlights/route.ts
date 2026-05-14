import { NextRequest, NextResponse } from 'next/server'
import { getCategoryBySlug, getHighlights } from '../../../lib/meli/meli-client'
import type { ApiResponse } from '../../../lib/types/api-response'
import type { Product } from '../../../types/index'

type HighlightsPayload = {
  categoryId: string
  slugInfo: { slug: string; name: string; id: string } | null
  count: number
  products: Product[]
}

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<HighlightsPayload>>> {
  const slug = req.nextUrl.searchParams.get('slug')
  const limit = parseInt(req.nextUrl.searchParams.get('limit') ?? '8', 10)

  let categoryId = req.nextUrl.searchParams.get('category') ?? 'MLC5726'
  let slugInfo: HighlightsPayload['slugInfo'] = null

  if (slug) {
    try {
      const cat = await getCategoryBySlug(slug)
      categoryId = cat.id
      slugInfo = { slug: cat.slug, name: cat.name, id: cat.id }
    } catch (err) {
      return NextResponse.json<ApiResponse<HighlightsPayload>>(
        { ok: false, error: `slug resolution failed: ${String(err)}`, statusCode: 400 },
        { status: 400 }
      )
    }
  }

  const products = await getHighlights(categoryId, limit)
  return NextResponse.json<ApiResponse<HighlightsPayload>>({
    ok: true,
    data: { categoryId, slugInfo, count: products.length, products },
  })
}
