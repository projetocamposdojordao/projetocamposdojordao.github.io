---
layout: default
title: Eventos
permalink: /eventos/
description: Agenda e programação de eventos em Campos do Jordão.
---
<section class="page-hero compact">
  <div class="container">
    <div class="breadcrumbs"><a href="/">Início</a> <span>/</span> <span>Eventos</span></div>
    <p class="eyebrow">Agenda cultural</p>
    <h1>Eventos em Campos do Jordão</h1>
    <p class="lead">Espaço para publicar programação cultural, agenda da semana e destaques sazonais.</p>
  </div>
</section>

<section class="content-section">
  <div class="container">
    <div class="cards-grid">
      {% assign eventos = site.posts | where: "category", "Eventos" %}
      {% for post in eventos %}
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
