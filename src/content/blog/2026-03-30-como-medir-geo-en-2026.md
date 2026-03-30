---
title: Como medir GEO en 2026: GA4, Search Console y logs para saber si ChatGPT Search y Google AI Mode generan pipeline
slug: como-medir-geo-en-2026
description: Aprende a medir visibilidad, trafico y conversiones desde ChatGPT Search y Google AI Mode con un sistema real de GA4, Search Console y logs.
excerpt: GEO sin medicion no es estrategia. Es entusiasmo. Si quieres saber si AI search trae negocio, necesitas separar visibilidad, referrals y pipeline con un esquema de medicion util.
author: Francisco Clarke
category: GEO y SEO
tags: GEO, ChatGPT Search, Google AI Mode, GA4, Search Console
publishedAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
---

Hay una forma rapida de detectar si una empresa esta haciendo GEO en serio o solo repitiendo discurso: preguntale como lo mide.

Si la respuesta es una mezcla de "estamos apareciendo mas", un par de capturas de ChatGPT y algun pico raro de trafico organico, no hay sistema. Hay intuicion. Y la intuicion no alcanza cuando hay que decidir si conviene invertir en contenido, rehacer paginas de servicio o cambiar la arquitectura del sitio.

En 2026 el problema ya no es solo como aparecer en AI search. El problema real es **como conectar esa visibilidad con visitas calificadas y pipeline**. Ahi es donde casi todos los equipos se caen.

## Resumen ejecutivo

- OpenAI documenta que los clics salientes desde ChatGPT Search incluyen `utm_source=chatgpt.com`, asi que una parte del trafico si puede medirse de forma directa en analytics.
- Google explica que AI Overviews y AI Mode no tienen un reporte separado en Search Console: ese rendimiento entra dentro del reporte general de `Web`.
- Si mides GEO como una sola metrica, vas a mezclar visibilidad, referrals y conversiones. Eso vuelve inutil cualquier decision.
- El sistema que mejor funciona hoy combina Search Console, GA4, logs del servidor o CDN y CRM.
- Las primeras URLs que conviene medir no suelen ser la home. Suelen ser paginas de [websites](/servicios/websites), [automatizaciones](/servicios/automatizaciones), [software a medida](/servicios/software), comparativas y FAQs con intencion comercial.

## El error mas comun: querer una metrica unica para un problema que ya no es lineal

En SEO clasico ya costaba medir bien. En GEO, mas.

ChatGPT Search y Google AI Mode no funcionan como un canal prolijo donde todo llega etiquetado y atribuido. Cada plataforma expone senales distintas:

- OpenAI deja un referral util en analytics.
- Google mezcla AI features dentro del rendimiento general de busqueda.
- Ninguna de las dos te resuelve por si sola la atribucion comercial.

Eso obliga a dejar de preguntar "cuanto trafico vino de IA" como si fuera una sola cosa.

La pregunta correcta es otra: **que parte puedo medir directamente, que parte puedo inferir con evidencia y que parte termina en negocio**.

## Lo que si sabemos hoy por documentacion oficial

Hay dos cambios concretos que hacen esta medicion mucho mas aterrizable que hace un ano.

Por un lado, OpenAI ya documenta que si tu sitio permite el acceso de `OAI-SearchBot`, los clics desde ChatGPT Search pueden aparecer en analytics con `utm_source=chatgpt.com`. Eso no resuelve todo, pero si da una senal clara para separar referrals reales de ruido.

Por otro lado, Google ya documento como pensar AI Overviews y AI Mode desde el lado del sitio. Su posicion es bastante directa: no necesitas archivos nuevos, markup especial ni schemas raros para aparecer. Lo que sigue importando es la base SEO. Y, a nivel reporting, esos clics e impresiones aparecen dentro del rendimiento web general de Search Console.

Esa combinacion cambia bastante el juego. Ya no estamos solo en terreno de teoria. Ya hay suficiente senal para construir un sistema de medicion util.

## El cambio de fondo: las consultas son mas largas y mas cercanas a una decision

Google viene diciendo hace tiempo que las consultas en AI Mode son mas largas que una busqueda tradicional. Al principio hablo de preguntas alrededor de dos veces mas largas. En sus resultados de fines de 2025 ya hablo de consultas hasta tres veces mas largas en algunos casos.

