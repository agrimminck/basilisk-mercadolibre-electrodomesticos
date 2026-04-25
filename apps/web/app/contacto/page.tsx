import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contacto — Top Electro Hogar',
  description: 'Contacta con el equipo de Top Electro Hogar.',
  alternates: { canonical: '/contacto' },
}

export default function ContactoPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-3.5">
        <Link href="/" className="hover:text-teh-ink-soft transition-colors">Inicio</Link>
        {' / '}
        <span className="text-teh-ink-soft dark:text-teh-d-ink-soft">Contacto</span>
      </div>

      <h1 className="font-serif text-[42px] font-normal tracking-tight mb-4 leading-none text-teh-ink dark:text-teh-d-ink">
        Contacto
      </h1>
      <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft mb-12 max-w-[520px]">
        ¿Tenés alguna consulta, sugerencia o encontraste un error? Escribinos.
      </p>

      <div className="space-y-6 text-[14px] text-teh-ink-soft dark:text-teh-d-ink-soft">
        <div className="flex items-start gap-4 p-5 border border-teh-rule dark:border-teh-d-rule">
          <span className="text-teh-accent dark:text-teh-d-accent shrink-0 mt-0.5">→</span>
          <div>
            <div className="font-medium text-teh-ink dark:text-teh-d-ink mb-1">Correo electrónico</div>
            <a
              href="mailto:hola@topelectrohogar.com"
              className="font-mono text-[13px] text-teh-accent dark:text-teh-d-accent hover:opacity-80 transition-opacity"
            >
              hola@topelectrohogar.com
            </a>
          </div>
        </div>

        <p className="text-[13px] text-teh-ink-muted dark:text-teh-d-ink-muted leading-relaxed">
          Para reportar un producto con precio incorrecto o un enlace roto, incluí la URL del producto y una descripción del problema.
          Respondemos dentro de 48 horas hábiles.
        </p>
      </div>
    </div>
  )
}
