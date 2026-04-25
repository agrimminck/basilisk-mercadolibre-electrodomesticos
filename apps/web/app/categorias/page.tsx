import { getCategories, VIRTUAL_CATEGORY_IDS } from '../../lib/meli/meli-client'
import { ProductPlaceholder } from '../../components/ui/ProductPlaceholder'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Categorías — Top Electro Hogar',
  description: 'Exploré todas las categorías de electrodomésticos disponibles en MercadoLibre Chile.',
  alternates: { canonical: '/categorias' },
}

const CATEGORY_ICONS: Record<string, number> = {
  'electrodomesticos': 0,
  'lavadoras': 1,
  'electronica-audio-y-video': 2,
  'refrigeradores': 3,
  'computacion': 6,
  'celulares-y-telefonia': 7,
}

const SECTION_TONES = ['#ede4d4', '#e6dccd', '#e4dcc8', '#ecdfcc', '#efe5d3', '#eaddd0', '#e8dbc6', '#ecdfd2']

export default async function CategoriasPage() {
  const categories = await getCategories()

  const virtual = Object.keys(VIRTUAL_CATEGORY_IDS).map((slug, i) => ({
    id: VIRTUAL_CATEGORY_IDS[slug],
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    slug,
    totalItems: undefined,
    thumbnail: undefined,
    isVirtual: true,
    virtualIndex: i,
  }))

  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-8 border-b border-teh-rule dark:border-teh-d-rule">
        <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-3.5">
          <Link href="/" className="hover:text-teh-ink-soft dark:hover:text-teh-d-ink-soft transition-colors">
            Inicio
          </Link>
          {' / '}
          <span className="text-teh-ink-soft dark:text-teh-d-ink-soft">Categorías</span>
        </div>
        <h1 className="font-serif text-[48px] lg:text-[56px] font-normal tracking-tight mb-3 leading-none text-teh-ink dark:text-teh-d-ink">
          Todas las categorías
        </h1>
        <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft max-w-[540px]">
          Explorá el catálogo completo de electrodomésticos disponibles en MercadoLibre Chile.
        </p>
      </section>

      {virtual.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pt-10 pb-6">
          <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-5 uppercase">
            Destacadas
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {virtual.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="relative block p-5 pt-7 bg-teh-bg dark:bg-teh-d-surface border border-teh-rule-soft dark:border-teh-d-rule-soft min-h-[180px] hover:border-teh-accent/40 dark:hover:border-teh-d-accent/40 transition-colors group"
              >
                <div className="h-[80px] mb-4 flex items-center justify-center">
                  <div className="w-4/5 h-full bg-teh-bgalt dark:bg-teh-d-bgalt">
                    <ProductPlaceholder seed={CATEGORY_ICONS[cat.slug] ?? i} tone={SECTION_TONES[i % SECTION_TONES.length]} />
                  </div>
                </div>
                <div className="text-[14px] font-medium text-teh-ink dark:text-teh-d-ink group-hover:text-teh-accent dark:group-hover:text-teh-d-accent transition-colors">
                  {cat.name}
                </div>
                <div className="absolute top-4 right-4 font-mono text-[10px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider">
                  0{i + 1}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-5 uppercase">
          Todas
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="relative block p-5 pt-7 bg-teh-bg dark:bg-teh-d-surface border border-teh-rule-soft dark:border-teh-d-rule-soft min-h-[160px] hover:border-teh-accent/40 dark:hover:border-teh-d-accent/40 transition-colors group"
            >
              <div className="h-[70px] mb-4 flex items-center justify-center">
                <div className="w-4/5 h-full bg-teh-bgalt dark:bg-teh-d-bgalt">
                  <ProductPlaceholder seed={CATEGORY_ICONS[cat.slug] ?? i} tone={SECTION_TONES[i % SECTION_TONES.length]} />
                </div>
              </div>
              <div className="text-[14px] font-medium text-teh-ink dark:text-teh-d-ink group-hover:text-teh-accent dark:group-hover:text-teh-d-accent transition-colors">
                {cat.name}
              </div>
              {cat.totalItems != null && (
                <div className="text-[11px] font-mono text-teh-ink-muted dark:text-teh-d-ink-muted mt-1">
                  {cat.totalItems.toLocaleString('es-CL')} productos
                </div>
              )}
              <div className="absolute top-4 right-4 font-mono text-[10px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider">
                {String(i + 1).padStart(2, '0')}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
