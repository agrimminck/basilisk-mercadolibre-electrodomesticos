import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 px-4 text-center">
      <p className="text-7xl font-bold text-amber-400 opacity-40">404</p>
      <h1 className="text-xl font-semibold text-slate-200">Página no encontrada</h1>
      <p className="text-slate-500 text-sm max-w-sm">
        La página que buscas no existe o fue movida.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-2 px-5 rounded-xl transition-colors text-sm"
        >
          Ir al inicio
        </Link>
        <Link
          href="/buscar"
          className="border border-slate-700 hover:border-amber-400/40 text-slate-300 hover:text-amber-400 py-2 px-5 rounded-xl transition-colors text-sm"
        >
          Buscar productos
        </Link>
      </div>
    </div>
  )
}
