import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de afiliados — Top Electro Hogar',
  description: 'Conocé nuestra política de afiliados y cómo generamos ingresos a través de MercadoLibre Chile.',
  alternates: { canonical: '/afiliados' },
}

export default function AfiliadosPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-3.5">
        <Link href="/" className="hover:text-teh-ink-soft transition-colors">Inicio</Link>
        {' / '}
        <span className="text-teh-ink-soft dark:text-teh-d-ink-soft">Política de afiliados</span>
      </div>

      <h1 className="font-serif text-[42px] font-normal tracking-tight mb-4 leading-none text-teh-ink dark:text-teh-d-ink">
        Política de afiliados
      </h1>
      <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft mb-12 max-w-[520px]">
        Transparencia sobre cómo funciona nuestro modelo de negocio.
      </p>

      <div className="space-y-8 text-[14px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">
        <div>
          <h2 className="font-serif text-[20px] font-normal text-teh-ink dark:text-teh-d-ink mb-2">Programa de afiliados</h2>
          <p>
            Top Electro Hogar participa en el programa de afiliados de MercadoLibre Chile. Esto significa que cuando un usuario
            hace clic en un enlace de producto y realiza una compra en MercadoLibre, nosotros recibimos una comisión por esa venta.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-[20px] font-normal text-teh-ink dark:text-teh-d-ink mb-2">Sin costo adicional para ti</h2>
          <p>
            Las comisiones son pagadas por MercadoLibre, no por el comprador. El precio que ves en nuestro sitio es el mismo
            que pagarás en MercadoLibre, con o sin pasar por nuestros links.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-[20px] font-normal text-teh-ink dark:text-teh-d-ink mb-2">Independencia editorial</h2>
          <p>
            Las comisiones no influyen en qué productos recomendamos ni en cómo los presentamos. Seleccionamos productos
            basándonos en precio, reputación del vendedor y disponibilidad — no en el monto de comisión.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-[20px] font-normal text-teh-ink dark:text-teh-d-ink mb-2">Identificación de enlaces</h2>
          <p>
            Todos los enlaces que llevan a MercadoLibre son enlaces de afiliado. Los identificamos con el atributo
            {' '}<code className="font-mono text-[12px] bg-teh-bgalt dark:bg-teh-d-bgalt px-1.5 py-0.5">rel="sponsored"</code>{' '}
            en el HTML, en cumplimiento con las directrices de los motores de búsqueda.
          </p>
        </div>
      </div>
    </div>
  )
}
