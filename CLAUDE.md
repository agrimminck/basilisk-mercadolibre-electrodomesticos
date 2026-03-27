# CLAUDE.md — Manual de Instrucciones del Proyecto

## Identidad del Proyecto
Plataforma de afiliados de Mercado Libre. Full-stack unificado con Next.js App Router.
Diseño moderno, elegante, con un leve sentido de misterio. Arquitectura y textos pensados para escalar internacionalmente.

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript (strict mode) |
| Estilos | Tailwind CSS v4 |
| Deploy | Vercel (frontend + API Routes) |
| Afiliados | Mercado Libre Affiliate API — sitio MLC (Chile) |

---

## Orientación Rápida ⚡ OBLIGATORIO

Antes de explorar el proyecto con comandos de shell o lecturas múltiples, Claude debe:

1. Leer `INDEX.md` para obtener el mapa de carpetas, archivos clave y variables de entorno.
2. Desde ahí, navegar directamente al archivo relevante sin exploraciones adicionales.
3. Si necesita entender qué se ha hecho anteriormente, revisar las carpetas `iterations/` y `plans/` — contienen el historial de cambios y decisiones técnicas de cada iteración.

Esto aplica a cualquier prompt, no solo los que comienzan con `prot - `.
**Excepción:** si el prompt pide algo que INDEX.md claramente no puede responder (ej: contenido interno de un archivo específico), ir directo al archivo.

---

## Directiva de Autonomía de Memoria ⚡ CRÍTICO

Este archivo (`CLAUDE.md`) y los archivos `INDEX.md` / `PROGRESS.md` son el núcleo de contexto.
**El objetivo es mantenerlos lo más ligeros posible para ahorrar tokens.**

### Reglas de expansión

1. En cuanto un dominio crezca a más de 3 items, crear un archivo `.md` dedicado en `docs/`:
   - `docs/API_MELI.md` — endpoints, autenticación, rate limits de la API de ML
   - `docs/COMPONENTS.md` — catálogo de componentes con props y uso
   - `docs/STATE.md` — gestión de estado global, caché, SWR/React Query
   - `docs/DB_SCHEMA.md` — esquema Prisma, relaciones, índices (Fase 5+)
   - `docs/DEPLOY.md` — variables de entorno, comandos de deploy, secrets

2. Cuando crees un archivo `docs/X.md`, actualizar `INDEX.md` con un puntero.

3. Al final de cada respuesta con cambios de código, incluir el **Protocolo de Cierre** (solo si el prompt comenzó con `prot - `).

---

## Activación de Protocolos ⚡ CRÍTICO

**Los protocolos de Inicio y Cierre SOLO se ejecutan si el prompt del usuario comienza con `prot - `.**
Si el prompt NO comienza con `prot - `, omitir completamente ambos protocolos y responder directo.

---

## Comando "que hago" ⚡ ESPECIAL

Si el prompt del usuario es **exactamente** `que hago` (sin mayúsculas, sin signos, sin texto adicional), ejecutar este flujo:

1. Leer `PROGRESS.md`.
2. Si hay ítems pendientes (sin `[x]`) en el checklist de la fase actual → listarlos y sugerir cuál atacar primero.
3. Si no hay pendientes inmediatos en la fase actual → leer `INDEX.md` y los **últimos 3 archivos** de la carpeta `plans/` (por número de iteración, de mayor a menor).
4. Con esa información, proponer **una sola sugerencia concreta** de qué se podría hacer a continuación, con una breve justificación.
5. Si la sugerencia implica un plan nuevo (no cubierto por ningún archivo en `plans/`), preguntar al usuario: **"¿Quieres que genere el plan en `plans/` para poder ejecutarlo luego con `resume`?"** — y esperar confirmación antes de crear cualquier archivo.

**No ejecutar código ni modificar archivos** durante este comando. Es solo orientación.

---

## Comando "resume" ⚡ ESPECIAL

Si el prompt del usuario es **exactamente** `resume` (sin mayúsculas, sin signos, sin texto adicional), ejecutar este flujo:

1. Leer `PROGRESS.md` y obtener el `## Iteration Index: N` y el bloque `## Iteración N — Checklist`.
2. Si hay ítems pendientes (`- [ ]`) en ese checklist → ejecutarlos comenzando por el primero pendiente. **Sí modificar archivos** — este comando implica acción, no solo orientación.
3. Si no hay pendientes en el checklist → listar los archivos en `plans/` (solo nombres, sin leer su contenido) y verificar si existe `plans/{N+1} - *.md`.
   - Si existe → leerlo y ejecutarlo como si hubiera sido el prompt del usuario, siguiendo el Protocolo de Inicio normalmente (sin necesidad de que el prompt empiece con `prot - `).
4. Si no existe plan con índice mayor a N → responder: **"No hay nada para resumir."**

---

