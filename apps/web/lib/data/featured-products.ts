export type FeaturedProduct = {
  id: string
  title: string
  price: number
  currency: string
  thumbnail: string
  permalink: string
  condition: 'new' | 'used'
  badge?: string
}

export type FeaturedProductCurated = {
  id: string
  mlcId: string
  badge?: string
}

// Override curación manual home. Vacío → getHighlights('MLC5726') toma el control.
export const featuredProductsCurated: FeaturedProductCurated[] = []
