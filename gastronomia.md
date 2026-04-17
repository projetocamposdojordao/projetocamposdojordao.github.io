---
layout: default
title: Gastronomia
description: Restaurantes, cafés, bares e onde comer bem em Campos do Jordão.
permalink: /gastronomia/
pagination:
  enabled: true
  category: gastronomia
  per_page: 12
  permalink: "/page/:num/"
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

    {% if paginator.posts == empty %}
      <p>Ainda não há posts nesta categoria.</p>
    {% else %}
      <div class="cards-grid portal-cards">
        {% for post in paginator.posts %}
          <article class="card portal-card">
            {% if post.image %}
              <a href="{{ post.url | relative_url }}">
                <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" class="card-thumb">
              </a>
            {% endif %}
            <div class="card-body">
              <p class="tag">Gastronomia</p>
              <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>

              {% if post.description %}
                <p>{{ post.description }}</p>
              {% endif %}

              <div class="card-footer">
                <span>{{ post.date | date: "%d/%m/%Y" }}</span>
                <a href="{{ post.url | relative_url }}">Ler mais</a>
              </div>
            </div>
          </article>
        {% endfor %}
      </div>

      {% if paginator.total_pages > 1 %}
        <nav class="pagination">
          {% if paginator.previous_page %}
            <a class="pagination-btn prev" href="{{ paginator.previous_page_path | relative_url }}">← Anterior</a>
          {% endif %}

          <div class="pagination-numbers">
            {% for page in (1..paginator.total_pages) %}
              {% if page == paginator.page %}
                <span class="pagination-number active">{{ page }}</span>
              {% elsif page == 1 %}
                <a class="pagination-number" href="{{ '/gastronomia/' | relative_url }}">{{ page }}</a>
              {% else %}
                <a class="pagination-number" href="{{ site.paginate_path | replace: ':num', page | replace: 'blog', 'gastronomia' | relative_url }}">{{ page }}</a>
              {% endif %}
            {% endfor %}
          </div>

          {% if paginator.next_page %}
            <a class="pagination-btn next" href="{{ paginator.next_page_path | relative_url }}">Próxima →</a>
          {% endif %}
        </nav>
      {% endif %}
    {% endif %}
  </div>
</section>
