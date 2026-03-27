# PROGRESS.md — Bitácora del Proyecto

## Iteration Index: 7

**Última actualización:** 2026-03-27

---

## Estado Actual: 🟡 Fase 7 en progreso — Deploy a Vercel

## Fases del Proyecto

| Fase | Nombre | Estado |
|------|--------|--------|
| 1 | Inicialización y Setup de Arquitectura | ✅ Completo |
| 2 | Integración API Mercado Libre | ✅ Completo |
| 3 | UI Core — Home, Categorías, Detalle | ✅ Completo |
| 4 | Búsqueda y Filtros | ✅ Completo |
| 5 | Base de datos y caché | ⏳ Pendiente |
| 6 | SEO, metadata y rendimiento | ✅ Completo |
| 7 | Deploy a Vercel | ⏳ Pendiente |

---

## Iteración 7 — Checklist

- [x] `vercel.json` creado con `rootDirectory: "apps/web"`
- [x] `docs/DEPLOY.md` creado con vars de entorno y pasos documentados
- [ ] Build en Vercel pasa sin errores
- [ ] `GET /api/categories` responde correctamente desde la URL pública
- [ ] `GET /api/search?q=notebook` responde correctamente desde la URL pública
- [ ] Home carga con productos reales en la URL pública
- [ ] `/sitemap.xml` accesible en la URL pública
- [ ] `NEXT_PUBLIC_SITE_URL` apunta a la URL pública correcta

---

## Iteración 6 — Checklist

- [x] `<title>` en home muestra el nombre del sitio
- [x] `<title>` en `/[category]` muestra el nombre de la categoría
- [x] `<title>` en `/producto/[id]` muestra el nombre del producto
- [x] `<title>` en `/buscar?q=laptop` muestra `"laptop" — Búsqueda`
- [x] `GET /sitemap.xml` responde con URLs de categorías
- [x] `GET /robots.txt` existe y bloquea `/api/`
- [x] Navegar a `/[category]` mientras carga muestra skeleton de productos
- [x] Navegar a una URL inexistente muestra la página 404
- [x] `npx tsc --noEmit` sin errores
- [x] Ningún archivo supera 200 líneas

---

## Iteración 5 — Checklist

- [x] En `/buscar?q=laptop`, el FilterPanel se muestra con los controles de sort, condición y precio
- [x] Cambiar sort a "Precio: menor a mayor" navega a `?q=laptop&sort=price_asc` y los resultados cambian
- [x] Filtrar por condición "Nuevo" navega a `?q=laptop&condition=new`
- [x] Ingresar precio máximo 500000 y aplicar navega a `?q=laptop&price_max=500000`
- [x] Los mismos filtros funcionan en `/[category]`
- [x] `npx tsc --noEmit` sin errores
- [x] Ningún archivo supera 200 líneas

---

## Iteración 4 — Checklist

- [x] Home carga y muestra grid de categorías + productos
- [x] Clic en categoría navega a `/[category]` y muestra productos
- [x] Clic en producto navega a `/producto/[id]` y muestra detalle
- [x] Búsqueda desde Header navega a `/buscar?q=` y muestra resultados
- [x] `npx tsc --noEmit` sin errores
- [x] Ningún archivo supera 200 líneas

---

## Iteración 3 — Checklist

- [x] `GET /api/categories` responde `{ data: Category[] }`
- [x] `GET /api/search?q=notebook` responde `{ data: SearchResult }`
- [x] `GET /api/products?id=MLC123` responde `{ data: Product }` o error 502
- [x] `GET /api/products?category=MLC1055` responde `{ data: SearchResult }`
- [x] TypeScript compila sin errores en los tres archivos

---

## Iteración 2 — Checklist

- [x] `meli-client.ts` compila sin errores TypeScript
- [x] `meli-transforms.ts` mapea correctamente los campos requeridos
- [x] Los métodos del cliente retornan los tipos internos correctos

---

## Fase 1 — Checklist

- [x] Cuenta de afiliado de Mercado Libre lista
- [x] Inicializar proyecto Next.js 15 con TypeScript + Tailwind v4
- [x] Crear estructura de carpetas base
- [x] Configurar `tsconfig.json` (strict mode, sin path aliases)
- [x] Crear `types/index.ts` con tipos base (`Product`, `Category`, `SearchResult`)
- [x] Crear `.env.local.example` con vars de ML (MLC)
- [x] Commit inicial

---

## Decisiones de Arquitectura

| Fecha | Decisión | Razón |
|-------|----------|-------|
| 2026-03-27 | Full-stack unificado en Next.js (sin API separada) | Simplicidad de deploy, menos infraestructura |
| 2026-03-27 | Sin base de datos en Fase 1 | Arrancar rápido; se agrega Prisma en Fase 5 |
| 2026-03-27 | País objetivo: Chile (MLC) | Cuenta de afiliado lista; escalar a multi-país después |
| 2026-03-27 | App Router sobre Pages Router | Soporte nativo de Server Components, mejor SEO |

---

## Log de Sesiones

### 2026-03-27 — Sesión 1
- Definidos archivos fundacionales: `CLAUDE.md`, `INDEX.md`, `PROGRESS.md`
- Arquitectura full-stack unificada acordada
- Stack confirmado: Next.js 15 + TypeScript + Tailwind v4
- Protocolo de iteraciones definido (`iterations/`)
