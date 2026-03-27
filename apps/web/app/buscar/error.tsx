'use client'

export default function SearchError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center gap-5 text-center">
      <h2 className="text-xl font-semibold text-slate-200">
        Error al buscar productos
      </h2>
      <p className="text-slate-500 text-sm max-w-sm">
        No se pudo completar la búsqueda. Verifica tu conexión e inténtalo de nuevo.
      </p>
      <button
        onClick={reset}
        className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-2 px-5 rounded-xl transition-colors text-sm"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