Eso importa por una razon muy simple: si las preguntas son mas largas, comparativas y exploratorias, entonces el contenido que gana no es solo el que rankea por una keyword corta. Gana el que responde mejor una decision.

Eso acerca GEO a temas que Underflow Labs ya trabaja todos los dias:

- como estructurar un website para capturar demanda compleja,
- como explicar tradeoffs de una automatizacion real,
- como aterrizar una oferta de software a medida sin humo.

Si tus paginas no responden esas preguntas, medir GEO tampoco te va a salvar.

## El modelo que recomiendo: tres capas de medicion

### 1. Visibilidad

La primera capa responde una pregunta simple: **estamos entrando en el universo de consultas donde AI search puede elegirnos?**

Aca conviene mirar:

- impresiones y clics en Search Console para URLs priorizadas,
- crecimiento de queries largas y comparativas,
- paginas que ganan cobertura semantica despues de una mejora editorial,
- estado tecnico de rastreo e indexacion.

Esta capa no prueba pipeline. Prueba elegibilidad.

### 2. Trafico identificado o inferido

La segunda capa responde: **esa visibilidad esta trayendo visitas utiles?**

Aca separaria dos tipos de evidencia.

La primera es directa:

- sesiones con `utm_source=chatgpt.com`,
- landings de entrada desde articulos y paginas de servicio,
- navegacion posterior hacia [servicios](/servicios) o [contacto](/contacto).

La segunda es inferida:

- crecimiento de sesiones organicas sobre URLs preparadas para consultas complejas,
- cambios en engagement sobre esas landings,
- correlacion entre mejoras de contenido y aumento de consultas largas relevantes.

No es lo mismo. Y mezclarlo es una muy buena forma de enganar al equipo.

### 3. Conversion y pipeline

La tercera capa responde la unica pregunta que de verdad importa: **esto esta moviendo negocio o solo interes?**

Aca mediría:

- clicks a CTA clave,
- formularios iniciados y enviados,
- reuniones agendadas,
- oportunidades creadas en CRM,
- conversiones asistidas por primer contacto en contenido organico o AI-assisted.

Si no llegas a esta capa, GEO queda como una conversacion de marketing. No como una decision de negocio.

## Como se arma el stack minimo sin complicarlo de mas

No hace falta montar una infraestructura de atribucion enterprise para empezar. Hace falta dejar de improvisar.

Yo armaria el sistema asi:

### Search Console para medir superficie de demanda

Search Console sigue siendo la base para ver si tus paginas estan entrando en consultas donde antes no aparecian.

Lo mas util no es mirar el sitio entero mezclado. Lo mas util es agrupar por tipo de pagina:

- servicio,
- comparativa,
- FAQ,
- post de problema concreto.

Si una pagina de [software a medida](/servicios/software) empieza a ganar impresiones para consultas comparativas y mas largas, ahi hay una senal real. Si la home gana impresiones de marca, esa es otra historia.

### GA4 para identificar trafico con senal util

En GA4 buscaria tres cosas:

1. sesiones con `chatgpt.com` como source,
2. landings que reciben trafico organico despues de mejoras GEO,
3. rutas de navegacion hacia contacto o paginas comerciales.

Hay un detalle operativo importante: si tus redirects o formularios rompen UTM params, pierdes una de las pocas senales directas que hoy existen. Vale la pena auditar eso antes de mirar dashboards.

### Logs para validar que no estas midiendo una fantasia

Este punto se omite demasiado.

Si `OAI-SearchBot` o `Googlebot` estan siendo frenados por el CDN, una regla agresiva del WAF o algun middleware mal configurado, puedes pasar semanas mirando dashboards sin darte cuenta de que el problema esta antes.

Los logs sirven para verificar:

- que los bots relevantes pueden entrar,
- que no reciben `403`, `429` o `5xx` en paginas clave,
- que tus landings importantes se rastrean de verdad,
- que la politica tecnica coincide con lo que crees haber configurado.

Sin esa capa, muchas mediciones se apoyan sobre una suposicion falsa.

## Un ejemplo concreto para una empresa B2B

Imagina una empresa industrial que quiere captar demanda para automatizar aprobaciones, integraciones y trazabilidad operativa.

Publica tres activos:

1. una pagina de servicio bien aterrizada,
2. una comparativa entre ERP y software a medida en un caso puntual,
3. una FAQ sobre automatizacion con validaciones y control.

