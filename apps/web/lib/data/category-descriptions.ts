export type CategoryDescription = {
  intro: string
  highlights: string[]
}

const descriptions: Record<string, CategoryDescription> = {
  computacion: {
    intro:
      'Encontrá los mejores precios en notebooks, PCs de escritorio, componentes y accesorios en MercadoLibre Chile. Desde equipos para trabajo y estudio hasta configuraciones gaming de alto rendimiento.',
    highlights: [
      'Notebooks para trabajo, estudio y gaming',
      'PCs armadas y componentes (CPU, RAM, SSD)',
      'Monitores, teclados, mouses y periféricos',
      'Almacenamiento externo y pendrives',
      'Impresoras y accesorios de oficina',
    ],
  },
  'celulares-y-telefonia': {
    intro:
      'Compará precios de smartphones, accesorios y planes en MercadoLibre Chile. Encontrá los últimos modelos de Samsung, Apple, Xiaomi y más marcas con envío a todo el país.',
    highlights: [
      'Smartphones Android e iPhone',
      'Fundas, protectores y accesorios',
      'Auriculares y audífonos Bluetooth',
      'Cargadores y cables originales',
      'Smartwatches y wearables',
    ],
  },
  'electronica-audio-y-video': {
    intro:
      'Transformá tu sala con los mejores Smart TVs, barras de sonido y sistemas de audio en MercadoLibre Chile. Tecnología 4K, QLED y OLED a precios competitivos.',
    highlights: [
      'Smart TVs 4K, QLED y OLED',
      'Barras de sonido y sistemas home theater',
      'Proyectores y pantallas',
      'Auriculares y parlantes portátiles',
      'Cables HDMI y accesorios AV',
    ],
  },
  'electrodomesticos': {
    intro:
      'Equipá tu hogar con cocinas, microondas, aspiradoras y aires acondicionados al mejor precio en MercadoLibre Chile. Grandes marcas con garantía y envío.',
    highlights: [
      'Cocinas y hornos',
      'Microondas y hervidores',
      'Aspiradoras y robots de limpieza',
      'Aires acondicionados y calefactores',
      'Pequeños electrodomésticos',
    ],
  },
  'refrigeradores': {
    intro:
      'Encontrá refrigeradores No Frost, side by side, bottom freezer y más en MercadoLibre Chile. Grandes marcas como Samsung, LG, Mademsa y Fensa con garantía oficial.',
    highlights: [
      'No Frost y Frost-Free',
      'Side by side y French Door',
      'Bottom y top freezer',
      'Eficiencia energética A+ / A++',
      'Envío a todo Chile con instalación',
    ],
  },
  'lavadoras': {
    intro:
      'Comprá lavadoras de carga frontal, superior y lavadoras-secadoras al mejor precio en MercadoLibre Chile. Tecnología Inverter, vapor y eficiencia energética.',
    highlights: [
      'Carga frontal y superior',
      'Lavadoras-secadoras combo',
      'Motor Inverter silencioso',
      'Programas especiales (vapor, alérgenos)',
      'Capacidades 7 a 20 kg',
    ],
  },
  'deportes-y-fitness': {
    intro:
      'Encontrá equipamiento deportivo, ropa técnica y accesorios fitness en MercadoLibre Chile. Para running, ciclismo, fútbol, musculación y mucho más.',
    highlights: [
      'Equipamiento para gimnasio y fitness',
      'Bicicletas de ruta, montaña y urbanas',
      'Ropa y calzado deportivo',
      'Artículos de fútbol, básquetbol y más',
      'Accesorios para outdoor y trekking',
    ],
  },
  'consolas-y-videojuegos': {
    intro:
      'Comprá consolas, juegos, controles y accesorios gaming al mejor precio en MercadoLibre Chile. PlayStation, Xbox, Nintendo Switch y PC Gaming en un solo lugar.',
    highlights: [
      'Consolas PlayStation, Xbox y Nintendo Switch',
      'Juegos físicos y tarjetas de saldo digital',
      'Controles y accesorios originales',
      'Sillas y escritorios gaming',
      'Auriculares y monitores para gaming',
    ],
  },
  'herramientas': {
    intro:
      'Herramientas eléctricas, manuales y materiales de construcción en MercadoLibre Chile. Todo lo que necesitás para tus proyectos del hogar y obra.',
    highlights: [
      'Taladros, amoladoras y herramientas eléctricas',
      'Herramientas manuales y kits',
      'Materiales eléctricos y plomería',
      'Pinturas y rodillos',
      'Escaleras y andamios',
    ],
  },
  'hogar-y-muebles': {
    intro:
      'Decorá y amoblá tu hogar con mesas, sillas, sillones y artículos de decoración en MercadoLibre Chile. Estilo moderno, nórdico y clásico con entrega a domicilio.',
    highlights: [
      'Muebles de living y comedor',
      'Dormitorio: camas, colchones y veladores',
      'Decoración, cuadros y lámparas',
      'Organización y almacenamiento',
      'Jardín y balcón',
    ],
  },
}

const DEFAULT_DESCRIPTION: CategoryDescription = {
  intro:
    'Encontrá los mejores precios y ofertas en MercadoLibre Chile. Miles de productos con envío a todo el país.',
  highlights: [
    'Grandes marcas con garantía oficial',
    'Envío a todo Chile',
    'Pago en cuotas disponible',
    'Compra protegida con MercadoLibre',
  ],
}

export function getCategoryDescription(slug: string): CategoryDescription {
  return descriptions[slug] ?? DEFAULT_DESCRIPTION
}
