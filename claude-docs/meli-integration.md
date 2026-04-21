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

| Endpoint | Uso en código |
|---|---|
| `POST /oauth/token` | `getAccessToken()` |
| `GET /sites/{id}` | `getCategories()` (via `.categories`) |
| `GET /categories/{id}` | `getCategory(id)`, `getCategoryBySlug()` |
| `GET /items/{id}` | `getProduct(id)` |

Response shape item: `id, title, price, currency_id, thumbnail, permalink, condition, attributes[]`.
