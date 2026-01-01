---
layout: page
title: Data Structures & Algorithms
permalink: /dsa/
---

# Data Structures & Algorithms

Comprehensive learning journey through DSA with problem-solving patterns, optimizations, and real-world applications.

## Topics Covered

### Basic Data Structures
- Arrays & Strings
- Linked Lists
- Stacks & Queues
- Trees & Graphs

### Algorithms
- Sorting & Searching
- Dynamic Programming
- Greedy Algorithms
- Graph Algorithms

## Posts

{% for post in site.posts %}
  {% if post.categories contains "DSA" %}
    - [{{ post.title }}]({{ post.url | relative_url }}) - {{ post.date | date: "%Y-%m-%d" }}
  {% endif %}
{% endfor %}

*More posts coming soon as I continue my learning journey.*
