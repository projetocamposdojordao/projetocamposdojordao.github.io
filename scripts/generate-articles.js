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
  const keyword = item.keyword;
  const category = item.category || "geral";

  const response = await client.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      {
        role: "developer",
        content:
          "Você é um redator especializado em SEO local. Escreva em português do Brasil. Gere conteúdo útil, claro e bem organizado sobre Campos do Jordão. Não invente preços, horários, telefones ou dados específicos não fornecidos. Responda apenas em JSON válido. Seja criativo."
      },
      {
        role: "user",
        content: `Crie um artigo sobre o tema: "${keyword}". 
Crie um artigo completo em português sobre o tema: "{{KEYWORD}}"

Regras:

- O artigo deve ter entre 1200 e 2000 palavras
- Estrutura em markdown compatível com Jekyll
- Incluir título (H1), subtítulos (H2 e H3)
- Parágrafos bem distribuídos
- Tom casual, informativo e com autoridade
- Otimizado para SEO

IMAGENS:

- A cada 2 ou 3 parágrafos, inserir uma imagem
- Use o seguinte formato padrão:

![Descrição da imagem](/assets/images/{{slug}}-X.jpg)

- Substituir X por 1, 2, 3...
- A descrição deve ser natural e relacionada ao conteúdo

Exemplo:
![Vista de Campos do Jordão no inverno](/assets/images/campos-do-jordao-inverno-1.jpg)

IMPORTANTE:

- NÃO usar imagens externas (Unsplash, etc)
- NÃO usar HTML
- Apenas markdown puro
- As imagens devem parecer parte natural do conteúdo

SLUG:

- Gerar automaticamente baseado no título do artigo
- Ex: campos-do-jordao-no-inverno

FRONT MATTER:

---
layout: post
title: "{{TITULO}}"
date: {{DATA}}
categories: [blog]
image: /assets/images/{{slug}}-1.jpg
---
`
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

  const article = JSON.parse(response.choices[0].message.content);
  const slug = slugify(article.title);
  const date = today();
  const filename = `${date}-${slug}.md`;
  const filepath = path.join(postsDir, filename);

  const markdown = `---
layout: post
title: "${escapeQuotes(article.title)}"
description: "${escapeQuotes(article.description)}"
category: ${article.category || category}
tags: [${(article.tags || []).join(", ")}]
---

${article.content}
`;

  fs.writeFileSync(filepath, markdown, "utf-8");
  console.log(`Gerado: ${filepath}`);
}
