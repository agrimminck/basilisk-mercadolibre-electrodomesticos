---
tags:
  - capa/servidor
  - dominio/infraestructura
ultima_actualizacion_func_general: 2026-03-27 18:31
ultima_actualizacion_señales_funciones:
---

# API Mercado Libre

## Qué es
HTTP API pública de Mercado Libre para búsqueda, detalle y categorías de productos.
Sitio objetivo: `MLC` (Chile), configurable via `MELI_DEFAULT_SITE`.

## Base URL
`https://api.mercadolibre.com`

## Autenticación
OAuth client_credentials manejado en `lib/meli/meli-auth.ts`. El access token se agrega como `?access_token=` en cada request. `MELI_APP_ID` mejora rate limits como fallback cuando no hay token.

## Endpoints utilizados

| Endpoint | Propósito |
|----------|-----------|
| `GET /sites/{site}/search?q=` | Búsqueda por texto |
| `GET /sites/{site}/search?category=` | Listado por categoría |
| `GET /items/{itemId}` | Detalle de producto |
| `GET /sites/{site}/categories` | Categorías raíz |
| `GET /categories/{categoryId}` | Detalle de categoría |

Respuesta de search: `paging.{total,offset,limit}`, `results[]`.
Respuesta de item: `id`, `title`, `price`, `currency_id`, `thumbnail`, `permalink`, `condition`.

## Rate limits
- Sin auth: ~1 req/seg por IP
- Con OAuth: límites más permisivos (ver Developer Portal)
- Caché servidor: `revalidate: 300` (5 min)

## Reglas clave
- Thumbnails de ML pueden usar `http://` — se normaliza a `https://` en `meli-transforms.ts`
- `attributes` con `value_name: null` se filtran antes de exponer
- Slugs se generan desde `title` normalizando acentos en `meli-transforms.ts`
