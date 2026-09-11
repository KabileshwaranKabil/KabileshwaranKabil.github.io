---
layout: default
title: All Posts
permalink: /posts/
---

<div class="posts-page">
  <h1>Blog and Notes</h1>
  <p class="posts-intro">Search the learning archive by idea, technology, or topic.</p>

  <div class="posts-tools">
    <label for="postSearch" class="sr-only">Search posts</label>
    <input id="postSearch" class="search-input" type="search" placeholder="Search titles, topics, or excerpts" autocomplete="off">
    <div class="filter-row" id="categoryFilters">
      <button type="button" class="filter-chip is-active" data-filter="all">All</button>
      {%- assign all_categories = site.data.categories -%}
      {%- for category in all_categories -%}
        <button type="button" class="filter-chip" data-filter="{{ category.slug }}">{{ category.name }}</button>
      {%- endfor -%}
    </div>
  </div>
  
  {%- if site.posts.size > 0 -%}
    <div class="posts-list" id="postsList">
      {%- for post in site.posts -%}
        {% assign words = post.content | number_of_words %}
        {% assign reading_time = words | plus: 219 | divided_by: 220 %}
        {% capture searchable_categories %}{% for category in post.categories %}{{ category | slugify }} {% endfor %}{% endcapture %}
        <article class="post-item">
          <div
            class="post-item-search"
            data-title="{{ post.title | downcase | escape }}"
            data-excerpt="{{ post.excerpt | strip_html | downcase | escape }}"
            data-categories="{{ searchable_categories | strip | escape }}"
          ></div>
          <div class="post-item-header">
            <span class="post-date">{{ post.date | date: "%B %d, %Y" }} • {{ reading_time }} min read</span>
            <div class="post-categories">
              {%- for category in post.categories -%}
                {%- assign category_slug = category | slugify -%}
                <a class="category-badge" href="{{ '/topics/' | append: category_slug | append: '/' | relative_url }}">{{ category }}</a>
              {%- endfor -%}
            </div>
          </div>
          <h2 class="post-item-title">
            <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
          </h2>
          {%- if post.excerpt -%}
            <p class="post-item-excerpt">{{ post.excerpt | strip_html | truncatewords: 40 }}</p>
          {%- endif -%}
          <a href="{{ post.url | relative_url }}" class="read-more">Read now</a>
        </article>
      {%- endfor -%}
    </div>
    <p id="postsEmptyState" class="no-posts-message" hidden>No matching posts found. Try another keyword or filter.</p>
  {%- else -%}
    <p class="no-posts-message">No posts yet. Check back soon!</p>
  {%- endif -%}
</div>
