import Link from 'next/link'

const FOOTER_COLS = [
  {
    title: 'Categorías',
    links: [
      { href: '/electrodomesticos-y-aire-acondicionado', label: 'Electrodomésticos' },
      { href: '/television-audio-y-video', label: 'Televisores' },
      { href: '/computacion', label: 'Computación' },
      { href: '/celulares-y-telefonia', label: 'Celulares' },
    ],
  },
  {
    title: 'Guías',
    links: [
      { href: '/refrigeradores', label: 'Elegir refrigerador' },
      { href: '/lavadoras', label: 'Elegir lavadora' },
      { href: '/television-audio-y-video', label: 'Elegir TV' },
      { href: '/', label: 'Ver todas' },
    ],
  },
  {
    title: 'Sobre nosotros',
    links: [
      { href: '/', label: 'Cómo funciona' },
      { href: '/', label: 'Política de afiliados' },
      { href: '/', label: 'Contacto' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="mt-16 border-t border-teh-rule dark:border-teh-d-rule">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">
          {/* Brand column */}
          <div>
            <div className="font-brand font-bold text-[20px] tracking-tight text-teh-ink dark:text-teh-d-ink mb-3">
              Top Electro <span className="text-teh-accent dark:text-teh-d-accent">Hogar</span>
            </div>
            <p className="text-[13px] text-teh-ink-soft dark:text-teh-d-ink-soft leading-relaxed max-w-xs">
              Guía independiente de electrodomésticos en Chile. Los enlaces a MercadoLibre
              generan una pequeña comisión — no afecta el precio que pagas ni lo que recomendamos.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div className="text-[11px] tracking-wider uppercase text-teh-ink-muted dark:text-teh-d-ink-muted mb-4 font-semibold">
                {col.title}
              </div>
              <div className="flex flex-col gap-2 text-[13px] text-teh-ink-soft dark:text-teh-d-ink-soft">
                {col.links.map(({ href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    className="hover:text-teh-ink dark:hover:text-teh-d-ink transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-teh-rule dark:border-teh-d-rule pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wide">
          <span>© {new Date().getFullYear()} Top Electro Hogar · Santiago, Chile</span>
          <span className="opacity-85">Made by Basilisk</span>
          <span>Sitio de afiliados de MercadoLibre Chile</span>
        </div>
      </div>
    </footer>
  )
}
