'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from '../../i18n/navigation'
import { type FormEvent, useState } from 'react'

export function SearchForm() {
  const t = useTranslations('nav')
  const router = useRouter()
  const [query, setQuery] = useState<string>('')

  function HandleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/buscar?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <form onSubmit={HandleSubmit} role="search" className="flex items-center gap-2">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchLabel')}
        className="w-48 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
      />
    </form>
  )
}
