export function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-slate-500 text-sm">
        <p>
          Sitio de afiliados de{' '}
          <span className="text-slate-400">MercadoLibre Chile</span>.
          Los precios y disponibilidad pueden cambiar.
        </p>
        <p className="mt-1">© {new Date().getFullYear()} Mejores Ofertas</p>
      </div>
    </footer>
  )
}
