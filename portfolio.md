---
layout: default
title: Portfolio
permalink: /portfolio/
---

<section class="page-hero reveal">
  <p class="eyebrow">Software engineering portfolio</p>
  <h1 class="page-title">Kabileshwaran</h1>
  <p class="page-lead">Computer Science undergraduate building practical software, structured learning systems, and polished web experiences.</p>
  <div class="hero-actions">
    <a class="primary-btn" href="{{ '/projects' | relative_url }}">View Projects</a>
    <a class="secondary-btn" href="{{ '/contact' | relative_url }}">Contact Me</a>
  </div>
</section>

<section class="section-block reveal">
  <div class="section-head">
    <h2>Skills</h2>
    <span class="section-note">Core stack by category</span>
  </div>
  <div class="skills-grid">
    <article class="skill-card">
      <h3>Frontend</h3>
      <p>HTML, CSS, JavaScript, Jekyll, responsive design, accessibility, content structure.</p>
    </article>
    <article class="skill-card">
      <h3>Programming</h3>
      <p>Java, Python, C++, problem solving, DSA, CLI tooling, scripting, code organization.</p>
    </article>
    <article class="skill-card">
      <h3>Data & Databases</h3>
      <p>SQL, MySQL, Pandas, NumPy, data exploration, query optimization, data workflows.</p>
    </article>
    <article class="skill-card">
      <h3>Tools</h3>
      <p>Git, GitHub Pages, GitHub Actions, Markdown, Linux, Bash, Jupyter notebooks.</p>
    </article>
  </div>
</section>

<section class="section-block reveal">
  <div class="section-head">
    <h2>Learning Timeline</h2>
    <span class="section-note">Selected milestones</span>
  </div>
  <ol class="timeline-list">
    <li>
      <span class="timeline-date">Current</span>
      <div>
        <strong>Learning in public</strong>
        <p>Publishing posts, DSA notes, and project notes in a public, structured format.</p>
      </div>
    </li>
    <li>
      <span class="timeline-date">2026</span>
      <div>
        <strong>DSA and problem solving</strong>
        <p>Built a LeetCode solution library, curated learning patterns, and synced solutions into the site.</p>
      </div>
    </li>
    <li>
      <span class="timeline-date">2025</span>
      <div>
        <strong>Web and data foundations</strong>
        <p>Expanded into frontend, JavaScript projects, SQL, and data tooling with a stronger engineering focus.</p>
      </div>
    </li>
  </ol>
</section>

<section class="section-block reveal">
  <div class="section-head">
    <h2>Education</h2>
    <span class="section-note">Academic background</span>
  </div>
  <article class="info-card">
    <h3>Computer Science undergraduate</h3>
    <p>Focused on software fundamentals, algorithms, systems thinking, and practical project building.</p>
  </article>
</section>

<section class="section-block reveal">
  <div class="section-head">
    <h2>Featured Projects</h2>
    <a href="{{ '/projects' | relative_url }}">Browse all</a>
  </div>
  <div class="projects-grid projects-grid--featured">
    {% assign featured_projects = site.data.projects | where: 'featured', true %}
    {% for project in featured_projects limit: 4 %}
      {% include project-card.html title=project.title url=project.url description=project.description type=project.type stack=project.stack featured=project.featured %}
    {% endfor %}
  </div>
</section>

<section class="section-block reveal">
  <div class="section-head">
    <h2>GitHub Presence</h2>
    <span class="section-note">Open-source learning and project work</span>
  </div>
  <div class="stats-grid">
    <a class="stat-card" href="https://github.com/KabileshwaranKabil" target="_blank" rel="noopener noreferrer">
      <strong>GitHub Profile</strong>
      <span>View repositories, activity, and public contributions.</span>
    </a>
    <a class="stat-card" href="{{ '/projects' | relative_url }}">
      <strong>Projects</strong>
      <span>Curated selection of software and learning repositories.</span>
    </a>
    <a class="stat-card" href="{{ '/posts' | relative_url }}">
      <strong>Blog</strong>
      <span>Technical notes, articles, and learning reflections.</span>
    </a>
  </div>
</section>
