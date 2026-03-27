'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '../../i18n/navigation'
import type { Locale } from '../../i18n/routing'

const LOCALES: { value: Locale; label: string }[] = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' },
  { value: 'pt', label: 'PT' },
]

export function LocaleSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  function HandleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    router.replace(pathname, { locale: e.target.value as Locale })
  }

  return (
    <select
      value={locale}
      onChange={HandleChange}
      aria-label="Select language"
      className="text-sm font-medium text-[var(--color-muted)] hover:text-white transition-colors border border-[var(--color-border)] rounded px-2 py-0.5 bg-transparent cursor-pointer"
    >
      {LOCALES.map((l) => (
        <option key={l.value} value={l.value} className="bg-[#111111] text-white">
          {l.label}
        </option>
      ))}
    </select>
  )
}
