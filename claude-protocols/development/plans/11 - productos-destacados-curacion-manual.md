# Plan 11 — Productos Destacados (Curación Manual)

## Contexto
La home solo muestra 10 categorías. No hay productos visibles, lo que reduce el CTR de afiliado. La API de búsqueda de ML está bloqueada, por lo que no se pueden obtener productos dinámicamente. La solución es mostrar productos curados manualmente con links directos a ML + affiliate ID.

## Objetivo
Sección "Destacados" en la home con 8–10 productos curados. Cada tarjeta enlaza directamente a MercadoLibre Chile con el `meli_affiliate_id`. Los datos viven en `lib/data/featured-products.ts` — editable sin tocar componentes.

## Pasos de implementación

1. **`apps/web/lib/data/featured-products.ts`** (nuevo)
   - Definir tipo `FeaturedProduct`: `id`, `title`, `price`, `currency`, `thumbnail`, `permalink`, `condition`, `badge?`
   - Exportar array `featuredProducts` con 8 productos de categorías populares en Chile
   - Comentarios indicando cómo actualizar con productos reales de ML

2. **`apps/web/components/products/FeaturedProductCard.tsx`** (nuevo)
   - Componente `FeaturedProductCard` que recibe `FeaturedProduct`
   - Usa `<a>` con `target="_blank"` y `rel="noopener noreferrer sponsored"`, enlaza a `buildProductUrl(product.permalink)`
   - Usa `<img>` (no Next.js Image) para evitar restricciones de dominio con imágenes de placeholder
   - Muestra badge opcional en esquina superior izquierda
   - Diseño consistente con `ProductCard` (fondo zinc-900, hover amber)

3. **`apps/web/app/page.tsx`** (modificado)
   - Importar `FeaturedProductCard` y `featuredProducts`
   - Agregar sección "Destacados" entre el Hero y las Categorías
   - Grid `grid-cols-2 sm:grid-cols-3 md:grid-cols-4`

## Decisiones técnicas
- Usar `<img>` nativo en lugar de `next/image` en FeaturedProductCard: los thumbnails de los productos curados pueden venir de cualquier dominio hasta que el usuario los actualice con URLs reales de mlstatic.com
- Datos en TypeScript (no JSON): permite type-checking y autocompletado
- Sin DB en este plan: la curación manual en código es suficiente para la Fase 5+ donde se agregará admin panel

## Verificación
- [ ] Sección "Destacados" visible en la home entre el Hero y las Categorías
- [ ] Cada tarjeta de producto enlaza a ML con `meli_affiliate_id` en la URL
- [ ] Badge opcional se muestra en los productos que lo tienen
- [ ] `npx tsc --noEmit` sin errores
