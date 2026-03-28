# Bitácora — Iteración 13: Tráfico inicial

## Hallazgos y decisiones

### Google Search Console verificado ✅
- Meta tag de verificación agregada via `metadata.verification.google` en `layout.tsx` (Next.js la inyecta en `<head>` automáticamente).

### URLs de categorías migradas a slugs ✅
- **Problema detectado:** el sitemap y los links del home usaban IDs de ML (`/MLC1747`) en lugar de slugs legibles (`/notebooks`). Malo para SEO.
- **Solución:** se agregó `getCategoryBySlug(slug)` en `meli-client.ts` que resuelve slug → ID usando el listado cacheado de `getCategories()`.
- `[category]/page.tsx`, `page.tsx` y `sitemap.ts` actualizados para usar slugs.

### Páginas de categoría ahora estáticas + ISR ✅
- Se agregó `generateStaticParams()` en `[category]/page.tsx` → Next.js genera HTML estático en build para cada categoría.
- `revalidate = 3600` en categorías y home → se regeneran cada hora sin rebuild completo.
- Antes tenía `force-dynamic` en home (cada request llamaba a la API de ML).

### OG image creada ✅
- `app/opengraph-image.tsx` con `ImageResponse` (edge runtime).
- Diseño: fondo `slate-900`, título blanco, subtítulo gris, botón ámbar. Tamaño estándar 1200×630.
- Sin imagen OG los shares en redes sociales salían con preview vacío.

## Pendientes
- [ ] Enviar sitemap a Google Search Console (acción manual)
- [ ] Perfil en redes sociales (opcional)
