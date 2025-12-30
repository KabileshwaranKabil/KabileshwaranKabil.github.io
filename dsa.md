---
layout: default
title: DSA
permalink: /dsa/
---

# Data Structures & Algorithms

<ul>
  {% for post in site.categories.DSA %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      ({{ post.date | date: "%Y-%m-%d" }})
    </li>
  {% endfor %}
</ul>
