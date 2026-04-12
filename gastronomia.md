---
layout: default
title: Gastronomia
description: Restaurantes, cafés, bares e onde comer bem em Campos do Jordão.
permalink: /gastronomia/
---

<section class="hero-banner page-hero">
  <div class="container">
    <div class="page-hero-card">
      <p class="eyebrow">Sabores da serra</p>
      <h1>Gastronomia em Campos do Jordão</h1>
      <p class="lead">
        Restaurantes, cafés, chocolaterias, bares, cervejarias e lugares para comer bem em Campos do Jordão.
      </p>
    </div>
  </div>
</section>

<section class="content-section">
  <div class="container">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Conteúdo recente</p>
        <h2>Posts de gastronomia</h2>
      </div>
    </div>

    <div class="cards-grid portal-cards">
      {% assign food_posts = site.posts | where_exp: "post", "post.categories contains 'gastronomia'" %}
      {% if food_posts.size == 0 %}
        <p>Ainda não há posts nesta categoria.</p>
      {% endif %}

      {% for post in food_posts limit:12 %}
        <article class="card portal-card">
          {% if post.image %}
            <a href="{{ post.url }}">
              <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" class="card-thumb">
            </a>
          {% endif %}
          <div class="card-body">
            <p class="tag">Gastronomia</p>
            <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
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
