'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

type SearchBarProps = {
  defaultValue?: string
}

export function SearchBar({ defaultValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    router.push(`/buscar?q=${encodeURIComponent(q)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="flex-1 bg-slate-800 border border-slate-700 rounded-l-lg px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
      />
      <button
        type="submit"
        className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold px-4 py-2 rounded-r-lg text-sm transition-colors"
      >
        Buscar
      </button>
    </form>
  )
}
