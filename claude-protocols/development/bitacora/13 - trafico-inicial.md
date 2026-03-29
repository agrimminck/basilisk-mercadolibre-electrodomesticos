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

---

## Incidencias

### GSC: "sitemap couldn't be read" (2026-03-28)
- robots.txt y sitemap.xml responden correctamente en el navegador con el contenido esperado.
- GSC falla al leerlo — causa más probable: **mismatch de dominio**.
- Las `<loc>` del sitemap generan URLs con `NEXT_PUBLIC_SITE_URL`. Si el property GSC está registrado con el dominio custom (iteración 12) pero la variable apunta a `web-ten-beige-23.vercel.app`, Google rechaza el sitemap.
- **Acción requerida:** verificar que `NEXT_PUBLIC_SITE_URL` en Vercel coincida exactamente con el dominio del property GSC.
- **Actualización (2026-03-28):** confirmado que ambos dominios son idénticos (`https://web-ten-beige-23.vercel.app`). Mismatch de dominio descartado.
- Causas restantes a investigar: (1) sitemap recién enviado — GSC puede tardar horas/días en procesarlo; (2) posible problema con el Content-Type header que Next.js sirve para `/sitemap.xml`; (3) redirección inesperada en la ruta.

### Acciones de indexación tomadas (2026-03-28)
- Sitemap enviado a GSC — tiempo estimado de procesamiento: 24-72hs.
- Post publicado en Twitter/X con link al sitio — acelera el rastreo via backlink externo.
- Estimado para ver primeras URLs indexadas: 24-48hs desde el tweet.
- **Actualización (2026-03-28):** confirmado que ambos dominios son idénticos (`https://web-ten-beige-23.vercel.app`). Mismatch de dominio descartado.
- Causas restantes a investigar: (1) sitemap recién enviado — GSC puede tardar horas/días en procesarlo; (2) posible problema con el Content-Type header que Next.js sirve para `/sitemap.xml`; (3) redirección inesperada en la ruta.
