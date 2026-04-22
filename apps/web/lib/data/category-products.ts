import type { FeaturedProductCurated } from './featured-products'

// Override curación manual por slug. Si vacío → getHighlights() toma el control.
const categoryProducts: Record<string, FeaturedProductCurated[]> = {}

export function getCategoryProducts(slug: string): FeaturedProductCurated[] {
  return categoryProducts[slug] ?? []
}
