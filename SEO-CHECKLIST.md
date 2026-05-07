# SEO Checklist — Red de proyectos PaginasFast

> Guía operativa para configurar Google Search Console, Bing Webmaster Tools y monitorear la red de backlinks de los 12 proyectos. Ejecutar en orden la primera vez, luego usar como referencia.

**Última actualización:** 2026-05-07
**Mantenedor:** Alejandro Rivera (rivera.ale982@gmail.com)

---

## 0. Aclaración importante: ¿GSC "activa" los backlinks?

**No.** Los backlinks funcionan porque Google los descubre durante el crawl normal, independiente de GSC. Pero GSC sí es esencial para:

- Acelerar la indexación (sitemap submit)
- Ver qué backlinks Google ya detectó
- Pedir indexación manual de URLs nuevas
- Detectar errores de crawl
- Monitorear posición en búsquedas

Sin GSC los sitios igual indexan, solo que más lento y a ciegas.

---

## 1. Mapa de los 12 sitios

| # | Proyecto | Dominio | Stack | Estado dominio |
|---|----------|---------|-------|----------------|
| 1 | fullfosas | limpiafosasydestape.cl | HTML+Tailwind | ✅ producción |
| 2 | destaperapido | destaperapido.cl | HTML+Tailwind | ✅ producción |
| 3 | arriazaconsulting.cl | arriazaconsulting.cl | HTML+Tailwind CDN | ✅ producción |
| 4 | cabanasSantaRegina | cabanassantaregina.cl | HTML+Bootstrap | ✅ producción |
| 5 | servicios-electricos | chileelectrico.cl | Astro+Vercel | ✅ producción |
| 6 | PaginasFast2025 | paginasfast.cl | HTML+Tailwind CDN | ✅ producción |
| 7 | chatbot-landing | chatbotventas.cl | HTML+Tailwind | ⚠️ verificar dominio real |
| 8 | sushi | sushiapp.cl | Next.js 16 | ⚠️ verificar dominio real |
| 9 | Random | recetarioflow.cl | HTML+Tailwind CDN | ⚠️ verificar dominio real |
| 10 | pagoImpuestoCorreo | pagoimpuestocorreo.cl | HTML+Bootstrap | ⚠️ verificar dominio real |
| 11 | plantilla-lading-page | (template) | Astro | 🔧 plantilla, sin deploy |
| 12 | Plantilla-proyectos | (template) | Astro | 🔧 plantilla, sin deploy |

**Acción previa:** Verificar y confirmar los dominios marcados ⚠️. Si son distintos, hacer find/replace en HTML antes de seguir.

---

## 2. Google Search Console — Setup inicial por sitio

Para cada uno de los 10 sitios con dominio real, repetir:

### 2.1 Agregar propiedad

1. Ir a https://search.google.com/search-console
2. Click en **Agregar propiedad**
3. Elegir **Dominio** (recomendado, cubre www + sin-www + http + https)
4. Ingresar el dominio raíz (ej: `limpiafosasydestape.cl`)

### 2.2 Verificación

Google pide verificar que eres dueño. La forma más rápida:

**Opción A — DNS TXT record (recomendada para "Dominio"):**
1. Google te da un valor tipo `google-site-verification=abc123...`
2. Agregar TXT record en tu DNS provider (Cloudflare, NIC Chile, GoDaddy):
   - Host: `@` (raíz)
   - Type: `TXT`
   - Value: `google-site-verification=abc123...`
3. Esperar propagación (5-30 min)
4. Click "Verify" en GSC

**Opción B — HTML file (para "Prefijo de URL"):**
1. Google te da un archivo `googleabc123.html`
2. Subir a `/public/` (HTML estáticos) o `/public/` (Next.js/Astro)
3. Confirmar accesible en `https://tudominio.cl/googleabc123.html`
4. Click "Verify"

### 2.3 Submit del sitemap

Una vez verificada la propiedad:

1. En GSC, sidebar → **Sitemaps**
2. Ingresar URL del sitemap. Por sitio:
   - `https://limpiafosasydestape.cl/sitemap.xml`
   - `https://destaperapido.cl/sitemap.xml`
   - `https://arriazaconsulting.cl/sitemap.xml`
   - `https://cabanassantaregina.cl/sitemap.xml`
   - `https://chileelectrico.cl/sitemap-index.xml` (Astro genera uno con index)
   - `https://paginasfast.cl/sitemap.xml`
   - `https://chatbotventas.cl/sitemap.xml`
   - `https://sushiapp.cl/sitemap.xml` (generado dinámicamente por Next.js)
   - `https://recetarioflow.cl/sitemap.xml`
   - `https://pagoimpuestocorreo.cl/sitemap.xml`
