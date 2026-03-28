import { redirect } from 'next/navigation'
import { buildSearchUrl } from '../../lib/utils/affiliate'
import { SearchBar } from '../../components/search/SearchBar'
import type { Metadata } from 'next'

type Props = {
  searchParams: Promise<Record<string, string>>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams
  return { title: sp.q ? `"${sp.q}" — Búsqueda` : 'Búsqueda' }
}

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams
  const query = sp.q?.trim() ?? ''

  if (!query) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col items-center gap-6">
        <p className="text-slate-400">¿Qué estás buscando?</p>
        <SearchBar />
      </div>
    )
  }

  redirect(buildSearchUrl(query))
}
