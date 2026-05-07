# seo-metadata — sitemap + JSON-LD + indexing

Setup SEO técnico para acelerar indexación Google + Bing. **Estado snapshot 2026-03-28** — validar al tocar cualquier sección.

---

## sitemap.xml

**Archivo:** `apps/web/public/sitemap.xml` — estático.

Incluye home `/` + 10 categorías canónicas (top-level ML reales + virtuales `refrigeradores` / `lavadoras`). **No** incluye slugs alias (`electrodomesticos-y-aire-acondicionado`, etc.) — canonical metadata ya los resuelve al slug real.

Dominio base: `https://topelectrohogar.com` (actualizado 2026-04-21 al setear dominio propio). Al agregar/renombrar slug → actualizar manualmente. Opcional: migrar a `app/sitemap.ts` dinámico si los slugs van a rotar con frecuencia.

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

## Estado indexing — snapshot 2026-05-07

Middleware `apps/web/middleware.ts` no existe en el árbol de archivos (fue eliminado). Sitio live en `https://topelectrohogar.com`.

| Item | Status |
|---|---|
| GSC registration (verification meta tag) | ✅ Verificado |
| Bing verification (`BingSiteAuth.xml`) | ✅ Presente en `apps/web/public/` |
| Sitemap submission GSC | ✅ Enviado (submit 2026-04-21) — monitorear Coverage |
| Bing Webmaster Tools | ✅ XML presente — verificar status en panel Bing |

---

## Acciones pendientes

1. **Monitorear GSC Coverage** — solicitar indexación manual home + 5 categorías si aún no indexadas (límite ~10/día).
2. **JSON-LD:** validar en https://search.google.com/test/rich-results — home debe detectar `WebSite` + `SearchAction`; categoría debe detectar `CollectionPage` + `BreadcrumbList`.
3. Monitorear GSC cada 3-5 días post-request.

---

## Notas

- Si rediseño UI con claude design cambia jerarquía de rutas → validar que `sitemap.ts` + JSON-LD schemas siguen correctos post-rediseño.
- Meta titles y descriptions de home + categorías populares revisados 2026-03-28.
