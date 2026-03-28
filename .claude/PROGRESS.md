# PROGRESS.md

## Iteration Index: 10

**Última actualización:** 2026-03-28

---

## Estado Actual: 🟡 Fase 7 en progreso — Deploy a Vercel

| Fase | Nombre | Estado |
|------|--------|--------|
| 1 | Inicialización y Setup | ✅ |
| 2 | Integración API Mercado Libre | ✅ |
| 3 | UI Core — Home, Categorías, Detalle | ✅ |
| 4 | Búsqueda y Filtros | ✅ |
| 5 | Base de datos y caché | ⏳ |
| 6 | SEO, metadata y rendimiento | ✅ |
| 7 | Deploy a Vercel | ⏳ |

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

- [ ] El diseño (Tailwind CSS) carga correctamente en Vercel
- [ ] Fondo oscuro (`slate-900`) visible en home
- [ ] Clases de color y layout aplicadas en categorías y header

---

## Decisiones de Arquitectura

| Fecha | Decisión | Razón |
|-------|----------|-------|
| 2026-03-27 | Full-stack unificado en Next.js (sin API separada) | Simplicidad de deploy |
| 2026-03-27 | Sin base de datos en Fase 1-4 | Arrancar rápido; Prisma en Fase 5 |
| 2026-03-27 | País objetivo: Chile (MLC) | Cuenta de afiliado lista |
| 2026-03-27 | App Router sobre Pages Router | Server Components, mejor SEO |
| 2026-03-28 | Modelo afiliado (links a ML) en lugar de API de productos | API de search bloqueada por ML |
