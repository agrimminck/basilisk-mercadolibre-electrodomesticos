# Plan 10 — Debug Tailwind CSS en Vercel

## Contexto
El sitio en Vercel no muestra el diseño: las clases de Tailwind v4 no se aplican.
Localmente funciona. El `postcss.config.js` existe y usa `module.exports`, pero el CSS no se genera en producción.

## Hipótesis a descartar (en orden)

| # | Hipótesis | Cómo descartarla |
|---|-----------|-----------------|
| 1 | `tailwindcss` / `@tailwindcss/postcss` en devDependencies no se instalan en Vercel | Moverlos a dependencies |
| 2 | Vercel no encuentra `postcss.config.js` porque el rootDirectory está mal configurado | Verificar ruta relativa del config |
| 3 | `@import "tailwindcss"` en globals.css no es suficiente sin directivas `@layer` | Agregar directivas base o usar forma alternativa |

## Pasos de implementación

1. **`apps/web/package.json`** — Mover `tailwindcss` y `@tailwindcss/postcss` de `devDependencies` a `dependencies`
   - Vercel puede saltear devDependencies si detecta producción

2. Si con eso no alcanza: **`apps/web/app/globals.css`** — Reemplazar `@import "tailwindcss"` por las tres directivas explícitas de Tailwind v4:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
   (o el equivalente v4: `@layer base`, `@layer components`, `@layer utilities`)

3. Si tampoco: investigar los build logs de Vercel en busca de warnings de postcss

## Decisiones técnicas
- Empezar por la hipótesis 1 (mover deps) porque es el cambio menos invasivo
- No agregar `tailwind.config.js` — Tailwind v4 no lo necesita

## Verificación
- [ ] El diseño (Tailwind CSS) carga correctamente en Vercel
- [ ] Fondo oscuro (`slate-900`) visible en home
- [ ] Clases de color y layout aplicadas en categorías y header
