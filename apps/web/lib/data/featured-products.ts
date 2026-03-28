export type FeaturedProduct = {
  id: string
  title: string
  price: number
  currency: string
  // URL de la imagen del producto. Reemplazar con URLs reales desde mlstatic.com
  // Ejemplo: 'https://http2.mlstatic.com/D_NQ_NP_XXXXX-MLC000000000000-000000-O.webp'
  thumbnail: string
  // URL del producto en ML sin el parámetro de afiliado.
  // Se obtiene desde la página del producto en mercadolibre.cl
  permalink: string
  condition: 'new' | 'used'
  badge?: string
}

// Actualizar con productos reales de MercadoLibre Chile.
// Para obtener los datos: buscar el producto en mercadolibre.cl, copiar la URL
// y la URL de la imagen (clic derecho → copiar dirección de imagen).
export const featuredProducts: FeaturedProduct[] = [
  {
    id: 'notebook-lenovo-ideapad',
    title: 'Notebook Lenovo IdeaPad 15" Intel Core i5 8GB RAM 512GB SSD',
    price: 449990,
    currency: 'CLP',
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_placeholder-notebook.webp',
    permalink: 'https://www.mercadolibre.cl/notebook-lenovo-ideapad/p/MLC00000001',
    condition: 'new',
    badge: 'Más vendido',
  },
  {
    id: 'smartphone-samsung-a55',
    title: 'Samsung Galaxy A55 5G 256GB 8GB RAM',
    price: 379990,
    currency: 'CLP',
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_placeholder-samsung-a55.webp',
    permalink: 'https://www.mercadolibre.cl/samsung-galaxy-a55/p/MLC00000002',
    condition: 'new',
    badge: 'Oferta',
  },
  {
    id: 'auriculares-sony-wh1000xm5',
    title: 'Sony WH-1000XM5 Auriculares Bluetooth Cancelación de Ruido',
    price: 199990,
    currency: 'CLP',
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_placeholder-sony-wh1000xm5.webp',
    permalink: 'https://www.mercadolibre.cl/sony-wh1000xm5/p/MLC00000003',
    condition: 'new',
  },
  {
    id: 'smart-tv-samsung-55',
    title: 'Smart TV Samsung 55" 4K QLED',
    price: 499990,
    currency: 'CLP',
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_placeholder-tv-samsung-55.webp',
    permalink: 'https://www.mercadolibre.cl/smart-tv-samsung-55-qled/p/MLC00000004',
    condition: 'new',
    badge: 'Destacado',
  },
  {
    id: 'consola-ps5',
    title: 'Sony PlayStation 5 Slim Digital Edition',
    price: 399990,
    currency: 'CLP',
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_placeholder-ps5.webp',
    permalink: 'https://www.mercadolibre.cl/sony-playstation-5-slim/p/MLC00000005',
    condition: 'new',
  },
  {
    id: 'tablet-ipad-10',
    title: 'Apple iPad 10ª Generación 64GB Wi-Fi',
    price: 329990,
    currency: 'CLP',
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_placeholder-ipad-10.webp',
    permalink: 'https://www.mercadolibre.cl/apple-ipad-10-generacion/p/MLC00000006',
    condition: 'new',
  },
  {
    id: 'silla-gamer-razer',
    title: 'Silla Gamer Razer Iskur V2 Lumbar Support',
    price: 249990,
    currency: 'CLP',
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_placeholder-silla-gamer.webp',
    permalink: 'https://www.mercadolibre.cl/silla-gamer-razer-iskur/p/MLC00000007',
    condition: 'new',
  },
  {
    id: 'monitor-lg-27',
    title: 'Monitor LG 27" IPS FHD 100Hz FreeSync',
    price: 149990,
    currency: 'CLP',
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_placeholder-monitor-lg.webp',
    permalink: 'https://www.mercadolibre.cl/monitor-lg-27-ips/p/MLC00000008',
    condition: 'new',
    badge: 'Oferta',
  },
]
