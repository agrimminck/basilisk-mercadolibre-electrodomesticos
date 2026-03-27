'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '../../i18n/navigation'
import type { Locale } from '../../i18n/routing'

export function LocaleSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const otherLocale: Locale = locale === 'en' ? 'es' : 'en'

  function HandleSwitch() {
    router.replace(pathname, { locale: otherLocale })
  }

  return (
    <button
      onClick={HandleSwitch}
      className="text-sm font-medium text-[var(--color-muted)] hover:text-white transition-colors border border-[var(--color-border)] rounded px-2 py-0.5"
      aria-label={`Switch to ${otherLocale === 'en' ? 'English' : 'Español'}`}
    >
      {otherLocale.toUpperCase()}
    </button>
  )
}
