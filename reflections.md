---
layout: default
title: Reflections
---

# 💭 Reflections

This section contains my personal thoughts, experiences, and opinions beyond academics.

Here, I write honestly about:
- My learning habits
- Using AI in daily work
- Productivity struggles
- Mindset, discipline, and growth
- Lessons from failures and experimentation

These posts are not tutorials. They are **thinking-in-public** notes.

---

## 📝 Reflection Posts

<ul>
  {% for post in site.categories.Reflections %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <br>
      <small style="color: gray;">
        {{ post.date | date: "%Y-%m-%d" }}
      </small>
    </li>
    <hr>
  {% endfor %}
</ul>
