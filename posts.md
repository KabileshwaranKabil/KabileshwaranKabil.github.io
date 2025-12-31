---
layout: default
title: All Posts
permalink: /posts/
---

<div class="posts-page">
  <h1>All Posts</h1>
  
  {%- if site.posts.size > 0 -%}
    <div class="posts-list">
      {%- for post in site.posts -%}
        <article class="post-item">
          <div class="post-item-header">
            <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
            <div class="post-categories">
              {%- for category in post.categories -%}
                <span class="category-badge">{{ category }}</span>
              {%- endfor -%}
            </div>
          </div>
          <h2 class="post-item-title">
            <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
          </h2>
          {%- if post.excerpt -%}
            <p class="post-item-excerpt">{{ post.excerpt | strip_html | truncatewords: 40 }}</p>
          {%- endif -%}
          <a href="{{ post.url | relative_url }}" class="read-more">Read More →</a>
        </article>
      {%- endfor -%}
    </div>
  {%- else -%}
    <p class="no-posts-message">No posts yet. Check back soon!</p>
  {%- endif -%}
</div>

<style>
.posts-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.posts-page h1 {
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-align: center;
  color: var(--text-primary) !important;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.post-item {
  background: var(--surface);
  border-radius: 12px;
  padding: 28px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.post-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-color: var(--accent-color);
}

.post-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 10px;
}

.post-date {
  font-size: 0.9rem;
  color: var(--text-secondary) !important;
  font-weight: 500;
}

.post-categories {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.category-badge {
  background: var(--accent-color);
  color: white !important;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.post-item-title {
  font-size: 1.6rem;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.post-item-title a {
  color: var(--text-primary) !important;
  text-decoration: none;
  transition: color 0.3s ease;
}

.post-item-title a:hover {
  color: var(--accent-color) !important;
}

.post-item-excerpt {
  color: var(--text-secondary) !important;
  line-height: 1.7;
  margin-bottom: 16px;
}

.read-more {
  color: var(--accent-color) !important;
  font-weight: 600;
  text-decoration: none !important;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: var(--accent-dark) !important;
}

.no-posts-message {
  text-align: center;
  color: var(--text-secondary) !important;
  font-size: 1.2rem;
  padding: 60px 20px;
}

@media (max-width: 768px) {
  .posts-page h1 {
    font-size: 2rem;
  }

  .post-item {
    padding: 20px;
  }

  .post-item-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .post-item-title {
    font-size: 1.3rem;
  }
}
</style>
