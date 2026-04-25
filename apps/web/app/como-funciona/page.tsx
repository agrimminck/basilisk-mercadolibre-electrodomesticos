import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cómo funciona — Top Electro Hogar',
  description: 'Entendé cómo funciona Top Electro Hogar y cómo comparamos precios en MercadoLibre Chile.',
  alternates: { canonical: '/como-funciona' },
}

const STEPS = [
  {
    n: '01',
    title: 'Comparamos en tiempo real',
    body: 'Consultamos la API de MercadoLibre Chile cada hora para mostrarte siempre los precios actualizados. No guardamos productos ni precios en nuestra base de datos — todo viene directo de ML.',
  },
  {
    n: '02',
    title: 'Curación editorial',
    body: 'No mostramos todos los productos disponibles, solo los que consideramos más relevantes según precio, vendedor y reputación. El objetivo es ahorrarte tiempo.',
  },
  {
    n: '03',
    title: 'Te llevamos a MercadoLibre',
    body: 'Cuando hacés clic en un producto, te redirigimos directamente a MercadoLibre. La compra, el pago y el despacho ocurren ahí — nosotros no somos la tienda.',
  },
  {
    n: '04',
    title: 'Comisiones de afiliado',
    body: 'Somos parte del programa de afiliados de MercadoLibre. Si comprás a través de nuestros links, recibimos una pequeña comisión sin costo adicional para ti. Esto es lo que financia el sitio.',
  },
]

export default function ComoFuncionaPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-3.5">
        <Link href="/" className="hover:text-teh-ink-soft transition-colors">Inicio</Link>
        {' / '}
        <span className="text-teh-ink-soft dark:text-teh-d-ink-soft">Cómo funciona</span>
      </div>

      <h1 className="font-serif text-[42px] font-normal tracking-tight mb-4 leading-none text-teh-ink dark:text-teh-d-ink">
        Cómo funciona
      </h1>
      <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft mb-14 max-w-[520px]">
        Top Electro Hogar es una guía independiente de electrodomésticos. Así es como operamos.
      </p>

      <div className="space-y-10">
        {STEPS.map(({ n, title, body }) => (
          <div key={n} className="flex gap-8">
            <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider pt-1 shrink-0 w-6">
              {n}
            </div>
            <div>
              <h2 className="font-serif text-[22px] font-normal text-teh-ink dark:text-teh-d-ink mb-2">{title}</h2>
              <p className="text-[14px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
