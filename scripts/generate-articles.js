console.log("API KEY existe?", !!process.env.OPENAI_API_KEY);

import fs from "fs";
import path from "path";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const keywordsPath = path.resolve("data/keywords.json");
const postsDir = path.resolve("_posts");

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

const items = JSON.parse(fs.readFileSync(keywordsPath, "utf-8"));

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function escapeQuotes(text) {
  return String(text || "").replace(/"/g, '\\"');
}

function today() {
  const d = new Date();
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function postExists(filename) {
  return fs.existsSync(path.join(postsDir, filename));
}

for (const item of items) {
  const keyword = item.keyword;
  const category = item.category || "Geral";

  const response = await client.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      {
        role: "developer",
        content:
          "Você é um redator especializado em SEO local. Escreva em português do Brasil. Gere conteúdo útil, claro e bem organizado sobre Campos do Jordão. Não invente preços, horários, telefones ou dados específicos não fornecidos. Responda apenas em JSON válido."
      },
      {
        role: "user",
        content: `Crie um artigo sobre o tema: "${keyword}". O artigo deve ser pensado para um site em Jekyll sobre Campos do Jordão. Quero introdução, subtítulos H2, conclusão e FAQ curto.`
      }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "jekyll_article",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            category: { type: "string" },
            tags: {
              type: "array",
              items: { type: "string" }
            },
            content: { type: "string" }
          },
          required: ["title", "description", "category", "tags", "content"],
          additionalProperties: false
        }
      }
    }
  });

  let article;
  try {
    article = JSON.parse(response.choices[0].message.content.trim());
  } catch (e) {
    console.log(`Erro ao interpretar JSON para keyword: ${keyword}`);
    continue;
  }

  const slug = slugify(article.title);
  const date = today();
  const filename = `${date}-${slug}.md`;

  if (postExists(filename)) {
    console.log(`Pulando (já existe): ${filename}`);
    continue;
  }

  const markdown = `---
layout: post
title: "${escapeQuotes(article.title)}"
description: "${escapeQuotes(article.description)}"
category: ${escapeQuotes(article.category || category)}
tags:
${(article.tags || []).map(tag => `  - ${tag}`).join("\n")}
---

${article.content}
`;

  const filepath = path.join(postsDir, filename);
  fs.writeFileSync(filepath, markdown, "utf-8");
  console.log(`Gerado: ${filepath}`);
}
