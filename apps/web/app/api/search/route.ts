import { NextRequest, NextResponse } from 'next/server'
import { buildSearchUrl } from '../../../lib/utils/affiliate'
import type { ApiResponse } from '../../../lib/types/api-response'

type SearchPayload = { url: string }

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<SearchPayload>>> {
  const { searchParams } = req.nextUrl
  const q = searchParams.get('q')?.trim()

  if (!q) {
    return NextResponse.json<ApiResponse<SearchPayload>>(
      { ok: false, error: 'Missing query param: q', statusCode: 400 },
      { status: 400 }
    )
  }

  return NextResponse.json<ApiResponse<SearchPayload>>({
    ok: true,
    data: { url: buildSearchUrl(q) },
  })
}
