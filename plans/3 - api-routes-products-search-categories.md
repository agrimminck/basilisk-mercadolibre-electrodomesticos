# Plan 3 — API Routes Products / Search / Categories

## Contexto
Con `meli-client.ts` y `meli-transforms.ts` listos (Iteración 2), el siguiente paso es exponer esa lógica a través de las API Routes de Next.js App Router. Estas rutas son el contrato entre el frontend (Server Components + Client Components) y la API de Mercado Libre.

## Objetivo
Tener los tres endpoints REST funcionando y tipados, listos para ser consumidos desde las páginas de Next.js.

## Pasos de implementación
1. Crear `apps/web/app/api/products/route.ts`
   - `GET ?id=<itemId>` → detalle de producto (`Product`)
   - `GET ?category=<categoryId>` → productos de categoría (`SearchResult`)
   - Límite máximo de 50 items por request
2. Crear `apps/web/app/api/search/route.ts`
   - `GET ?q=<query>&offset=&limit=` → búsqueda paginada (`SearchResult`)
   - Validación: `q` obligatorio
3. Crear `apps/web/app/api/categories/route.ts`
   - `GET` → lista de categorías MLC (`Category[]`)
   - Header `Cache-Control: public, s-maxage=3600` (categorías cambian poco)

## Decisiones técnicas
- Respuesta siempre envuelta en `ApiResponse<T>` para consistencia
- Errores de upstream → HTTP 502 con mensaje descriptivo
- Parámetros numéricos con defaults seguros (offset=0, limit=20, máx 50)
- Sin autenticación en estas rutas (datos públicos de ML)

## Verificación
- [ ] `GET /api/categories` responde `{ data: Category[] }`
- [ ] `GET /api/search?q=notebook` responde `{ data: SearchResult }`
- [ ] `GET /api/products?id=MLC123` responde `{ data: Product }` o error 502
- [ ] `GET /api/products?category=MLC1055` responde `{ data: SearchResult }`
- [ ] TypeScript compila sin errores en los tres archivos
