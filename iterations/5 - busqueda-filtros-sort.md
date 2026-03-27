# Iteración 5 — Búsqueda con Filtros y Sort

**Prompt resumido:** Implementar fase 4 del proyecto: añadir filtros (condición, precio) y ordenamiento (relevancia, precio asc/desc) a las páginas de búsqueda y categoría, con estado de filtros en URL (searchParams).

**Archivos afectados:**
- `apps/web/types/index.ts` — agregar tipo `SearchFilters`
- `apps/web/lib/meli/meli-client.ts` — aceptar `SearchFilters` en `searchProducts` y `getCategoryProducts`
- `apps/web/components/search/FilterPanel.tsx` — nuevo Client Component con sort, condición y rango de precio
- `apps/web/app/buscar/page.tsx` — leer filtros de searchParams, renderizar FilterPanel
- `apps/web/app/[category]/page.tsx` — leer filtros de searchParams, renderizar FilterPanel
