# meli-integration — quirks ML API

Todo lo descubierto por experimentación que NO está en docs oficiales. Fuente: sesiones de debug 2026-03.

---

## 1. `/sites/{id}/search` bloqueado 403 global

- **Síntoma:** `GET /sites/MLC/search?q=*` → 403 `forbidden` desde cualquier IP, con/sin OAuth.
- **Scope:** global — probado MLC (Chile) y MLB (Brasil), mismo resultado. No es IP-block, no es rate-limit.
- **Causa raíz:** ML cerró search a apps estándar; solo partners/afiliados con permisos especiales acceden.
- **OAuth no ayuda:** token `client_credentials` trae scopes `offline_access read write` pero son declarativos — el portal ML no ofrece toggle "Products/Search" para apps estándar.
- **Implicación:** no hay forma vía API de listar/buscar productos. Pivot a modelo affiliate-only (ver [`affiliate-model.md`](affiliate-model.md)).

---

## 2. Categorías — shape fork según path

| Endpoint | Response |
|---|---|
| `GET /sites/{id}/categories` | 403 `PolicyAgent` — bloqueado |
| `GET /sites/{id}` | 200 — body incluye `.categories: [{id, name}]` (sin `totalItems`) |

Código usa la segunda forma. `types/index.ts` refleja shape reducido — NO incluir `totalItems` en type.

---

## 3. Affiliate ID ≠ API key

- Programa "Asociados" entrega `MELI_AFFILIATE_ID` (ej. `ag20260214123344`).
- Es **tracking param**, no auth. Append `?meli_affiliate_id=X` a cualquier URL ml.com → ML atribuye click/compra.
- NO desbloquea endpoints API. `/search` sigue 403 aun con affiliate ID válido.

---

## 4. OAuth client_credentials

- `POST /oauth/token` con `grant_type=client_credentials`.
- Token lifetime ≈ 21600s (6h).
- Cache in-memory por instancia Vercel (cold start = nuevo token, sin problema).
- Refresh margen: 60s antes de expiry.
- Implementado en `lib/meli/meli-auth.ts`.

---

## 5. Rate limits

- Sin auth: ~1 req/seg por IP.
- Con OAuth: más permisivo, sin 429 observado durante dev.
- Cientos req/min desde Vercel sin issues.
- ISR page-level (`revalidate:3600`) + fetch cache (`revalidate:300`) mitiga sin cache layer dedicado.

---

## 6. Normalizaciones en `meli-transforms.ts`

- Thumbnails llegan con `http://` → forzar `https://` (browsers bloquean mixed content).
- `attributes[]` con `value_name: null` → filtrar antes de exponer.
- Slugs generados desde `title` con `toSlug()`: lowercase, normaliza acentos, kebab-case, max 80 chars.

---

## Endpoints en uso

| Endpoint | Uso en código | Estado |
|---|---|---|
| `POST /oauth/token` | `getAccessToken()` | ✅ funciona |
| `GET /sites/{id}` | `getCategories()` (via `.categories`) | ✅ funciona |
| `GET /categories/{id}` | `getCategory(id)`, `getCategoryBySlug()` | ✅ funciona |
| `GET /items/{id}` | `getProduct(id)`, `/api/products` | ✅ funciona con IDs de listings activos; 404 con listings expirados |
| `GET /highlights/{site}/category/{id}` | `getHighlights()` | ✅ funciona — devuelve catalog IDs, ver §10 |
| `GET /products/{catalogId}` | dentro de `getHighlights()` — name + pictures | ✅ funciona |
| `GET /products/{catalogId}/items?limit=1` | dentro de `getHighlights()` — price/condition | ✅ funciona en MLC, ver §10 |
| `GET /sites/{id}/search` | — | ❌ 403 bloqueado global |

Response shape item (`/items/{id}`): `id, title, price, currency_id, thumbnail, permalink, condition, attributes[]`.

---

## 7. Aliases de slugs de categoría

Problema: slugs curados hardcoded (`electrodomesticos-y-aire-acondicionado`, `television-audio-y-video`, etc.) no matchean los que genera `toSlug()` sobre los nombres reales de ML MLC → `getCategoryBySlug()` lanzaba → `notFound()` → 404 global.

Fix: mapa `CATEGORY_SLUG_ALIASES` interno en `meli-client.ts` redirige slug viejo → slug canónico ML antes del lookup. URLs ya indexadas siguen resolviendo; el contenido se busca por slug canónico (claves en `category-descriptions.ts` + `category-products.ts` usan el real ML).

Aliases actuales:

