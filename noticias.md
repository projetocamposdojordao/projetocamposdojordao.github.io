---
layout: default
title: Notícias
permalink: /noticias/
description: Últimas notícias e atualizações de Campos do Jordão.
---

<section class="page-hero compact">
  <div class="container">
    <div class="breadcrumbs">
      <a href="/">Início</a>
      <span>/</span>
      <span>Notícias</span>
    </div>
    <p class="eyebrow">Atualizações locais</p>
    <h1>Notícias de Campos do Jordão</h1>
    <p class="lead">Acompanhe as principais novidades, acontecimentos e atualizações da cidade.</p>
  </div>
</section>

<section class="content-section">
  <div class="container">
    <div class="cards-grid portal-cards">
      {% assign noticias = site.posts | where: "category", "Notícias" %}
      {% for post in noticias %}
      <article class="card portal-card">

        {% if post.image %}
          <a href="{{ post.url }}" class="card-thumb">
            <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
          </a>
        {% endif %}

        <div class="card-body">
          <p class="tag">{{ post.category | default: 'Notícias' }}</p>

          <h3>
            <a href="{{ post.url }}">{{ post.title }}</a>
          </h3>

          {% if post.description %}
            <p>{{ post.description }}</p>
          {% endif %}

          <div class="card-footer">
            <span>{{ post.date | date: "%d/%m/%Y" }}</span>
            <a href="{{ post.url }}">Ler mais</a>
          </div>
        </div>

      </article>
      {% endfor %}
    </div>
  </div>
</section>
