(function () {
  "use strict";

  const STORAGE_KEYS = {
    theme: "theme",

  function isStandaloneMode() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function isMobileViewport() {
    return window.matchMedia("(max-width: 859px)").matches || window.matchMedia("(pointer: coarse)").matches;
  }
    streak: "study-streak",
    dailyTasks: "daily-tasks",
    weeklyGoal: "weekly-goal",
    topicProgress: "topic-progress"
  };

  let deferredInstallPrompt = null;

  function getTodayString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getPathWithoutTrailingSlash(path) {
    if (!path || path === "/") {
      return "/";
    }
    return path.endsWith("/") ? path.slice(0, -1) : path;
  }

  function safeParse(value, fallback) {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }

  function updateThemeButton() {
    const button = document.getElementById("darkModeToggle");
    if (!button) {
      return;
    }
    const modeIcon = button.querySelector(".mode-icon");
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    button.setAttribute("aria-pressed", currentTheme === "dark" ? "true" : "false");
    if (modeIcon) {
      modeIcon.textContent = currentTheme === "dark" ? "L" : "D";
    }
  }

  function initThemeToggle() {
    const button = document.getElementById("darkModeToggle");
    if (!button) {
      return;
    }
    updateThemeButton();
    button.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      updateThemeButton();
    });
  }

  function initActiveNavigation() {
    const current = getPathWithoutTrailingSlash(window.location.pathname);
    const links = document.querySelectorAll(".page-link, .bottom-nav-link");

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) {
        return;
      }
      const linkPath = getPathWithoutTrailingSlash(new URL(href, window.location.origin).pathname);
      const isMatch = linkPath === "/" ? current === "/" : current === linkPath || current.startsWith(`${linkPath}/`);
      if (isMatch) {
        link.classList.add("active");
      }
    });
  }

  function initRevealAnimations() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((item) => observer.observe(item));
  }

  function initSplash() {
    const splash = document.getElementById("appSplash");
    if (!splash) {
      return;
    }

    window.setTimeout(() => {
      splash.classList.add("is-hidden");
      window.setTimeout(() => {
        splash.remove();
      }, 500);
    }, 550);
  }

  function updateStreak() {
    const today = getTodayString();
    const streakData = safeParse(localStorage.getItem(STORAGE_KEYS.streak), {
      lastVisit: null,
      count: 0
    });

    if (streakData.lastVisit !== today) {
      if (streakData.lastVisit) {
        const lastVisitDate = new Date(streakData.lastVisit);
        const todayDate = new Date(today);
        const oneDayMs = 24 * 60 * 60 * 1000;
        const diffDays = Math.round((todayDate - lastVisitDate) / oneDayMs);

        if (diffDays === 1) {
          streakData.count += 1;
        } else {
          streakData.count = 1;
        }
      } else {
        streakData.count = 1;
      }
      streakData.lastVisit = today;
      localStorage.setItem(STORAGE_KEYS.streak, JSON.stringify(streakData));
    }

    const streakCountEl = document.getElementById("studyStreakCount");
    if (streakCountEl) {
      streakCountEl.textContent = `${streakData.count} days`;
    }
  }

  function getDailyTasks() {
    const data = safeParse(localStorage.getItem(STORAGE_KEYS.dailyTasks), []);
    return Array.isArray(data) ? data : [];
  }

  function saveDailyTasks(tasks) {
    localStorage.setItem(STORAGE_KEYS.dailyTasks, JSON.stringify(tasks));
    updateDashboardTaskCount(tasks);
    updatePlannerPreview(tasks);
  }

  function updateDashboardTaskCount(tasks) {
    const countEl = document.getElementById("todayChecklistDone");
    if (!countEl) {
      return;
    }
    const done = tasks.filter((task) => task.done).length;
    countEl.textContent = `${done} tasks`;
  }

  function updatePlannerPreview(tasks) {
    const previewList = document.getElementById("previewTaskList");
    if (!previewList) {
      return;
    }

    previewList.innerHTML = "";
    const list = tasks.length ? tasks.slice(0, 4) : [
      { text: "Revise one topic", done: false },
      { text: "Read one saved note", done: false },
      { text: "Write one quick summary", done: false }
    ];

    list.forEach((task) => {
      const item = document.createElement("li");
      item.className = task.done ? "done" : "";
      item.textContent = task.text;
      previewList.appendChild(item);
    });
  }

  function renderDailyTaskList() {
    const taskList = document.getElementById("dailyTaskList");
    if (!taskList) {
      return;
    }

    const tasks = getDailyTasks();
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const item = document.createElement("li");
      item.className = "task-item";
      item.dataset.id = task.id;

      const label = document.createElement("label");
      label.className = "task-toggle";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Boolean(task.done);
      checkbox.addEventListener("change", () => {
        const current = getDailyTasks();
        const next = current.map((entry) =>
          entry.id === task.id ? { ...entry, done: checkbox.checked } : entry
        );
        saveDailyTasks(next);
        renderDailyTaskList();
      });

      const text = document.createElement("span");
      text.textContent = task.text;
      if (task.done) {
        text.classList.add("done");
      }

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "task-remove";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        const next = getDailyTasks().filter((entry) => entry.id !== task.id);
        saveDailyTasks(next);
        renderDailyTaskList();
      });

      label.appendChild(checkbox);
      label.appendChild(text);
      item.appendChild(label);
      item.appendChild(removeButton);
      taskList.appendChild(item);
    });

    updateDashboardTaskCount(tasks);
    updatePlannerPreview(tasks);
  }

  function initDailyTaskForm() {
    const form = document.getElementById("dailyTaskForm");
    const input = document.getElementById("dailyTaskInput");

    if (!form || !input) {
      updatePlannerPreview(getDailyTasks());
      updateDashboardTaskCount(getDailyTasks());
      return;
    }

    renderDailyTaskList();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) {
        return;
      }

      const tasks = getDailyTasks();
      tasks.unshift({
        id: Date.now().toString(36),
        text: value,
        done: false
      });
      saveDailyTasks(tasks);
      input.value = "";
      renderDailyTaskList();
    });
  }

  function getTopics() {
    const data = safeParse(localStorage.getItem(STORAGE_KEYS.topicProgress), []);
    return Array.isArray(data) ? data : [];
  }

  function saveTopics(topics) {
    localStorage.setItem(STORAGE_KEYS.topicProgress, JSON.stringify(topics));
  }

  function renderTopics() {
    const list = document.getElementById("topicProgressList");
    if (!list) {
      return;
    }

    const topics = getTopics();
    list.innerHTML = "";

    topics.forEach((topic) => {
      const item = document.createElement("li");
      item.className = "task-item";

      const label = document.createElement("label");
      label.className = "task-toggle";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Boolean(topic.done);
      checkbox.addEventListener("change", () => {
        const next = getTopics().map((entry) =>
          entry.id === topic.id ? { ...entry, done: checkbox.checked } : entry
        );
        saveTopics(next);
        renderTopics();
      });

      const text = document.createElement("span");
      text.textContent = topic.text;
      if (topic.done) {
        text.classList.add("done");
      }

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "task-remove";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        const next = getTopics().filter((entry) => entry.id !== topic.id);
        saveTopics(next);
        renderTopics();
      });

      label.appendChild(checkbox);
      label.appendChild(text);
      item.appendChild(label);
      item.appendChild(removeButton);
      list.appendChild(item);
    });
  }

  function initTopicForm() {
    const form = document.getElementById("topicForm");
    const input = document.getElementById("topicInput");
    if (!form || !input) {
      return;
    }

    renderTopics();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) {
        return;
      }

      const topics = getTopics();
      topics.unshift({
        id: Date.now().toString(36),
        text: value,
        done: false
      });
      saveTopics(topics);
      input.value = "";
      renderTopics();
    });
  }

  function initWeeklyGoal() {
    const input = document.getElementById("weeklyGoalInput");
    const button = document.getElementById("saveWeeklyGoal");

    if (!input || !button) {
      return;
    }

    input.value = localStorage.getItem(STORAGE_KEYS.weeklyGoal) || "";
    button.addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEYS.weeklyGoal, input.value.trim());
      button.textContent = "Saved";
      window.setTimeout(() => {
        button.textContent = "Save Goal";
      }, 900);
    });
  }

  function initPostSearch() {
    const searchInput = document.getElementById("postSearch");
    const postList = document.getElementById("postsList");
    const emptyState = document.getElementById("postsEmptyState");

    if (!searchInput || !postList) {
      return;
    }

    let activeFilter = "all";
    const chips = document.querySelectorAll(".filter-chip");

    const applyFilter = () => {
      const query = searchInput.value.trim().toLowerCase();
      const items = Array.from(postList.querySelectorAll(".post-item"));
      let visibleCount = 0;

      items.forEach((item) => {
        const source = item.querySelector(".post-item-search");
        if (!source) {
          return;
        }

        const title = source.dataset.title || "";
        const excerpt = source.dataset.excerpt || "";
        const categories = source.dataset.categories || "";

        const matchesQuery = !query || title.includes(query) || excerpt.includes(query) || categories.includes(query);
        const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);

        const visible = matchesQuery && matchesFilter;
        item.hidden = !visible;
        if (visible) {
          visibleCount += 1;
        }
      });

      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
      }
    };

    searchInput.addEventListener("input", applyFilter);
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((entry) => entry.classList.remove("is-active"));
        chip.classList.add("is-active");
        activeFilter = chip.dataset.filter || "all";
        applyFilter();
      });
    });

    applyFilter();
  }

  function initReadingProgress() {
    const progressBar = document.getElementById("readingProgressBar");
    const article = document.querySelector(".post");
    if (!progressBar || !article) {
      return;
    }

    const updateProgress = () => {
      const articleRect = article.getBoundingClientRect();
      const articleTop = window.scrollY + articleRect.top;
      const articleHeight = article.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - articleTop;
      const progress = articleHeight > 0 ? Math.min(100, Math.max(0, (scrolled / articleHeight) * 100)) : 0;
      progressBar.style.width = `${progress}%`;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  function initFab() {
    const fab = document.getElementById("fabAction");
    if (!fab) {
      return;
    }

    const showFab = () => {
      fab.classList.toggle("is-visible", window.scrollY > 140);
    };

    showFab();
    window.addEventListener("scroll", showFab, { passive: true });

    fab.addEventListener("click", () => {
      if (window.location.pathname.includes("/review")) {
        const input = document.getElementById("dailyTaskInput");
        if (input) {
          input.focus();
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initPWAInstall() {
    const installButton = document.getElementById("installAppBtn");
    const installBanner = document.getElementById("installBanner");
    const installBannerButton = document.getElementById("installBannerButton");
    const dismissInstallBanner = document.getElementById("dismissInstallBanner");
    const installBannerCopy = installBanner ? installBanner.querySelector(".install-banner-copy") : null;

    const updateInstallUI = () => {
      const bannerDismissed = localStorage.getItem("install-banner-dismissed") === "true";
      const shouldShowBanner = isMobileViewport() && !isStandaloneMode() && !bannerDismissed;
      const shouldShowPrompt = Boolean(deferredInstallPrompt) && !isStandaloneMode();

      if (installButton) {
        installButton.hidden = !shouldShowPrompt;
      }
      if (installBanner) {
        installBanner.hidden = !shouldShowBanner;
        if (installBannerCopy) {
          installBannerCopy.textContent = shouldShowPrompt
            ? "Open it from the home screen for quicker daily access and offline reading."
            : "On iPhone or unsupported browsers, use the share menu to add it to your home screen for quick daily access.";
        }
      }
      if (installBannerButton) {
        installBannerButton.hidden = !shouldShowPrompt;
      }
    };

    if ("serviceWorker" in navigator) {
      const swUrl = document.body.dataset.swUrl || "/sw.js";
      navigator.serviceWorker.register(swUrl).catch(() => {
        return null;
      });
    }

    if (!installButton) {
      if (installBannerButton) {
        installBannerButton.addEventListener("click", async () => {
          if (!deferredInstallPrompt) {
            return;
          }
          deferredInstallPrompt.prompt();
          await deferredInstallPrompt.userChoice;
          deferredInstallPrompt = null;
          updateInstallUI();
        });
      }

      if (dismissInstallBanner) {
        dismissInstallBanner.addEventListener("click", () => {
          localStorage.setItem("install-banner-dismissed", "true");
          updateInstallUI();
        });
      }

      updateInstallUI();
      return;
    }

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
      updateInstallUI();
    });

    installButton.addEventListener("click", async () => {
      if (!deferredInstallPrompt) {
        return;
      }
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      updateInstallUI();
    });

    window.addEventListener("appinstalled", () => {
      deferredInstallPrompt = null;
      localStorage.removeItem("install-banner-dismissed");
      updateInstallUI();
    });

    if (installBannerButton) {
      installBannerButton.addEventListener("click", async () => {
        if (!deferredInstallPrompt) {
          return;
        }
        deferredInstallPrompt.prompt();
        await deferredInstallPrompt.userChoice;
        deferredInstallPrompt = null;
        updateInstallUI();
      });
    }

    if (dismissInstallBanner) {
      dismissInstallBanner.addEventListener("click", () => {
        localStorage.setItem("install-banner-dismissed", "true");
        updateInstallUI();
      });
    }

    updateInstallUI();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initActiveNavigation();
    initRevealAnimations();
    initSplash();
    initPWAInstall();

    updateStreak();
    initDailyTaskForm();
    initTopicForm();
    initWeeklyGoal();
    initPostSearch();
    initReadingProgress();
    initFab();
  });
})();