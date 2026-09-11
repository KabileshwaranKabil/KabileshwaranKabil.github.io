# Kabileshwaran Learning in Public: Codebase Guide

This document is a personal reference for understanding, editing, redesigning, and maintaining this website.

It is written for a beginner who wants to answer questions such as:

- Where does a page come from?
- How do I add a blog post?
- How does the homepage get its content?
- Where should I change colors, spacing, fonts, or responsive behavior?
- How does dark mode work?
- How does the mobile app/offline behavior work?
- What should I check before pushing a change?

The project is a **Jekyll static site** hosted on **GitHub Pages**.

---

## 1. What This Site Is

This site is a personal learning blog for documenting:

- Computer Science fundamentals
- Data Structures and Algorithms practice
- Technical notes
- Cloud learning
- Software development experiments
- Reflections about learning in public

It is a static website. That means most pages are generated during a build and then served as HTML, CSS, JavaScript, and image files.

There is no traditional backend application, database, server API, or login system in this repository.

The main technologies are:

- **Jekyll**: Converts Markdown, Liquid templates, and SCSS into a static website.
- **Liquid**: Template language used by Jekyll for loops, conditions, variables, and links.
- **Markdown**: Used for blog posts and content pages.
- **SCSS/CSS**: Controls layout, colors, typography, themes, and responsive behavior.
- **Vanilla JavaScript**: Adds interaction without a frontend framework.
- **GitHub Pages**: Hosts the generated site.
- **Service Worker**: Adds caching and offline behavior.
- **Web App Manifest**: Allows the site to behave like an installable mobile app.

Live website:

`https://kabileshwarankabil.github.io/`

GitHub repository:

`https://github.com/KabileshwaranKabil/KabileshwaranKabil.github.io`

---

## 2. How a Jekyll Page Is Built

A useful mental model is:

```text
Markdown or HTML content
        |
        v
Front matter selects a layout
        |
        v
_layouts/default.html or _layouts/post.html
        |
        v
_includes/header.html and _includes/footer.html
        |
        v
SCSS becomes CSS and JavaScript is loaded
        |
        v
Jekyll outputs a complete static HTML page
```

For a blog post, the flow is usually:

```text
_posts/2026-09-11-example.md
        |
        | layout: post
        v
_layouts/post.html
        |
        | layout: default
        v
_layouts/default.html
        |
        v
Complete article page
```

For a normal page such as `notes.md`, the flow is:

```text
notes.md
  |
  | layout: page
  v
Minima's page layout
  |
  | layout: default, depending on the theme implementation
  v
Complete page with the shared site shell
```

The important rule is: **content files describe content; layouts describe structure; styles describe appearance; JavaScript describes behavior.**

---

## 3. Repository Map

```text
.
├── _config.yml              Site-wide Jekyll settings
├── Gemfile                  Ruby dependencies for Jekyll/GitHub Pages
├── index.html               Homepage content and Liquid loops
├── posts.md                 Searchable all-posts page
├── notes.md                 Notes landing page
├── reflections.md           Reflections page
├── about.md                 About page
├── privacy.md               Privacy information page
├── 404.md                   Custom not-found page
├── offline.html             Offline fallback page
├── manifest.json             Installable web-app metadata
├── sw.js                    Service worker and cache logic
├── sitemap.xml              Search-engine sitemap
├── robots.txt               Search crawler instructions
├── README.md                Short repository introduction
│
├── _layouts/
│   ├── default.html         Shared page shell
│   └── post.html            Article layout
│
├── _includes/
│   ├── header.html          Custom logo and main navigation
│   └── footer.html          Custom footer and footer links
│
├── _posts/                  Published Markdown blog posts
│
├── assets/
│   ├── css/style.scss       Main design system and responsive styles
│   ├── js/app.js            Theme, navigation, PWA, search, animation, and code-copy behavior
│   ├── images/              Logos, profile images, diagrams, and optimized assets
│   └── video/               Video assets, if used by posts
│
└── scripts/
    ├── create_dsa_redirects.py
    ├── fix_dsa_meta.py
    ├── optimize_images.py
    └── sync_dsa.py
```

