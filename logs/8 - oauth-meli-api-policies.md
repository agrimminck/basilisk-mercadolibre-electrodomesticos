# Log 8 — Investigación: OAuth ML y bloqueos de API

**Fecha:** 2026-03-27
**Relacionado con:** Plan 8 — OAuth client_credentials ML

---

## Hallazgos de la sesión

### 1. Problema original
ML cambió su política: `app_id` como query param ya no funciona → 403. Se implementó OAuth `client_credentials` como solución.

### 2. Bug Vercel deploy
El build fallaba con status Error (0ms). Causa: `vercel.json` en raíz del repo tenía `rootDirectory: apps/web`, y el proyecto de Vercel también tenía ese setting en el dashboard → doble nesting `apps/web/apps/web`.
**Fix:** Mover `vercel.json` a `apps/web/` sin el campo `rootDirectory`.

### 3. Fix .gitignore
`apps/web/.gitignore` solo tenía `.vercel`. Se agregaron `.next/` y `node_modules/`.

### 4. OAuth funciona — pero la app no tiene permisos de Products/Search

El token se obtiene correctamente vía `client_credentials`, pero ML bloquea los endpoints de búsqueda con PolicyAgent.

**Tabla de endpoints probados:**

| Endpoint | Auth | Estado | Error |
|----------|------|--------|-------|
| `POST /oauth/token` | — | ✅ 200 | — |
| `GET /users/me` | Bearer | ✅ 200 | — |
| `GET /sites` | Bearer | ✅ 200 | — |
| `GET /sites/MLC` | Bearer | ✅ 200 | incluye lista de categorías con IDs |
| `GET /categories/{id}` | Bearer | ✅ 200 | info completa de categoría |
| `GET /sites/MLC/categories` | Bearer | ❌ 403 | `PA_UNAUTHORIZED_RESULT_FROM_POLICIES` |
| `GET /sites/MLC/categories` | sin auth | ❌ 403 | `PA_UNAUTHORIZED_RESULT_FROM_POLICIES` |
| `GET /sites/MLC/search?q=notebook` | Bearer | ❌ 403 | `forbidden` |
| `GET /sites/MLC/search?category=MLC1648` | Bearer | ❌ 403 | `forbidden` |

**App ID:** `5328276382775702`
**Scopes del token:** `offline_access read write ...` (genéricos, sin acceso a productos)

### 5. Causa probable
El app no tiene habilitados los permisos de Products/Search en el portal de desarrolladores de ML. Necesita activarse en developers.mercadolibre.com → app → sección APIs/Scopes.

---

## Opciones para resolver (pendiente decisión del usuario)

**Opción A — Habilitar permisos en portal ML (recomendado)**
1. Ir a developers.mercadolibre.com → app `5328276382775702`
2. Sección "APIs" o "Scopes" → activar acceso a Products/Search/Categories
3. Verificar que los scopes del nuevo token incluyan acceso a esos endpoints

**Opción B — Reemplazar `getCategories()` usando `/sites/MLC`**
- `/sites/MLC` devuelve la lista de categorías con IDs y nombres → funciona con token actual
- No resuelve el search — parche parcial

**Opción C — Hardcodear categorías + buscar alternativa para productos**
- Hardcodear el listado de categorías MLC (datos ya disponibles)
- Investigar si ML tiene endpoint de affiliate/partner para productos

---

## Estado al cierre de sesión
- Código OAuth implementado y deployado en Vercel ✅
- Build Vercel: Ready ✅
- APIs de productos/búsqueda: bloqueadas ❌
- **Pendiente:** decisión sobre opción A/B/C
