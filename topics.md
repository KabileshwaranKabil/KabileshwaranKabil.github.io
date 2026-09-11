---
layout: default
title: Explore Topics
permalink: /topics/
---

<section class="topic-index-hero reveal">
  <p class="eyebrow"><span class="eyebrow-dot"></span> The learning map</p>
  <h1 class="page-title">Explore topics</h1>
  <p class="page-lead">Choose a path through the notebook. Each topic gathers related articles, patterns, and practical lessons in one place.</p>
</section>

<section class="topic-grid topic-grid-index reveal" aria-label="Learning topics">
  {% for topic in site.data.categories %}
    {% assign topic_count = 0 %}
    {% for post in site.posts %}{% if post.categories contains topic.name %}{% assign topic_count = topic_count | plus: 1 %}{% endif %}{% endfor %}
    <a class="topic-card topic-card-{{ topic.slug }}" href="{{ '/topics/' | append: topic.slug | append: '/' | relative_url }}">
      <span class="topic-card-name">{{ topic.name }}</span>
      <span class="topic-card-description">{{ topic.description }}</span>
      <span class="topic-card-footer"><span>{{ topic_count }} articles</span><span aria-hidden="true">&#8594;</span></span>
    </a>
  {% endfor %}
</section>
