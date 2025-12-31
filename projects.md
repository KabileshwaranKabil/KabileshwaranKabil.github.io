---
layout: page
title: Projects
permalink: /projects/
---

# Projects

Real-world projects building practical skills and applying Computer Science fundamentals.

## Featured Projects

Check back soon for detailed project breakdowns including:
- Design decisions
- Technical challenges
- Lessons learned
- Source code and documentation

## Project Posts

{% for post in site.posts %}
  {% if post.categories contains "Projects" %}
    - [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%Y-%m-%d" }}
  {% endif %}
{% endfor %}

*Project documentation coming soon.*
