const fs = require("fs");
const path = require("path");
const slugify = require("slugify");

function createSlug(text) {
  return slugify(text || "", { lower: true, strict: true, locale: "pt" });
}

// ... seu código anterior ...

for (const item of keywords) {
  const keyword = item.keyword;
  const category = item.category || "noticias";
  const intent = item.intent || "informacional";
  const priority = item.priority || "média";

  const title = keyword;
  const slug = createSlug(keyword);

  const content = `# ${title}

Conteúdo inicial sobre ${keyword}.
`;

  const frontmatter = `---
layout: post
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
category: "${category}"
intent: "${intent}"
priority: "${priority}"
date: ${new Date().toISOString()}
---
`;

  const contentWithMetaSlug = `${frontmatter}\n${content}`;

  const outputDir = path.join(process.cwd(), "_posts");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const fileName = `${new Date().toISOString().slice(0, 10)}-${slug}.md`;
  const filePath = path.join(outputDir, fileName);

  fs.writeFileSync(filePath, contentWithMetaSlug, "utf8");
  console.log(`Post criado: ${fileName}`);
}
