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

for (const item of items) {
  try {
    const keyword = item.keyword;
    const category = item.category || "geral";

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
          content: `Crie um artigo completo em português do Brasil sobre o tema: "${keyword}".

Regras:
- artigo entre 1200 e 2000 palavras
- markdown compatível com Jekyll
- incluir H2 e H3
- parágrafos bem distribuídos
- tom casual, informativo e com autoridade
- otimizado para SEO local
- não inventar preços, horários, telefones ou fatos específicos não fornecidos
- inserir uma imagem em markdown a cada 2 ou 3 parágrafos
- usar imagens neste formato: ![descrição](/assets/images/SLUG-X.jpg)
- substituir X por 1, 2, 3...
- usar "SLUG" como placeholder temporário
- não incluir front matter
- não usar HTML
- responder somente com os campos do JSON solicitado`
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

    const raw = response.choices[0].message.content;

    if (!raw) {
      console.log(`Resposta vazia para: ${keyword}`);
      continue;
    }

    let article;
    try {
      article = JSON.parse(raw);
    } catch (err) {
      console.log(`Erro ao fazer parse do JSON para: ${keyword}`);
      console.log(raw);
      continue;
    }

    if (!article.title || !article.content) {
      console.log(`Artigo inválido para: ${keyword}`);
      console.log(article);
      continue;
    }

    const slug = slugify(article.title);
    const date = today();
    const filename = `${date}-${slug}.md`;
    const filepath = path.join(postsDir, filename);

    const contentWithRealSlug = article.content.replaceAll("SLUG", slug);

    const markdown = `---
layout: post
title: "${escapeQuotes(article.title)}"
description: "${escapeQuotes(article.description)}"
category: ${article.category || category}
tags: [${(article.tags || []).join(", ")}]
image: /assets/images/${slug}-1.jpg
---

${contentWithRealSlug}
`;

    fs.writeFileSync(filepath, markdown, "utf-8");
    console.log(`Gerado: ${filepath}`);
  } catch (err) {
    console.error(`Erro ao processar keyword: ${item.keyword}`);
    console.error(err);
  }
}