Some files are supplied by the `minima` theme instead of being stored locally. For example, `head.html` may come from Minima unless a local override is added under `_includes/`.

If a theme-provided file behaves unexpectedly, create a local file with the same name under `_includes/` to override it, or explicitly inspect the installed theme version.

---

## 4. Important Configuration: `_config.yml`

`_config.yml` is the central configuration file.

### Theme

```yaml
theme: minima
minima:
  skin: null
```

The site uses Minima as a Jekyll theme, but disables Minima's default skin so the custom SCSS can control the visual design.

### Site identity

```yaml
title: Kabileshwaran | Learning in Public
author: Kabileshwaran
tagline: Daily learnings, technical notes, and reflections from my CS journey
description: >-
  A public record of daily learnings...
```

These values are used by templates, SEO metadata, browser titles, and page content.

When changing the site's identity, update this file first.

### Deployment URL

```yaml
url: "https://kabileshwarankabil.github.io"
baseurl: ""
```

`url` is the public domain. `baseurl` is empty because this repository is served at the domain root.

Always use Liquid's `relative_url` filter inside templates:

```liquid
{% raw %}
<a href="{{ '/notes' | relative_url }}">Notes</a>
{% endraw %}
```

This keeps links working if the site later moves under a subdirectory.

### Plugins

```yaml
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-paginate
```

These provide feeds, SEO metadata, and pagination support.

### DSA collection and topic archives

```yaml
collections:
  dsa:
    output: true
    permalink: /dsa/:path/
```

The `dsa` collection is retained for compatibility with older DSA material, but the main blog taxonomy now uses normal posts and topic archive pages under `/topics/<slug>/`.

Canonical topic slugs currently include:

- `/topics/dsa/`
- `/topics/cs-fundamentals/`
- `/topics/full-stack/`
- `/topics/ai/`
- `/topics/security/`
- `/topics/cloud/`
- `/topics/devops/`
- `/topics/notes/`
- `/topics/reflections/`

### Markdown and code highlighting

```yaml
markdown: kramdown

kramdown:
  syntax_highlighter: rouge
```

Kramdown converts Markdown to HTML. Rouge provides syntax highlighting for code blocks.

---

## 5. Layouts and Includes

### `_layouts/default.html`

This is the shared outer shell for most pages.

It provides:

- The HTML document structure
- The skip-to-content link
- The custom header include
- The main content wrapper
- The custom footer include

The central Liquid expression is:

```liquid
{% raw %}
{{ content }}
{% endraw %}
```

Jekyll replaces this with the content generated by the current page.

Do not put page-specific article text directly into `default.html`. Keep the shell reusable.

### `_layouts/post.html`

This layout is used by files in `_posts/`.

It provides:

- Article title
- Published date
- Reading-time calculation
- Category display
- Article body
- Tags
- Share links
- Copy-link button
- Utterances comments
- Reading progress bar

A post selects this layout with:

```yaml
layout: post
```

### `_includes/header.html`

This is the custom site header.

It contains:

- The compact K logo
- The site name
- Main desktop navigation
- Mobile navigation checkbox and menu button

The JavaScript looks for `.page-link` and `.bottom-nav-link` to mark the current route as active.

If you add a new primary navigation item, update both:

1. `_includes/header.html`
2. The active-navigation expectations in `assets/js/app.js`, if special matching is needed

### `_includes/footer.html`

This is the custom footer.

It contains:

- Site identity
- Short tagline
- Blog, Notes, About, and GitHub links
- Current year generated by Liquid

The local footer exists so the visible site does not depend on Minima's default footer markup.

---

## 6. Adding a New Blog Post

Create a new file in `_posts/` with this naming pattern:

```text
YYYY-MM-DD-short-title.md
```

Example:

```text
_posts/2026-09-15-learning-linux.md
```

Start the file with YAML front matter:

