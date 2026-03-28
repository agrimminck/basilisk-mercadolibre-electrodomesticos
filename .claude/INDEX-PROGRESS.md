# INDEX-PROGRESS.md

Índice global de progreso del proyecto. Cada protocolo mantiene su propio `PROGRESS.md` dentro de su carpeta.

---

## Protocolos activos

| Protocolo | PROGRESS.md | Índice actual |
|-----------|-------------|---------------|
| Desarrollo | `.claude/protocols/development/PROGRESS.md` | 10 |
| Folders Architecture | `.claude/protocols/analyze-folders-architecture/PROGRESS.md` | 0 |

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

## Decisiones de Arquitectura

| Fecha | Decisión | Razón |
|-------|----------|-------|
| 2026-03-27 | Full-stack unificado en Next.js (sin API separada) | Simplicidad de deploy |
| 2026-03-27 | Sin base de datos en Fase 1-4 | Arrancar rápido; Prisma en Fase 5 |
| 2026-03-27 | País objetivo: Chile (MLC) | Cuenta de afiliado lista |
| 2026-03-27 | App Router sobre Pages Router | Server Components, mejor SEO |
| 2026-03-28 | Modelo afiliado (links a ML) en lugar de API de productos | API de search bloqueada por ML |
