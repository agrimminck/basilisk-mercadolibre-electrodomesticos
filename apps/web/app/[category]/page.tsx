import { getCategory } from '../../lib/meli/meli-client'
import { buildCategoryUrl } from '../../lib/utils/affiliate'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = await getCategory(category)
  return {
    title: cat.name,
    description: `Explorá los mejores productos de ${cat.name} en MercadoLibre Chile.`,
    openGraph: {
      title: cat.name,
      description: `Explorá los mejores productos de ${cat.name} en MercadoLibre Chile.`,
      url: `/${category}`,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = await getCategory(category)
  const meliUrl = buildCategoryUrl(category)

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col items-center gap-8 text-center">
      <h1 className="text-3xl font-bold text-slate-100">{cat.name}</h1>
      <p className="text-slate-400 max-w-md">
        Explorá todos los productos de {cat.name} directamente en MercadoLibre Chile.
      </p>
      <a
        href={meliUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-3 px-8 rounded-xl text-lg transition-colors"
      >
        Ver productos en MercadoLibre →
      </a>
    </div>
  )
}
