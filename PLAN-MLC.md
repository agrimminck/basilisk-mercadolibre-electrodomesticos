# Plan: Migrar seed ML a Chile (MLC) + Fix UI web-latam

**Ejecución 100% autónoma.** El usuario solo debe enviar "ejecuta el plan PLAN-MLC.md".

---

## Paso 1 — Buscar los 14 IDs via API pública de ML Chile

Usar WebFetch contra `https://api.mercadolibre.com/sites/MLC/search?q=<query>&limit=3`
para cada uno de los 14 productos. Elegir el resultado más relevante:
- Preferir `catalog_product_id` (formato `MLCxxxxxxx`) si existe
- Si no, usar el `id` del primer listing
- Registrar también el precio real en CLP

Productos a buscar:
1. `Monitor LG 27 QHD 165Hz IPS gaming`
2. `Monitor Samsung Odyssey G5 32 curvo 144Hz`
3. `Monitor AOC 24 FHD 144Hz IPS gaming`
4. `Gigabyte RTX 4060 8GB`
5. `RX 7700 XT 12GB`
6. `Logitech G Pro X Superlight 2 mouse`
7. `Razer DeathAdder V3 HyperSpeed mouse`
8. `Zowie EC2-C mouse`
9. `HyperX Alloy Origins Core TKL teclado`
10. `Corsair K70 RGB MK2 teclado`
11. `HyperX Cloud Alpha Wireless auriculares`
12. `Logitech G535 Lightspeed auriculares`
13. `Secretlab Titan Evo 2022 silla`
14. `DXRacer Formula Series silla gaming`

---

## Paso 2 — Actualizar `apps/api/src/database/seed-ml.ts`

Con los datos obtenidos en el paso 1:
- `externalId`: `MLA...` → el ID MLC obtenido
- `currency`: `'ARS'` → `'CLP'`
- `price`: usar el precio real en CLP de la API (redondeado a miles)
- `slug`: sufijo `-mla` → `-mlc`
- Constante `ML_DEFAULT_SITE`: `'MLA'` → `'MLC'`
- Comentario del encabezado: actualizar referencias a Argentina → Chile

---

## Paso 3 — Fix crítico: agregar `postcss.config.mjs` a web-latam

`apps/web-latam` no tiene `postcss.config.mjs` — sin esto Tailwind v4 no compila
y la página se ve completamente sin estilos.

Crear `apps/web-latam/postcss.config.mjs` con el mismo contenido que `apps/web-gaming/postcss.config.mjs`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

---

## Paso 4 — Fix: formato de precio dinámico según locale

En los siguientes archivos, `es-AR` está hardcodeado en `Intl.NumberFormat`:
- `apps/web-latam/components/product/product-card.tsx` línea 56
- `apps/web-latam/app/[locale]/producto/[slug]/page.tsx` línea 122

Leer ambos archivos y corregir para que usen el locale dinámico del contexto.
El mapeo correcto es:
- `es` → `es-CL` (Chile, por ahora)
- `pt` → `pt-BR`
- `en` → `en-US`

Y la currency también debe ser dinámica:
- `es` → `CLP`
- `pt` → `BRL`
- `en` → `USD`

Para acceder al locale actual usar el prop `params.locale` (en page.tsx) o pasar
el locale como prop desde la página al componente `ProductCard`.

---

## Paso 5 — Configurar CORS para web-latam en `apps/api/src/main.ts`

Leer `apps/api/src/main.ts` y agregar soporte para la variable de entorno `WEB_LATAM_URL`
en la configuración de CORS, junto a `WEB_URL` que ya existe.

---

## Lo que NO hace este plan

- No corre el seed contra producción
- No hace deploy
- No toca variables de entorno en Fly

Al terminar, reportar un resumen de los 14 IDs encontrados y los archivos modificados.
