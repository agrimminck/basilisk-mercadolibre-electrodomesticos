# Plan 8 — OAuth Client Credentials ML

## Contexto
ML cambió su política de acceso: todos los endpoints de la API (incluso los que antes eran públicos como `/sites/MLC/categories`) ahora requieren un Bearer token. El enfoque anterior de pasar `app_id` como query param ya no funciona y retorna 403.

## Objetivo
Implementar el flujo OAuth 2.0 `client_credentials` para obtener un `access_token` en el servidor, cachearlo en memoria (expira en ~6h), y usarlo como `Authorization: Bearer <token>` en todas las llamadas del cliente ML.

## Pasos de implementación

1. Crear `apps/web/lib/meli/meli-auth.ts`:
   - Función `getAccessToken()` que hace POST a `https://api.mercadolibre.com/oauth/token` con `grant_type=client_credentials`, `client_id` y `client_secret`
   - Cache en memoria con expiración (token dura ~21600s, refrescar con 60s de margen)

2. Modificar `apps/web/lib/meli/meli-client.ts`:
   - Quitar `app_id` de `buildUrl()`
   - En `apiFetch()`, llamar `getAccessToken()` y agregar header `Authorization: Bearer <token>`

## Decisiones técnicas
- Cache en memoria (variable de módulo): suficiente para serverless de Vercel; cada instancia cachea su propio token. No se necesita Redis ni DB.
- `client_credentials` no requiere intervención del usuario, es server-to-server puro.
- Mantener `MELI_APP_ID` y `MELI_CLIENT_SECRET` como env vars server-only (sin prefijo `NEXT_PUBLIC_`).

## Verificación
- [ ] `curl https://web-ten-beige-23.vercel.app/api/categories` responde 200 con array de categorías
- [ ] `curl "https://web-ten-beige-23.vercel.app/api/search?q=notebook"` responde 200 con resultados
- [ ] `curl https://web-ten-beige-23.vercel.app/sitemap.xml` responde 200
- [ ] `npx tsc --noEmit` sin errores
- [ ] Ningún archivo supera 200 líneas
