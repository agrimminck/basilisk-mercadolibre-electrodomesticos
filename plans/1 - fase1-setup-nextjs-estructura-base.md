# Plan 1 — Fase 1: Setup Next.js + Estructura Base

## Contexto
El proyecto no tiene aún una app Next.js. Solo existe `apps/api` (NestJS, solo dist). Según PROGRESS.md, la arquitectura es full-stack unificada en Next.js (sin API separada), con App Router, TypeScript strict y Tailwind v4. País objetivo: Chile (MLC).

## Objetivo
Tener `apps/web/` listo con estructura de carpetas base, configuración TypeScript strict sin path aliases, tipos globales y archivo de variables de entorno de ejemplo.

## Pasos de implementación
1. Crear `apps/web/package.json` con dependencias Next.js 15, React 19, Tailwind v4
2. Crear `apps/web/tsconfig.json` — strict mode, sin path aliases, sin baseUrl
3. Crear `apps/web/next.config.ts` — configuración mínima
4. Crear estructura de carpetas: `app/`, `components/ui/`, `components/layout/`, `components/products/`, `components/search/`, `lib/meli/`, `lib/utils/`, `types/`, `hooks/`, `public/images/`
5. Crear `apps/web/types/index.ts` — tipos `Product`, `Category`, `SearchResult`
6. Crear `apps/web/app/layout.tsx` — root layout con fuente, metadata base, fondo oscuro
7. Crear `apps/web/app/page.tsx` — home placeholder
8. Crear `apps/web/.env.local.example` — vars de ML (MLC) y Next.js
9. Actualizar PROGRESS.md — marcar checklist Fase 1 completado

## Decisiones técnicas
- App en `apps/web/` para mantener consistencia con el monorepo (apps/api ya existe)
- Sin path aliases (`@/`) — usar rutas relativas per CLAUDE.md
- Tailwind v4 con CSS import (no `tailwind.config.js`)
- Sin `src/` directory — App Router directo en raíz del app

## Verificación
- [ ] `apps/web/tsconfig.json` tiene `"strict": true` y sin `paths`
- [ ] `apps/web/types/index.ts` exporta `Product`, `Category`, `SearchResult`
- [ ] `.env.local.example` tiene todas las vars de ML
