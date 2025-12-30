---
layout: default
title: Learning in Public
---

<!-- Navigation -->
<nav style="margin-bottom: 20px;">
[🏠 Home](/) | [📚 DSA](/dsa/) | [🛠 Projects](/projects/) | [📝 Notes](/notes/)
</nav>

# 👋 Welcome to My Learning Journal

Hi, I’m **Kabileshwaran**, a Computer Science undergraduate documenting what I learn every day.  

This site is a public record of my journey through core CS concepts, data structures & algorithms, and real-world project development. I write clear explanations, reflect on mistakes, and reinforce fundamentals through consistent practice.

---

## ✨ What You’ll Find Here

- 📘 **Daily Learnings & Notes** – concise, clear, and structured  
- 🧠 **DSA Concepts & Problem Solving** – step-by-step explanations  
- 🛠 **Projects & Implementation Insights** – practical coding experience  
- 📌 **Key Takeaways** – lessons from building, debugging, and learning

The goal is simple: **learn deeply, write clearly, and improve consistently**.

---

## 📝 All Blog Posts

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}" style="font-weight: bold;">{{ post.title }}</a>
      <br>
      <small style="color: gray; font-size: 0.9em;">
        📅 {{ post.date | date: "%Y-%m-%d" }}
        {% if post.categories %} | 🗂 Categories: {{ post.categories | join: ", " }}{% endif %}
        {% if post.tags %} | 🔖 Tags: {{ post.tags | join: ", " }}{% endif %}
      </small>
    </li>
    <hr style="margin: 10px 0;">
  {% endfor %}
</ul>
