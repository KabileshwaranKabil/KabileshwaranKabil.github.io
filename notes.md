---
layout: page
title: Notes
permalink: /notes/
---

# Notes & Learnings

Short references, practical explanations, and useful concepts collected while building stronger Computer Science fundamentals.

## Explore the notes

These notes overlap with the deeper topic archives, so one idea can be found through both its subject and this quick-reference shelf.

<div class="content-post-list">
{% for post in site.posts %}
  {% if post.categories contains "Notes" %}
    <article class="content-post-row">
      <span class="content-post-date">{{ post.date | date: "%b %d, %Y" }}</span>
      <a href="{{ post.url | relative_url }}" class="content-post-link">{{ post.title }}</a>
      <span class="content-post-arrow" aria-hidden="true">&#8594;</span>
    </article>
  {% endif %}
{% endfor %}
</div>

<p class="page-note">New notes are added as part of the daily learning practice.</p>
