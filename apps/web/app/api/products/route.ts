import { NextRequest, NextResponse } from 'next/server'
import { getProduct } from '../../../lib/meli/meli-client'
import type { ApiResponse, Product } from '../../../types/index'

// GET /api/products?id=MLC123  → detalle de un producto
export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Product>>> {
  const { searchParams } = req.nextUrl
  const id = searchParams.get('id')?.trim()

  if (!id) {
    return NextResponse.json(
      { data: null as unknown as Product, error: 'Provide ?id=' },
      { status: 400 }
    )
  }

  try {
    const data = await getProduct(id)
    return NextResponse.json({ data })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ data: null as unknown as Product, error: message }, { status: 502 })
  }
}
