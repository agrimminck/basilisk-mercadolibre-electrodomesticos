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

// Curated list of featured products. mlcId = MercadoLibre catalog item ID.
// Data (title, price, thumbnail, permalink) is fetched live from ML API at ISR time.
// To update: replace mlcId with a different MLC... ID from mercadolibre.cl.
export const featuredProductsCurated: FeaturedProductCurated[] = [
  { id: 'refrigerador-samsung-no-frost',    mlcId: 'MLC16280111', badge: 'Más vendido' },
  { id: 'lavadora-lg-carga-frontal',        mlcId: 'MLC24826892' },
  { id: 'smart-tv-samsung-55-4k',           mlcId: 'MLC20615512', badge: 'Destacado' },
  { id: 'cocina-mademsa-4-platos',          mlcId: 'MLC18952592' },
  { id: 'microondas-samsung-23l',           mlcId: 'MLC42069415' },
  { id: 'hervidor-oster-2-5l',              mlcId: 'MLC18907190' },
  { id: 'aspiradora-electrolux-sin-bolsa',  mlcId: 'MLC20537394' },
  { id: 'aire-acondicionado-midea-split',   mlcId: 'MLC19030680', badge: 'Oferta' },
]
