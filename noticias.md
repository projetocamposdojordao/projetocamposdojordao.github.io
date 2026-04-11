---
layout: default
title: Notícias
permalink: /noticias/
description: Acompanhe notícias e atualizações sobre Campos do Jordão.
---
<section class="page-hero compact">
  <div class="container">
    <div class="breadcrumbs"><a href="/">Início</a> <span>/</span> <span>Notícias</span></div>
    <p class="eyebrow">Cobertura local</p>
    <h1>Notícias de Campos do Jordão</h1>
    <p class="lead">Atualizações, novidades e conteúdos com contexto sobre a cidade.</p>
  </div>
</section>

<section class="content-section">
  <div class="container">
    <div class="cards-grid">
      {% assign noticias = site.posts | where: "category", "Notícias" %}
      {% for post in noticias %}
      <article class="card">
        <p class="tag">{{ post.category }}</p>
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <p>{{ post.description }}</p>
        <div class="card-footer">
          <span>{{ post.date | date: "%d/%m/%Y" }}</span>
          <a href="{{ post.url }}">Ler mais</a>
        </div>
      </article>
      {% endfor %}
    </div>
  </div>
</section>
