# Plan 9 — Opción 1: Links de afiliado a MercadoLibre

## Contexto
ML bloqueó globalmente `/sites/MLC/search` (403 para todas las apps, IPs y tokens). La única opción viable sin escalar a partner oficial es el modelo estándar de afiliados: generar URLs de ML con `?meli_affiliate_id=TRACKING_ID` y redirigir al usuario. `/sites/MLC` (sin `/categories`) y `/categories/{id}` siguen funcionando para obtener listados y nombres.

## Objetivo
Que el sitio funcione end-to-end en Vercel: las categorías se obtienen de la API real, la búsqueda y la navegación por categoría redirigen a ML con tracking de afiliado.

## Pasos de implementación

1. **`types/index.ts`** — Hacer `totalItems` opcional en `Category` (los datos de `/sites/MLC` no lo incluyen)

2. **`lib/meli/meli-client.ts`** — Corregir `getCategories()`:
   - Agregar tipos `MeliRawSiteCategory` y `MeliRawSiteResponse`
   - Cambiar endpoint de `/sites/${SITE_ID}/categories` (403) a `/sites/${SITE_ID}` y extraer `.categories`
   - Eliminar `searchProducts` y `getCategoryProducts` (endpoint bloqueado, ya no se usan)

3. **`lib/meli/meli-transforms.ts`** — Agregar `transformSiteCategory()` para el formato simple `{id, name}`

4. **`lib/utils/affiliate.ts`** (nuevo) — Helpers para construir URLs de afiliado:
   - `buildSearchUrl(query)` → `https://listado.mercadolibre.cl/{query}?meli_affiliate_id=...`
   - `buildCategoryUrl(categoryId)` → `https://www.mercadolibre.cl/c/{id}?meli_affiliate_id=...`
   - `buildProductUrl(permalink)` → agrega `?meli_affiliate_id=...` al permalink existente

5. **`app/page.tsx`** — Actualizar home:
   - Remover `getCategoryProducts` (eliminado del cliente)
   - Links de categorías apuntan a ML con affiliate ID (no a ruta interna `/[category]`)
   - Agregar sección hero con barra de búsqueda

6. **`app/buscar/page.tsx`** — Simplificar a redirect:
   - Si hay query → `redirect(buildSearchUrl(query))`
   - Si no hay query → mostrar `SearchBar`
   - Eliminar imports de ProductGrid, FilterPanel

7. **`app/[category]/page.tsx`** — Landing de categoría:
   - Remover `getCategoryProducts` (eliminado)
   - Mantener `getCategory()` para metadata SEO
   - Mostrar nombre de categoría + CTA "Ver en MercadoLibre →"
   - Eliminar imports de ProductGrid, FilterPanel

8. **`app/producto/[id]/page.tsx`** — Agregar affiliate ID al permalink del botón "Comprar"

9. **`app/api/search/route.ts`** — Cambiar respuesta: en lugar de llamar ML API, retornar `{data: {url: buildSearchUrl(q)}}`

10. **`app/api/products/route.ts`** — Remover `getCategoryProducts` del import; solo mantener `getProduct` para `?id=`

## Decisiones técnicas
- Links de categoría en home abren ML en `target="_blank"` para mantener al usuario en el sitio
- `redirect()` en `/buscar` usa el redirect de Next.js (307) — preserva tracking en Vercel
- `buildSearchUrl` usa el slug de ML (`listado.mercadolibre.cl/{query}`) para mejor compatibilidad
- `MELI_AFFILIATE_ID` se lee server-side en `affiliate.ts`; no se necesita prefijo `NEXT_PUBLIC_`

## Verificación
- [ ] `curl https://web-ten-beige-23.vercel.app/api/categories` responde 200 con array de categorías
- [ ] `curl "https://web-ten-beige-23.vercel.app/api/search?q=notebook"` responde 200 con `{data: {url: "...mercadolibre..."}}`
- [ ] Home carga con grid de categorías reales sin errores
- [ ] Clic en categoría del home abre ML en nueva pestaña con `meli_affiliate_id` en la URL
- [ ] Buscar desde home navega a `/buscar?q=X` y redirige a ML con affiliate ID
- [ ] `npx tsc --noEmit` sin errores
- [ ] Ningún archivo supera 200 líneas