```yaml
---
layout: post
title: "What I Learned About Linux Permissions"
date: 2026-09-15 00:00:00 +0530
categories: [Notes]
tags: [linux, learning, cs]
---
```

Then write normal Markdown below it:

```markdown
## What I learned

Linux permissions control who can read, write, or execute a file.

```bash
ls -l
chmod +x script.sh
```
```

### Front matter fields

- `layout`: Usually `post` for articles.
- `title`: The article title.
- `date`: Controls sorting and displayed date.
- `categories`: Used by the posts page filters and metadata.
- `tags`: Displayed on the article page.

### Categories matter

The posts page builds filter buttons from `_data/categories.yml`. Keep category names and slugs consistent.

For example, do not use all of these for the same concept unless you want separate filters:

```yaml
categories: [DSA]
categories: [dsa]
categories: [Data Structures]
```

Choose a convention and keep using it.

### Images in posts

Use paths that work from the site root:

```markdown
![Array diagram](/assets/images/arrays/array-shelf.svg)
```

For portability, keep post images inside `assets/images/`.

---

## 7. Editing the Homepage

The homepage is `index.html` even though the file extension is HTML. It still contains Jekyll front matter and Liquid.

The homepage currently contains:

1. Hero section
2. Study-focus panel
3. Quick-access links
4. Statistics row
5. Recently added notes list

### Homepage hero

The hero uses site configuration values:

```liquid
{% raw %}
<h1 class="hero-title">{{ site.title }}</h1>
<p class="hero-description">{{ site.description }}</p>
{% endraw %}
```

Changing `_config.yml` changes this content automatically.

### Recently added posts

The homepage loops through the latest six posts:

```liquid
{% raw %}
{%- for post in site.posts limit: 6 -%}
{%- endfor -%}
{% endraw %}
```

If you want to show more posts, change `limit: 6`. If you want a different ordering, remember that Jekyll normally sorts posts by date.

### Adding a homepage section

Use this pattern:

```html
<section class="panel-card reveal">
  <div class="section-head">
    <h2>Section title</h2>
  </div>
  <p>Short explanation.</p>
</section>
```

Then add a corresponding CSS class only if existing classes cannot express the design.

Avoid adding large amounts of inline CSS to `index.html`. Put reusable design rules in `assets/css/style.scss`.

---

## 8. Editing Normal Pages

### `posts.md`

This is the searchable blog archive.

It uses Liquid to:

- Read all posts
- Extract categories
- Create category filter buttons
- Print post metadata
- Add searchable data attributes

The JavaScript in `app.js` reads these attributes:

```html
data-title="..."
data-excerpt="..."
data-categories="..."
```

If you change the search markup, update both the HTML and `initPostSearch()` in `app.js`.

### `notes.md`

This page lists posts whose categories contain `Notes`.

The current page includes an inline `<style>` block using older variable names such as `--border-color` and `--background`. If redesigning this page, move those styles into `style.scss` and use the current variables:

- `--bg`
- `--surface`
- `--border`
- `--text`
- `--text-soft`
- `--accent`

This avoids inconsistent styling between pages.

### `about.md`

This is a content-focused Markdown page. It explains the author, focus areas, learning philosophy, and social links.

For a visual redesign, keep the writing in Markdown and add layout classes only around sections that need special presentation.

### `reflections.md`

This page contains reflection content and uses the normal page system. Check its front matter before changing its route.

### `privacy.md`

This page is informational and should stay easy to read. Avoid hiding important privacy information behind JavaScript.

---

## 9. Styling System: `assets/css/style.scss`

This is the main visual system.

Jekyll processes the file because it begins with front matter:

```scss
---
---
```

Without that front matter, Jekyll may not process the SCSS as an asset.

### Design tokens

The `:root` block defines reusable CSS variables:

```scss
:root {
  --bg: ...;
  --surface: ...;
  --text: ...;
  --accent: ...;
  --border: ...;
  --radius: ...;
}
```

Use these variables instead of hardcoding colors in new components.

Example:

```scss
.new-card {
  color: var(--text);
  background: var(--surface-solid);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
```

