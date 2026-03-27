import { ProductSkeleton } from '../../components/products/ProductSkeleton'

export default function CategoryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <div className="space-y-2">
        <div className="h-7 w-48 bg-slate-800 rounded animate-pulse" />
        <div className="h-4 w-24 bg-slate-800 rounded animate-pulse" />
      </div>
      <ProductSkeleton count={20} />
    </div>
  )
}
