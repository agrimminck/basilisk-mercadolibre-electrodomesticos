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

## Estado indexing — snapshot 2026-03-28

| Item | Status |
|---|---|
| GSC registration (verification meta tag) | ✅ Verificado |
| Sitemap submission GSC | ⚠️ Error "Sitemap could not be read" — Bing lo lee OK (11 URLs); posible cache lag GSC |
| Homepage indexada GSC | ✅ |
| Categorías indexadas | ⏳ Pendiente (3-5 días post-request + backlinks) |
| Bing Webmaster Tools | ⚠️ Registrado + sitemap found (11 URLs); ownership verification pending (`BingSiteAuth.xml` en `public/`) |

---

## Acciones indexación pendientes

- [ ] Resubmit sitemap a GSC (delete + re-add) si error persiste 24-48h.
- [ ] Colocar `BingSiteAuth.xml` en `apps/web/public/` para completar verificación Bing.
- [ ] Manual indexing requests en GSC: home + 5 categorías populares (computacion, celulares, electrodomesticos, televisores, herramientas). Límite ~10/día.
- [ ] Monitorear GSC cada 3-5 días.

---

## Notas

- Si rediseño UI con claude design cambia jerarquía de rutas → validar que `sitemap.ts` + JSON-LD schemas siguen correctos post-rediseño.
- Meta titles y descriptions de home + categorías populares revisados 2026-03-28.
