# Bitácora — Iteración 14: Google Indexing Setup

## Hallazgos y decisiones

### Homepage indexada en Google ✅
- GSC → Inspección de URL confirma que `https://web-ten-beige-23.vercel.app/` está en Google.

### Subpáginas de categorías NO indexadas ❌
- Ninguna URL de categoría aparece en Google al inspeccionarlas en GSC.
- Incluye URLs que sí existen en el sitio, como `/accesorios-para-autos`.
- Causa probable: Google aún no rastreó esas páginas. La indexación de subpáginas puede tardar días/semanas después de que la homepage sea indexada.
- Acción tomada: solicitar indexación manual por GSC (hasta ~10 req/día).

### Bing Webmaster Tools — parcialmente configurado ⚠️
- Cuenta creada y sitio agregado en `https://www.bing.com/webmasters`.
- Sitemap enviado con éxito: Bing descubrió 11 URLs.
- **Pendiente:** verificación de propiedad con XML file. El usuario no completó este paso.
  - Instrucción: en Bing Webmaster Tools → Verificar → elegir método "XML file" → descargar el archivo → colocarlo en `apps/web/public/BingSiteAuth.xml` → push a main (Vercel hace deploy automático) → volver a Bing y hacer clic en "Verify".

### GSC sitemap sigue con error ❌
- Estado: `"Sitemap could not be read"` — GSC no puede fetchear el sitemap.
- El sitemap responde correctamente en el navegador y en Bing no hubo problema.
- Causa probable: comportamiento conocido de GSC que puede tardar días en resolver o requiere re-envío manual.
- Acción pendiente: re-enviar el sitemap en GSC (borrar y volver a agregar) si el error persiste en 24-48hs.

### Rich Results Test — sin items detectados ℹ️
- Google pudo hacer crawl de la página correctamente.
- No detectó "items" de rich results.
- Esto es **esperado**: los schemas `WebSite` y `CollectionPage` no generan rich results visuales en Google (no hay estrellas, precios, etc.). Sirven para que Google entienda la estructura del sitio, no para mostrar snippets enriquecidos.
- El schema está siendo leído correctamente; la ausencia de items en el test no indica error.

## Pendientes

- [ ] Completar verificación de propiedad en Bing con XML file
- [ ] Re-enviar sitemap en GSC si el error persiste en 24-48hs
- [ ] Verificar en 3-5 días si las categorías solicitadas manualmente aparecen en Google
