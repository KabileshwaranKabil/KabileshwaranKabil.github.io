---
layout: default
title: Review Planner
permalink: /review/
---

<section class="planner-page reveal">
  <h1>Review Planner</h1>
  <p class="posts-intro">Plan daily revision, track weekly goals, and mark topics complete.</p>

  <div class="planner-grid">
    <article class="panel-card">
      <h2>Daily Revision Checklist</h2>
      <form id="dailyTaskForm" class="task-form">
        <label for="dailyTaskInput" class="sr-only">Add task</label>
        <input id="dailyTaskInput" type="text" placeholder="Add a revision task" maxlength="120">
        <button type="submit" class="ghost-btn">Add</button>
      </form>
      <ul id="dailyTaskList" class="task-list"></ul>
    </article>

    <article class="panel-card">
      <h2>Weekly Goal</h2>
      <label for="weeklyGoalInput" class="sr-only">Weekly goal</label>
      <textarea id="weeklyGoalInput" rows="4" placeholder="Example: Finish graph algorithms and revise sorting notes"></textarea>
      <button type="button" id="saveWeeklyGoal" class="ghost-btn">Save Goal</button>
      <p class="planner-note">Saved locally on this device.</p>

      <h3>Topic Progress</h3>
      <form id="topicForm" class="task-form">
        <label for="topicInput" class="sr-only">Add topic</label>
        <input id="topicInput" type="text" placeholder="Add topic to track" maxlength="120">
        <button type="submit" class="ghost-btn">Add</button>
      </form>
      <ul id="topicProgressList" class="task-list"></ul>
    </article>
  </div>
</section>
