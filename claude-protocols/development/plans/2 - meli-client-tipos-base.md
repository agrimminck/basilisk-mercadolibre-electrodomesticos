# Plan 2 — Cliente HTTP de Mercado Libre

## Contexto
La Fase 2 requiere integración con la API pública de Mercado Libre (sitio MLC - Chile). El cliente debe encapsular toda la lógica de comunicación HTTP, autenticación por App ID, y transformación de respuestas al schema interno.

## Objetivo
Tener `meli-client.ts` funcional con métodos para buscar productos, obtener detalle y listar categorías; y `meli-transforms.ts` para mapear respuestas crudas de ML a los tipos internos definidos en `types/index.ts`.

## Pasos de implementación
1. Crear `apps/web/lib/meli/meli-client.ts` con:
   - Tipos internos para respuestas crudas de la API de ML
   - Clase `MeliClient` con `baseUrl`, `siteId`, y métodos `search()`, `getProduct()`, `getCategories()`, `getCategoryProducts()`
   - Uso de `fetch` nativo (sin librerías externas)
   - Headers con `User-Agent` del proyecto
2. Crear `apps/web/lib/meli/meli-transforms.ts` con:
   - `transformProduct()`: ML item crudo → `Product`
   - `transformCategory()`: ML category cruda → `Category`
   - `transformSearchResult()`: ML search cruda → `SearchResult`
3. Crear `docs/API_MELI.md` con documentación de los endpoints usados.

## Decisiones técnicas
- Sin OAuth por ahora: la API pública de ML no requiere autenticación para búsquedas y listings
- `fetch` nativo de Node 18+/Next.js 15 — sin axios ni node-fetch
- El `MELI_APP_ID` se incluye como query param `app_id` cuando está disponible para mejorar rate limits
- Slugs generados desde el título en `meli-transforms.ts`

## Verificación
- [ ] `meli-client.ts` compila sin errores TypeScript
- [ ] `meli-transforms.ts` mapea correctamente los campos requeridos
- [ ] Los métodos del cliente retornan los tipos internos correctos
