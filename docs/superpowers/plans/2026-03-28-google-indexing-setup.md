# Google Indexing Setup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Maximizar la velocidad de indexación en Google sin backlinks externos ni promoción pública, usando solo herramientas técnicas y solicitudes manuales.

**Architecture:** Tres acciones manuales en GSC y Bing + una mejora de código (JSON-LD schema markup) en páginas de categoría y homepage para que Google entienda el contenido más rápido al rastrear.

**Tech Stack:** Next.js 15 App Router, Google Search Console, Bing Webmaster Tools, JSON-LD structured data.

---

## Archivos afectados

| Acción | Archivo |
|--------|---------|
| Modificar | `apps/web/app/[category]/page.tsx` |
| Modificar | `apps/web/app/page.tsx` |

---

### Tarea 1: Verificar sitemap en Google Search Console (manual)

> Esta tarea no requiere código. Es una verificación manual en GSC.

- [ ] **Paso 1: Abrir GSC y navegar a Sitemaps**

  Ir a: `https://search.google.com/search-console` → seleccionar la propiedad del sitio → menú lateral → **Sitemaps**.

- [ ] **Paso 2: Confirmar que el sitemap está enviado y sin errores**

  Debe aparecer la URL del sitemap (ej: `https://tu-sitio.vercel.app/sitemap.xml`) con estado **"Éxito"** y un número de URLs descubiertas > 0.

  Si aparece error:
  - Abrir `https://tu-sitio.vercel.app/sitemap.xml` en el navegador directamente
  - Confirmar que responde XML válido con las URLs del sitio
  - Si falla: revisar `apps/web/app/sitemap.ts` en el repo

  Si no está enviado todavía:
  - Campo "Agregar nuevo sitemap" → ingresar `sitemap.xml` → Enviar

- [ ] **Paso 3: Anotar cuántas URLs están indexadas**

  GSC → Cobertura → verificar cuántas URLs tienen estado "Válida". Esto es la línea base antes de las acciones siguientes.

---

### Tarea 2: Solicitar indexación manual de URLs prioritarias (manual)

> Límite de GSC: ~10 solicitudes por día por propiedad. Hacerlas en este orden.

- [ ] **Paso 1: Abrir herramienta de Inspección de URL en GSC**

  GSC → barra superior → pegar la URL → Enter.

- [ ] **Paso 2: Solicitar indexación para la homepage**

  URL: `https://tu-sitio.vercel.app/`

  Si el resultado muestra "URL no está en Google" o "URL está en Google pero tiene problemas" → hacer clic en **"Solicitar indexación"** → confirmar en el diálogo.

  Si ya está indexada y sin problemas → pasar a la siguiente URL.

- [ ] **Paso 3: Solicitar indexación para las 5 categorías principales**

  Repetir el mismo proceso para cada una:
  1. `https://tu-sitio.vercel.app/computacion`
  2. `https://tu-sitio.vercel.app/celulares-y-telefonos`
  3. `https://tu-sitio.vercel.app/electrodomesticos`
  4. `https://tu-sitio.vercel.app/televisores-y-audio`
  5. `https://tu-sitio.vercel.app/herramientas`

  (Reemplazar slugs con los reales del sitio si difieren.)

- [ ] **Paso 4: Registrar fecha de las solicitudes**

  Anotar la fecha de hoy. En 3-5 días volver a GSC → Inspección de URL para cada una y verificar si cambió el estado a "URL está en Google".

---

### Tarea 3: Registrar en Bing Webmaster Tools (manual)

- [ ] **Paso 1: Crear cuenta en Bing Webmaster Tools**

  Ir a `https://www.bing.com/webmasters` → iniciar sesión con cuenta Microsoft.

- [ ] **Paso 2: Agregar el sitio**

  Clic en "Add a site" → ingresar la URL del sitio → confirmar.

- [ ] **Paso 3: Verificar propiedad del sitio**

  Elegir método **XML file** (el más simple para Vercel):
  - Descargar el archivo XML que provee Bing
  - Colocarlo en `apps/web/public/BingSiteAuth.xml`
  - Hacer deploy (push a main → Vercel auto-deploys)
  - Volver a Bing y hacer clic en "Verify"

- [ ] **Paso 4: Enviar el sitemap en Bing**

  Bing Webmaster Tools → Sitemaps → "Submit sitemap" → ingresar `https://tu-sitio.vercel.app/sitemap.xml` → Submit.

---

### Tarea 4: Agregar JSON-LD schema markup — Homepage

> Schema `WebSite` en la homepage ayuda a Google a entender el sitio desde la primera visita.

- [ ] **Paso 1: Leer el archivo actual**

  ```bash
  cat apps/web/app/page.tsx
  ```

- [ ] **Paso 2: Agregar el bloque JSON-LD al componente HomePage**

  En `apps/web/app/page.tsx`, dentro del `return` del componente, agregar antes del primer elemento:

  ```tsx
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tu-sitio.vercel.app'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ofertas MercadoLibre Chile',
    url: siteUrl,
    description: 'Las mejores ofertas y productos de MercadoLibre Chile.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/buscar?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
  ```

  Y dentro del JSX retornado, como primer hijo del fragmento o div raíz:

  ```tsx
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
  ```

- [ ] **Paso 3: Verificar que el build no rompe**

  ```bash
  cd apps/web && npx tsc --noEmit
  ```

  Esperado: sin errores.

- [ ] **Paso 4: Commit**

  ```bash
  git add apps/web/app/page.tsx
  git commit -m "feat: add WebSite JSON-LD schema to homepage"
  ```

---

### Tarea 5: Agregar JSON-LD schema markup — Páginas de categoría

> Schema `CollectionPage` con `breadcrumb` le indica a Google que es una página de listado de productos.

- [ ] **Paso 1: Agregar el bloque JSON-LD en `apps/web/app/[category]/page.tsx`**

  En la función `CategoryPage`, antes del `return`, agregar:

  ```tsx
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tu-sitio.vercel.app'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Ofertas en ${cat.name} — MercadoLibre Chile`,
    description: `Encontrá las mejores ofertas en ${cat.name} en MercadoLibre Chile.`,
    url: `${siteUrl}/${category}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: cat.name,
          item: `${siteUrl}/${category}`,
        },
      ],
    },
  }
  ```

  Y dentro del JSX retornado, como primer hijo del `<div>` raíz:

  ```tsx
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
  ```

- [ ] **Paso 2: Verificar que el build no rompe**

  ```bash
  cd apps/web && npx tsc --noEmit
  ```

  Esperado: sin errores.

- [ ] **Paso 3: Verificar el schema con Rich Results Test de Google**

  Hacer deploy a Vercel (push a main). Luego ir a:
  `https://search.google.com/test/rich-results`

  Ingresar la URL de una categoría y confirmar que el schema `CollectionPage` + `BreadcrumbList` se detecta sin errores.

- [ ] **Paso 4: Commit**

  ```bash
  git add apps/web/app/\[category\]/page.tsx
  git commit -m "feat: add CollectionPage JSON-LD schema to category pages"
  ```

---

## Seguimiento post-deploy

| Acción | Cuándo |
|--------|--------|
| Revisar estado de indexación en GSC | 3-5 días después de Tarea 2 |
| Confirmar que Bing indexó el sitemap | 1 semana después de Tarea 3 |
| Verificar Rich Results Test tras deploy | Mismo día del deploy |
| Repetir solicitudes manuales GSC para nuevas categorías | Cuando se agreguen categorías |
