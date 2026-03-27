function SkeletonCard() {
  return (
    <div className="flex flex-col bg-zinc-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="aspect-square bg-slate-800 animate-pulse" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-3 bg-slate-800 rounded animate-pulse" />
        <div className="h-3 bg-slate-800 rounded animate-pulse w-3/4" />
        <div className="h-5 bg-slate-800 rounded animate-pulse w-1/2 mt-1" />
      </div>
    </div>
  )
}

export function ProductSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
