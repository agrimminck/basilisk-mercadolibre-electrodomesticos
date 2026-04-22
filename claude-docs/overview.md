# overview — affiliate-webs

Sitio afiliado Mercado Libre Chile (MLC). Next.js 15 App Router monorepo. OAuth server-only, redirects a ML con `meli_affiliate_id` para tracking + revenue.

---

## Stack

| Capa | Tech |
|---|---|
| Framework | Next.js 15 App Router + React 19 |
| Lenguaje | TypeScript strict, imports relativos (sin path aliases) |
| Estilos | Tailwind v4 (`@import "tailwindcss"`, sin `tailwind.config.js`) |
| Deploy | Vercel |
| Data | ML API REST (sin DB propia) |

---

## Tree

```
apps/web/
├── app/
│   ├── page.tsx                   — home: hero + featured + top10 categorías
│   ├── layout.tsx                 — root metadata + fonts
│   ├── [category]/page.tsx        — landing categoría (SSG + generateStaticParams)
│   ├── buscar/page.tsx            — redirect a ML con ?q= + affiliate_id
│   ├── producto/[id]/page.tsx     — detalle producto (dynamic)
│   ├── sitemap.ts                 — sitemap dinámico
│   ├── robots.ts                  — bloquea /api/
│   ├── opengraph-image.tsx        — OG fallback
│   └── api/
│       ├── products/route.ts      — GET ?id=
│       ├── search/route.ts        — GET ?q= → devuelve URL redirect
│       └── categories/route.ts    — GET categorías root
├── components/
│   ├── layout/ (Header, Footer)
│   ├── products/ (FeaturedProductCard, ProductCard, ProductGrid, ProductSkeleton)
│   ├── search/ (SearchBar, FilterPanel)
│   └── ui/ (Badge, Spinner)
├── lib/
│   ├── meli/       — integración ML API
│   ├── data/       — featured-products, category-descriptions (curación manual)
│   └── utils/      — affiliate.ts (buildXUrl)
├── types/index.ts
└── vercel.json
```

---

## Rutas

| Ruta | Tipo | Propósito |
|---|---|---|
| `/` | ISR 1h | Home: hero + featured + 10 categorías |
| `/[category]` | SSG + generateStaticParams | Landing categoría + CTA ML afiliado |
| `/buscar?q=` | Redirect | 307 a ML con affiliate_id |
| `/producto/[id]` | Dynamic | Detalle + CTA compra |
| `GET /api/categories` | JSON + Cache-Control s-maxage=3600 | Lista categorías |
| `GET /api/products?id=` | JSON | Item por ID |
| `GET /api/search?q=` | JSON | URL redirect con affiliate_id |

---

## lib/meli — superficie pública

| Archivo | Exports |
|---|---|
| `meli-auth.ts` | `getAccessToken()` — OAuth client_credentials, cache in-memory, refresh 60s antes de expiry |
| `meli-client.ts` | `getProduct(id)`, `getCategories()`, `getCategory(id)`, `getCategoryBySlug(slug)`. Todos con `next: {revalidate:300}` (5min ISR) |
| `meli-transforms.ts` | `transformProduct`, `transformCategory`, `transformSiteCategory`, `toSlug` (kebab-case, normaliza acentos, max 80 chars) |
| `lib/utils/affiliate.ts` | `buildProductUrl`, `buildCategoryUrl`, `buildSearchUrl` — append `?meli_affiliate_id=` respetando query existente |

Ver [`meli-integration.md`](meli-integration.md) para quirks API y [`affiliate-model.md`](affiliate-model.md) para buildXUrl.

---

## Env vars

| Var | Scope | Uso |
|---|---|---|
| `MELI_APP_ID` | Server | OAuth client_id (también fallback rate limit sin token) |
| `MELI_CLIENT_SECRET` | Server | OAuth secret |
| `MELI_AFFILIATE_ID` | Server | Tracking param en todas las URLs ML (p.ej. `ag20260214123344`) |
| `MELI_DEFAULT_SITE` | Config | Fijo `MLC` (Chile) |
| `NEXT_PUBLIC_SITE_URL` | Public | Dominio canónico para OG + sitemap |

---

## Decisiones durables

- **Modelo affiliate-only** — endpoint ML `/search` bloqueado 403 global para apps estándar → pivot a redirects con tracking ID. Ver [`meli-integration.md`](meli-integration.md).
- **Sin DB** — categorías y productos hardcoded en TS (`lib/data/`): `featured-products.ts` (home), `category-products.ts` (páginas de categoría), `category-descriptions.ts` (texto SEO). Curación manual, type-safe.
- **Server Components + ISR** — `fetch` con `revalidate` + `generateStaticParams` para categorías. Sin `useEffect` para data.
- **TypeScript strict, imports relativos** — sin path aliases.
- **Tailwind v4** — `@import "tailwindcss"` sin `tailwind.config.js`. Deps **no** en devDependencies (ver [`deploy-vercel.md`](deploy-vercel.md)).

---

## Docs relacionados

- [`meli-integration.md`](meli-integration.md) — quirks API, /search 403, OAuth
- [`affiliate-model.md`](affiliate-model.md) — buildXUrl, sponsored rel, curación featured
- [`seo-metadata.md`](seo-metadata.md) — sitemap, JSON-LD, estado GSC/Bing
- [`deploy-vercel.md`](deploy-vercel.md) — env vars, rootDirectory, Tailwind v4 fix
