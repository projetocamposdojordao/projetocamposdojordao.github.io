---
layout: default
title: Turismo
permalink: /turismo/
description: Guias, dicas e roteiros sobre turismo em Campos do Jordão.
---
<section class="page-hero compact">
  <div class="container">
    <div class="breadcrumbs"><a href="/">Início</a> <span>/</span> <span>Turismo</span></div>
    <p class="eyebrow">Guias e roteiros</p>
    <h1>Turismo em Campos do Jordão</h1>
    <p class="lead">Conteúdo para ajudar visitantes a entender melhor a cidade, seus bairros e suas experiências.</p>
  </div>
</section>

<section class="content-section">
  <div class="container">
    <div class="cards-grid">
      {% assign turismo = site.posts | where: "category", "Turismo" %}
      {% for post in turismo %}
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
