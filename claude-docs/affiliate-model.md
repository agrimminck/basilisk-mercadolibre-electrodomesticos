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

## Estado actual — arquitectura placeholder-only (2026-04-22)

**Causa raíz confirmada:** listings individuales ML expiran cuando vendedor cierra anuncio. `GET /items/{id}` funciona con IDs válidos, pero no hay forma de obtenerlos sin `/search` (bloqueado). `GET /highlights` retorna catalog IDs → `buy_box_winner: null` en MLC → sin precio → inutilizable.

**Arquitectura definitiva MLC:** placeholder-only + affiliate CTAs.

| Página | Comportamiento |
|---|---|
| `app/[category]/page.tsx` | Llama `getHighlights(cat.id, 8)` → retorna `[]` → renderiza 8 placeholder cards + CTA "Ver todos en MercadoLibre →" |
| `app/page.tsx` | Llama `getHighlights('MLC5726', 8)` → retorna `[]` → sección "Esta semana recomendamos" se oculta condicionalmente (`featuredProducts.length > 0`) |

**Archivos de curación vaciados** — arrays en `[]`/`{}` pero la estructura existe como override manual si en el futuro ML activa buy_box_winner:
- `lib/data/featured-products.ts` → `featuredProductsCurated: FeaturedProductCurated[] = []`
- `lib/data/category-products.ts` → `categoryProducts: Record<string, FeaturedProductCurated[]> = {}`

**`getHighlights()` en `meli-client.ts`:** implementado, future-proofed. Cuando ML active buy_box_winner en MLC, funciona sin cambios. Ver [`meli-integration.md`](meli-integration.md) §10.

**Debug endpoint:** `GET /api/highlights?slug={slug}&limit={n}` — retorna `{ categoryId, count, products }`. Útil para re-testear si ML activa soporte.

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
