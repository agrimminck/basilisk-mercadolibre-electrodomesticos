'use client'

export default function CategoryError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center gap-5 text-center">
      <h2 className="text-xl font-semibold text-slate-200">
        No se pudo cargar esta categoría
      </h2>
      <p className="text-slate-500 text-sm max-w-sm">
        Es posible que la categoría no exista o que haya un problema temporal con la API.
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
