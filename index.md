---
layout: default
title: Learning in Public
---
[Home](/) | [DSA](/dsa/) | [Projects](/projects/) | [Notes](/notes/)

# Learning in Public

Hi, I’m Kabileshwaran — a Computer Science undergraduate documenting what I learn every day.

This site is a public record of my journey through core Computer Science concepts, data structures and algorithms, and real-world project development. I use this space to write clear explanations, reflect on mistakes, and reinforce fundamentals through consistent practice.

### What you’ll find here
- 📘 Daily learnings and technical notes  
- 🧠 Data Structures & Algorithms explanations  
- 🛠 Project breakdowns and implementation insights  
- 📌 Key takeaways from building and problem-solving  

The goal is simple: **learn deeply, write clearly, and improve consistently**.

---
## 📚 All Blog Posts

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <small>
        ({{ post.date | date: "%Y-%m-%d" }} |
        {{ post.categories | join: ", " }})
      </small>
    </li>
  {% endfor %}
</ul>
