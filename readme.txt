================================================================================
  RESUMEN RÁPIDO
================================================================================

  que hago          →  orientación: qué sigue según el estado actual
  resume            →  acción: continúa lo pendiente o ejecuta el próximo plan
  prot - {tarea}    →  desarrollo trazado: con registro en iterations/ y plans/
  {cualquier cosa}  →  desarrollo directo: sin protocolos, respuesta inmediata

================================================================================





================================================================================
  GUÍA DE MODOS DE INTERACCIÓN CON CLAUDE
  Proyecto: Plataforma de Afiliados Mercado Libre
================================================================================

Existen tres formas de interactuar con Claude en este proyecto, cada una con
un comportamiento distinto:


--------------------------------------------------------------------------------
1. PROMPT NORMAL
   Cualquier mensaje que no sea ninguno de los casos especiales abajo.
--------------------------------------------------------------------------------

Comportamiento:
  - Claude responde directamente al pedido, sin rituales adicionales.
  - Antes de tocar código, lee INDEX.md para orientarse en el proyecto.
  - NO ejecuta Protocolo de Inicio ni Protocolo de Cierre.
  - NO crea archivos en iterations/ ni plans/.

Cuándo usarlo:
  - Preguntas, explicaciones, cambios puntuales, refactors, correcciones de bugs,
    ajustes de UI, o cualquier tarea de desarrollo cotidiana.

Ejemplo:
  "agrega un skeleton loader al ProductCard"
  "explícame cómo funciona el meli-client"


--------------------------------------------------------------------------------
2. MODO PROTOCOLO — prefijo "prot - "
   El prompt comienza EXACTAMENTE con "prot - " (con espacio y guión).
--------------------------------------------------------------------------------

Comportamiento:
  PROTOCOLO DE INICIO (antes de tocar código):
    1. Lee PROGRESS.md y obtiene el Iteration Index actual (N).
    2. Calcula N+1.
    3. Crea iterations/{N+1} - {slug}.md  →  resumen breve del prompt.
    4. Crea plans/{N+1} - {slug}.md       →  plan detallado de implementación.
    5. Actualiza el Iteration Index en PROGRESS.md al nuevo valor.
    6. Recién entonces ejecuta el trabajo.

  PROTOCOLO DE CIERRE (al final de la respuesta):
    Incluye un bloque con el texto exacto para actualizar manualmente:
      - PROGRESS.md  (estado, checklist, log de sesión)
      - INDEX.md     (si se crearon archivos o carpetas nuevas)
      - docs/X.md    (si creció algún dominio con más de 3 items)

Cuándo usarlo:
  - Iteraciones de desarrollo importantes donde querés trazabilidad completa.
  - Cuando necesitás que quede registro en el historial de plans/ e iterations/.
  - Trabajo de features nuevas, cambios de arquitectura, o integraciones.

Ejemplo:
  "prot - integrar el cliente de Mercado Libre con OAuth"
  "prot - crear la página de detalle de producto"


--------------------------------------------------------------------------------
3. COMANDO DE ORIENTACIÓN — exactamente "que hago"
   El prompt es EXACTAMENTE la frase "que hago" (sin signos, sin mayúsculas).
--------------------------------------------------------------------------------

Comportamiento:
  1. Lee PROGRESS.md.
  2. Si hay ítems pendientes en el checklist de la fase actual →
       los lista y sugiere cuál atacar primero.
  3. Si no hay pendientes en la fase actual →
       lee INDEX.md y los últimos 3 archivos de plans/ (por número, desc.)
       y propone UNA sugerencia concreta de próximo paso con justificación.

  NO modifica ningún archivo. Solo orienta.

Cuándo usarlo:
  - Cuando retomás el proyecto después de un tiempo y no recordás dónde quedaste.
  - Cuando terminaste una tarea y querés saber qué sigue.
  - Para obtener una recomendación rápida basada en el estado real del proyecto.

Ejemplo:
  "que hago"


--------------------------------------------------------------------------------
4. COMANDO DE ACCIÓN — exactamente "resume"
   El prompt es EXACTAMENTE la frase "resume" (sin signos, sin mayúsculas).
--------------------------------------------------------------------------------

Comportamiento:
  1. Lee PROGRESS.md y obtiene el Iteration Index actual (N).
  2. Si hay ítems pendientes (sin [x]) en el checklist de la fase actual →
       los ejecuta comenzando por el primero pendiente.
       SÍ modifica archivos — es un comando de acción.
  3. Si no hay pendientes → busca en plans/ el plan con índice N+1.
       Si existe → lo lee y lo ejecuta (activa el Protocolo de Inicio
       automáticamente, sin necesidad del prefijo "prot - ").
  4. Si no hay pendientes ni plan siguiente →
       responde: "No hay nada para resumir."

Cuándo usarlo:
  - Cuando querés que Claude retome y ejecute sin tener que explicar nada.
  - Para continuar una iteración que quedó a medias.
  - Para arrancar la siguiente iteración ya planificada en plans/.

Ejemplo:
  "resume"
