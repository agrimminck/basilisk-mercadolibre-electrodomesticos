import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cómo elegir un refrigerador — Guía honesta 2026',
  description:
    'Tamaño, capacidad, eficiencia energética, ruido y acabados. Una guía corta y directa para elegir el refrigerador correcto en Chile, sin tecnicismos innecesarios.',
  alternates: { canonical: '/guia/como-elegir-refrigerador' },
  openGraph: {
    title: 'Cómo elegir un refrigerador que no te canses de ver',
    description:
      'Guía práctica para familias chilenas: qué mirar antes de comprar un refrigerador en MercadoLibre.',
    url: '/guia/como-elegir-refrigerador',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Cómo elegir un refrigerador que no te canses de ver',
  description:
    'Guía práctica sobre tamaño, capacidad, eficiencia energética, ruido y acabados para elegir refrigerador en Chile.',
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/guia/como-elegir-refrigerador`,
  inLanguage: 'es-CL',
  publisher: {
    '@type': 'Organization',
    name: 'Top Electro Hogar',
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-3">
      {n} · {label}
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-teh-accent dark:border-teh-d-accent pl-4 my-5 text-[14px] text-teh-ink-soft dark:text-teh-d-ink-soft italic">
      {children}
    </div>
  )
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline gap-4 py-2.5 border-b border-teh-rule dark:border-teh-d-rule last:border-0">
      <span className="text-[14px] text-teh-ink-soft dark:text-teh-d-ink-soft">{label}</span>
      <span className="text-[14px] font-medium text-teh-ink dark:text-teh-d-ink tabular-nums">{value}</span>
    </div>
  )
}

function GuideImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8 -mx-2 sm:mx-0">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-[12px] text-teh-ink-muted dark:text-teh-d-ink-muted font-mono tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default function GuiaRefrigerador() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative w-full h-[320px] lg:h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1610733374054-59454fe657cd?w=1600&q=85&auto=format&fit=crop"
          alt="Cocina moderna con refrigerador de acero inoxidable"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teh-bg/80 dark:from-teh-d-bg/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-6 pb-8">
          <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-3">
            guía · electrodomésticos
          </div>
          <h1 className="font-serif text-[32px] lg:text-[44px] font-normal leading-[1.05] tracking-tight text-teh-ink dark:text-teh-d-ink">
            Cómo elegir un refrigerador<br />
            <em className="text-teh-accent dark:text-teh-d-accent">que no te canses de ver.</em>
          </h1>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 py-14 space-y-16">

        {/* Intro */}
        <p className="text-[17px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft max-w-xl">
          Un refrigerador dura 10-15 años. Es el electrodoméstico que más ves, más usas y
          más paga en electricidad. Esta guía te dice lo que importa y lo que puedes ignorar.
        </p>

        {/* 1. Medidas */}
        <section>
          <SectionLabel n="01" label="espacio" />
          <h2 className="font-serif text-[26px] font-normal leading-tight mb-5 text-teh-ink dark:text-teh-d-ink">
            Primero, mide el espacio.
          </h2>
          <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft mb-5">
            Parece obvio pero el 30% de las devoluciones en ML son por esto. Mide el hueco
            disponible y réstale margen de ventilación:{' '}
            <strong className="text-teh-ink dark:text-teh-d-ink">5 cm a cada lado</strong> y{' '}
            <strong className="text-teh-ink dark:text-teh-d-ink">10 cm arriba</strong>. Sin ventilación el compresor
            trabaja más y la vida útil cae a la mitad.
          </p>
          <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft mb-5">
            También mide el pasillo de acceso antes de llegar al hueco — hay departamentos
            donde el refrigerador entra por centímetros. Y si es french door o side-by-side,
            verifica que las puertas abran con libertad frente a la isla o la pared opuesta.
          </p>
          <Tip>
            Pon cinta adhesiva en el piso marcando el largo y el ancho exacto antes de
            confirmar la compra. Ahorra mucho dolor de cabeza.
          </Tip>
        </section>

        {/* 2. Capacidad */}
        <section>
          <SectionLabel n="02" label="capacidad" />
          <h2 className="font-serif text-[26px] font-normal leading-tight mb-5 text-teh-ink dark:text-teh-d-ink">
            Cuántos litros realmente necesitas.
          </h2>
          <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft mb-6">
            La regla es simple. No la redondees hacia arriba: un refrigerador grande en
            familia pequeña gasta más electricidad sin beneficio.
          </p>
          <div className="bg-teh-surface dark:bg-teh-d-surface rounded-sm px-5 py-1 mb-5">
            <DataRow label="1–2 personas" value="200–280 L" />
            <DataRow label="3–4 personas" value="300–380 L" />
            <DataRow label="5+ personas" value="400 L+" />
          </div>
          <Tip>
            Si cocinas en cantidad y freezas preparaciones, suma 50–80 L extra al rango de tu familia.
          </Tip>
          <GuideImage
            src="https://images.unsplash.com/photo-1643494847705-74808059bf07?w=1200&q=85&auto=format&fit=crop"
            alt="Refrigerador bien organizado con frutas, verduras y alimentos frescos"
            caption="Un frigo bien dimensionado para la familia: todo visible, nada aplastado."
          />
        </section>

        {/* 3. Tipo */}
        <section>
          <SectionLabel n="03" label="tipo" />
          <h2 className="font-serif text-[26px] font-normal leading-tight mb-5 text-teh-ink dark:text-teh-d-ink">
            Qué tipo de refrigerador elegir.
          </h2>
          <div className="space-y-5">
            <div>
              <p className="text-[15px] font-medium text-teh-ink dark:text-teh-d-ink mb-1">No-frost</p>
              <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">
                Nunca descongelar. Más caro de compra y algo más de consumo, pero cero
                mantención. Para familias con poco tiempo libre.
              </p>
            </div>
            <div>
              <p className="text-[15px] font-medium text-teh-ink dark:text-teh-d-ink mb-1">Frío directo (cycle defrost)</p>
              <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">
                Más eficiente y barato. Hay que descongelar el freezer cada 3–6 meses.
                Si no te molesta ese rato de trabajo cada par de meses, es mejor opción económica.
              </p>
            </div>
            <div>
              <p className="text-[15px] font-medium text-teh-ink dark:text-teh-d-ink mb-1">Bottom freezer</p>
              <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">
                El freezer va abajo. Lo que más usas (frío) queda a la altura de los ojos.
                Ergonómicamente es la configuración más inteligente para el día a día.
              </p>
            </div>
            <div>
              <p className="text-[15px] font-medium text-teh-ink dark:text-teh-d-ink mb-1">French door / Side-by-side</p>
              <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">
                Opción premium. Mucha capacidad y presencia visual, pero requieren cocinas
                amplias. Si el ancho disponible es menor a 85 cm, descártalos.
              </p>
            </div>
          </div>
          <GuideImage
            src="https://images.unsplash.com/photo-1630459065645-549fe5a56db4?w=1200&q=85&auto=format&fit=crop"
            alt="Refrigerador top-mount negro con dispensador de agua integrado"
            caption="Top-mount clásico: freezer arriba, frío abajo. Simple y confiable."
          />
        </section>

        {/* 4. Eficiencia */}
        <section>
          <SectionLabel n="04" label="eficiencia energética" />
          <h2 className="font-serif text-[26px] font-normal leading-tight mb-5 text-teh-ink dark:text-teh-d-ink">
            La diferencia en la cuenta de luz.
          </h2>
          <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft mb-5">
            En Chile la etiqueta energética va de{' '}
            <strong className="text-teh-ink dark:text-teh-d-ink">G (peor) a A (mejor)</strong>. Un refrigerador
            clase A++ versus uno clase D puede significar{' '}
            <strong className="text-teh-ink dark:text-teh-d-ink">$30.000–60.000 CLP menos por año</strong> en
            electricidad. En 3–4 años recuperas la diferencia de precio.
          </p>
          <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft mb-5">
            Lo que realmente importa es el{' '}
            <strong className="text-teh-ink dark:text-teh-d-ink">consumo en kWh/año</strong> que aparece en la
            ficha técnica — no solo la letra. Dos modelos clase A pueden diferir en 80 kWh anuales.
          </p>
          <Tip>
            Multiplica los kWh/año por el precio del kWh en tu región ($130–160 CLP en 2026)
            para calcular el costo exacto de electricidad.
          </Tip>
        </section>

        {/* 5. Ruido */}
        <section>
          <SectionLabel n="05" label="ruido" />
          <h2 className="font-serif text-[26px] font-normal leading-tight mb-5 text-teh-ink dark:text-teh-d-ink">
            Lo que nadie menciona hasta que ya es tarde.
          </h2>
          <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft mb-6">
            Si la cocina está integrada al living o cerca de un dormitorio, el ruido importa.
            La ficha técnica siempre incluye el nivel en dB.
          </p>
          <div className="bg-teh-surface dark:bg-teh-d-surface rounded-sm px-5 py-1 mb-5">
            <DataRow label="Menos de 38 dB" value="Casi imperceptible" />
            <DataRow label="38–42 dB" value="Normal — solo en silencio absoluto" />
            <DataRow label="Más de 45 dB" value="Evitar en espacios integrados" />
          </div>
          <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">
            Los no-frost tienden a ser algo más ruidosos que el frío directo por el ventilador
            interno. Si el ruido es crítico, búscalo explícitamente en las especificaciones.
          </p>
        </section>

        {/* 6. Acabados */}
        <section>
          <SectionLabel n="06" label="diseño y acabados" />
          <h2 className="font-serif text-[26px] font-normal leading-tight mb-5 text-teh-ink dark:text-teh-d-ink">
            El que no te vas a cansar de ver.
          </h2>
          <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft mb-6">
            El refrigerador va a estar en tu cocina 12 años. Elige un acabado que resista
            rediseños y cambios de gusto.
          </p>
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-[15px] font-medium text-teh-ink dark:text-teh-d-ink mb-1">Inoxidable real</p>
              <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">
                Dura mucho, combina con todo. Muestra huellas constantemente — requiere paño
                especial y limpieza regular si te importa el aspecto.
              </p>
            </div>
            <div>
              <p className="text-[15px] font-medium text-teh-ink dark:text-teh-d-ink mb-1">Inox look (pintado)</p>
              <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">
                Más barato que el real, muestra menos huellas. Buen compromiso si no quieres
                gastar en inox premium.
              </p>
            </div>
            <div>
              <p className="text-[15px] font-medium text-teh-ink dark:text-teh-d-ink mb-1">Blanco</p>
              <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">
                Clásico, fácil de limpiar, nunca pasa de moda. La opción más segura si no
                sabes qué cocina vas a tener en 5 años.
              </p>
            </div>
            <div>
              <p className="text-[15px] font-medium text-teh-ink dark:text-teh-d-ink mb-1">Negro / grafito</p>
              <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">
                Moderno y con presencia. Muestra el polvo en la parte superior. Funciona bien
                en cocinas oscuras o de diseño industrial.
              </p>
            </div>
          </div>
          <GuideImage
            src="https://images.unsplash.com/photo-1771003936708-bfeb23b5d082?w=1200&q=85&auto=format&fit=crop"
            alt="Cocina blanca con refrigerador inoxidable y luz natural"
            caption="Inox en cocina blanca: elegante, pero las huellas son parte del trato."
          />
        </section>

        {/* 7. Marcas */}
        <section>
          <SectionLabel n="07" label="marcas" />
          <h2 className="font-serif text-[26px] font-normal leading-tight mb-5 text-teh-ink dark:text-teh-d-ink">
            Marcas disponibles en Chile — sin publicidad.
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-[15px] font-medium text-teh-ink dark:text-teh-d-ink mb-1">Samsung · LG</p>
              <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">
                Gama premium con buena disponibilidad de repuestos y servicio técnico en Chile.
                Precios más altos pero mayor tranquilidad post-venta.
              </p>
            </div>
            <div>
              <p className="text-[15px] font-medium text-teh-ink dark:text-teh-d-ink mb-1">Mabe · Fensa</p>
              <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">
                Marcas regionales con red de servicio técnico amplia en todo Chile. Mejor
                precio que las coreanas para prestaciones similares. Buena opción para regiones.
              </p>
            </div>
            <div>
              <p className="text-[15px] font-medium text-teh-ink dark:text-teh-d-ink mb-1">Midea · Hisense</p>
              <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft">
                Relación precio-calidad sólida para presupuesto ajustado. Verificar que el
                modelo tenga representación oficial en Chile antes de comprar.
              </p>
            </div>
          </div>
          <Tip>
            Evita marcas sin representante oficial en Chile — ante una falla, la garantía
            puede ser papel mojado y los repuestos no existen en el país.
          </Tip>
        </section>

        {/* CTA */}
        <section className="border-t border-teh-rule dark:border-teh-d-rule pt-12">
          <p className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-4">
            ya tienes el criterio
          </p>
          <h2 className="font-serif text-[28px] font-normal leading-tight mb-5 text-teh-ink dark:text-teh-d-ink">
            Ve a buscar el tuyo.
          </h2>
          <p className="text-[15px] leading-relaxed text-teh-ink-soft dark:text-teh-d-ink-soft mb-7 max-w-md">
            Todos los refrigeradores listados van con link directo a MercadoLibre Chile —
            precio real, sin sorpresas.
          </p>
          <Link
            href="/refrigeradores"
            className="inline-block bg-teh-accent dark:bg-teh-d-accent text-white px-7 py-3 text-[14px] font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            Ver refrigeradores — mejor precio →
          </Link>
        </section>

      </div>
    </>
  )
}
