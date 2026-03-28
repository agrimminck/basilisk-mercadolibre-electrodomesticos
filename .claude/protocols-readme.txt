================================================================================
  RESUMEN RÁPIDO
================================================================================

  protocol advice develop                         →  orientación develop: qué sigue según el estado actual
  protocol resume develop plans                   →  acción develop: continúa lo pendiente o ejecuta el próximo plan
  protocol develop - {task}                       →  desarrollo trazado: con registro en iterations/ y plans/
  protocol advice folders architecture            →  orientación: analiza carpetas y genera plan si hay mejoras
  protocol resume folders architecture plans      →  acción: ejecuta el plan de reestructuración más reciente
  protocol memory flush                           →  limpia .claude/protocols/ y docs/, resetea INDEX y PROGRESS
  protocol new world                              →  mapea estructura del proyecto y genera nuevo INDEX.md
  {cualquier cosa}                                →  desarrollo directo: sin protocolos, respuesta inmediata

================================================================================
  PROTOCOLOS
================================================================================

  protocol develop - {task}
    Activa Protocolo de Inicio y Cierre. Crea registro en .claude/protocols/development/
    (iterations, plans, bitacora). Para features, integraciones y cambios importantes.

  protocol advice folders architecture
    Lee iterations y bitacora de development para analizar la estructura de carpetas.
    Si hay mejoras, genera plan en .claude/protocols/analyze-folders-architecture/. Autónomo.

================================================================================
  COMANDOS
================================================================================

  protocol advice develop                     →  Sin modificar archivos: lista pendientes o propone el próximo paso.
  protocol resume develop plans               →  Con modificación: ejecuta pendientes o arranca el siguiente plan.
  protocol advice folders architecture        →  Sin modificar archivos: analiza carpetas y propone reestructuración.
  protocol resume folders architecture plans  →  Con modificación: ejecuta el plan de reestructuración más reciente.
  protocol memory flush                       →  Limpia toda la memoria de .claude/ (pide confirmación antes).
  protocol new world                          →  Genera INDEX.md nuevo recorriendo la estructura del proyecto.

================================================================================
