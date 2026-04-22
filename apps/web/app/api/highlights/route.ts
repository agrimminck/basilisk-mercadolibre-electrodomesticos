import { NextRequest, NextResponse } from 'next/server'
import { getAccessToken } from '../../../lib/meli/meli-auth'

export async function GET(req: NextRequest) {
  // Tests /products/{catalogId}/items — bridge catalog → active listings
  // Usage: /api/highlights?catalogId=MLC30395039
  const catalogId = req.nextUrl.searchParams.get('catalogId') ?? 'MLC30395039'
  const token = await getAccessToken()

  const res = await fetch(
    `https://api.mercadolibre.com/products/${catalogId}/items?limit=3`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )
  const data = await res.json()

  // Also test first item directly if present
  const firstItemId: string = data?.results?.[0]?.item_id ?? data?.results?.[0]?.id ?? ''
  let itemTest: unknown = null
  if (firstItemId) {
    const itemRes = await fetch(
      `https://api.mercadolibre.com/items/${firstItemId}?attributes=id,title,price,currency_id,thumbnail,permalink,condition`,
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    )
    itemTest = await itemRes.json()
  }

  return NextResponse.json({ catalogId, productsItemsStatus: res.status, firstItemId, data, itemTest })
}
