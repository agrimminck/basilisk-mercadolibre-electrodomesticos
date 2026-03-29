# Iteración 9 — Opción 1: Links de afiliado a MercadoLibre

**Prompt resumido:** Implementar modelo de afiliado puro: todas las búsquedas y categorías redirigen a MercadoLibre con el tracking ID del programa de asociados. Se abandona el consumo de `/sites/MLC/search` (403 confirmado globalmente).

**Archivos afectados:**
- `apps/web/types/index.ts`
- `apps/web/lib/meli/meli-client.ts`
- `apps/web/lib/meli/meli-transforms.ts`
- `apps/web/lib/utils/affiliate.ts` (nuevo)
- `apps/web/app/page.tsx`
- `apps/web/app/buscar/page.tsx`
- `apps/web/app/[category]/page.tsx`
- `apps/web/app/producto/[id]/page.tsx`
- `apps/web/app/api/search/route.ts`
- `apps/web/app/api/products/route.ts`
- `bitacora/8 - oauth-meli-api-policies.md`
