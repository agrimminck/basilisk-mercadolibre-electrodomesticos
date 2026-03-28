---
tags:
  - capa/servidor
  - dominio/infraestructura
ultima_actualizacion_func_general: 2026-03-27 18:31
ultima_actualizacion_señales_funciones:
---

# Deploy — Vercel

## Qué es
Guía de variables de entorno y pasos para deploy en Vercel. Sin base de datos en esta fase.

## Variables de entorno

| Variable | Entorno | Fuente |
|----------|---------|--------|
| `MELI_APP_ID` | Production + Preview | ML Developers → Mis aplicaciones |
| `MELI_CLIENT_SECRET` | Production + Preview | ML Developers → Mis aplicaciones |
| `MELI_AFFILIATE_ID` | Production + Preview | Panel de afiliados ML |
| `MELI_DEFAULT_SITE` | Production + Preview | Fijo: `MLC` |
| `NEXT_PUBLIC_SITE_URL` | Production | URL asignada por Vercel tras primer deploy |

## Pasos de deploy

1. Vercel → "Add New Project" → importar repo → Root Directory: `apps/web`
2. Agregar las 5 variables de entorno
3. Deploy — el build log debe mostrar `✓ Compiled successfully` sin errores TypeScript
4. Smoke tests: `GET /api/categories`, `/api/search?q=notebook`, `/sitemap.xml`, `/robots.txt` — todos deben responder 200
5. Actualizar `NEXT_PUBLIC_SITE_URL` con la URL definitiva y hacer redeploy si el sitemap ya fue generado

## Reglas clave
- `rootDirectory: "apps/web"` está en `vercel.json` en la raíz del repo
- Todas las vars `MELI_*` son server-only; solo `NEXT_PUBLIC_SITE_URL` es pública
- Las API Routes son serverless — no requieren configuración extra en Vercel
- No hay `DATABASE_URL` ni migraciones en esta fase