### Light and dark mode

Dark mode is activated by this attribute:

```html
<html data-theme="dark">
```

The JavaScript changes the attribute:

```javascript
document.documentElement.setAttribute("data-theme", theme);
```

Dark-mode variables live in:

```scss
html[data-theme="dark"] { ... }
```

When adding a new color, ask:

1. Does it work on the light background?
2. Does it work on the dark background?
3. Does it maintain readable contrast?
4. Is it a design token or a one-off color?

### Main reusable classes

Important current classes include:

- `.site-header`: Sticky top navigation.
- `.site-brand`: Logo and site name wrapper.
- `.site-nav`: Desktop and mobile navigation.
- `.page-content`: Main page spacing.
- `.panel-card`: General framed content panel.
- `.post-item`: Blog archive card.
- `.post`: Article surface.
- `.post-content`: Long-form article typography.
- `.dashboard-hero`: Homepage hero.
- `.quick-card`: Homepage shortcut card.
- `.bottom-nav`: Mobile fixed navigation.
- `.fab`: Floating back-to-top control.
- `.reveal`: Scroll-reveal animation.

### Responsive breakpoints

The current design primarily uses:

- `min-width: 860px`: Desktop layout.
- `max-width: 859px`: Mobile navigation and mobile fixed bottom navigation.
- `max-width: 560px`: Narrow-phone hero behavior.

When changing layouts, test at least:

- 360px wide phone
- 390px wide phone
- 768px tablet
- 1024px laptop
- 1440px desktop

### Typography

The site uses a sans-serif interface font and a serif editorial font for article content and major titles.

Current patterns:

- Interface text: `Manrope`, then system fallbacks.
- Article text: `Source Serif 4`, then Georgia fallback.
- Brand/title accents: Georgia-style serif.
- Code: platform monospace fonts.

Keep body text comfortable to read. Long-form content should normally have:

- A readable max width
- A line height around `1.6` to `1.8`
- Adequate spacing between headings and paragraphs
- Horizontal scrolling for wide code blocks and tables

### Accessibility styling

The stylesheet includes:

- `.sr-only` for visually hidden accessible labels
- `:focus-visible` outlines for keyboard users
- Reduced-motion rules under `prefers-reduced-motion: reduce`
- Active navigation indicators

Do not remove focus outlines without replacing them with a visible alternative.

---

## 10. JavaScript Features: `assets/js/app.js`

The JavaScript is an immediately invoked function expression:

```javascript
(function () {
  "use strict";
  // feature functions
})();
```

This keeps variables out of the global namespace.

### Theme toggle

The theme feature:

1. Finds `#darkModeToggle`.
1. Restores a saved theme from `localStorage` when available.
2. Falls back to the operating system's `prefers-color-scheme` setting.
3. Switches between `light` and `dark`.
4. Stores the choice in `localStorage` under `theme`.
5. Updates the icon, label, and accessible `aria-pressed` state.

If the theme button is moved or renamed, update both the HTML and `initThemeToggle()`.

### Active navigation

`initActiveNavigation()` compares the current URL path with navigation link paths.

It adds:

```html
class="active"
aria-current="page"
```

Do not hardcode the active navigation state in every page. Let the JavaScript calculate it from the URL.

### Reveal animation

`initRevealAnimations()` observes `.reveal` elements with `IntersectionObserver`.

When an element enters the viewport, JavaScript adds `.is-visible`.

CSS controls the visual transition:

```scss
.reveal { ... }
.reveal.is-visible { ... }
```

The reduced-motion media query disables the movement for users who request less motion.

### Post search and category filters

`initPostSearch()` only activates when it finds:

- `#postSearch`
- `#postsList`

It filters `.post-item` elements using data attributes and toggles their `hidden` property.

The empty state is controlled by `#postsEmptyState`.

When editing the posts page, preserve these IDs unless you also update the JavaScript.

### Reading progress

`initReadingProgress()` updates `#readingProgressBar` based on how far the user has scrolled through `.post`.

This is used on article pages.

