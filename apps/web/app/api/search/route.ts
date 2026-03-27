import { NextRequest, NextResponse } from 'next/server'
import { searchProducts } from '../../../lib/meli/meli-client'
import type { ApiResponse, SearchResult } from '../../../types/index'

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<SearchResult>>> {
  const { searchParams } = req.nextUrl
  const q = searchParams.get('q')?.trim()
  const offset = Number(searchParams.get('offset') ?? '0')
  const limit = Math.min(Number(searchParams.get('limit') ?? '20'), 50)

  if (!q) {
    return NextResponse.json({ data: null as unknown as SearchResult, error: 'Missing query param: q' }, { status: 400 })
  }

  try {
    const data = await searchProducts(q, offset, limit)
    return NextResponse.json({ data })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ data: null as unknown as SearchResult, error: message }, { status: 502 })
  }
}
