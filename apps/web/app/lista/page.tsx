'use client'

import { useWishlist } from '../../components/ui/WishlistContext'
import { buildProductUrlClient } from '../../lib/utils/affiliate-client'
import Link from 'next/link'

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

export default function ListaPage() {
  const { items, removeItem, clearAll } = useWishlist()

  function openAll() {
    items.forEach(item => {
      window.open(buildProductUrlClient(item.permalink), '_blank', 'noopener')
    })
  }

  function shareWhatsApp() {
    const lines = items.map(item =>
      `• ${item.title} — ${formatPrice(item.price, item.currency)}\n  ${buildProductUrlClient(item.permalink)}`
    ).join('\n\n')
    const msg = `Mi lista de electrodomésticos en Top Electro Hogar:\n\n${lines}\n\n🔗 topelectrohogar.com`
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="text-teh-ink-muted dark:text-teh-d-ink-muted mb-6">
          <HeartIcon />
        </div>
        <h1 className="font-serif text-[28px] font-normal text-teh-ink dark:text-teh-d-ink mb-4">
          Tu lista está vacía.
        </h1>
        <p className="text-[15px] text-teh-ink-soft dark:text-teh-d-ink-soft mb-8">
          Guarda productos tocando el corazón en cualquier tarjeta.
        </p>
        <Link
          href="/"
          className="inline-block text-[13px] font-medium border-b border-teh-accent dark:border-teh-d-accent pb-0.5 text-teh-ink dark:text-teh-d-ink hover:text-teh-accent dark:hover:text-teh-d-accent transition-colors"
        >
          Explorar catálogo →
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-8 pb-6 border-b border-teh-rule dark:border-teh-d-rule">
        <div>
          <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-2">
            mi lista
          </div>
          <h1 className="font-serif text-[32px] font-normal leading-tight text-teh-ink dark:text-teh-d-ink">
            {items.length} {items.length === 1 ? 'producto guardado' : 'productos guardados'}
          </h1>
        </div>
        <button
          onClick={clearAll}
          className="text-[12px] text-teh-ink-muted dark:text-teh-d-ink-muted hover:text-teh-ink dark:hover:text-teh-d-ink transition-colors shrink-0"
        >
          Vaciar lista
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <button
          onClick={openAll}
          className="flex-1 bg-teh-accent dark:bg-teh-d-accent text-white px-6 py-3 text-[13px] font-medium tracking-wide hover:opacity-90 transition-opacity text-center"
        >
          Abrir todos en MercadoLibre →
        </button>
        <button
          onClick={shareWhatsApp}
          className="flex-1 border border-teh-rule dark:border-teh-d-rule px-6 py-3 text-[13px] font-medium text-teh-ink dark:text-teh-d-ink hover:border-teh-accent dark:hover:border-teh-d-accent transition-colors text-center flex items-center justify-center gap-2"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          Compartir por WhatsApp
        </button>
      </div>

      {/* Items list */}
      <div className="space-y-3">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-teh-surface dark:bg-teh-d-surface border border-teh-rule-soft dark:border-teh-d-rule-soft"
          >
            <div className="w-16 h-16 shrink-0 bg-white dark:bg-zinc-900 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-contain p-1"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-teh-ink dark:text-teh-d-ink leading-snug mb-1 truncate">
                {item.title}
              </p>
              <p className="font-serif text-[16px] text-teh-ink dark:text-teh-d-ink">
                {formatPrice(item.price, item.currency)}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={buildProductUrlClient(item.permalink)}
                target="_blank"
                rel="noopener sponsored"
                className="text-[12px] font-medium text-teh-accent dark:text-teh-d-accent border-b border-teh-accent dark:border-teh-d-accent pb-0.5 hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                Comprar →
              </a>
              <button
                onClick={() => removeItem(item.id)}
                aria-label="Quitar de lista"
                className="text-teh-ink-muted dark:text-teh-d-ink-muted hover:text-teh-ink dark:hover:text-teh-d-ink transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
