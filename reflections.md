---
layout: page
title: Reflections
permalink: /reflections/
---

# 💭 Reflections

Personal thoughts, experiences, and lessons from my learning journey.

## About This Section

This is where I share:
- Learning habits and strategies
- Struggles and how I overcame them
- Insights about CS and programming
- Productivity and mindset reflections
- Honest takes on my progress

## Reflection Posts

{% for post in site.posts %}
  {% if post.categories contains "Reflections" %}
    - [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%Y-%m-%d" }}
  {% endif %}
{% endfor %}

*Thinking out loud in public.*
