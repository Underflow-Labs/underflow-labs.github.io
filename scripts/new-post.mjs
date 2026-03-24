import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getArg(flag) {
  const index = process.argv.indexOf(flag);

  if (index === -1) {
    return undefined;
  }

  return process.argv[index + 1];
}

const title = getArg("--title");

if (!title) {
  console.error('Uso: npm run post:new -- --title "Titulo del articulo" [--author "Francisco Ruiz"] [--category "GEO y SEO"]');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const author = getArg("--author") ?? "Francisco Ruiz";
const category = getArg("--category") ?? "GEO y SEO";
const description =
  getArg("--description") ??
  "Explica el resultado esperado, el problema que resuelve y por que este articulo es util para el lector ideal.";
const excerpt =
  getArg("--excerpt") ??
  "Resume el articulo en una sola idea clara de 1 a 2 frases para cards, sitemap, RSS y llms.";
const tags = getArg("--tags") ?? "GEO, SEO, automatizacion";
const slug = getArg("--slug") ?? slugify(title);
const featured = getArg("--featured") === "true";
const fileName = `${today}-${slug}.md`;
const filePath = path.join(BLOG_DIR, fileName);

if (fs.existsSync(filePath)) {
  console.error(`Ya existe un articulo con ese slug: ${fileName}`);
  process.exit(1);
}

const template = `---
title: ${title}
slug: ${slug}
description: ${description}
excerpt: ${excerpt}
author: ${author}
category: ${category}
tags: ${tags}
publishedAt: ${today}
updatedAt: ${today}
featured: ${featured}
---

Empieza con una introduccion corta que responda rapido a la promesa del titulo y deje claro para quien esta escrito el articulo.

## Que esta pasando

Explica el contexto, el cambio de mercado o el problema operativo que hace relevante este tema ahora.

## Donde esta la oportunidad

Conecta el problema con una oportunidad concreta para el lector. Incluye ejemplos, errores comunes y decisiones practicas.

## Como aplicarlo en una empresa real

Describe un proceso simple, accionable y con lenguaje de negocio. Cuando tenga sentido, enlaza a [websites](/servicios/websites), [automatizaciones](/servicios/automatizaciones) o [software a medida](/servicios/software).

## Checklist rapido

- Paso 1
- Paso 2
- Paso 3

## Cierre

Cierra con una recomendacion concreta y una llamada a accion natural hacia [contacto](/contacto).
`;

fs.writeFileSync(filePath, template, "utf8");

const syncResult = spawnSync(process.execPath, [path.join(ROOT, "scripts", "sync-content.mjs")], {
  stdio: "inherit",
});

if (syncResult.status !== 0) {
  process.exit(syncResult.status ?? 1);
}

console.log(`Articulo creado en ${filePath}`);
