# seo-metadata — sitemap + JSON-LD + indexing

Setup SEO técnico para acelerar indexación Google + Bing. **Estado snapshot 2026-03-28** — validar al tocar cualquier sección.

---

## sitemap.xml

**Archivo:** `apps/web/public/sitemap.xml` — estático. (Doc previa decía dinámico `app/sitemap.ts`; realidad: estático en public. Al agregar/renombrar slug → actualizar manualmente.)

Incluye home `/` + 10 categorías canónicas (top-level ML reales + virtuales `refrigeradores` / `lavadoras`). **No** incluye slugs alias (`electrodomesticos-y-aire-acondicionado`, etc.) — canonical metadata ya los resuelve al slug real.

Dominio base hardcoded: `https://web-ten-beige-23.vercel.app` (literal). Cambio de dominio → find/replace en el XML + redeploy. Opcional: migrar a `app/sitemap.ts` dinámico si los slugs van a rotar con frecuencia.

Crawled por GSC + Bing (2026-03-28).

---

## robots.ts

Bloquea `/api/*`. Todo lo demás allow. Incluye directiva `Sitemap:` → `{NEXT_PUBLIC_SITE_URL}/sitemap.xml`.

---

## JSON-LD structured data

| Página | Schema |
|---|---|
| `/` (home) | `WebSite` (name, url, searchAction opcional) |
| `/[category]` | `CollectionPage` + `BreadcrumbList` |

Inyectado como `<script type="application/ld+json">` en layout/page correspondiente.

Validar cambios con: https://search.google.com/test/rich-results

---

## Metadata strategy

- `app/layout.tsx` — metadata base (template title, OG fallback, verification Google en `metadata.verification.google`).
- Cada `page.tsx` override con `generateMetadata()` async — evita fetches duplicados gracias a Next.js fetch cache.
- `app/opengraph-image.tsx` — OG image fallback global.

---

## Estado indexing — snapshot 2026-04-23

**SITIO BLOQUEADO** — `middleware.ts` devuelve 404 en todas las rutas. No indexar hasta que esté listo.

| Item | Status |
|---|---|
| GSC registration (verification meta tag) | ✅ Verificado |
| Páginas indexadas GSC | ✅ Ninguna (GSC confirma 0 URLs indexadas — bueno) |
| Sitemap submission GSC | ⏸ Pendiente hasta que sitio esté listo |
| Bing Webmaster Tools | ⏸ Pendiente hasta que sitio esté listo |

---

## Acciones indexación pendientes (hacer cuando sitio esté listo)

1. **Quitar middleware:** eliminar `apps/web/middleware.ts` → commit + push → verificar que rutas responden 200.
2. **Bing verification:** descargar `BingSiteAuth.xml` desde bing.com/webmasters → colocar en `apps/web/public/` → commit + push → clic "Verify" → submit sitemap.
3. **GSC sitemap:** submit `{NEXT_PUBLIC_SITE_URL}/sitemap.xml` en GSC → Coverage.
4. **GSC manual indexing:** solicitar indexación para home + 5 categorías canónicas (electrodomesticos, electronica-audio-y-video, computacion, celulares-y-telefonia, herramientas) + 2 virtuales (refrigeradores, lavadoras). Límite ~10/día → 1-2 días. URLs alias viejas NO pedir indexación — `alternates.canonical` apunta al slug real, Google consolida.
5. **JSON-LD:** validar en https://search.google.com/test/rich-results — home debe detectar `WebSite` + `SearchAction`; categoría debe detectar `CollectionPage` + `BreadcrumbList`.
6. Monitorear GSC cada 3-5 días post-request.

---

## Notas

- Si rediseño UI con claude design cambia jerarquía de rutas → validar que `sitemap.ts` + JSON-LD schemas siguen correctos post-rediseño.
- Meta titles y descriptions de home + categorías populares revisados 2026-03-28.
