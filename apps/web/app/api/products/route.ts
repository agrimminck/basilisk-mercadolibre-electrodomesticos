import { NextRequest, NextResponse } from 'next/server'
import { getCategoryProducts, getProduct } from '../../../lib/meli/meli-client'
import type { ApiResponse, Product, SearchResult } from '../../../types/index'

// GET /api/products?id=MLC123         → detalle de un producto
// GET /api/products?category=MLC1234  → productos de una categoría
export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Product | SearchResult>>> {
  const { searchParams } = req.nextUrl
  const id = searchParams.get('id')?.trim()
  const category = searchParams.get('category')?.trim()
  const offset = Number(searchParams.get('offset') ?? '0')
  const limit = Math.min(Number(searchParams.get('limit') ?? '20'), 50)

  if (id) {
    try {
      const data = await getProduct(id)
      return NextResponse.json({ data })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      return NextResponse.json({ data: null as unknown as Product, error: message }, { status: 502 })
    }
  }

  if (category) {
    try {
      const data = await getCategoryProducts(category, offset, limit)
      return NextResponse.json({ data })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      return NextResponse.json({ data: null as unknown as SearchResult, error: message }, { status: 502 })
    }
  }

  return NextResponse.json(
    { data: null as unknown as Product, error: 'Provide either ?id= or ?category=' },
    { status: 400 }
  )
}
