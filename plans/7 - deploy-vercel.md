# Plan 7 — Deploy a Vercel

## Contexto
Las fases 1–6 están completas: el sitio tiene UI, API Routes, SEO y metadata. Falta exponerlo públicamente mediante un deploy en Vercel para poder obtener una URL real, completar el proceso de afiliado de Mercado Libre y verificar el funcionamiento end-to-end con la API real.

## Objetivo
Tener el sitio corriendo en una URL pública de Vercel (`*.vercel.app`) con todas las variables de entorno configuradas y las API Routes respondiendo correctamente.

## Pasos de implementación

### 1. Verificar `.env.local.example` y crear `docs/DEPLOY.md`
- Revisar que `apps/web/.env.local.example` (o la raíz) tenga todas las vars listadas en `INDEX.md`
- Crear `docs/DEPLOY.md` con la lista de vars, sus fuentes y pasos de deploy

### 2. Asegurarse de que `vercel.json` no sea necesario
- El proyecto usa Next.js App Router en un monorepo simple (`apps/web`)
- Verificar si Vercel detecta automáticamente el root como `apps/web`, o si hace falta un `vercel.json` con `rootDirectory`
- Si hace falta, crear `vercel.json` en la raíz con:
  ```json
  {
    "rootDirectory": "apps/web"
  }
  ```

### 3. Crear proyecto en Vercel
- En vercel.com → "Add New Project" → importar el repo de GitHub
- Seleccionar "Root Directory": `apps/web`
- Framework preset: Next.js (auto-detectado)

### 4. Configurar variables de entorno en Vercel
En "Environment Variables" del proyecto, agregar:

| Variable | Entorno |
|----------|---------|
| `MELI_APP_ID` | Production + Preview |
| `MELI_CLIENT_SECRET` | Production + Preview |
| `MELI_AFFILIATE_ID` | Production + Preview |
| `MELI_DEFAULT_SITE` | Production + Preview (valor: `MLC`) |
| `NEXT_PUBLIC_SITE_URL` | Production (valor: URL `.vercel.app` asignada) |

### 5. Primer deploy
- Hacer click en "Deploy" en Vercel
- Monitorear el build log — verificar que `npx tsc --noEmit` pase sin errores
- Si falla: revisar errores de build y corregirlos

### 6. Smoke tests post-deploy
- `GET https://<url>/api/categories` → responde `{ data: Category[] }`
- `GET https://<url>/api/search?q=notebook` → responde `{ data: SearchResult }`
- `GET https://<url>/api/products?category=MLC1055` → responde `{ data: SearchResult }`
- Home carga con productos reales
- Navegar a categoría y producto funciona
- `/sitemap.xml` y `/robots.txt` accesibles

### 7. Actualizar `NEXT_PUBLIC_SITE_URL`
- Una vez obtenida la URL definitiva de Vercel, actualizar la env var en el dashboard
- Hacer redeploy si es necesario para que sitemap y og:url usen la URL correcta

## Decisiones técnicas
- **Sin dominio propio en esta fase:** usar la URL `.vercel.app` gratuita hasta validar el flujo completo
- **Sin base de datos:** la Fase 5 (Prisma/DB) queda pendiente; el deploy funciona sin ella
- **`rootDirectory` en Vercel:** necesario porque el código vive en `apps/web`, no en la raíz del repo

## Verificación
- [ ] `vercel.json` creado con `rootDirectory: "apps/web"` (o confirmado que no es necesario)
- [ ] `docs/DEPLOY.md` creado con vars de entorno y pasos documentados
- [ ] Build en Vercel pasa sin errores
- [ ] `GET /api/categories` responde correctamente desde la URL pública
- [ ] `GET /api/search?q=notebook` responde correctamente desde la URL pública
- [ ] Home carga con productos reales en la URL pública
- [ ] `/sitemap.xml` accesible en la URL pública
- [ ] `NEXT_PUBLIC_SITE_URL` apunta a la URL pública correcta
