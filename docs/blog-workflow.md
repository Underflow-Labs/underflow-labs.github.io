# Blog workflow

## Que se agrego

- Blog file-based en `src/content/blog/*.md`
- Manifest generado automaticamente en `src/generated/blog-manifest.ts`
- `sitemap.xml`, `rss.xml`, `llms.txt`, `llms-full.txt` y `blog-index.json` regenerados desde un solo comando
- Portadas sociales PNG generadas automaticamente en `public/og/blog/`
- Prerender estatico de las rutas importantes y del blog durante `npm run build`
- Workflow de deploy por GitHub Actions para que publicar despues sea compatible con agentes

## Crear un articulo nuevo

Opcion rapida:

```bash
npm run post:new -- --title "Titulo del articulo"
```

Esto crea un markdown con frontmatter base y ejecuta `npm run content:sync`.

Opcion manual:

1. Crear un archivo `.md` dentro de `src/content/blog/`
2. Usar este frontmatter:

```md
---
title: Titulo del articulo
slug: slug-del-articulo
description: Meta descripcion y resumen corto para buscadores
excerpt: Texto corto para cards y RSS
author: Francisco Ruiz
category: GEO y SEO
tags: GEO, SEO, automatizacion
publishedAt: 2026-03-24
updatedAt: 2026-03-24
featured: false
---
```

3. Ejecutar:

```bash
npm run content:sync
npm run build
```

`npm run content:sync` ahora tambien genera automaticamente la portada social de cada articulo.

`npm run build` ahora tambien prerenderiza las paginas para que GitHub Pages sirva HTML estatico por ruta.

## Convenciones para agentes

- Mantener slugs cortos y descriptivos
- Enlazar hacia `/servicios`, `/servicios/websites`, `/servicios/automatizaciones`, `/servicios/software` o `/contacto` cuando corresponda
- Evitar contenido generico: cada articulo debe responder una pregunta concreta de negocio
- Actualizar `updatedAt` cuando se cambie de forma sustancial
- Si el build falla, no publicar

## Publicacion

El repositorio incluye `.github/workflows/deploy.yml` para desplegar en `gh-pages` al hacer push a `main`.

Flujo recomendado para automatizacion:

1. Crear markdown del articulo
2. Ejecutar `npm run publish:content`
3. El script construye, prerenderiza, hace commit y push a `main`
4. GitHub Actions publica automaticamente en GitHub Pages

### Nota sobre worktrees y ejecucion autonoma

- `npm run publish:content` ahora soporta ejecucion desde `detached HEAD` siempre que el commit actual este alineado con `main`
- en ese caso hace push con `HEAD:main`
- si el worktree no esta basado en `main` o no puede garantizar fast-forward seguro, falla con mensaje explicito
- si faltan dependencias locales para build, el script intenta repararlas con `npm ci` automaticamente
- la automatizacion no deberia depender de `CODEX_HOME` dentro del repo; si necesita memoria operativa, usar ruta absoluta o fallback cuando la variable no exista
