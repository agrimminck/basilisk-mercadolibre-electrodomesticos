# Iteración 8 — OAuth Client Credentials ML

**Prompt resumido:** La API de ML ahora requiere Bearer token incluso para endpoints públicos. Implementar flujo OAuth 2.0 client_credentials para obtener access_token y usarlo en todas las llamadas del meli-client.
**Archivos afectados:** `apps/web/lib/meli/meli-auth.ts` (nuevo), `apps/web/lib/meli/meli-client.ts`
