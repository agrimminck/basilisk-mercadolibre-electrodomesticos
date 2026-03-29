# INDEX.md — affiliate-gaming

## Stack

| Capa      | Tecnología                            |
| --------- | ------------------------------------- |
| Framework | Next.js 15 (App Router)               |
| Lenguaje  | TypeScript strict                     |
| Estilos   | Tailwind CSS v4                       |
| Deploy    | Vercel                                |
| Afiliados | Mercado Libre API — sitio MLC (Chile) |

---

## Árbol de carpetas

```
affiliate-gaming/
├── apps/web/                         # Aplicación Next.js (monorepo)
│   ├── app/                          # App Router — rutas y páginas
│   │   ├── layout.tsx                # Root layout (fonts, metadata)
│   │   ├── page.tsx                  # Home — categorías destacadas
│   │   ├── [category]/page.tsx       # Listado por categoría con filtros
│   │   ├── buscar/page.tsx           # Resultados de búsqueda
│   │   ├── producto/[id]/page.tsx    # Detalle de producto
│   │   ├── api/products/route.ts     # GET /api/products
│   │   ├── api/search/route.ts       # GET /api/search?q=
│   │   ├── api/categories/route.ts   # GET /api/categories
│   │   ├── sitemap.ts                # Sitemap dinámico
│   │   └── robots.ts                 # Bloquea /api/ en crawlers
│   ├── components/
│   │   ├── layout/                   # Header, Footer
│   │   ├── products/                 # ProductCard, ProductGrid, Skeleton
│   │   ├── search/                   # SearchBar, FilterPanel
│   │   └── ui/                       # Badge, Spinner
│   ├── lib/
│   │   ├── meli/                     # Integración ML API
│   │   │   ├── meli-auth.ts          # OAuth client_credentials
│   │   │   ├── meli-client.ts        # HTTP client (requests + caché)
│   │   │   └── meli-transforms.ts    # ML response → tipos internos
│   │   └── utils/
│   │       └── affiliate.ts          # Generación de URLs de afiliado
│   ├── hooks/                        # React hooks (useSearch con debounce)
│   ├── types/index.ts                # Product, Category, SearchResult
│   ├── public/images/
│   ├── vercel.json                   # rootDirectory: "apps/web"
│   └── next.config.ts
└── .claude/                          # Metadata del proyecto (Claude)
```

---

## Archivos clave

| Archivo                       | Propósito                                                        |
| ----------------------------- | ---------------------------------------------------------------- |
| `lib/meli/meli-auth.ts`       | OAuth client_credentials — obtiene access token de ML            |
| `lib/meli/meli-client.ts`     | HTTP client: todos los requests a la API ML                      |
| `lib/meli/meli-transforms.ts` | Normaliza respuestas ML → tipos internos (slugs, https, filtros) |
| `lib/utils/affiliate.ts`      | Construye URLs con `meli_affiliate_id` para tracking             |
| `types/index.ts`              | Tipos globales compartidos en toda la app                        |

> Rutas de archivos relativas a `apps/web/`.

---

## Variables de entorno

```env
MELI_APP_ID=
MELI_CLIENT_SECRET=
MELI_AFFILIATE_ID=
MELI_DEFAULT_SITE=MLC
NEXT_PUBLIC_SITE_URL=
```

Ver `.env.local.example` en `apps/web/`.

---

## Documentación

Ver [INDEX-DOCUMENTATION.md](INDEX-DOCUMENTATION.md) para el índice de docs generados por protocolos.

## Progreso

Ver [INDEX-PROGRESS.md](INDEX-PROGRESS.md) para el índice de progresos generados por protocolos.
