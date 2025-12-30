---
layout: default
title: Projects
permalink: /projects/
---

# Projects

<ul>
  {% for post in site.categories.Projects %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      ({{ post.date | date: "%Y-%m-%d" }})
    </li>
  {% endfor %}
</ul>
