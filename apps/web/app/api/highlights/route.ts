import { NextRequest, NextResponse } from 'next/server'
import { getAccessToken } from '../../../lib/meli/meli-auth'

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category') ?? 'MLC5726'
  const limit = req.nextUrl.searchParams.get('limit') ?? '8'
  const token = await getAccessToken()
  const res = await fetch(
    `https://api.mercadolibre.com/highlights/MLC/category/${category}?limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 300 } }
  )
  const data = await res.json()
  return NextResponse.json({ status: res.status, data })
}