## Protocolo de Inicio de Iteración ⚡ OBLIGATORIO (solo si prompt empieza con `prot - `)

**Antes de ejecutar cualquier prompt que implique cambios de código**, Claude debe seguir estos pasos en orden:

1. Leer `PROGRESS.md` y obtener el valor actual de `## Iteration Index: N`
2. Calcular el nuevo índice: `N + 1`
3. Crear `iterations/{N+1} - {slug}.md` — resumen breve del prompt
4. Crear `plans/{N+1} - {slug}.md` — plan de implementación detallado
5. Actualizar `## Iteration Index:` en `PROGRESS.md` al nuevo valor
6. Copiar el bloque `## Verificación` del plan recién creado a `PROGRESS.md` como `## Iteración {N+1} — Checklist` (con los mismos ítems `- [ ]`)
7. Recién entonces, comenzar a ejecutar el trabajo

**El slug es el mismo** para ambos archivos: `kebab-case`, máximo 6 palabras.
**Ejemplos:**
- `iterations/1 - setup-nextjs-tailwind.md` + `plans/1 - setup-nextjs-tailwind.md`
- `iterations/2 - meli-client-tipos-base.md` + `plans/2 - meli-client-tipos-base.md`

---

**Formato del archivo de iteración** (`iterations/`)
```markdown
# Iteración N — Descripción breve

**Prompt resumido:** [una o dos oraciones de qué pidió el usuario]
**Archivos afectados:** [lista de archivos que se van a crear o modificar]
```

---

**Formato del archivo de plan** (`plans/`)
```markdown
# Plan N — Descripción breve

## Contexto
[Por qué se hace este cambio, qué problema resuelve]

## Objetivo
[Resultado concreto esperado al finalizar]

## Pasos de implementación
1. [Paso detallado con archivo y qué se hace]
2. ...

## Decisiones técnicas
- [Elecciones de diseño relevantes y su razón]

## Verificación
- [ ] [Cómo confirmar que el paso N funcionó]
```

---

## Convenciones TypeScript / Next.js

### Nombres
- Variables y funciones: `camelCase`
- Componentes y clases: `PascalCase`
- Archivos de componentes: `PascalCase.tsx` (ej: `ProductCard.tsx`)
- Archivos de utilidades/hooks/lib: `kebab-case.ts` (ej: `meli-client.ts`)
- Constantes globales: `SCREAMING_SNAKE_CASE`
- Enumeradores: `PascalCase` tanto el nombre como los valores

### Imports — siempre rutas relativas
```typescript
// ❌
import { ProductCard } from '@/components/products/ProductCard'

// ✅
import { ProductCard } from '../components/products/ProductCard'
```

### Tipado — siempre explícito
```typescript
// ❌
const getProduct = async (id) => { ... }

// ✅
const GetProduct = async (id: string): Promise<Product> => { ... }
```

---

## Modularidad — Regla de los 200 líneas

- Ningún archivo puede superar 200 líneas. Si lo hace, dividirlo.
- Componentes atómicos: un componente = una responsabilidad.
- No crear componentes "God" que manejen fetch + render + lógica de negocio juntos.
- Estructura de un componente UI:

```
components/
  ui/           ← Átomos: Button, Badge, Spinner, Input
  layout/       ← Header, Footer, Nav, Sidebar
  products/     ← ProductCard, ProductGrid, ProductSkeleton
  search/       ← SearchBar, SearchResults, FilterPanel
```

---

## Identidad Visual

- Paleta base: fondos oscuros (`slate-900`, `zinc-900`) con acentos dorados/ámbar (`amber-400`, `yellow-500`)
- Tipografía: Inter o Geist (sans-serif limpia)
- Bordes sutiles, sombras profundas, transiciones suaves (150-300ms)
- Sin animaciones excesivas. El misterio viene de la densidad visual, no del movimiento.
- Imágenes de productos siempre con `aspect-ratio: 1/1`, fondo neutro.

---

## Protocolo de Cierre (solo si prompt empieza con `prot - `)

Al final de cada respuesta que implique cambios en el código, Claude debe incluir:

```
---
## 📋 Protocolo de Cierre

### Actualizar PROGRESS.md
[bloque de texto exacto para pegar — incluir los ítems del checklist `## Iteración N — Checklist` con `[x]` en los completados y `[ ]` en los pendientes]

### Actualizar INDEX.md (si aplica)
[bloque de texto exacto para pegar, o "Sin cambios"]

### Crear/Actualizar docs/X.md (si aplica)
[bloque de texto exacto para pegar, o "No aplica"]
```

---

## Lo que Claude NO hace sin que se le pida

- No pushea ni crea PRs
- No instala dependencias sin confirmación
- No agrega features no solicitadas
- No refactoriza código adyacente al cambio pedido
- No añade comentarios obvios ni docstrings innecesarios
