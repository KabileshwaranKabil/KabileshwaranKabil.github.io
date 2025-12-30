---
layout: default
title: Learning in Public
---

[🏠 Home](/) &nbsp;|&nbsp; [📚 DSA](/dsa/) &nbsp;|&nbsp; [🛠 Projects](/projects/) &nbsp;|&nbsp; [📝 Notes](/notes/)

# 👋 Welcome to My Learning Journal

Hi, I’m **Kabileshwaran**, a Computer Science undergraduate documenting what I learn every day.  

This site is a public record of my journey through core CS concepts, data structures & algorithms, and real-world project development. I write clear explanations, reflect on mistakes, and reinforce fundamentals through consistent practice.

---

## ✨ What You’ll Find on This Blog

This blog is organized to help you follow my learning journey efficiently. Here’s what you can expect:

- **📘 Daily Learnings & Notes**  
  Concise, clear, and structured summaries of concepts I study every day.

- **🧠 Data Structures & Algorithms (DSA)**  
  Step-by-step explanations, problem-solving patterns, and optimized approaches.

- **🛠 Projects & Implementation Insights**  
  Detailed breakdowns of projects I build, including design choices and practical lessons.

- **📌 Key Takeaways & Reflections**  
  Important lessons learned from coding, debugging, and applying concepts in real scenarios.

- **🔗 References & Resources**  
  Links to official documentation, tutorials, and articles that I find useful.

The goal is simple: **learn deeply, write clearly, and improve consistently**.

## 🔗 Connect With Me

You can follow my learning journey and projects on these platforms:

- [LinkedIn](https://www.linkedin.com/in/m-kabileshwaran-4018a5378/)  
- [GitHub](https://github.com/KabileshwaranKabil)  
- [LeetCode](https://leetcode.com/u/Kabileshwaran1896/)  

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
