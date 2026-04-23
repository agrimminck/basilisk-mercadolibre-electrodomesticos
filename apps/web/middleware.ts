import { NextResponse } from 'next/server'

export function middleware() {
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
