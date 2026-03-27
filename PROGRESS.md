# PROGRESS.md — Bitácora del Proyecto

## Iteration Index: 1

**Última actualización:** 2026-03-27

---

## Estado Actual: 🟡 Fase 2 — Integración API Mercado Libre

## Fases del Proyecto

| Fase | Nombre | Estado |
|------|--------|--------|
| 1 | Inicialización y Setup de Arquitectura | ✅ Completo |
| 2 | Integración API Mercado Libre | 🟡 En curso |
| 3 | UI Core — Home, Categorías, Detalle | ⏳ Pendiente |
| 4 | Búsqueda y Filtros | ⏳ Pendiente |
| 5 | Base de datos y caché | ⏳ Pendiente |
| 6 | SEO, metadata y rendimiento | ⏳ Pendiente |
| 7 | Deploy a Vercel | ⏳ Pendiente |

---

## Fase 1 — Checklist

- [x] Cuenta de afiliado de Mercado Libre lista
- [x] Inicializar proyecto Next.js 15 con TypeScript + Tailwind v4
- [x] Crear estructura de carpetas base
- [x] Configurar `tsconfig.json` (strict mode, sin path aliases)
- [x] Crear `types/index.ts` con tipos base (`Product`, `Category`, `SearchResult`)
- [x] Crear `.env.local.example` con vars de ML (MLC)
- [ ] Commit inicial

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
