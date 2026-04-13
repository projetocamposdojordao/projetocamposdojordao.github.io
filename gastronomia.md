---
layout: default
title: Gastronomia
permalink: /gastronomia/
---

<h1>Teste Gastronomia</h1>

<p>Total de posts: {{ site.posts | size }}</p>

{% for post in site.posts %}
  <p>
    {{ post.title }} — categoria: {{ post.category }}
  </p>
{% endfor %}
