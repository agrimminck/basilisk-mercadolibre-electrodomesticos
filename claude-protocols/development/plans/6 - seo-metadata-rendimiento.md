# Plan 6 — SEO, Metadata y Rendimiento

## Contexto
El núcleo funcional está completo (API → UI → búsqueda/filtros). Para una plataforma de afiliados, el tráfico orgánico es crítico. Sin metadata correcta, Google no puede indexar las páginas de producto ni de categoría. Sin optimización de imágenes y loading states, la experiencia percibida es lenta.

## Objetivo
Todas las páginas tienen metadata dinámica (title, description, OG), el sitio tiene `sitemap.xml` y `robots.txt`, las imágenes usan `next/image`, y cada ruta tiene su `loading.tsx` y `error.tsx`.

## Pasos de implementación

1. **`app/layout.tsx`** — metadata base (fallback global)
   - Definir `metadata` con `title.template`, `description`, `openGraph` base, `twitter` card
   - Agregar `metadataBase` usando `NEXT_PUBLIC_SITE_URL`

2. **`app/page.tsx`** — metadata estática del Home
   - Exportar `metadata` con título y descripción para la home

3. **`app/[category]/page.tsx`** — `generateMetadata()` dinámico
   - Recibir `params.category`, buscar nombre de categoría vía API
   - Retornar title/description/OG con nombre y URL canónica

4. **`app/producto/[slug]/page.tsx`** — `generateMetadata()` dinámico
   - Recibir `params.slug` (es el ID del producto), fetch del producto
   - Retornar title con nombre del producto, description con precio y condición, OG con imagen

5. **`app/buscar/page.tsx`** — metadata con searchParams
   - Usar `searchParams.q` para generar título dinámico: `"laptop" — Búsqueda`

6. **`app/sitemap.ts`** — sitemap dinámico
   - Fetch de categorías activas desde `/api/categories`
   - Retornar array de `{ url, lastModified, changeFrequency, priority }`
   - Incluir Home + todas las URLs de categoría

7. **`app/robots.ts`** — robots.txt
   - Permitir todo excepto `/api/`
   - Apuntar al sitemap

8. **`app/loading.tsx`** — loading global (skeleton fallback)
   - Spinner centrado con fondo oscuro, reutiliza `Spinner` existente

9. **`app/[category]/loading.tsx`** — skeleton de grilla de categoría
   - Reutiliza `ProductSkeleton` en grid 4 columnas

10. **`app/buscar/loading.tsx`** — skeleton de resultados de búsqueda
    - Mismo patrón que categoría

11. **`app/error.tsx`** — error boundary global
    - Mensaje amigable con botón "Intentar de nuevo" (`reset()`)

12. **`app/[category]/error.tsx`** y **`app/buscar/error.tsx`**
    - Error inline con texto contextualizado a cada sección

13. **`app/not-found.tsx`** — página 404
    - Mensaje con link a home y buscador sugerido

14. **Imágenes con `next/image`**
    - Revisar `ProductCard.tsx` y `app/producto/[slug]/page.tsx`
    - Reemplazar `<img>` por `<Image>` con `sizes` apropiado
    - Agregar dominio de ML a `next.config.js` (`images.remotePatterns`)

## Decisiones técnicas
- `generateMetadata()` async permite fetch real de datos — sin duplicar fetches gracias al caché de `fetch` de Next.js (mismo URL = misma request en el render)
- `sitemap.ts` solo incluye categorías, no productos individuales (demasiados; se puede expandir en Fase 7)
- `error.tsx` usa `"use client"` — requerimiento de Next.js para error boundaries
- Los `loading.tsx` en rutas anidadas reemplazan el loading global solo para ese segmento

## Verificación
- [ ] `<title>` en home muestra el nombre del sitio
- [ ] `<title>` en `/[category]` muestra el nombre de la categoría
- [ ] `<title>` en `/producto/[id]` muestra el nombre del producto
- [ ] `<title>` en `/buscar?q=laptop` muestra `"laptop" — Búsqueda`
- [ ] `GET /sitemap.xml` responde con URLs de categorías
- [ ] `GET /robots.txt` existe y bloquea `/api/`
- [ ] Navegar a `/[category]` mientras carga muestra skeleton de productos
- [ ] Navegar a una URL inexistente muestra la página 404
- [ ] `npx tsc --noEmit` sin errores
- [ ] Ningún archivo supera 200 líneas
