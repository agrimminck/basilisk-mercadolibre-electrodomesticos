# Plan 12 — Dominio propio

**Objetivo:** Conectar un dominio personalizado al sitio en Vercel para mejorar credibilidad y SEO.

> **Condición de activación:** Este plan se ejecuta **una vez que el sitio empiece a recibir tráfico orgánico**. No tiene sentido invertir en dominio antes de validar que hay visitas reales.

## Pasos

1. Elegir y comprar un dominio (ej. `ofertaschile.com`, `mejoresprecios.cl`, etc.)
2. En Vercel → Settings → Domains → agregar el dominio
3. Configurar DNS (registro A o CNAME según el registrar)
4. Actualizar variable de entorno `NEXT_PUBLIC_SITE_URL` con la nueva URL
5. Verificar que `sitemap.xml` y `robots.txt` apunten al dominio nuevo
6. Redeploy

## Checklist

- [ ] Dominio comprado
- [ ] Dominio agregado en Vercel
- [ ] DNS configurado y propagado
- [ ] `NEXT_PUBLIC_SITE_URL` actualizada en Vercel
- [ ] `sitemap.xml` apunta al dominio nuevo
- [ ] Redeploy exitoso
