import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const BRAZIL_COUNTRIES = new Set(['BR'])
const SPANISH_COUNTRIES = new Set([
  'AR', 'MX', 'CL', 'CO', 'PE', 'UY', 'BO', 'PY',
  'EC', 'VE', 'GT', 'HN', 'SV', 'NI', 'CR', 'PA',
  'CU', 'DO', 'PR',
])

function GetLocaleFromCountry(country: string | null): 'es' | 'en' | 'pt' {
  if (!country) return 'es'
  if (BRAZIL_COUNTRIES.has(country)) return 'pt'
  if (SPANISH_COUNTRIES.has(country)) return 'es'
  return 'en'
}

const handleI18nRouting = createMiddleware(routing)

export default function middleware(request: NextRequest): NextResponse {
  const pathname = request.nextUrl.pathname
  const hasLocalePrefix = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (hasLocalePrefix) {
    return handleI18nRouting(request)
  }

  // Sin locale en la URL: prioridad cookie > geo IP > fallback 'es'
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as 'es' | 'en' | 'pt' | undefined
  const country =
    request.headers.get('x-vercel-ip-country') ??
    request.headers.get('cf-ipcountry')

  const locale = cookieLocale ?? GetLocaleFromCountry(country)

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