Si el equipo mira solo trafico total, no aprende nada.

Si mira esto, si:

- Search Console muestra crecimiento en queries largas relacionadas con aprobaciones, integraciones y errores operativos,
- GA4 detecta nuevas sesiones sobre esas URLs y parte del trafico llega con `utm_source=chatgpt.com`,
- las visitas avanzan hacia [automatizaciones](/servicios/automatizaciones) o [contacto](/contacto),
- el CRM empieza a recibir reuniones donde esas paginas aparecen como primer toque o toque asistido.

Eso ya no es "nos citaron en una IA". Eso es una senal comercial.

## Que paginas conviene priorizar primero

No arrancaria por todo el sitio ni por los posts mas lindos. Arrancaria por las paginas que mejor conectan con una decision real:

- [websites](/servicios/websites) cuando el problema es conversion o captacion,
- [automatizaciones](/servicios/automatizaciones) cuando la consulta mezcla procesos, tiempo y control,
- [software a medida](/servicios/software) cuando el comprador esta evaluando enfoques,
- comparativas y FAQs que resuelvan objeciones concretas.

Eso tambien corrige otro vicio comun: separar demasiado el blog de la oferta. En AI search, las piezas informacionales sirven mucho mas cuando empujan a paginas comerciales bien hechas.

## El dashboard que si mostraria en una reunion

No mostraria un dashboard enorme con veinte cortes secundarios. Mostraria uno chico y util:

1. impresiones y clics de Search Console en 10 URLs priorizadas,
2. queries largas emergentes por cluster,
3. sesiones con `utm_source=chatgpt.com`,
4. sesiones organicas sobre landings mejoradas,
5. microconversiones y formularios por landing,
6. oportunidades asistidas en CRM,
7. alertas tecnicas de crawl.

Si ese tablero no cambia decisiones de backlog, arquitectura o contenido, sobra.

## Checklist de implementacion en 14 dias

- audita si tus UTM params sobreviven redirects y formularios,
- revisa logs para confirmar acceso de `OAI-SearchBot` y `Googlebot`,
- define entre 5 y 10 URLs prioritarias,
- separa en Search Console servicio, comparativa, FAQ y blog comercial,
- crea una exploracion en GA4 para `chatgpt.com`,
- conecta eventos de conversion con landing page y source,
- persiste first touch en CRM,
- mejora al menos una pagina de servicio y una comparativa,
- agrega enlaces internos hacia [servicios](/servicios) y [contacto](/contacto),
- revisa resultados a 30 dias, no a 72 horas.

## FAQ

### Se puede medir ChatGPT Search de forma directa

Si, parcialmente. OpenAI documenta que los clics salientes desde ChatGPT Search incluyen `utm_source=chatgpt.com`, asi que una parte del trafico puede identificarse en analytics.

### Google AI Mode aparece separado en Search Console

No. Google explica que el rendimiento de AI Overviews y AI Mode se incluye dentro del reporte general de `Web` en Search Console.

### Entonces GEO no se puede atribuir bien

Se puede atribuir lo suficiente como para tomar decisiones. Pero no con una sola fuente. Hace falta combinar Search Console, GA4, logs y CRM.

### Que pesa mas: visibilidad o conversion

Las dos, en secuencia. Primero necesitas visibilidad util. Pero si no termina en sesiones calificadas y pipeline, no alcanza.

### Que hay que medir primero en un sitio B2B

Paginas de servicio, comparativas y FAQs con intencion comercial. Son las que mas cerca estan de una decision y las que mejor convierten una mejora semantica en negocio.

## GEO sin medicion es solo entusiasmo bien presentado

La buena noticia es que medir mejor ya no requiere inventar tanto como hace unos meses. OpenAI y Google ya dejaron suficientes pistas para salir del humo: una parte del trafico se identifica, otra se infiere con evidencia y todo eso puede conectarse con pipeline si el sitio esta bien armado.

La mala noticia es que muchas empresas todavia quieren resolverlo con una metrica unica o con dashboards lindos. Eso no alcanza.

Si quieres que GEO sirva para algo, tienes que unir contenido, arquitectura web, infraestructura y conversion. Ahi es donde un buen sistema de [websites](/servicios/websites), [automatizaciones](/servicios/automatizaciones) y [software a medida](/servicios/software) deja de ser una lista de servicios y se vuelve una maquina de demanda mas clara, mas medible y mas util.
