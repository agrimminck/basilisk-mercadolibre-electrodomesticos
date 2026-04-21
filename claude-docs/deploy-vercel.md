# deploy-vercel — setup + pitfalls

Deploy Next.js 15 a Vercel. Monorepo con Next bajo `apps/web/`.

---

## Env vars requeridas (Production + Preview)

```
MELI_APP_ID           # ML Developers → Mis aplicaciones
MELI_CLIENT_SECRET    # ML Developers → Mis aplicaciones
MELI_AFFILIATE_ID     # Programa de Asociados ML (p.ej. ag20260214123344)
MELI_DEFAULT_SITE     # Fijo: MLC
NEXT_PUBLIC_SITE_URL  # Dominio canónico (Vercel subdomain o dominio propio)
```

Todas server-only excepto `NEXT_PUBLIC_SITE_URL`.

---

## Pitfall: `vercel.json` + `rootDirectory` → double nesting

**Problema observado:** `vercel.json` en raíz del repo con `{"rootDirectory": "apps/web"}` causó build bajo `apps/web/apps/web/` (doble nesting).

**Fix aplicado:** mover `vercel.json` a `apps/web/` sin campo `rootDirectory`, Y setear `Root Directory: apps/web` en Vercel dashboard.

**Alternativa:** eliminar `vercel.json` completo si dashboard ya tiene `Root Directory` configurado.

---

## Pitfall: Tailwind v4 — CSS no se genera en prod

**Problema:** CSS no aplica en Vercel (local OK con `@import "tailwindcss"`).

**Causa raíz:** `tailwindcss` + `@tailwindcss/postcss` estaban en `devDependencies`. Vercel prod build puede skipear devDeps.

**Fix:** mover ambos paquetes a `dependencies` en `apps/web/package.json`.

**Checks fallback si persiste:**
- `postcss.config.js` debe estar en `apps/web/` (junto al `package.json`), no en raíz del repo.
- Si `@import "tailwindcss"` falla → fallback a `@tailwind base; @tailwind components; @tailwind utilities;` en el CSS global.

---

## Deploy inicial — steps

1. Vercel → Add New Project → import repo.
2. Root Directory: `apps/web`.
3. Agregar 5 env vars.
4. Deploy. Build log esperado: `✓ Compiled successfully` sin errores TS.
5. Smoke tests:
   - `GET /api/categories` → 200
   - `GET /api/search?q=notebook` → 200 (devuelve URL redirect con affiliate_id)
   - `GET /sitemap.xml` → 200
   - `GET /robots.txt` → 200
6. Setear `NEXT_PUBLIC_SITE_URL` con URL definitiva → redeploy para regenerar sitemap con dominio correcto.

---

## Dominio propio

**Estado:** ✅ COMPLETADO 2026-04-21 — dominio `topelectrohogar.com` activo en Vercel (verde).

**Registrador:** Register.Domains (ns01/ns02.dns.nexus como nameservers base).

**DNS records agregados en Register.Domains:**
```
A      @    216.198.79.1          # apex → Vercel
CNAME  www  cname.vercel-dns.com  # www → Vercel
TXT    @    google-site-verification=erKszSvMxrCHktRlDxrUnvPgUlRjDerDXybDR0a-LDs  # GSC
```

**`NEXT_PUBLIC_SITE_URL`** actualizado a `https://topelectrohogar.com` → redeploy hecho.

**GSC:** sitemap `https://topelectrohogar.com/sitemap.xml` enviado 2026-04-21, status "Couldn't fetch" inicial (normal post-propagación — Google reintenta solo).

Pasos originales:
1. Vercel Settings → Domains → Add.
2. Agregar A record apex + CNAME www en registrador (no cambiar nameservers).
3. Actualizar `NEXT_PUBLIC_SITE_URL` → redeploy.
4. Re-submit sitemap a GSC con URL nueva (ver [`seo-metadata.md`](seo-metadata.md)).

---

## Notas

- API Routes son serverless — sin config extra en Vercel.
- Sin `DATABASE_URL` ni migraciones (app sin DB).
- Sin `tailwind.config.js` — Tailwind v4 autodetecta content en Next.js 15.
