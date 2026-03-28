import { getCategoryBySlug, getCategories } from '../../lib/meli/meli-client'
import { buildCategoryUrl } from '../../lib/utils/affiliate'
import { getCategoryDescription } from '../../lib/data/category-descriptions'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((cat) => ({ category: cat.slug }))
}

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = await getCategoryBySlug(category)
  return {
    title: `Ofertas en ${cat.name} — MercadoLibre Chile`,
    description: `Encontrá las mejores ofertas en ${cat.name} en MercadoLibre Chile. Compará precios y comprá con envío a todo el país.`,
    openGraph: {
      title: `Ofertas en ${cat.name} — MercadoLibre Chile`,
      description: `Encontrá las mejores ofertas en ${cat.name} en MercadoLibre Chile.`,
      url: `/${category}`,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = await getCategoryBySlug(category)
  const meliUrl = buildCategoryUrl(cat.slug)
  const desc = getCategoryDescription(cat.slug)

  return (
    <div className="max-w-3xl mx-auto px-4 py-14 space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-100">{cat.name}</h1>
        <p className="text-slate-400 leading-relaxed">{desc.intro}</p>
      </div>

      <div className="bg-zinc-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-semibold text-slate-200">¿Qué vas a encontrar?</h2>
        <ul className="space-y-2">
          {desc.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-slate-400 text-sm">
              <span className="text-amber-400 mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center gap-3 pt-2">
        <a
          href={meliUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-3 px-10 rounded-xl text-lg transition-colors"
        >
          Ver ofertas en MercadoLibre →
        </a>
        <p className="text-xs text-slate-600">Serás redirigido a MercadoLibre Chile</p>
      </div>
    </div>
  )
}
