# Próximos pasos — GameGear LATAM

## Estado actual

| Componente | URL | Estado |
|------------|-----|--------|
| web-gaming (Amazon, US) | https://gamegear-eight.vercel.app | ✅ live |
| web-latam (MercadoLibre) | https://gamegear-latam.vercel.app | ✅ live (sin productos ML) |
| API | https://affiliate-gaming-api.fly.dev | ✅ live |

---

## 1. Reemplazar Item IDs placeholder en seed-ml.ts

**Archivo:** `apps/api/src/database/seed-ml.ts`

Los `externalId` actuales son ficticios (`MLA1234567001`, etc.). Reemplazarlos con IDs reales de MercadoLibre.

**Cómo obtener el ID:**
- Buscar el producto en mercadolibre.com.ar
- Copiar el ID de la URL: `mercadolibre.com.ar/p/MLA[ID]`
- El ID completo es `MLA` + número (ej: `MLA123456789`)

**Productos a reemplazar (14 en total):**

| Slug | Producto |
|------|---------|
| `lg-27-qhd-165hz-ips-mla` | Monitor LG 27" QHD 165Hz IPS |
| `samsung-odyssey-g5-32-curvo-mla` | Monitor Samsung Odyssey G5 32" |
| `aoc-24-fhd-144hz-ips-mla` | Monitor AOC 24" FHD 144Hz |
| `gigabyte-rtx-4060-8gb-mla` | GPU Gigabyte RTX 4060 8GB |
| `msi-rx-7700-xt-12gb-mla` | GPU MSI RX 7700 XT 12GB |
| `logitech-g-pro-x-superlight-2-mla` | Mouse Logitech G Pro X Superlight 2 |
| `razer-deathadder-v3-hyperspeed-mla` | Mouse Razer DeathAdder V3 |
| `zowie-ec2-c-mla` | Mouse Zowie EC2-C |
| `hyperx-alloy-origins-core-tkl-mla` | Teclado HyperX Alloy Origins Core TKL |
| `corsair-k70-rgb-mk2-mla` | Teclado Corsair K70 RGB MK.2 |
| `hyperx-cloud-alpha-wireless-mla` | Auriculares HyperX Cloud Alpha Wireless |
| `logitech-g535-lightspeed-mla` | Auriculares Logitech G535 Lightspeed |
| `secretlab-titan-evo-2022-mla` | Silla Secretlab Titan Evo 2022 |
| `dxracer-formula-series-mla` | Silla DXRacer Formula Series |

---

## 2. Seedear productos ML en producción

Una vez actualizados los IDs reales, correr el seed contra la DB de producción.

```bash
# Obtener la DATABASE_URL de producción
fly ssh console --app affiliate-gaming-api

# O correr el seed directamente con la URL de Fly
DATABASE_URL="$(fly secrets list --app affiliate-gaming-api)" \
ML_AFFILIATE_ID=ag20260214123344 \
ML_DEFAULT_SITE=MLA \
npx ts-node -r tsconfig-paths/register src/database/seed-ml.ts
```

> El seed es idempotente — skipea productos que ya existen por `externalId`.

---

## 3. Configurar CORS para web-latam

La API actualmente permite CORS solo desde `https://gamegear-eight.vercel.app`. Agregar web-latam:

```bash
fly secrets set WEB_LATAM_URL=https://gamegear-latam.vercel.app --app affiliate-gaming-api
```

Luego actualizar `apps/api/src/main.ts` (o donde esté la config de CORS) para leer `WEB_LATAM_URL` además de `WEB_URL`.

---

## 4. Verificación final

- [ ] `GET https://affiliate-gaming-api.fly.dev/api/products?source=mercadolibre` → devuelve 14 productos
- [ ] `https://gamegear-latam.vercel.app/es/` → muestra productos con precios en ARS
- [ ] `https://gamegear-latam.vercel.app/pt/` → muestra en portugués
- [ ] Click en producto → abre MercadoLibre con `?referral=ag20260214123344` en la URL
- [ ] Simular geo BR → redirige a `/pt/`
