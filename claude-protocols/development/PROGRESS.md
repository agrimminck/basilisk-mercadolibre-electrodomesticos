# PROGRESS.md — Desarrollo

## Iteration Index: 14
## Plan Index: 14

**Última actualización:** 2026-03-28

---

## Iteración 9 — Checklist

- [x] `curl https://web-ten-beige-23.vercel.app/api/categories` responde 200
- [x] `curl "https://web-ten-beige-23.vercel.app/api/search?q=notebook"` responde 200
- [x] Home carga con grid de categorías reales sin errores
- [x] Clic en categoría del home abre ML en nueva pestaña con `meli_affiliate_id` en la URL
- [x] Buscar desde home navega a `/buscar?q=X` y redirige a ML con affiliate ID
- [x] `npx tsc --noEmit` sin errores
- [x] Ningún archivo supera 200 líneas

---

## Iteración 10 — Checklist

- [x] El diseño (Tailwind CSS) carga correctamente en Vercel
- [x] Fondo oscuro (`slate-900`) visible en home
- [x] Clases de color y layout aplicadas en categorías y header

---

## Iteración 11 — Checklist

- [x] Sección "Destacados" visible en la home entre el Hero y las Categorías
- [x] Cada tarjeta de producto enlaza a ML con `meli_affiliate_id` en la URL
- [x] Badge opcional se muestra en los productos que lo tienen
- [x] `npx tsc --noEmit` sin errores

---

## Iteración 12 — Checklist

- [ ] Dominio comprado
- [ ] Dominio agregado en Vercel
- [ ] DNS configurado y propagado
- [ ] `NEXT_PUBLIC_SITE_URL` actualizada en Vercel
- [ ] `sitemap.xml` apunta al dominio nuevo
- [ ] Redeploy exitoso

---

## Iteración 13 — Checklist

- [x] Sitio registrado en Google Search Console
- [x] Sitemap enviado a Google
- [x] Meta titles y descriptions revisados en home y categorías principales
- [x] Página de aterrizaje creada para al menos 2 categorías populares (notebooks, celulares)
- [ ] (Opcional) Perfil en redes sociales creado con link al sitio

---

## Iteración 14 — Checklist

- [ ] Verificar estado del sitemap en GSC (estado "Éxito", URLs > 0)
- [ ] Solicitar indexación manual en GSC: homepage + 5 categorías principales
- [ ] Registrar sitio en Bing Webmaster Tools y enviar sitemap
- [x] JSON-LD WebSite agregado en homepage
- [x] JSON-LD CollectionPage + BreadcrumbList en páginas de categoría
- [x] `npx tsc --noEmit` sin errores
- [ ] Rich Results Test sin errores (tras deploy)
