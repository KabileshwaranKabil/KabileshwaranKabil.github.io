---
layout: default
title: Projects
permalink: /projects/
---

<section class="page-hero reveal">
  <p class="eyebrow">Selected work</p>
  <h1 class="page-title">Projects</h1>
  <p class="page-lead">A curated collection of projects, learning systems, and practical experiments from my GitHub account.</p>
</section>

<section class="section-block reveal">
  <div class="section-head">
    <h2>Featured Projects</h2>
    <span class="section-note">Open-source and hands-on work</span>
  </div>
  <div class="projects-grid projects-grid--featured">
    {% assign featured_projects = site.data.projects | where: 'featured', true %}
    {% for project in featured_projects %}
      {% include project-card.html title=project.title url=project.url description=project.description type=project.type stack=project.stack featured=project.featured %}
    {% endfor %}
  </div>
</section>

<section class="section-block reveal">
  <div class="section-head">
    <h2>All Projects</h2>
    <span class="section-note">Direct links to GitHub repositories</span>
  </div>
  <div class="projects-grid">
    {% for project in site.data.projects %}
      {% include project-card.html title=project.title url=project.url description=project.description type=project.type stack=project.stack featured=project.featured %}
    {% endfor %}
  </div>
</section>
