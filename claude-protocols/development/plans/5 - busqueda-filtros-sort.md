# Plan 5 — Búsqueda con Filtros y Sort

## Contexto
La búsqueda básica ya funciona (`/buscar?q=`). Ahora hay que potenciarla con filtros reales que la API de ML soporta: ordenamiento por precio/relevancia, filtro por condición (nuevo/usado) y rango de precio. El estado de filtros vive en la URL (searchParams) — sin estado cliente, sin librerías adicionales.

## Objetivo
Las páginas `/buscar` y `/[category]` muestran un `FilterPanel` con controles de sort, condición y precio. Al cambiar filtros se actualiza la URL y el Server Component refetch con los nuevos parámetros. El cliente ML pasa esos filtros a la API de ML.

## Pasos de implementación

1. **`types/index.ts`** — agregar tipo `SearchFilters`:
   ```ts
   export interface SearchFilters {
     sort?: 'relevance' | 'price_asc' | 'price_desc'
     condition?: 'new' | 'used'
     priceMin?: number
     priceMax?: number
   }
   ```

2. **`lib/meli/meli-client.ts`** — actualizar `searchProducts` y `getCategoryProducts`:
   - Aceptar tercer/cuarto parámetro `filters?: SearchFilters`
   - Mapear `filters.sort` → `sort=price_asc|price_desc` (relevance = omitir el param)
   - Mapear `filters.condition` → `condition=new|used`
   - Mapear `filters.priceMin`/`priceMax` → `price=MIN-MAX` (wildcards con `*` si falta uno)

3. **`components/search/FilterPanel.tsx`** — nuevo Client Component:
   - Props: `{ basePath: string; params: Record<string, string> }` donde `basePath` es `/buscar` o `/[category]` y `params` los searchParams actuales
   - Sort: `<select>` con opciones relevancia/precio↑/precio↓ — `onChange` → `router.push(newUrl)` inmediato
   - Condición: tres botones pill (Todos / Nuevo / Usado) — click → `router.push(newUrl)` inmediato
   - Precio: dos `<input type="number">` + botón "Aplicar" — solo navega al submit
   - Construir URL: copiar `params`, setear/eliminar claves, resetear `offset` a 0

4. **`app/buscar/page.tsx`** — leer `sort`, `condition`, `price_min`, `price_max` de searchParams:
   - Construir `SearchFilters` y pasar a `searchProducts`
   - Renderizar `<FilterPanel>` encima del grid con `basePath="/buscar"` y params actuales

5. **`app/[category]/page.tsx`** — mismo patrón que buscar/page:
   - Leer filtros de searchParams
   - Pasar a `getCategoryProducts`
   - Renderizar `<FilterPanel>` con `basePath={`/${category}`}`

## Decisiones técnicas
- Estado de filtros en URL: cero estado cliente, funciona con JS desactivado para sort/condition (forms), compatible con SSR
- `relevance` no envía param `sort` a ML (comportamiento default de la API)
- `price=*-MAX` y `price=MIN-*` usan wildcard de ML; si ambos están presentes: `price=MIN-MAX`
- `FilterPanel` recibe `params` como `Record<string, string>` (serializado desde `searchParams`) para que sea serializable (Server → Client boundary)
- No se añade paginación más compleja en esta iteración

## Verificación
- [ ] En `/buscar?q=laptop`, el FilterPanel se muestra con los controles de sort, condición y precio
- [ ] Cambiar sort a "Precio: menor a mayor" navega a `?q=laptop&sort=price_asc` y los resultados cambian
- [ ] Filtrar por condición "Nuevo" navega a `?q=laptop&condition=new`
- [ ] Ingresar precio máximo 500000 y aplicar navega a `?q=laptop&price_max=500000`
- [ ] Los mismos filtros funcionan en `/[category]`
- [ ] `npx tsc --noEmit` sin errores
- [ ] Ningún archivo supera 200 líneas
