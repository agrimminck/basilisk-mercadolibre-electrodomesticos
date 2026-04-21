'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { SearchFilters } from '../../types/index'

type Props = {
  basePath: string
  params: Record<string, string>
  filters: SearchFilters
}

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
] as const

const CONDITION_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'new', label: 'Nuevo' },
  { value: 'used', label: 'Usado' },
] as const

function buildUrl(basePath: string, base: Record<string, string>, overrides: Record<string, string>): string {
  const merged = { ...base, ...overrides, offset: '0' }
  const qs = new URLSearchParams()
  for (const [key, val] of Object.entries(merged)) {
    if (val) qs.set(key, val)
  }
  return `${basePath}?${qs.toString()}`
}

export function FilterPanel({ basePath, params, filters }: Props) {
  const router = useRouter()
  const [priceMin, setPriceMin] = useState(filters.priceMin?.toString() ?? '')
  const [priceMax, setPriceMax] = useState(filters.priceMax?.toString() ?? '')

  function handleSortChange(sort: string) {
    router.push(buildUrl(basePath, params, { sort }))
  }

  function handleConditionChange(condition: string) {
    const next: Record<string, string> = { ...params }
    if (condition) {
      next.condition = condition
    } else {
      delete next.condition
    }
    next.offset = '0'
    const qs = new URLSearchParams()
    for (const [key, val] of Object.entries(next)) {
      if (val) qs.set(key, val)
    }
    router.push(`${basePath}?${qs.toString()}`)
  }

  function handlePriceSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next: Record<string, string> = { ...params }
    if (priceMin) next.price_min = priceMin
    else delete next.price_min
    if (priceMax) next.price_max = priceMax
    else delete next.price_max
    next.offset = '0'
    const qs = new URLSearchParams()
    for (const [key, val] of Object.entries(next)) {
      if (val) qs.set(key, val)
    }
    router.push(`${basePath}?${qs.toString()}`)
  }

  const currentSort = filters.sort ?? 'relevance'
  const currentCondition = filters.condition ?? ''

  return (
    <div className="flex flex-wrap gap-6 items-end bg-teh-surface dark:bg-teh-d-surface border border-teh-rule dark:border-teh-d-rule rounded-xl px-5 py-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-teh-ink-muted dark:text-teh-d-ink-muted uppercase tracking-wider">
          Ordenar por
        </label>
        <select
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="bg-teh-bgalt dark:bg-teh-d-bgalt border border-teh-rule dark:border-teh-d-rule rounded-lg px-3 py-1.5 text-sm text-teh-ink dark:text-teh-d-ink focus:outline-none focus:border-teh-accent dark:focus:border-teh-d-accent transition-colors cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-teh-ink-muted dark:text-teh-d-ink-muted uppercase tracking-wider">
          Condición
        </span>
        <div className="flex gap-1.5">
          {CONDITION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleConditionChange(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentCondition === opt.value
                  ? 'bg-teh-accent dark:bg-teh-d-accent text-white'
                  : 'bg-teh-bgalt dark:bg-teh-d-bgalt text-teh-ink-soft dark:text-teh-d-ink-soft border border-teh-rule dark:border-teh-d-rule hover:border-teh-accent/50 dark:hover:border-teh-d-accent/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handlePriceSubmit} className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-teh-ink-muted dark:text-teh-d-ink-muted uppercase tracking-wider">
          Precio (CLP)
        </span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Mín"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-28 bg-teh-bgalt dark:bg-teh-d-bgalt border border-teh-rule dark:border-teh-d-rule rounded-lg px-3 py-1.5 text-sm text-teh-ink dark:text-teh-d-ink placeholder:text-teh-ink-muted dark:placeholder:text-teh-d-ink-muted focus:outline-none focus:border-teh-accent dark:focus:border-teh-d-accent transition-colors"
          />
          <span className="text-teh-ink-muted dark:text-teh-d-ink-muted text-sm">—</span>
          <input
            type="number"
            min={0}
            placeholder="Máx"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-28 bg-teh-bgalt dark:bg-teh-d-bgalt border border-teh-rule dark:border-teh-d-rule rounded-lg px-3 py-1.5 text-sm text-teh-ink dark:text-teh-d-ink placeholder:text-teh-ink-muted dark:placeholder:text-teh-d-ink-muted focus:outline-none focus:border-teh-accent dark:focus:border-teh-d-accent transition-colors"
          />
          <button
            type="submit"
            className="bg-teh-bgalt dark:bg-teh-d-bgalt hover:bg-teh-tag dark:hover:bg-teh-d-bgalt text-teh-ink-soft dark:text-teh-d-ink-soft border border-teh-rule dark:border-teh-d-rule text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            Aplicar
          </button>
        </div>
      </form>
    </div>
  )
}
