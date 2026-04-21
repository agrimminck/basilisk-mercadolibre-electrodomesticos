'use client'

import { useState } from 'react'

type State = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (state === 'loading' || state === 'success') return
    setState('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setState('success')
        setEmail('')
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  return (
    <section className="border-b border-teh-rule dark:border-teh-d-rule">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="max-w-xl">
          <div className="font-mono text-[11px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider mb-3">
            § 04 · alertas
          </div>
          <h2 className="font-serif text-3xl font-normal tracking-tight mb-2 text-teh-ink dark:text-teh-d-ink">
            Precio bajo, aviso inmediato.
          </h2>
          <p className="text-[14px] text-teh-ink-soft dark:text-teh-d-ink-soft mb-6 leading-relaxed">
            Te avisamos cuando bajen los precios de los electrodomésticos que te interesan.
            Sin spam, sin registro.
          </p>

          {state === 'success' ? (
            <p className="font-mono text-[13px] text-teh-accent dark:text-teh-d-accent tracking-wide">
              ✓ Listo — te avisamos cuando haya ofertas.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-0 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                disabled={state === 'loading'}
                className="flex-1 px-4 py-3 text-[13px] bg-teh-surface dark:bg-teh-d-surface border border-teh-rule dark:border-teh-d-rule text-teh-ink dark:text-teh-d-ink placeholder:text-teh-ink-muted dark:placeholder:text-teh-d-ink-muted focus:outline-none focus:border-teh-accent dark:focus:border-teh-d-accent disabled:opacity-50 transition-colors"
              />
              <button
                type="submit"
                disabled={state === 'loading'}
                className="px-5 py-3 bg-teh-ink dark:bg-teh-d-ink text-teh-bg dark:text-teh-d-bg text-[13px] font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
              >
                {state === 'loading' ? '...' : 'Avisar →'}
              </button>
            </form>
          )}

          {state === 'error' && (
            <p className="mt-2 font-mono text-[11px] text-red-500 tracking-wide">
              Error al suscribir — intenta de nuevo.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
