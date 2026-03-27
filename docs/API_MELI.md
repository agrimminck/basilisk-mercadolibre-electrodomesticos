# docs/API_MELI.md — API de Mercado Libre

## Base URL
`https://api.mercadolibre.com`

## Sitio objetivo
`MLC` (Chile) — configurable via `MELI_DEFAULT_SITE`

## Autenticación
La API pública no requiere OAuth para búsquedas y listings. El `MELI_APP_ID` se agrega como query param `?app_id=` para mejorar los rate limits cuando está disponible.

---

## Endpoints utilizados

### Búsqueda de productos
```
GET /sites/{siteId}/search?q={query}&offset={n}&limit={n}
GET /sites/{siteId}/search?category={categoryId}&offset={n}&limit={n}
```
Respuesta clave: `paging.total`, `paging.offset`, `paging.limit`, `results[]`

### Detalle de producto
```
GET /items/{itemId}
```
Campos relevantes: `id`, `title`, `price`, `currency_id`, `thumbnail`, `permalink`, `category_id`, `condition`, `available_quantity`, `sold_quantity`, `attributes[]`

### Listado de categorías raíz
```
GET /sites/{siteId}/categories
```
Responde un array de categorías con `id`, `name`, `total_items_in_this_category`

### Detalle de categoría
```
GET /categories/{categoryId}
```
Incluye `children_categories[]` y `thumbnail`

---

## Rate limits
- Sin `app_id`: ~1 req/seg por IP
- Con `app_id`: límites más permisivos (ver Developer Portal)
- Next.js `revalidate: 300` — caché de 5 min en servidor

---

## Notas de transformación
- Las URLs de thumbnails de ML a veces usan `http://` — se normaliza a `https://` en `meli-transforms.ts`
- Los slugs se generan desde `title` normalizando acentos y caracteres especiales
- `attributes` con `value_name: null` se filtran
