import { NextResponse } from 'next/server'
import { getCategories } from '../../../lib/meli/meli-client'
import type { ApiResponse, Category } from '../../../types/index'

export async function GET(): Promise<NextResponse<ApiResponse<Category[]>>> {
  try {
    const data = await getCategories()
    return NextResponse.json({ data }, { headers: { 'Cache-Control': 'public, s-maxage=3600' } })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ data: [], error: message }, { status: 502 })
  }
}
