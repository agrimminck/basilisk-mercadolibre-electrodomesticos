# Bitácora 8 — Investigación: OAuth ML y bloqueos de API

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

## Opciones para resolver

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

## Sesión 2 — 2026-03-28

### Hallazgos adicionales

#### 6. Portal ML: Permisos analizados
- Sección "Permisos" en el portal no tiene nada relacionado a búsqueda de catálogo.
  - Permisos disponibles: Usuarios, Comunicaciones, Publicación/sincronización, Publicidad, Facturación, Métricas, Promociones, Venta/envíos.
  - Ninguno controla acceso a `/sites/MLC/search`.
- Sección "Tópicos" (Items, Catalog, etc.) son **suscripciones a webhooks**, no permisos de API. No marcar ninguno.
- Flujo OAuth activo: `Client Credentials` ✅ — `Authorization Code` ❌

#### 7. El usuario se unió al Programa de Asociados ML
- Acción tomada el 2026-03-28.
- No produjo cambio inmediato — search sigue dando 403.

#### 8. Descartado: bloqueo de IP de Vercel
- Se probó `curl` desde máquina **local** → también da `forbidden`.
- El bloqueo NO es por IPs de Vercel — es a nivel de cuenta/app o de la API misma.

#### 9. Conclusión actual
- `/sites/MLC/search` devuelve 403 desde cualquier origen (Vercel, local, con o sin Bearer token).
- El programa de asociados puede requerir aprobación manual o un paso adicional no documentado.
- No existe permiso de "búsqueda de catálogo" en el portal estándar de developer.

---

## Posibilidades restantes de Opción A

| # | Acción | Estado |
|---|--------|--------|
| A1 | Revisar portal de ML developer por permisos de búsqueda | ✅ Hecho — no existe ese permiso |
| A2 | Unirse al Programa de Asociados | ✅ Hecho — sin efecto inmediato |
| A3 | Verificar si el programa de asociados genera credenciales/API key propias distintas del developer portal | ⏳ Pendiente |
| A4 | Contactar soporte ML o revisar documentación del programa de asociados para saber si hay un endpoint diferente | ⏳ Pendiente |
| A5 | Probar con `Authorization Code` flow (token de usuario real, no de app) | ⏳ Pendiente — requiere redirect URI y login |

---

## Preguntas pendientes

| # | Pregunta | Estado |
|---|----------|--------|
| 1 | ¿Se habilita el acceso en el portal de ML (Opción A), se implementa la Opción B como parche temporal, o se investiga la Opción C? | ✅ Opción A — agotar posibilidades antes de pasar a B/C |

---

## Sesión 3 — 2026-03-28

### Hallazgos adicionales

#### 10. App nueva (app_id 4575008611790490) — mismo resultado
- Se creó una app nueva desde cero en developers.mercadolibre.cl
- Con `Client Credentials` + `Authorization Code` + "Mercado Libre" en Negocios
- Token obtenido correctamente → search devuelve 403 igual
- Descarta que el bloqueo sea por historial/rate-limit del app anterior

#### 11. Prueba desde celular (IP distinta) — 403
- Confirmado: no es bloqueo de IP
- El endpoint `/sites/MLC/search` devuelve 403 desde cualquier IP, cualquier app, con o sin token

#### 12. MLB (Brazil) también da 403
- No es restricción específica de Chile
- Es una política global de ML para el endpoint de search

#### 13. Conclusión definitiva — Opción A agotada
- ML cerró el endpoint `/sites/MLC/search` para todos los developer apps estándar
- No hay configuración de permisos, programa de asociados, ni app nueva que lo resuelva
- Para acceder requeriría: status oficial de partner de ML o Authorization Code flow con usuario real

---

## Posibilidades restantes de Opción A

| # | Acción | Estado |
|---|--------|--------|
| A1 | Revisar portal de ML developer por permisos de búsqueda | ✅ No existe ese permiso |
| A2 | Unirse al Programa de Asociados | ✅ Hecho — sin efecto |
| A3 | Credenciales propias del programa de asociados | ✅ Solo da MELI_AFFILIATE_ID (tracking ID) |
| A4 | Contactar soporte ML | ⏭ Salteable — días/semanas |
| A5 | App nueva con app_id limpio | ✅ Hecho — mismo resultado 403 |
| A6 | Probar desde IP distinta (celular) | ✅ Hecho — mismo 403 |

**Opción A: AGOTADA** ✅

---

## Preguntas pendientes

| # | Pregunta | Estado |
|---|----------|--------|
| 1 | ¿Opción A, B o C? | ✅ A agotada — pasar a B/C |
| 2 | ¿Usamos el modelo de links de afiliado (redirigir a ML con `MELI_AFFILIATE_ID` en la URL) en lugar de mostrar productos directamente desde la API? | ⏳ Sin respuesta |
| 3 | ¿Armamos Opción B con `/sites/MLC` para categorías + links de afiliado para search? | ⏳ Sin respuesta |
| 4 | ¿O primero investigamos si ML tiene un endpoint específico para afiliados que sí permita búsqueda de productos? | ⏳ Sin respuesta |

---

## Estado al cierre de sesión
- App original (5328276382775702): bloqueada ❌
- App nueva (4575008611790490): credenciales en `apps/api/dist/.env` — también 403 en search
- `MELI_AFFILIATE_ID=ag20260214123344` disponible (tracking ID del programa de asociados)
- **Próximo paso:** verificar si ML tiene endpoint exclusivo para afiliados antes de decidir entre Opción 1 y Opción 3 (ver Sesión 4)

---

## Sesión 4 — 2026-03-28

### Decisión pendiente: Opción 1 vs Opción 3

| Opción | Descripción | Pros | Contras |
|--------|-------------|------|---------|
| 1 | Links de afiliado — redirigir a ML con `?meli_affiliate_id=` | Sin dependencia de API, modelo estándar de afiliados, inmune a cambios de ML | Menos control UX, usuario sale del sitio |
| 3 | Buscar endpoint exclusivo para afiliados en API ML | Control total de UX si existe | Puede no existir; si existe puede requerir aprobación; riesgo de nuevo bloqueo |

**Decisión:** investigar Opción 3 primero con context7 MCP antes de implementar.

### Herramienta configurada: context7 MCP
- Archivo creado: `~/.claude/.mcp.json` con `@upstash/context7-mcp`
- Permite buscar en documentación actualizada de APIs
- **⏳ Pendiente:** reiniciar Claude Code y buscar en docs de ML si existe endpoint de afiliados para búsqueda de productos

### Decisión final

| # | Pregunta | Estado |
|---|----------|--------|
| 2 | ¿Existe endpoint exclusivo para afiliados ML que permita búsqueda de productos? | ✅ No se investiga más — riesgo/beneficio no justifica el costo |
| 3 | ¿Implementamos Opción 1 o Opción 3? | ✅ **Opción 1 seleccionada** — links de afiliado con `?meli_affiliate_id=` |

**Razón:** El modelo de links de afiliado (Opción 1) es el estándar de la industria (como Amazon Associates), no depende de la API de ML y es inmune a futuros cambios de política. Se implementa en iteración 9.
