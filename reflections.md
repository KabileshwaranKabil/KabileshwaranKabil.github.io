---
layout: page
title: Reflections
permalink: /reflections/
---

# Reflections

Honest notes about learning habits, goals, obstacles, progress, and the work behind the concepts.

## Thinking out loud in public

<div class="content-post-list">
{% for post in site.posts %}
  {% if post.categories contains "Reflections" %}
    <article class="content-post-row">
      <span class="content-post-date">{{ post.date | date: "%b %d, %Y" }}</span>
      <a href="{{ post.url | relative_url }}" class="content-post-link">{{ post.title }}</a>
      <span class="content-post-arrow" aria-hidden="true">&#8594;</span>
    </article>
  {% endif %}
{% endfor %}
</div>