3. Click **Enviar**
4. Estado debería pasar a "Correcto" en 24-48h

### 2.4 Indexación manual de cada blog post nuevo

Para los blogs que acabas de publicar, acelerar la indexación:

1. GSC → barra superior **Inspección de URL**
2. Pegar URL del post (ej: `https://limpiafosasydestape.cl/blog/limpieza-fosa-restaurante-trampa-grasa`)
3. Click "Solicitar indexación"
4. Repetir para cada post nuevo

**Nota:** Hay un límite diario de ~10-15 URLs por propiedad. Si tienes muchas, espera a que el sitemap haga el trabajo.

---

## 3. Bing Webmaster Tools (también vale la pena)

Bing/Edge tiene 7-10% del search market en Chile. Vale la pena.

1. https://www.bing.com/webmasters
2. Importar directamente desde GSC (un click)
3. Submit del mismo sitemap

---

## 4. Verificar configuración técnica de cada sitio

Antes de "soltar al mundo", validar que cada sitio cumple los básicos:

### 4.1 Robots.txt accesible

Cada sitio debe responder en `/robots.txt`. Verificar:

```bash
for d in limpiafosasydestape.cl destaperapido.cl arriazaconsulting.cl cabanassantaregina.cl chileelectrico.cl paginasfast.cl chatbotventas.cl sushiapp.cl recetarioflow.cl pagoimpuestocorreo.cl; do
  echo "=== $d ==="
  curl -s -I "https://$d/robots.txt" | head -1
done
```

Cada uno debe responder `200 OK`.

### 4.2 Sitemap accesible

```bash
for d in limpiafosasydestape.cl destaperapido.cl arriazaconsulting.cl cabanassantaregina.cl chileelectrico.cl paginasfast.cl chatbotventas.cl sushiapp.cl recetarioflow.cl pagoimpuestocorreo.cl; do
  echo "=== $d ==="
  curl -s -I "https://$d/sitemap.xml" | head -1
done
```

### 4.3 Validar sitemap XML

https://www.xml-sitemaps.com/validate-xml-sitemap.html — pegar URL del sitemap.

### 4.4 Validar JSON-LD (rich snippets)

Para cada blog post:

https://search.google.com/test/rich-results — pegar URL del post y ver qué schemas Google detecta.

Esperado: Article + BreadcrumbList + Organization (algunos también FAQPage).

### 4.5 Validar OG image

https://www.opengraph.xyz/ — pegar URL y ver cómo se vería al compartir en WhatsApp/Facebook/LinkedIn.

Las imágenes deben ser 1200x630 px. Ya las generamos en `/og.jpg` (o `/images/og-*.jpg` en algunos casos).

### 4.6 Core Web Vitals

https://pagespeed.web.dev/ — pegar URL principal de cada sitio.

Targets:
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1

Si alguno está rojo, optimizar imágenes y CSS.

---

## 5. Monitoreo de la red de backlinks

### 5.1 Ver qué backlinks Google detectó

GSC → **Enlaces** → **Sitios con más enlaces**

Esperado después de 4-8 semanas: ver entre los referrers a los otros sitios de la red.

### 5.2 Validar manualmente

