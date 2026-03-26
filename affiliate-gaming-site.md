# Proyecto: Sitio de Afiliados Gaming

## Concepto

Sitio de comparación y recomendación de hardware/accesorios gaming.
El usuario llega por búsqueda orgánica, ve comparativas o recomendaciones, hace click y compra en Amazon.
Sin inventario, sin logística, sin soporte postventa.
Ingreso por comisión de Amazon Associates (1–10% según categoría).

## Objetivos

- Ingreso pasivo estable via afiliados
- Portafolio real en producción (pesa más que proyectos de práctica en CVs chilenos)
- Escalar de LATAM (español) a global (inglés) cuando haya tracción

## Mercado

- **Fase 1:** LATAM en español
- **Fase 2:** Global en inglés (arquitectura i18n lista desde el inicio)

## Afiliado

- **Amazon Associates** — único afiliado por ahora
  - Cubre Amazon.com (global), Amazon.com.mx, Amazon.com.br
  - API disponible para sincronizar productos
  - Comisiones 1–10% según categoría

> **Nota:** La integración con Amazon PA-API se hace en fase de producción.
> Durante desarrollo se usa un catálogo de productos mock (datos hardcodeados o seed de DB)
> para que la página funcione completamente sin depender de credenciales ni llamadas reales a Amazon.

## Nicho

Hardware y accesorios gaming:
- Monitores
- GPUs / CPUs
- Periféricos (mouse, teclado, headset)
- Sillas gaming
- Componentes PC

Ventaja: el dueño tiene conocimiento real de videojuegos → contenido con autoridad real → Google lo premia.

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend + SEO | Next.js (App Router, SSG/ISR) + TypeScript |
| Estilos | Tailwind CSS |
| Backend / API | NestJS + TypeScript |
| Base de datos | PostgreSQL |
| Afiliado | Amazon Associates API |
| Hosting | AWS (CloudFront + S3 o ECS) |
| i18n | Next.js built-in (español primero) |

## Principios SEO

- SSG/ISR en Next.js — HTML estático indexable por Google
- Contenido único por producto (no copiar descripción del proveedor)
- Estructura de URLs: `/categoria/subcategoria/nombre-producto`
- Structured data JSON-LD para rich snippets
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- Lighthouse > 90 en Performance y SEO

## Convenciones de código

Seguir las convenciones del proyecto (ver CLAUDE.md global):
- TypeScript estricto siempre
- Funciones y métodos: `PascalCase`
- Variables: `camelCase`
- Archivos: `kebab-case`
- Imports: siempre rutas relativas, nunca desde `src/`
- Un archivo por responsabilidad, agrupados por módulo/dominio

## Dominio

Opciones encontradas en Namecheap (pendiente de compra):
- `gaminglatam.com` — orientado a LATAM en español
- `toploadout.com` — orientado a global en inglés

Decisión: comprar cuando el sitio esté funcional y la motivación esté validada.

---

## Estado actual

### Fase 1 — Desarrollo local (en curso)

- [x] Arquitectura y estructura de carpetas definida
- [x] Setup inicial del proyecto (Next.js + NestJS monorepo)
- [ ] Catálogo mock: productos hardcodeados o seed de DB para desarrollo
- [ ] Módulo de productos (CRUD, categorías)
- [ ] Frontend: home, categorías, detalle de producto
- [ ] SEO: metadata dinámica, sitemap, robots.txt, JSON-LD
- [ ] Sistema de afiliados con links de prueba (sin API real)

### Fase 2 — Producción

- [ ] Integración Amazon PA-API (productos reales, precios en vivo)
- [ ] Módulo de sync automático con Amazon
- [ ] Compra de dominio
- [ ] Deploy en AWS
- [ ] i18n inglés
