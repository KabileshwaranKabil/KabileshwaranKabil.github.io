---
layout: page
title: Notes
permalink: /notes/
---

# Notes & Learnings

Daily notes and learnings documenting my progress through Computer Science fundamentals.

## Learning Topics

- Core CS Concepts
- Programming Patterns
- Technical Explanations
- Quick References

## Recent Notes

{% for post in site.posts %}
  {% if post.categories contains "Notes" %}
    - [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%Y-%m-%d" }}
  {% endif %}
{% endfor %}

*New notes added regularly as part of my daily learning practice.*
