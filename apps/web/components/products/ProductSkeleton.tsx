function SkeletonCard() {
  return (
    <div className="flex flex-col bg-teh-surface dark:bg-teh-d-surface border border-teh-rule dark:border-teh-d-rule rounded-xl overflow-hidden">
      <div className="aspect-square bg-teh-bgalt dark:bg-teh-d-bgalt animate-pulse" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-3 bg-teh-bgalt dark:bg-teh-d-bgalt rounded animate-pulse" />
        <div className="h-3 bg-teh-bgalt dark:bg-teh-d-bgalt rounded animate-pulse w-3/4" />
        <div className="h-5 bg-teh-bgalt dark:bg-teh-d-bgalt rounded animate-pulse w-1/2 mt-1" />
      </div>
    </div>
  )
}

export function ProductSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
