# affiliate-model — redirects + curación manual

Modelo affiliate puro: sin API search propia, redirects a ML con tracking ID. Post-bloqueo `/search` (ver [`meli-integration.md`](meli-integration.md)).

---

## buildXUrl — `lib/utils/affiliate.ts`

| Función | Input | Output |
|---|---|---|
| `buildProductUrl(permalink)` | URL canónica ML | `{permalink}?meli_affiliate_id=X` (respeta query existente) |
| `buildCategoryUrl(siteId, categoryId)` | `MLC`, `MLC1652` | URL listado ML + affiliate_id |
| `buildSearchUrl(siteId, query)` | `MLC`, `"notebook"` | URL search ML (UI propia de ML) + affiliate_id |

**Regla:** todo `<a>` a ML desde el sitio debe pasar por un `buildXUrl`. Linkear directo = pérdida de tracking = pérdida de revenue.

---

## Rel attributes obligatorios

```tsx
<a
  href={buildProductUrl(permalink)}
  target="_blank"
  rel="noopener noreferrer sponsored"
>
```

`sponsored` = señal Google para links pagados/afiliados. Obligatorio: compliance + SEO.

---

## Featured products — curación manual

**Archivo:** `lib/data/featured-products.ts` — array TS estático.

Editar archivo = deploy Vercel (~1-2 min).

```ts
interface FeaturedProduct {
  id: string;
  title: string;
  price: number;
  currency: string;
  thumbnail: string;    // URL https://
  permalink: string;    // URL ML canónica
  condition: 'new' | 'used';
  badge?: string;       // "Sale" | "Hot" | custom
}
```

**Workflow agregar producto:**

1. Buscar en ml.com, copiar `permalink`.
2. Añadir objeto al array `featuredProducts`.
3. Commit + push → Vercel auto-deploy.

**Render:** `components/products/FeaturedProductCard.tsx`. Usa `<img>` nativo (no `next/image`) para evitar whitelisting de dominios ML variados. Llama `buildProductUrl(permalink)`.

---

## Category descriptions

**Archivo:** `lib/data/category-descriptions.ts` — mapping `categoryId → descripción larga`.

Consumido por `app/[category]/page.tsx` para texto SEO-friendly. Agregar entry cuando se sume categoría nueva al top10.

---

## Por qué `/api/search` no busca

`/api/search?q=X` NO ejecuta búsqueda — devuelve URL redirect a ML. Cliente navega ahí, ML muestra resultados en su UI con affiliate_id tracking.

Razón: endpoint ML search bloqueado 403 (ver [`meli-integration.md`](meli-integration.md)). No hay alternativa técnica.
