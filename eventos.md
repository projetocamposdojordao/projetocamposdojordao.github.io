---
layout: default
title: Eventos
permalink: /eventos/
description: Agenda cultural e eventos em Campos do Jordão.
---



<section class="page-hero compact">
  <div class="container">
    <div class="breadcrumbs">
      <a href="/">Início</a>
      <span>/</span>
      <span>Eventos</span>
    </div>
    <p class="eyebrow">Agenda cultural</p>
    <h1>Eventos em Campos do Jordão</h1>
    <p class="lead">Descubra festivais, shows, eventos sazonais e tudo que acontece na cidade.</p>
  </div>
</section>

<section class="content-section">
  <div class="container">
    <div class="cards-grid portal-cards">
      {% assign eventos = site.posts | where: "category", "Eventos" %}
      {% for post in eventos %}
      <article class="card portal-card">

        {% if post.image %}
          <a href="{{ post.url }}" class="card-thumb">
            <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
          </a>
        {% endif %}

        <div class="card-body">
          <p class="tag">{{ post.category | default: 'Eventos' }}</p>

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
