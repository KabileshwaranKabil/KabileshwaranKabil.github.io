---
layout: default
title: Notes
permalink: /notes/
---

# Notes & Learnings

<ul>
  {% for post in site.categories.Notes %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      ({{ post.date | date: "%Y-%m-%d" }})
    </li>
  {% endfor %}
</ul>
