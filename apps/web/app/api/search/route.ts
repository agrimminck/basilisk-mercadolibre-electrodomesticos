import { NextRequest, NextResponse } from 'next/server'
import { buildSearchUrl } from '../../../lib/utils/affiliate'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = req.nextUrl
  const q = searchParams.get('q')?.trim()

  if (!q) {
    return NextResponse.json({ error: 'Missing query param: q' }, { status: 400 })
  }

  return NextResponse.json({ data: { url: buildSearchUrl(q) } })
}
