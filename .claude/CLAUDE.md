# CLAUDE.md — affiliate-gaming

> Los protocolos globales están definidos en `~/.claude/CLAUDE.md` (cybercore) y se cargan automáticamente.
> Este archivo contiene únicamente la configuración específica de este proyecto.

---

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

Antes de explorar el proyecto con comandos de shell o lecturas múltiples, Claude debe seguir la **Regla de Lectura en Capas**:

1. Leer `.claude/INDEX-DOCUMENTATION.md` — mapa de qué está documentado.
2. Leer el `.claude/docs/[nombre].md` relevante — solo si Capa 1 no alcanza.
3. Usar `.claude/INDEX.md` para ubicar código — solo si Capa 2 no alcanza.

Si necesita entender qué se ha hecho anteriormente, revisar `.claude/protocols/development/iterations/` y `plans/`.

**Excepción:** si el prompt pide algo que claramente no está en las capas anteriores, ir directo al archivo.

---

## Directiva de Autonomía de Memoria ⚡ CRÍTICO

Este archivo (`CLAUDE.md`) y los archivos `.claude/INDEX.md` / `.claude/INDEX-PROGRESS.md` son el núcleo de contexto local. Cada protocolo mantiene su propio `PROGRESS.md` en su carpeta (`.claude/protocols/development/PROGRESS.md`, etc.).
**El objetivo es mantenerlos lo más ligeros posible para ahorrar tokens.**

### Reglas de expansión

1. En cuanto un dominio crezca a más de 3 items, crear un archivo `kebab-case.md` en `.claude/docs/`:
   - `.claude/docs/api-meli.md` — endpoints, autenticación, rate limits de la API de ML ✅
   - `.claude/docs/deploy.md` — variables de entorno, comandos de deploy, secrets ✅
   - `.claude/docs/components.md` — catálogo de componentes con props y uso
   - `.claude/docs/state.md` — gestión de estado global, caché, SWR/React Query
   - `.claude/docs/db-schema.md` — esquema Prisma, relaciones, índices (Fase 5+)

2. Cuando crees un archivo `.claude/docs/X.md`, actualizar `.claude/INDEX-DOCUMENTATION.md` y `.claude/INDEX-DOCUMENTATION-HELPER.md`.

3. Al final de cada respuesta con cambios de código, incluir el **Protocolo de Cierre** (solo si el prompt comenzó con `protocol develop -`).

---

## Identidad Visual

- Paleta base: fondos oscuros (`slate-900`, `zinc-900`) con acentos dorados/ámbar (`amber-400`, `yellow-500`)
- Tipografía: Inter o Geist (sans-serif limpia)
- Bordes sutiles, sombras profundas, transiciones suaves (150-300ms)
- Sin animaciones excesivas. El misterio viene de la densidad visual, no del movimiento.
- Imágenes de productos siempre con `aspect-ratio: 1/1`, fondo neutro.
