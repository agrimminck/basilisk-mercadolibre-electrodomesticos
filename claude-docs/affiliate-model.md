# affiliate-model — redirects + curación manual

Modelo affiliate puro: sin API search propia, redirects a ML con tracking ID. Post-bloqueo `/search` (ver [`meli-integration.md`](meli-integration.md)).

---

## buildXUrl — `lib/utils/affiliate.ts`

| Función | Input | Output |
|---|---|---|
| `buildProductUrl(permalink)` | URL canónica ML | `{permalink}?meli_affiliate_id=X` (respeta query existente) |
| `buildCategoryUrl(siteId, categoryId)` | `MLC`, `MLC1652` | URL listado ML + affiliate_id |
| `buildSearchUrl(siteId, query)` | `MLC`, `"notebook"` | URL search ML (UI propia de ML) + affiliate_id |

**Regla:** todo `<a>` a ML desde el sitio debe pasar por un `buildXUrl`. Linkear directo = pérdida de tracking = pérdida de revenue.

---

## Rel attributes obligatorios

```tsx
<a
  href={buildProductUrl(permalink)}
  target="_blank"
  rel="noopener noreferrer sponsored"
>
```

`sponsored` = señal Google para links pagados/afiliados. Obligatorio: compliance + SEO.

---

## Página de detalle de producto — `/producto/[id]`

**Archivo:** `app/producto/[id]/page.tsx`

**Función API:** `getCatalogProduct(catalogId)` en `meli-client.ts` — fetcha `/products/{id}` + `/products/{id}/items?limit=1` en paralelo. Retorna `Product` con `pictures[]`, `mainFeatures[]`, `attributes[]`, `categoryId`.

**Navegación hacia la página:** todos los product cards (`FeaturedProductCard`, `ProductCard`) usan `<Link href="/producto/${product.id}?cat=${product.categoryId}">` — nunca `<a target="_blank">` (eso es solo para el CTA de compra dentro de la página).

**CTA de compra:** `<a href={buildProductUrl(product.permalink)} target="_blank" rel="noopener noreferrer sponsored">` — obligatorio `sponsored` + `buildProductUrl`.

**Secciones de la página:**
1. Carrusel de imágenes (`ProductImageCarousel` — Client Component, `components/products/`)
2. Título + precio + botón comprar + "Lo que tienes que saber" (`product.mainFeatures[]`)
3. Características (`product.attributes[]`) — grilla 2 col, max 20 items
4. Productos relacionados (`getHighlights(categoryId, 5)` filtrado) — **ver bug §11 en `meli-integration.md`**

**`product.categoryId` para relacionados:** el `categoryId` llega por `?cat=` query param (inyectado por la card que navegó). Fallback: `product.categoryId` del catálogo API (no siempre disponible — ver bug).

---

## Estado actual — highlights dinámicos funcionando (confirmado 2026-04-22)

**Arquitectura:** `getHighlights()` via `/highlights/{site}/category/{id}` + `/products/{id}/items?limit=1` devuelve productos reales con precio. Reemplaza curación estática expirada.

| Página | Comportamiento |
|---|---|
| `app/[category]/page.tsx` | `getHighlights(cat.id, 8)` → grid productos reales; si `[]` → 8 placeholder cards + CTA |
| `app/page.tsx` hero | `featuredProducts[0]` (primer resultado de `getHighlights('MLC5726',8)`) → imagen + título + precio real; si vacío → fallback hardcodeado |
| `app/page.tsx` sección §02 | `getHighlights('MLC5726', 8)` → "Esta semana recomendamos" via `FeaturedProductCard` → links internos a `/producto/[id]?cat=MLC5726`; si `[]` → sección oculta |
| `app/page.tsx` categorías §01 | `FEATURED_CATEGORY_SLUGS` curados → `getHighlights(cat.id,1)` por cada una → imagen del primer producto activo; si vacío → `ProductPlaceholder` |
| `app/[category]/page.tsx` | `getHighlights(cat.id, 8)` → grid via `ProductCard` → links internos a `/producto/[id]?cat={categoryId}`; si `[]` → 8 placeholder cards + CTA |
| `app/producto/[id]/page.tsx` | `getCatalogProduct(id)` → carrusel + features + attrs + relacionados; CTA → ML con affiliate |

