# INDEX.md — Mapa del Proyecto

## Estructura de carpetas

```
affiliate-meli/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata, providers)
│   ├── page.tsx                  # Home — featured products
│   ├── [category]/
│   │   └── page.tsx              # Listado por categoría
│   ├── producto/[slug]/
│   │   └── page.tsx              # Detalle de producto
│   ├── buscar/
│   │   └── page.tsx              # Resultados de búsqueda
│   └── api/
│       ├── products/route.ts     # GET /api/products
│       ├── search/route.ts       # GET /api/search?q=
│       └── categories/route.ts  # GET /api/categories
│
├── components/
│   ├── ui/                       # Átomos reutilizables
│   ├── layout/                   # Header, Footer, Nav
│   ├── products/                 # Tarjetas y grillas
│   └── search/                   # Barra y filtros
│
├── lib/
│   ├── meli/
│   │   ├── meli-client.ts        # HTTP client para ML API
│   │   └── meli-transforms.ts    # Mapeo de respuestas ML → tipos internos
│   └── utils/
│       └── format.ts             # Formateo de precios, fechas, slugs
│
├── types/
│   └── index.ts                  # Tipos globales: Product, Category, SearchResult
│
├── hooks/
│   └── useSearch.ts              # Hook de búsqueda con debounce
│
├── iterations/                   # Resúmenes de cada iteración (qué se hizo)
├── plans/                        # Planes detallados de implementación por iteración
│
├── docs/                         # Archivos de memoria expandida
│   └── (vacío por ahora)
│
├── public/
│   └── images/
│
├── CLAUDE.md                     # Manual de instrucciones para Claude
├── INDEX.md                      # Este archivo
└── PROGRESS.md                   # Bitácora del proyecto
```

## Documentación expandida

| Archivo | Estado | Contenido |
|---------|--------|-----------|
| `docs/API_MELI.md` | ✅ Listo | Endpoints, auth, rate limits, notas de transform |
| `docs/COMPONENTS.md` | ⏳ Pendiente | Catálogo de componentes |
| `docs/STATE.md` | ⏳ Pendiente | Gestión de estado y caché |
| `docs/DEPLOY.md` | ✅ Listo | Variables de entorno, pasos de deploy a Vercel |

## Variables de entorno requeridas

```env
# Mercado Libre
MELI_APP_ID=
MELI_CLIENT_SECRET=
MELI_AFFILIATE_ID=
MELI_DEFAULT_SITE=MLC

# Next.js
NEXT_PUBLIC_SITE_URL=
```