### Offline support

The shared JavaScript registers the service worker for offline caching. Install prompts and app-style banners were intentionally removed to keep the site focused as a professional blog.

### Code-copy buttons

`initCodeBlocks()` finds `pre > code` blocks and adds a copy button.

It also creates an ARIA live announcer so screen-reader users receive feedback such as “Code copied to clipboard.”

When changing code-block markup, preserve the relationship between `pre` and `code` elements.

### Initialization

All features are started here:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initActiveNavigation();
  initRevealAnimations();
  initPWAInstall();
  initCodeBlocks();
  initPostSearch();
});
```

A feature function should safely return when its target element does not exist. This allows the same JavaScript file to run on every page.

---

## 11. Images and Assets

### Main branding assets

- `assets/images/logo.svg`: Compact K logo used in the header.
- `assets/images/app-icon.svg`: PWA icon.
- `assets/images/profile.png`: Profile image used by the homepage hero.
- `assets/images/optimized/`: Optimized image variants.

### Image advice

For new images:

1. Use descriptive file names.
2. Prefer WebP or optimized SVG when appropriate.
3. Keep source images at a reasonable size.
4. Add useful `alt` text when the image conveys information.
5. Use empty `alt=""` for decorative images.
6. Test the page on a slow connection if the image is large.

The original profile image is much larger than the small visual space where it appears. Use an optimized version if performance becomes a concern.

### SVG advice

Use SVG for simple logos, diagrams, and icons. Keep SVG markup readable and ensure it has enough contrast in both themes.

---

## 12. Progressive Web App and Offline Behavior

### `manifest.json`

The manifest defines:

- App name
- Short name
- Start URL
- Standalone display mode
- Theme and background colors
- Mobile shortcuts
- App icons

If the brand colors change, update `background_color` and `theme_color` too.

### `sw.js`

The service worker manages caches.

Important concepts:

- `CORE_CACHE`: Core pages and assets cached during installation.
- `RUNTIME_CACHE`: Pages fetched while browsing.
- `IMAGE_CACHE`: Runtime image cache.
- `CACHE_VERSION`: Change this when cache behavior or core assets change.

If a new important route is added, consider adding it to:

- `CORE_ASSETS`
- `NAVIGATION_FALLBACKS`

When changing cache names or strategies, increment `CACHE_VERSION` so old caches are removed during activation.

### Offline fallback

`offline.html` is shown when a navigation request fails and a cached page is unavailable.

It uses the normal site layout, so it should remain simple and robust.

---

## 13. Scripts Folder

The Python scripts are maintenance tools rather than part of the browser runtime.

Typical responsibilities:

- `create_dsa_redirects.py`: Creates redirects for DSA routes.
- `fix_dsa_meta.py`: Repairs or normalizes DSA metadata.
- `optimize_images.py`: Creates smaller image assets.
- `sync_dsa.py`: Synchronizes DSA-related content or metadata.

Before running a script, read its source and understand whether it writes files. Use Git status before and after running it so generated changes are visible.

Do not run bulk scripts against the whole repository unless you understand their output.

---

## 14. Common Editing Tasks

### Change the site title

Edit `_config.yml`:

```yaml
title: New title
```

The header, homepage, splash, metadata, and footer may use this value directly or use their own shorter display text.

### Change colors

Edit the variables near the top of `assets/css/style.scss`.

Update both:

- `:root`
- `html[data-theme="dark"]`

Also consider updating:

- `manifest.json`
- `assets/images/app-icon.svg`
- `assets/images/logo.svg`

### Change navigation

Edit `_includes/header.html` for desktop/mobile header links.

Edit `_layouts/default.html` for mobile bottom navigation.

Then check active navigation behavior in `assets/js/app.js`.

### Change the footer

Edit `_includes/footer.html`.

### Change article layout

Edit `_layouts/post.html` for structure.

Edit `.post`, `.post-header`, `.post-content`, and related selectors in `style.scss` for appearance.

### Change post search

Edit `posts.md` for markup and Liquid data attributes.

Edit `initPostSearch()` in `assets/js/app.js` for behavior.

### Add a page

Create a Markdown file with front matter:

```yaml
---
layout: page
title: New Page
permalink: /new-page/
---
```

Then add Markdown content.

If it should appear in navigation, add it to `_includes/header.html`, `_layouts/default.html`, and possibly `_includes/footer.html`.

### Add a new collection

Collections require configuration in `_config.yml` and content in a matching underscored directory. Read the Jekyll collection documentation before adding one because collection permalinks and layouts differ from posts.

---

## 15. Local Development Workflow

### Check Ruby and Bundler

Open PowerShell in the repository folder:

```powershell
ruby --version
bundle --version
```

Install dependencies:

```powershell
bundle install
```

Build the site:

```powershell
bundle exec jekyll build
```

Serve locally with automatic rebuilding:

```powershell
bundle exec jekyll serve --livereload
```

Then open the local URL shown by Jekyll, usually:

```text
http://127.0.0.1:4000/
```

The current environment previously reported that the `jekyll` executable was unavailable. That normally means dependencies have not been installed yet, or Ruby/Bundler is not configured in PATH.

### Check the generated site

The generated output normally appears in `_site/`.

Check:

- Homepage loads.
- Header links work.
- Mobile menu opens.
- Theme toggle works.
- Search and filters work.
- Posts render with correct dates and categories.
- Images load.
- Article code-copy buttons work.
- 404 page loads.
- Offline page loads.

### Validate HTML links

The Gemfile includes `html-proofer` as a test dependency. After building:

```powershell
bundle exec htmlproofer ./_site
```

External links or third-party comment scripts may need special options if they cause false positives.

---

## 16. Git and Deployment Workflow

The deployment model is simple:

```text
Edit files
  |
  v
