'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 px-4 text-center">
      <h2 className="text-xl font-semibold text-slate-200">Algo salió mal</h2>
      <p className="text-slate-500 text-sm max-w-sm">
        Ocurrió un error inesperado. Puedes intentar recargar la página.
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
