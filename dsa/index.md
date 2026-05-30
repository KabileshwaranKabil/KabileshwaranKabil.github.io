---
layout: default
title: DSA Solutions
permalink: /dsa/
---

<header class="page-header">
  <h1>LeetCode Solutions</h1>
  <p class="lead">A curated collection of my LeetCode solutions — organized, annotated, and styled for easy browsing.</p>
</header>

<section class="dsa-grid">
  {% assign items = site.dsa | sort: 'title' %}
  {% for item in items %}
    {% include dsa-card.html item=item %}
  {% endfor %}
  {% if items == empty %}
    <p>No DSA solutions found. To add them, follow the integration instructions in <a href="/DSA_INTEGRATION.md">DSA_INTEGRATION.md</a>.</p>
  {% endif %}
</section>