| Slug público (viejo) | Slug ML real | ID |
|---|---|---|
| `electrodomesticos-y-aire-acondicionado` | `electrodomesticos` | MLC5726 |
| `television-audio-y-video` | `electronica-audio-y-video` | MLC1000 |
| `videojuegos-y-consolas` | `consolas-y-videojuegos` | MLC1144 |
| `herramientas-y-construccion` | `herramientas` | MLC178483 |
| `muebles-y-decoracion` | `hogar-y-muebles` | MLC1574 |

Canonical metadata (`alternates.canonical`, openGraph URL, JSON-LD URLs) usa `cat.slug` (real) → Google resuelve duplicate content sin redirect 301.

Pitfall: al agregar un alias, NO renombrar también la clave en `category-descriptions.ts` / `category-products.ts` al slug viejo — las claves van siempre al slug canónico. Lookups internos deben ir por `cat.slug`, no por el param URL.

---

## 8. Subcategorías virtuales (pages custom)

Algunos slugs públicos (`refrigeradores`, `lavadoras`) no son categorías top-level ML — son subcategorías dentro de `MLC5726 Electrodomésticos`. `/sites/MLC` solo expone top-level, así que `getCategories()` no las devuelve.

Fix: mapa `VIRTUAL_CATEGORY_IDS` (exportado) + override en `getCategoryBySlug()`:

```ts
if (virtualId = VIRTUAL_CATEGORY_IDS[slug]) {
  const cat = await getCategory(virtualId)  // GET /categories/{id} sí acepta subcategorías
  return { ...cat, slug, name: VIRTUAL_CATEGORY_NAMES[slug] ?? cat.name }
}
```

Override de `slug` preserva la URL pública; override de `name` humaniza ("Refrigeradores" en lugar de "Refrigeración" que devuelve ML). `generateStaticParams()` extiende los paths SSG incluyendo las keys del mapa.

Mapeos actuales:

| Slug público | ID ML subcategoría | Nombre ML original | Nombre override |
|---|---|---|---|
| `refrigeradores` | MLC1576 | Refrigeración | Refrigeradores |
| `lavadoras` | MLC1578 | Lavado | Lavadoras |

Para agregar una subcategoría virtual: (1) encontrar ID vía `GET /categories/{parentId}` en `children_categories`; (2) agregar a ambos mapas + entry en `category-descriptions.ts` + opcional `category-products.ts`.

---

## 9. `GET /items/{id}` — solo funciona con IDs de listings activos (confirmado 2026-04-22)

**Causa confirmada:** IDs hardcodeados eran listings individuales de vendedores → expiran cuando el vendedor cierra el anuncio. NO es bloqueo de endpoint — el endpoint sí funciona con IDs válidos de listings activos.

**Problema derivado:** no hay forma de obtener IDs frescos de listings sin `/search` (bloqueado 403). Ver §10 para intento con highlights.

---

## 10. `/highlights/{site}/category/{id}` — FUNCIONA en MLC (confirmado 2026-04-22)

**Endpoint:** `GET /highlights/MLC/category/{categoryId}` con OAuth → 200, retorna `{ content: [{ id, position, type }] }`.

**Quirk crítico:** los IDs retornados son **catalog product IDs** (tipo `"PRODUCT"` con IDs como `MLC30395039`), NO listing IDs de vendedores individuales. Estas IDs dan 404 en `GET /items/{id}`.

**Fix intentado y descartado:** `buy_box_winner` en `GET /products/{catalogId}` → `null` en todos los productos MLC. No usable.

**Fix actual (funciona):** `GET /products/{catalogId}/items?limit=1` → retorna listings activos del catálogo en MLC. Devuelve `{ results: [{ item_id, price, currency_id, condition }] }`. Si `results[0]` existe → hay listing activo.

**Implementación actual** (`lib/meli/meli-client.ts`):
1. `GET /highlights/{SITE}/category/{catId}` → catalog IDs
2. Para cada catalog ID, en paralelo:
   - `GET /products/{id}` → `{ name, pictures[0].url }`
   - `GET /products/{id}/items?limit=1` → `{ results[0].{ price, currency_id, condition } }`
3. Si `results[0]` null → skip (throw 'no active items')
4. Thumbnail: `pictures[0].url.replace('http://','https://').replace(/-[A-Z]\.jpg$/, '-F.jpg')` — fuerza HTTPS + tamaño F (alta calidad); catálogo devuelve `-O.jpg` (original), regex baja a `-F` para evitar imágenes enormes
5. `permalink` = `https://www.mercadolibre.cl/p/{catalogId}`

**Bug histórico:** versión anterior usaba `-I.jpg` → imágenes borrosas. Fixed en 2026-04-22.

**Debug endpoint:** `GET /api/highlights?slug={slug}` o `?category={id}` — retorna `{ categoryId, count, products }`.
