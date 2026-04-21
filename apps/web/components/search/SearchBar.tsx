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
        className="flex-1 bg-teh-bgalt dark:bg-teh-d-bgalt border border-teh-rule dark:border-teh-d-rule rounded-l-lg px-4 py-2 text-sm text-teh-ink dark:text-teh-d-ink placeholder:text-teh-ink-muted dark:placeholder:text-teh-d-ink-muted focus:outline-none focus:border-teh-accent dark:focus:border-teh-d-accent transition-colors"
      />
      <button
        type="submit"
        className="bg-teh-accent hover:bg-teh-accent/90 dark:bg-teh-d-accent dark:hover:bg-teh-d-accent/90 text-white font-semibold px-4 py-2 rounded-r-lg text-sm transition-colors"
      >
        Buscar
      </button>
    </form>
  )
}