**Slots de imagen:** `bg-white dark:bg-zinc-900` en todos los contenedores de imagen (`FeaturedProductCard`, hero, category cards). Imágenes ML están diseñadas para fondo blanco — no usar blend modes.

**Categorías curadas en home** (`FEATURED_CATEGORY_SLUGS` en `app/page.tsx`):
```ts
['electrodomesticos', 'electronica-audio-y-video', 'computacion', 'celulares-y-telefonia', 'hogar-y-muebles']
```
Buscadas por slug en `getCategories()` resultado. Para cambiar qué categorías aparecen en home, editar este array.

**Nav** (`components/layout/Header.tsx`): Catálogo / Televisores / Computación. Sin "Ofertas" (ML no tiene sección de ofertas accesible via API).

**Archivos de curación vaciados** (override manual si se necesita):
- `lib/data/featured-products.ts` → `featuredProductsCurated: FeaturedProductCurated[] = []`
- `lib/data/category-products.ts` → `categoryProducts: Record<string, FeaturedProductCurated[]> = {}`

**`getHighlights()` en `meli-client.ts`:** funcional. Ver [`meli-integration.md`](meli-integration.md) §10 para implementación.

**Debug endpoint:** `GET /api/highlights?slug={slug}&limit={n}` — retorna `{ categoryId, count, products }`.

---

## Featured products — override editorial (inactivo)

**Archivo:** `lib/data/featured-products.ts`

Array `featuredProductsCurated` vacío. Para activar curación manual: agregar entries con `mlcId` de listings ACTIVOS en ml.cl (URL tipo `.../p/MLC-XXXXX`). `getHighlights` en `page.tsx` retorna `Product[]`; si hay entries curados en `featuredProductsCurated` NO se usan (curación fue removida del pipeline). Para reactivar curación manual habría que reimplementar `hydrateFeaturedProducts` o cambiar el approach.

---

## Category descriptions

**Archivo:** `lib/data/category-descriptions.ts` — mapping `slug → { intro, highlights[] }`.

Consumido por `app/[category]/page.tsx` para texto SEO (intro bajo el h1) y sidebar bullets. Agregar entry cuando se sume categoría nueva.

---

## Category products — override editorial por slug (inactivo)

**Archivo:** `lib/data/category-products.ts`

Record vacío `{}`. Función `getCategoryProducts(slug)` exportada pero no llamada desde ninguna page (pipeline reemplazado por `getHighlights`). Si se quisiera reactivar curación manual por categoría: reimplementar `hydrateCategoryProducts` en `[category]/page.tsx` + poblar el record con IDs frescos.

**Slugs canónicos** (claves válidas si se repuebla): `electrodomesticos`, `refrigeradores`, `lavadoras`, `electronica-audio-y-video`, `computacion`, `celulares-y-telefonia`, `herramientas`.

---

## Por qué `/api/search` no busca

`/api/search?q=X` NO ejecuta búsqueda — devuelve URL redirect a ML. Cliente navega ahí, ML muestra resultados en su UI con affiliate_id tracking.

Razón: endpoint ML search bloqueado 403 (ver [`meli-integration.md`](meli-integration.md)). No hay alternativa técnica.

---

## Newsletter capture — retención sin fricción

Implementado 2026-04-21. Sin registro completo (Ley 19.628 Chile + alto effort).

**Stack:** Resend free tier (3000 emails/mes, 100/día).

**Archivos:**
- `app/api/newsletter/route.ts` — `POST` valida email → `resend.contacts.create()` → maneja 409 (ya suscrito) sin error
- `components/ui/NewsletterBanner.tsx` — Client Component, form email + submit, estados idle/loading/success/error

**Ubicación en página:** homepage entre featured products y editorial strip.

**Env vars requeridas:**

| Var | Scope | Fuente |
|---|---|---|
| `RESEND_API_KEY` | Server | resend.com → API Keys |
| `RESEND_AUDIENCE_ID` | Server | resend.com → Audiences → crear audience → copiar ID |

Activar: agregar ambas vars en Vercel + redeploy.
