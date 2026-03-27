# affiliate-webs — Concepto y guía general

## Idea central

Un monorepo que aloja múltiples sitios de afiliados, cada uno apuntando a un mercado o plataforma diferente, compartiendo una única API backend y una capa de tipos comunes.

El modelo es simple: producto → link de afiliado → comisión. La clave está en tener sitios bien posicionados para SEO, con buena UX, y apuntando a nichos específicos por región o categoría.

---

## Arquitectura

```
affiliate-webs/
├── apps/
│   ├── api/              ← NestJS + PostgreSQL (Fly.io) — una sola API para todos los sites
│   ├── web-gaming/       ← Next.js — gaming gear, mercado US, afiliados Amazon
│   └── web-latam/        ← Next.js — gaming gear, mercado LATAM, afiliados MercadoLibre
├── packages/
│   └── shared/           ← Tipos TypeScript compartidos (Product, Category, AffiliateSource)
└── turbo.json
```

**Un solo backend** sirve a todos los frontends. Los productos se distinguen por `affiliateSource` (`amazon` | `mercadolibre`), y cada site filtra con `?source=<fuente>`.

---

## Sites actuales

### web-gaming — Amazon US
- **URL:** https://gamegear-eight.vercel.app
- **Nicho:** hardware gaming (monitores, GPUs, periféricos, teclados, headsets, sillas)
- **Afiliado:** Amazon Associates (`gamegear-20`)
- **Mercado:** US / global
- **Idiomas:** ES, EN
- **Estado:** live, pendiente PA-API para imágenes reales

### web-latam — MercadoLibre LATAM
- **URL:** https://gamegear-latam.vercel.app
- **Nicho:** hardware gaming (mismas categorías)
- **Afiliado:** MercadoLibre Affiliates (`ag20260214123344`)
- **Mercado:** AR, MX, CL, CO, BR
- **Idiomas:** ES, EN, PT (geolocalización automática por IP)
- **Estado:** live, pendiente seedear productos con IDs reales

---

## Infraestructura

| Servicio | Plataforma | URL |
|----------|-----------|-----|
| API | Fly.io (`affiliate-gaming-api`) | https://affiliate-gaming-api.fly.dev |
| DB | PostgreSQL en Fly.io | — |
| web-gaming | Vercel (`gamegear`) | — |
| web-latam | Vercel (`gamegear-latam`) | — |

**Deploy API:**
```bash
cd apps/api && fly deploy
```

**Deploy web-gaming:**
```bash
cd apps/web-gaming && npx vercel --prod --yes
```

**Deploy web-latam** (debe hacerse desde la raíz del monorepo para resolver el workspace):
```bash
VERCEL_PROJECT_ID=prj_ZvP7vEBZGSID0vIaw7uv9cB45TtM \
VERCEL_ORG_ID=team_x509LqbXHosCqV1elhJ8DVhc \
npx vercel --prod --yes
```

---

## Cómo agregar un nuevo site

El patrón a seguir es `apps/web-latam` como template. Los pasos son:

### 1. Crear la app Next.js
```bash
cp -r apps/web-latam apps/web-<nombre>
```
Actualizar `apps/web-<nombre>/package.json`:
- `"name": "web-<nombre>"`
- Puerto en `dev`: siguiente disponible (3002, 3003, ...)

### 2. Configurar la fuente de afiliados
En `apps/web-<nombre>/lib/api.ts`:
```typescript
const AFFILIATE_SOURCE = '<nueva-fuente>'  // definir en AffiliateSource
```

### 3. Extender `packages/shared`
Si la plataforma nueva no existe en `AffiliateSource`:
```typescript
// packages/shared/src/types/product.ts
export type AffiliateSource = 'amazon' | 'mercadolibre' | '<nueva-fuente>'
```

### 4. Crear el módulo en la API
```
apps/api/src/<plataforma>/
├── <plataforma>.module.ts
└── <plataforma>.service.ts
```
Implementar `SearchProducts`, `GetProductById`, `BuildAffiliateUrl`. Importar el módulo en `app.module.ts`.

### 5. Crear el seed
```
apps/api/src/database/seed-<plataforma>.ts
```
Con productos reales de la plataforma, `affiliateSource: '<nueva-fuente>'`.

### 6. Configurar variables de entorno
En `apps/api/.env.example` y como Fly secrets:
```
<PLATAFORMA>_AFFILIATE_ID=xxx
<PLATAFORMA>_DEFAULT_REGION=xxx
```

### 7. Linkear en Vercel
```bash
cd apps/web-<nombre> && npx vercel link
```
Configurar `Root Directory: apps/web-<nombre>` via Vercel dashboard o API.

---

## Ideas para próximos sites

| Site | Plataforma | Mercado | Nicho |
|------|-----------|---------|-------|
| `web-br` | MercadoLibre MLB | Brasil | gaming gear en BRL |
| `web-mx` | MercadoLibre MLM | México | gaming gear en MXN |
| `web-tech` | Amazon / ML | Global | electrónica general |
| `web-hogar` | Amazon / ML | LATAM | smart home, electrodomésticos |
| `web-deporte` | Amazon / ML | LATAM | equipamiento deportivo |

---

## Modelo de negocio

1. Usuario llega al site desde búsqueda orgánica (SEO) o redes sociales
2. Ve comparativas o reseñas de productos
3. Hace click en "Ver en Amazon" / "Ver en Mercado Libre"
4. Si compra dentro de la ventana de cookies → comisión

**Comisiones aproximadas:**
- Amazon Associates: 1–10% según categoría (electrónica ~2.5–4%)
- MercadoLibre Affiliates: 2–8% según categoría

**El volumen lo da el SEO** — cuantos más productos bien descritos con palabras clave relevantes, más tráfico orgánico.

---

## Variables de entorno clave

### API (`apps/api/.env`)
```
DATABASE_URL=postgresql://...
AMAZON_PARTNER_TAG=gamegear-20
AMAZON_ACCESS_KEY=           # pendiente PA-API approval
AMAZON_SECRET_KEY=           # pendiente PA-API approval
ML_AFFILIATE_ID=ag20260214123344
ML_DEFAULT_SITE=MLA
WEB_URL=https://gamegear-eight.vercel.app
WEB_LATAM_URL=https://gamegear-latam.vercel.app
```

### web-gaming (`apps/web-gaming/.env.local`)
```
NEXT_PUBLIC_API_URL=https://affiliate-gaming-api.fly.dev/api
```

### web-latam (`apps/web-latam/.env.local`)
```
NEXT_PUBLIC_API_URL=https://affiliate-gaming-api.fly.dev/api
NEXT_PUBLIC_SITE_URL=https://gamegear-latam.vercel.app
```