Run checks locally
  |
  v
Review git diff
  |
  v
Commit to main
  |
  v
Push to origin/main
  |
  v
GitHub Pages builds and publishes the site
```

Useful commands:

```powershell
git status --short
git diff --check
git diff
git log -5 --oneline
git add .
git commit -m "Describe the change"
git push origin main
```

Before committing:

1. Confirm only intended files changed.
2. Run `git diff --check`.
3. Build the site if Jekyll is available.
4. Test the changed page in a browser.
5. Check mobile width and dark mode.
6. Use a clear commit message.

Do not commit generated `_site/` output unless the repository specifically requires it.

---

## 17. Safe Design and Redesign Process

When redesigning the site, work in this order:

### Step 1: Understand ownership

Find the file that actually controls the behavior.

- Header behavior: `_includes/header.html` and `style.scss`
- Page shell: `_layouts/default.html`
- Article behavior: `_layouts/post.html`
- Search behavior: `posts.md` and `app.js`
- Theme behavior: `app.js` and the theme variables in `style.scss`

### Step 2: Reuse tokens and components

Use existing variables and classes before creating new ones.

### Step 3: Make a small change

Change one visual area at a time:

- Header
- Homepage hero
- Cards
- Article typography
- Footer
- Mobile navigation

### Step 4: Test behavior, not only appearance

A visually attractive change can still break:

- Links
- Keyboard navigation
- Dark mode
- Search
- PWA installation
- Offline caching
- Screen-reader labels

### Step 5: Check all viewports

A desktop layout does not guarantee a good mobile layout. Check narrow screens before pushing.

---

## 18. Accessibility Checklist

Before publishing a UI change, verify:

- Every meaningful image has useful alt text.
- Decorative images use empty alt text.
- Keyboard focus is visible.
- Buttons have clear names.
- Form inputs have labels, even if labels are visually hidden.
- Navigation has a clear landmark and label.
- Active navigation exposes `aria-current="page"`.
- Color is not the only way to communicate state.
- Text contrast is readable in light and dark themes.
- Reduced-motion users are respected.
- Heading levels are logical.
- Links describe their destination.
- Touch targets are large enough on mobile.

---

## 19. Known Caveats and Future Improvements

These are useful items to remember when maintaining the project:

1. **Local Jekyll command availability**: The current environment may need `bundle install` before `bundle exec jekyll build` works.
2. **Theme-provided files**: Some Minima includes, especially the head include, are not stored locally. Add local overrides when precise control is required.
3. **Inline styles in `notes.md`**: The notes page still has page-specific inline CSS and older variable names. It would be cleaner to move it into `style.scss`.
4. **404 duplicate link**: Check `404.md` when editing it because it currently contains a repeated Notes action.
5. **PWA asset list**: If the logo or header assets become essential to offline startup, add them to `CORE_ASSETS` in `sw.js`.
6. **Profile image size**: The profile image is large compared with its display size. An optimized variant would improve performance.
7. **Third-party comments**: Utterances depends on GitHub issues and an external script. Comments may not appear offline.
8. **Hardcoded absolute links**: Some older pages use root-relative links directly. Prefer `relative_url` in Liquid templates.
9. **Theme synchronization**: Utterances uses `preferred-color-scheme`, but if the site's manual theme toggle needs to control comments exactly, an integration will be required.
10. **No automated browser tests**: A future improvement would be Playwright checks for mobile layout, navigation, theme switching, search, and article reading behavior.

---

## 20. Beginner Debugging Guide

### A page is blank

Check:

- YAML front matter starts and ends with `---`.
- Liquid tags are closed.
- The selected layout exists.
- The Jekyll build output contains an error.

### A link returns 404

Check:

- The target page's `permalink`.
- Whether the URL needs a trailing slash.
- Whether you used `relative_url`.
- Whether the file is excluded by `_config.yml`.

### A style change does nothing

Check:

- The selector matches the generated HTML.
- A later selector is more specific.
- A Minima rule overrides it.
- The browser is serving cached CSS.
- The SCSS file still has valid front matter.

### Dark mode looks broken

Check:

- Both light and dark token values exist.
- Text and border colors have enough contrast.
- The component does not hardcode a light-only color.
- The browser element is affected by `color-scheme`.

### Mobile menu does not open

Check:

- The checkbox ID matches the label's `for` value.
- The `.nav-trigger:checked + label + .trigger` selector still matches the markup.
- The mobile media query is active.
- The menu is not hidden behind another stacking context.

### Search does not work

Check:

- `postSearch`, `postsList`, and `postsEmptyState` IDs exist.
- Each post has `.post-item-search`.
- `data-title`, `data-excerpt`, and `data-categories` exist.
- Category values are lowercase when compared with the selected filter.

### A JavaScript feature breaks another page

The shared JavaScript runs everywhere. Each initializer should first check whether its required DOM elements exist and return early if they do not.

Use the browser developer tools:

1. Open the Console tab.
2. Reload the page.
3. Read the first error.
4. Inspect the named file and line.
5. Fix one error at a time.

---

## 21. A Practical Change Checklist

Use this whenever making a change:

```text
[ ] I know which file owns this behavior.
[ ] I checked the surrounding code first.
[ ] I preserved existing URLs and content.
[ ] I reused the design tokens.
[ ] I considered light mode and dark mode.
[ ] I checked keyboard focus.
[ ] I checked mobile width.
[ ] I checked the browser console.
[ ] I ran git diff --check.
[ ] I reviewed git status.
[ ] I built or served the site when possible.
[ ] I wrote a clear commit message.
```

---

## 22. Short Mental Model

When you forget how the project works, remember this:

```text
_config.yml       = site identity and Jekyll rules
_posts/           = blog content
*.md              = normal content pages
_layouts/         = page structure
_includes/        = reusable shell pieces
style.scss        = visual system
app.js            = browser behavior
manifest.json     = installable app metadata
sw.js             = offline and cache behavior
Gemfile           = build dependencies
GitHub Pages      = deployment
```

The safest way to extend the site is to keep content, structure, appearance, and behavior separate. Add Markdown for writing, Liquid for repeated content, layouts/includes for shared structure, SCSS for design, and JavaScript only when the browser needs interaction.
