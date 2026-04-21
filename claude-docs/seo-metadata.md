# seo-metadata — sitemap + JSON-LD + indexing

Setup SEO técnico para acelerar indexación Google + Bing. **Estado snapshot 2026-03-28** — validar al tocar cualquier sección.

---

## sitemap.ts

**Archivo:** `apps/web/app/sitemap.ts` — dinámico.

Incluye:
- Home `/`
- Todas las categorías del top10 (`/[category]`)

Dominio base: `NEXT_PUBLIC_SITE_URL`. Cambio de dominio → actualizar env var + redeploy → sitemap regenerado con URL nueva.

Crawled por GSC + Bing (2026-03-28). Si rediseño UI agrega/remueve rutas, `generateStaticParams` regenera → sitemap refleja auto.

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

## Estado indexing — snapshot 2026-04-21

| Item | Status |
|---|---|
| GSC registration (verification meta tag) | ✅ Verificado |
| Sitemap submission GSC | ⚠️ Error "Sitemap could not be read" — Bing lo lee OK (11 URLs); posible cache lag GSC |
| Homepage indexada GSC | ✅ |
| Categorías indexadas | ⏳ Pendiente (manual indexing requests pendiente) |
| Bing Webmaster Tools | ⚠️ Registrado + sitemap found (11 URLs); ownership verification pending (`BingSiteAuth.xml` falta en `public/`) |

---

## Acciones indexación pendientes

- [ ] **Bing verification:** descargar `BingSiteAuth.xml` desde bing.com/webmasters → colocar en `apps/web/public/` → commit + push → clic "Verify" en Bing → submit sitemap.
- [ ] **GSC manual indexing:** solicitar indexación para home + 5 categorías (electrodomesticos-y-aires-acondicionado, television-audio-y-video, computacion, celulares-y-telefonia, herramientas-y-construccion). Límite ~10/día → 1-2 días.
- [ ] **JSON-LD post-rediseño:** validar en https://search.google.com/test/rich-results — home debe detectar `WebSite` + `SearchAction`; categoría debe detectar `CollectionPage` + `BreadcrumbList`.
- [ ] Monitorear GSC cada 3-5 días post-request.

---

## Notas

- Si rediseño UI con claude design cambia jerarquía de rutas → validar que `sitemap.ts` + JSON-LD schemas siguen correctos post-rediseño.
- Meta titles y descriptions de home + categorías populares revisados 2026-03-28.
