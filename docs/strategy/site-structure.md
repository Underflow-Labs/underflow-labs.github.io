# Site Structure Strategy — Underflow Labs

## Objetivo
Reposicionar Underflow Labs para vender dos ofertas principales con máxima claridad en los primeros dos scrolls:
- `Websites que convierten`
- `Automatizaciones que ahorran tiempo/costo`

## Sitemap propuesto (MVP)
- `/` Home
- `/servicios/websites`
- `/servicios/automatizaciones`
- `/casos`
- `/contacto`

## Redirects de compatibilidad
- `/about` -> `/`
- `/services` -> `/servicios/websites`
- `/case-studies` -> `/casos`
- `/contact` -> `/contacto`
- `/process` -> `/#proceso`
- `/insights` -> `/`

## Home — orden de secciones
1. Hero
2. Servicios (2 cards)
3. Proof corto (templates placeholder)
4. Proceso (4 pasos)
5. Paquetes (sin precio fijo)
6. FAQ
7. CTA final

## Qué debe resolver cada sección
- Hero: explicar valor en una frase, sin tecnicismos enterprise.
- Servicios: mostrar resultados y entregables concretos por oferta.
- Proof: dar estructura de evidencia sin inventar datos.
- Proceso: reducir incertidumbre del comprador.
- Paquetes: facilitar decisión inicial.
- FAQ: remover objeciones de compra.
- CTA final: cerrar con acción directa.

## Estrategia de CTA
- Primario: `Agendar llamada`
- Secundario: `Ver servicios`
- Terciario: `Ver casos`

## Ubicación de CTAs
- Header sticky: CTA primario permanente.
- Hero: CTA primario + secundario.
- Cards de servicios: CTA por línea.
- Paquetes: CTA de evaluación.
- Cierre: CTA primario + CTA a contacto.

## Tono de copy (regla operativa)
- Directo, comercial y específico.
- Hablar de impacto: más leads, más confianza, menos tareas manuales, más velocidad operativa.
- Evitar framing de “consultoría enterprise” como oferta principal.
- Evitar buzzwords sin evidencia.

## Modelo de contenido escalable
- Copy centralizado en `src/content/es/*`.
- Layout desacoplado de texto para edición rápida.
- Listo para i18n futuro creando `src/content/en/*` sin cambiar componentes.

## Señales de confianza mínimas
- Casos y testimonios en formato placeholder etiquetado (hasta tener evidencia validada).
- Proceso visible.
- FAQ transparente sobre tiempos, propiedad y soporte.
- Formulario de contacto con expectativa de respuesta clara.

## Criterios de éxito en UX/conversión
- En primer viewport se entienden las 2 ofertas.
- En primer scroll se ven outcomes y camino de acción.
- Navegación corta y orientada a decisión.
- No más de 7 secciones en Home.
