(function () {
  "use strict";

  const STORAGE_KEYS = {
    theme: "theme",
    streak: "study-streak"
  };

  function isStandaloneMode() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function isMobileViewport() {
    return window.matchMedia("(max-width: 859px)").matches || window.matchMedia("(pointer: coarse)").matches;
  }

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

  function initCodeBlocks() {
    // announcer for screen readers
    let announcer = document.querySelector('.code-announce');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.className = 'code-announce';
      announcer.setAttribute('aria-live', 'polite');
      document.body.appendChild(announcer);
    }

    const codeBlocks = document.querySelectorAll('pre > code');
    codeBlocks.forEach((code) => {
      const pre = code.parentElement;
      if (!pre) return;
      const container = document.createElement('div');
      container.className = 'code-block';
      pre.parentNode.insertBefore(container, pre);
      container.appendChild(pre);

      // add copy button
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.setAttribute('aria-label', 'Copy code');
      btn.innerHTML = 'Copy';
      container.appendChild(btn);

      btn.addEventListener('click', async () => {
        const text = code.textContent;
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = 'Copied';
          announcer.textContent = 'Code copied to clipboard';
          setTimeout(() => (btn.textContent = 'Copy'), 1800);
        } catch (err) {
          // fallback
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); announcer.textContent = 'Code copied to clipboard'; } catch (e) { announcer.textContent = 'Copy failed'; }
          ta.remove();
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initActiveNavigation();
    initRevealAnimations();
    initSplash();
    initPWAInstall();
    initCodeBlocks();
    initPostSearch();
    initFab();
  });
})();