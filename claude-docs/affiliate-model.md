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

## Featured products — curación manual

**Archivo:** `lib/data/featured-products.ts`

Arquitectura actualizada 2026-04-21: array estático `featuredProductsCurated` solo define `mlcId` + `badge`. `page.tsx` hidrata título/precio/thumbnail/permalink en ISR desde ML API (`getProduct(mlcId)`).

```ts
type FeaturedProductCurated = {
  id: string     // slug interno
  mlcId: string  // ID catalog ML (ej: 'MLC16280111')
  badge?: string // "Más vendido" | "Oferta" | "Destacado"
}
```

Productos actuales (2026-04-21): refrigerador Samsung, lavadora LG, smart TV Samsung 55" 4K, cocina Mademsa, microondas Samsung, hervidor Oster, aspiradora Electrolux, aire acondicionado Midea split.

**Workflow cambiar producto:**

1. Buscar en mercadolibre.cl → obtener URL tipo `…/p/MLC12345678`.
2. Reemplazar `mlcId` en el array.
3. Commit + push → Vercel redeploya (~2 min) + ML API refresca a los 5 min (ISR revalidate=3600).

**Render:** `components/products/FeaturedProductCard.tsx`. Usa `<img>` nativo (no `next/image`) para evitar whitelisting de dominios ML. Llama `buildProductUrl(permalink)`.

**Fallback:** si `getProduct(mlcId)` falla para un item, se omite de la grilla (no rompe la página).

---

## Category descriptions

**Archivo:** `lib/data/category-descriptions.ts` — mapping `categoryId → descripción larga`.

Consumido por `app/[category]/page.tsx` para texto SEO-friendly. Agregar entry cuando se sume categoría nueva al top10.

---

## Category products — curación manual por categoría

**Archivo:** `lib/data/category-products.ts` — CREADO 2026-04-22

Mismo patrón que featured products. Cada slug de categoría tiene array de `FeaturedProductCurated[]`. Página de categoría hidrata en ISR.

```ts
export function getCategoryProducts(slug: string): FeaturedProductCurated[] {
  return categoryProducts[slug] ?? []
}
```

**Cobertura actual:**

| Slug | Productos | Marcas |
|---|---|---|
| `electrodomesticos-y-aire-acondicionado` | 8 | Mademsa, LG, Samsung, Oster, Electrolux, Midea |
| `television-audio-y-video` | 8 | Samsung, TCL, LG, Philips |
| `computacion` | 7 | ASUS Vivobook Go 14, HP 245 G10 |
| `celulares-y-telefonia` | 8 | Samsung A16, Xiaomi Redmi Note 14 Pro, Moto G34 |
| `herramientas-y-construccion` | 8 | Bosch GSB 18V, Makita esmeriles |
| deportes, videojuegos, muebles | 0 → fallback placeholders | — |

**Hydratación en `[category]/page.tsx`:**

```ts
async function hydrateCategoryProducts(slug: string): Promise<FeaturedProduct[]>
```

Mismo patrón que `hydrateFeaturedProducts()` en home: `Promise.allSettled` → filter rejected → merge curated badge con live data de ML API. Si `getCategoryProducts(slug)` retorna `[]` → renderiza placeholder grid original.

**Workflow agregar/rotar productos:**
1. Buscar en mercadolibre.cl → URL tipo `…/p/MLC12345678` → usar ID del path
2. Agregar entry en `categoryProducts[slug]` en `category-products.ts`
3. Commit + push → Vercel redeploy (~2 min) + ISR refresh a los 3600s

**⚠️ BUG PENDIENTE:** `/electrodomesticos-y-aire-acondicionado` devuelve 404. Probable slug mismatch entre `toSlug(nombre ML API)` y el slug hardcodeado. Ver sección de diagnóstico abajo.

---

## Bug pendiente — 404 en electrodomésticos

**Síntoma:** `topelectrohogar.com/electrodomesticos-y-aire-acondicionado` → 404.

**Causa probable:** `getCategoryBySlug('electrodomesticos-y-aire-acondicionado')` falla porque el nombre devuelto por ML API para esa categoría, al pasarlo por `toSlug()`, genera un slug diferente.

**Diagnóstico:**
1. Hacer `GET https://api.mercadolibre.com/sites/MLC` → ver `.categories[].name`
2. Aplicar `toSlug()` a cada nombre → encontrar el que debería ser electrodomésticos
3. Si el slug generado ≠ `electrodomesticos-y-aire-acondicionado` → ese es el bug

**Fix probable:**
- Opción A: Cambiar la clave en `category-descriptions.ts` y `category-products.ts` al slug real que genera ML API
- Opción B: Agregar alias/mapping en `getCategoryBySlug()` para cubrir variantes

**Archivos a tocar:**
- `lib/meli/meli-client.ts` — `getCategoryBySlug()`, `getCategories()`
- `lib/meli/meli-transforms.ts` — `toSlug()`
- `lib/data/category-descriptions.ts` — clave del slug
- `lib/data/category-products.ts` — clave del slug
- `app/[category]/page.tsx` — `notFound()` cuando falla

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