Usar [Ahrefs Backlink Checker (gratis, 1 query/día)](https://ahrefs.com/backlink-checker) o [Ubersuggest](https://neilpatel.com/ubersuggest/) para ver backlinks externos.

### 5.3 Esperar tiempo

Google tarda **4-8 semanas** en descubrir backlinks nuevos y reflejarlos en GSC. No esperar resultados inmediatos.

---

## 6. Esquema de la red de backlinks (referencia)

```
                    PaginasFast (hub agencia)
                    ↓ ↑ ↓ ↑
   ┌────────────────┴─┴─┴─┴────────────────┐
   ↓                                       ↓
SushiApp ←→ Full Fosas ←→ Destape Rápido
   ↓           ↓              ↓
ChatbotVentas Cabañas SR ←→ ChileEléctrico
   ↓           ↓              ↓
Arriaza  ←→  Recetario Flow  ←→  PagoImpuestoCorreo
```

Cada sitio tiene 3-7 backlinks salientes a otros sitios de la red, integrados en posts y footers.

---

## 7. Checklist de mantenimiento mensual

Al final de cada mes:

- [ ] GSC: revisar errores de cobertura por sitio
- [ ] GSC: ver impresiones / clicks / CTR — identificar top posts
- [ ] PageSpeed: verificar Core Web Vitals de las páginas top
- [ ] Backlinks: confirmar en Ahrefs que la red está consolidada
- [ ] Publicar al menos 1 nuevo post por sitio (para mantener freshness)
- [ ] Actualizar `lastmod` del sitemap cuando hay contenido nuevo

---

## 8. Errores comunes y troubleshooting

### "Mi sitemap dice 'No se ha podido obtener'"

- Verificar que el sitemap esté accesible vía HTTPS
- Verificar que sea XML válido (xml-sitemaps.com/validate)
- Verificar que las URLs adentro del sitemap respondan 200

### "Mis posts nuevos no aparecen en Google después de 2 semanas"

- Solicitar indexación manual via Inspección de URL en GSC
- Verificar que el post esté en el sitemap.xml
- Verificar que no tenga `<meta name="robots" content="noindex">`
- Esperar 1-2 semanas más (Google es lento con sites nuevos)

### "GSC muestra muchos errores 404"

- Revisar `redirects` en vercel.json — si renombraste URLs, agregar redirect 301
- Limpiar links rotos en blogs anteriores
- Si son URLs viejas que ya no existen, NO redireccionar a homepage (eso es spam) — usar 410 Gone

### "Mis backlinks no aparecen en GSC después de 2 meses"

- Esperar más (puede tardar 3-4 meses para sites nuevos)
- Verificar que los enlaces son `<a>` reales, no JavaScript
- Verificar que los enlaces no tengan `rel="nofollow"` (los nuestros usan `rel="noopener"` que sí pasa autoridad)
- Forzar a que Google crawlee el sitio que enlaza con Inspección URL

### "Los OG images se ven feos al compartir en WhatsApp"

- Validar en https://www.opengraph.xyz/
- Limpiar caché de Facebook con https://developers.facebook.com/tools/debug/
- WhatsApp también cachea — esperar 24-48h o testear con URL nueva

---

## 9. Comandos útiles de consola

### Verificar que el sitemap incluye los blog posts nuevos

```bash
curl -s https://limpiafosasydestape.cl/sitemap.xml | grep "<loc>" | wc -l
```

### Pingear a Google y Bing tras publicar contenido nuevo

Google deprecó la API de ping en 2023. La forma actual es:
- Submit manual del sitemap actualizado en GSC
- Inspección de URL para forzar re-crawl

Para Bing:
```bash
curl "https://www.bing.com/ping?sitemap=https://limpiafosasydestape.cl/sitemap.xml"
```

### Ver headers de un sitio (validar canonical, robots, etc)

```bash
curl -sI https://limpiafosasydestape.cl/blog/limpieza-fosa-restaurante-trampa-grasa | grep -iE "link|x-robots"
```

### Ver schema JSON-LD de una página

```bash
curl -s https://limpiafosasydestape.cl/blog/limpieza-fosa-restaurante-trampa-grasa | grep -A 30 'application/ld+json' | head -40
```

---

## 10. Roadmap de SEO 30/60/90 días

### 30 días
- [ ] Verificar todas las propiedades en GSC
- [ ] Submit todos los sitemaps
- [ ] Indexación manual de los 30+ posts nuevos
- [ ] Configurar Bing Webmaster

### 60 días
- [ ] Validar que los backlinks aparezcan en GSC
- [ ] Publicar 1 post nuevo por sitio
- [ ] Auditar Core Web Vitals
- [ ] Limpiar errores 404 si los hay

### 90 días
- [ ] Revisar posiciones por keyword (GSC → Rendimiento)
- [ ] Identificar top 10 posts y considerar expandirlos
- [ ] Considerar Google Ads para los keywords con buen CTR pero baja posición
- [ ] Evaluar agregar más backlinks externos (guest posts en sitios del rubro)

---

## 11. Referencias rápidas

- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Test de Datos Estructurados](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Open Graph Validator](https://www.opengraph.xyz/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Schema.org reference](https://schema.org/docs/full.html)
- [Sitemap protocol](https://www.sitemaps.org/protocol.html)

---

## Anexo: estructura de archivos de SEO por sitio

Cada sitio (con domain real) debe tener:

```
/
├── robots.txt          ← Permite todos los bots, apunta al sitemap
├── sitemap.xml         ← Lista de URLs con lastmod y priority
├── og.jpg              ← 1200x630 px, branded
├── llms.txt            ← Resumen para crawlers de IA
├── favicon.ico
└── index.html (o framework)
    ├── <link rel="canonical">
    ├── <meta name="robots" content="index,follow">
    ├── <meta name="description">
    ├── og: tags (type, title, description, url, image, locale, site_name)
    ├── twitter: tags (card, title, description, image)
    └── JSON-LD (Article, BreadcrumbList, Organization)
```

Estado actual: ✅ todos los 10 sitios con dominio real cumplen este mínimo.
