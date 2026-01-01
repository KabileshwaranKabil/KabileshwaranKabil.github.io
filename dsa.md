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

<div class="scrollable-posts">
{% for post in site.posts %}
  {% if post.categories contains "DSA" %}
    <div class="post-item-scroll">
      <span class="post-date-scroll">{{ post.date | date: "%b %d, %Y" }}</span>
      <a href="{{ post.url | relative_url }}" class="post-link-scroll">{{ post.title }}</a>
    </div>
  {% endif %}
{% endfor %}
</div>

*More posts coming soon as I continue my learning journey.*

<style>
.scrollable-posts {
  max-height: 400px;
  overflow-y: auto;
  background: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
}

.scrollable-posts::-webkit-scrollbar {
  width: 8px;
}

.scrollable-posts::-webkit-scrollbar-track {
  background: var(--background);
  border-radius: 4px;
}

.scrollable-posts::-webkit-scrollbar-thumb {
  background: var(--accent-color);
  border-radius: 4px;
}

.scrollable-posts::-webkit-scrollbar-thumb:hover {
  background: var(--accent-dark);
}

.post-item-scroll {
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: all 0.3s ease;
}

.post-item-scroll:last-child {
  border-bottom: none;
}

.post-item-scroll:hover {
  background: var(--background);
  padding-left: 10px;
  margin-left: -10px;
  margin-right: -10px;
  padding-right: 10px;
  border-radius: 8px;
}

.post-date-scroll {
  font-size: 0.85rem;
  color: var(--text-secondary) !important;
  font-weight: 500;
}

.post-link-scroll {
  color: var(--text-primary) !important;
  text-decoration: none !important;
  font-weight: 600;
  font-size: 1.05rem;
  transition: color 0.3s ease;
}

.post-link-scroll:hover {
  color: var(--accent-color) !important;
}

@media (max-width: 768px) {
  .scrollable-posts {
    max-height: 300px;
    padding: 15px;
  }
}
</style>
