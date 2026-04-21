export function Footer() {
  return (
    <footer className="border-t border-teh-rule dark:border-teh-d-rule mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-teh-ink-muted dark:text-teh-d-ink-muted text-sm space-y-1">
        <p>
          Sitio de afiliados de{' '}
          <span className="text-teh-ink-soft dark:text-teh-d-ink-soft">MercadoLibre Chile</span>.
          Los precios y disponibilidad pueden cambiar.
        </p>
        <p>
          © {new Date().getFullYear()} Top Electro Hogar
          <span className="mx-2 opacity-40">·</span>
          Made by Basilisk
        </p>
      </div>
    </footer>
  )
}
