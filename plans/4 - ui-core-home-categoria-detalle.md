# Plan 4 — UI Core: Home, Categoría, Detalle, Búsqueda

## Contexto
Las API Routes están listas (Iteración 3). Ahora hay que construir la UI que las consume. Todo con Server Components de Next.js 15 App Router — sin `useEffect` para fetch, sin estado cliente innecesario. La identidad visual: fondos oscuros `slate-900`/`zinc-900`, acentos dorados `amber-400`.

## Objetivo
Tener la aplicación navegable end-to-end: Home con categorías y productos destacados, listado por categoría, detalle de producto y búsqueda full-text.

## Pasos de implementación

### Componentes atómicos (`components/ui/`)
1. `Badge.tsx` — pill `new`/`used` con color diferenciado
2. `Spinner.tsx` — spinner SVG animado para Suspense fallbacks

### Layout (`components/layout/`)
3. `Header.tsx` — logo "Mejores Ofertas" (amber) + `SearchBar` centrado
4. `Footer.tsx` — texto simple de copyright

### Productos (`components/products/`)
5. `ProductCard.tsx` — imagen `aspect-square`, título truncado, precio formateado, badge condición, link a `/producto/[id]`
6. `ProductGrid.tsx` — grid responsivo con `gap`, recibe `products: Product[]`
7. `ProductSkeleton.tsx` — N tarjetas skeleton para Suspense

### Búsqueda (`components/search/`)
8. `SearchBar.tsx` — Client Component, input controlado, navega a `/buscar?q=` on submit

### Páginas
9. `app/layout.tsx` — envolver `children` en `<Header>` + `<Footer>`
10. `app/page.tsx` — Home: fetch categorías + productos de primera categoría; grid de categorías + `ProductGrid`
11. `app/[category]/page.tsx` — Server Component: fetch `getCategoryProducts(params.category)`, renderiza `ProductGrid` + paginación simple (prev/next links)
12. `app/producto/[id]/page.tsx` — Server Component: fetch `getProduct(params.id)`, imagen grande, precio, atributos, botón "Comprar en MercadoLibre"
13. `app/buscar/page.tsx` — Server Component: lee `searchParams.q`, fetch `searchProducts`, renderiza `ProductGrid`

## Decisiones técnicas
- Ruta de detalle: `/producto/[id]` (no slug) — sin DB no se puede resolver slug → ID; cuando llegue la DB se agrega rewrite
- `SearchBar` es el único Client Component de esta iteración — necesita estado para el input
- Precios: `Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })` — sin utilidad externa
- `next/image` para todas las imágenes de producto — optimización automática
- Sin paginación compleja: solo `?offset=` en links prev/next

## Verificación
- [ ] Home carga y muestra grid de categorías + productos
- [ ] Clic en categoría navega a `/[category]` y muestra productos
- [ ] Clic en producto navega a `/producto/[id]` y muestra detalle
- [ ] Búsqueda desde Header navega a `/buscar?q=` y muestra resultados
- [ ] `npx tsc --noEmit` sin errores
- [ ] Ningún archivo supera 200 líneas
