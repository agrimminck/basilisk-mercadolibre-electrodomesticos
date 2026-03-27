# DEPLOY.md — Guía de Deploy a Vercel

## Variables de entorno

Configurar en Vercel → Project → Settings → Environment Variables:

| Variable | Entorno | Descripción |
|----------|---------|-------------|
| `MELI_APP_ID` | Production + Preview | ID de la app en Mercado Libre Developers |
| `MELI_CLIENT_SECRET` | Production + Preview | Secret de la app ML (no exponer en cliente) |
| `MELI_AFFILIATE_ID` | Production + Preview | ID de afiliado ML para tracking de comisiones |
| `MELI_DEFAULT_SITE` | Production + Preview | Código de país: `MLC` (Chile) |
| `NEXT_PUBLIC_SITE_URL` | Production | URL pública final: `https://<nombre>.vercel.app` |

**Fuentes:**
- `MELI_APP_ID` / `MELI_CLIENT_SECRET` → [Mercado Libre Developers](https://developers.mercadolibre.com/) → Mis aplicaciones
- `MELI_AFFILIATE_ID` → Panel de afiliados de Mercado Libre
- `NEXT_PUBLIC_SITE_URL` → URL asignada por Vercel tras el primer deploy

---

## Pasos de deploy

### 1. Configurar el repo en Vercel

1. Ir a [vercel.com](https://vercel.com) → "Add New Project"
2. Importar el repositorio de GitHub
3. En "Root Directory" seleccionar `apps/web`
4. Framework preset: **Next.js** (auto-detectado)

> El `vercel.json` en la raíz del repo ya tiene `"rootDirectory": "apps/web"` como fallback.

### 2. Agregar variables de entorno

En el paso de configuración del proyecto (o luego en Settings → Environment Variables), agregar las 5 variables listadas arriba.

### 3. Deploy inicial

Hacer click en **Deploy**. El build log debe mostrar:
- `✓ Compiled successfully`
- Sin errores de TypeScript

### 4. Smoke tests post-deploy

```bash
# Reemplazar <url> con la URL asignada por Vercel
curl https://<url>/api/categories
curl "https://<url>/api/search?q=notebook"
curl "https://<url>/api/products?category=MLC1055"
curl https://<url>/sitemap.xml
curl https://<url>/robots.txt
```

Todos deben responder 200.

### 5. Actualizar `NEXT_PUBLIC_SITE_URL`

Una vez obtenida la URL definitiva, actualizar la env var en Vercel con el valor exacto (ej: `https://affiliate-gaming.vercel.app`) y hacer redeploy si el sitemap ya fue generado con la URL placeholder.

---

## Estructura de archivos relevantes

```
affiliate-gaming/
├── vercel.json                  ← rootDirectory: "apps/web"
└── apps/web/
    ├── .env.local.example       ← template de variables locales
    ├── app/
    │   ├── sitemap.ts           ← usa NEXT_PUBLIC_SITE_URL
    │   └── robots.ts            ← bloquea /api/ en crawlers
    └── lib/meli/meli-client.ts  ← usa MELI_* en server-side
```

---

## Notas

- **No hay base de datos** en esta fase — el deploy no requiere `DATABASE_URL` ni migraciones.
- **Las API Routes son serverless** — se ejecutan en Vercel Edge/Node automáticamente.
- **Sin secrets en cliente** — todas las vars `MELI_*` son server-only; solo `NEXT_PUBLIC_SITE_URL` es pública.
