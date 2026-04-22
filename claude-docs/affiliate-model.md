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

**ALERTA (2026-04-22): IDs posiblemente no hidratables** — ver §Problema IDs abajo.

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

**Cobertura actual (2026-04-22, post-fix slug mismatch):**

| Slug | Productos | Marcas |
|---|---|---|
| `electrodomesticos` | 5 | Mademsa, Samsung, Oster, Electrolux, Midea |
| `refrigeradores` (virtual, MLC1576) | 2 | Mademsa MED165 |
| `lavadoras` (virtual, MLC1578) | 1 | LG frontal |
| `electronica-audio-y-video` | 8 | Samsung, TCL, LG, Philips |
| `computacion` | 7 | ASUS Vivobook Go 14, HP 245 G10 |
| `celulares-y-telefonia` | 8 | Samsung A16, Xiaomi Redmi Note 14 Pro, Moto G34 |
| `herramientas` | 8 | Bosch GSB 18V, Makita esmeriles |
| deportes-y-fitness, consolas-y-videojuegos, hogar-y-muebles | 0 → fallback placeholders + CTA ML | — |

**Claves = slugs canónicos** (slug real ML para top-level o slug virtual override para subcategorías). URLs públicas viejas (`electrodomesticos-y-aire-acondicionado`, etc.) siguen resolviendo vía `CATEGORY_SLUG_ALIASES` en `meli-client.ts` — ver [`meli-integration.md`](meli-integration.md) §7-8.

**ALERTA (2026-04-22): IDs posiblemente no hidratables** — ver §Problema IDs abajo.

**Hydratación en `[category]/page.tsx`:**

```ts
async function hydrateCategoryProducts(slug: string): Promise<FeaturedProduct[]>
```

Llamada con `cat.slug` (canónico, no param URL) → garantiza match con keys independientemente de si el usuario entró por alias.

Mismo patrón que `hydrateFeaturedProducts()` en home: `Promise.allSettled` → filter rejected → merge curated badge con live data de ML API. Si `getCategoryProducts(slug)` retorna `[]` → renderiza placeholder grid con link afiliado ML.

**Workflow agregar/rotar productos:**
1. Buscar en mercadolibre.cl → URL tipo `…/p/MLC12345678` → usar ID del path
2. Agregar entry en `categoryProducts[slug]` en `category-products.ts` — **slug = canónico** (real ML o virtual override)
3. Commit + push → Vercel redeploy (~2 min) + ISR refresh a los 3600s

---

## Problema IDs — listings expirados + posible bloqueo /items (2026-04-22)

**Situación:** todos los ~40 MLC IDs en `featured-products.ts` + `category-products.ts` devuelven 404 al hidratarse. Hay dos causas posibles (no mutuamente excluyentes):

1. **IDs = listings individuales de vendedores** → expiran cuando el vendedor cierra el anuncio. IDs tipo `MLC18952592` son anuncios, no catálogo.
2. **`GET /items/{id}` bloqueado globalmente** → PolicyAgent bloquea el endpoint para apps estándar, igual que `/search`. ML retorna 404 con OAuth en lugar de 403 para ocultar existencia. Ver [`meli-integration.md`](meli-integration.md) §9.

**Pendiente confirmar causa:** verificar manualmente en browser las URLs `articulo.mercadolibre.cl/MLC-18952592`, `MLC-42069415`, `MLC-18907190`. Si los productos aparecen → endpoint bloqueado (causa 2). Si no aparecen → listings expirados (causa 1).

### Opciones de fix

**A — Manual + script verificación (~30 min, control editorial)**
- User busca por categoría en ml.cl → copia IDs de URL (`/p/MLC-XXXXX` → `MLCXXXXX`)
- ~40 IDs nuevos en 6-7 categorías
- Script `scripts/verify-ids.sh` prueba HTTP 200 para cada ID antes de commit
- Solo viable si causa 2 no aplica (endpoint no bloqueado)

**B — Semi-automático: highlights endpoint (~1h)**
- `GET /highlights/MLC/category/{id}` con OAuth → devuelve IDs más destacados
- Agregar `getHighlights(categoryId)` a `meli-client.ts` + endpoint `/api/highlights?category=` para testing
- Script local con creds Vercel genera IDs frescos automáticamente → actualiza TS files → commit
- Curación sigue siendo estática pero script facilita rotación futura

**C — Dinámico en ISR (2h, cero mantenimiento)**
- `[category]/page.tsx` llama `getHighlights(cat.id, 8)` directo en render ISR
- Eliminar `category-products.ts` completamente
- Home page: `hydrateFeaturedProducts` → `getHighlights('MLC5726', 8)` o similar
- Siempre fresh, ISR cache 5 min
- Contra: cero control editorial (ML decide qué mostrar, puede ser genérico o de baja calidad)

**Si causa 2 confirmada (endpoint /items bloqueado):** ninguna opción A/B/C funciona — `getProduct(id)` tampoco funciona. Arquitectura cambia a affiliate-only puro:
- Páginas de categoría: texto SEO + CTA → ML
- Sin grid de productos reales
- Placeholders actuales + "Ver todos en MercadoLibre →" = UX válido final

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
