---
layout: post
title: "How I Built My Blog with GitHub Pages: A Beginner's Guide"
date: 2026-01-16 00:00:00 +0530
categories: [Notes]
tags: [blog, github-pages, jekyll, tutorial, learning]
---

As a Computer Science student learning in public, I wanted to create a personal blog to document my journey, share my thoughts, and build an online presence. After researching options, I decided to use GitHub Pages because it's free, easy to set up, and integrates perfectly with my Git workflow. This post is my personal guide on how I built this blog from scratch, written as a revision for myself and as a tutorial for other beginners.

## Why GitHub Pages?

Before diving in, let me explain why I chose GitHub Pages:

- **Free hosting**: No cost to host your site
- **Version control**: Everything is in Git, so I can track changes
- **Easy deployment**: Just push to GitHub and it's live
- **Custom domain support**: I can use my own domain later
- **Jekyll integration**: Static site generator that's perfect for blogs

## Prerequisites

Before starting, you'll need:

1. **GitHub Account**: Sign up at [github.com](https://github.com) if you don't have one
2. **Git**: Install Git on your computer ([git-scm.com](https://git-scm.com))
3. **Text Editor**: I use VS Code, but any editor works
4. **Basic Command Line Knowledge**: Don't worry if you're new - I'll explain everything

## Step 1: Create the GitHub Repository

The first step is creating a special repository that GitHub recognizes for Pages.

1. Go to [github.com](https://github.com) and log in
2. Click the "+" icon and select "New repository"
3. For the repository name, use: `yourusername.github.io`
   - Replace `yourusername` with your actual GitHub username
   - Mine is `KabileshwaranKabil.github.io`
4. Make sure it's public (required for free GitHub Pages)
5. Don't initialize with README, .gitignore, or license yet
6. Click "Create repository"

## Step 2: Set Up Local Development Environment

While you can edit directly on GitHub, I recommend setting up locally for better development experience.

### Install Jekyll

Jekyll is the static site generator that powers GitHub Pages.

1. **Install Ruby**: Jekyll requires Ruby. Download from [rubyinstaller.org](https://rubyinstaller.org) (Windows)
2. **Install Jekyll**: Open command prompt/terminal and run:
   ```bash
   gem install jekyll bundler
   ```
3. **Verify installation**:
   ```bash
   jekyll --version
   ```

### Clone Your Repository

1. On your repository page, click the green "Code" button
2. Copy the URL (should be `https://github.com/yourusername/yourusername.github.io.git`)
3. Open terminal and run:
   ```bash
   git clone https://github.com/yourusername/yourusername.github.io.git
   cd yourusername.github.io
   ```

## Step 3: Create Your Jekyll Site

Now let's build the basic structure.

### Initialize Jekyll Site

In your repository folder, run:
```bash
jekyll new . --force
```

This creates the basic Jekyll structure. The `--force` is needed because the folder isn't empty.

### Understanding the Structure

After running the command, you'll see files like:
- `_config.yml`: Site configuration
- `index.html`: Home page
- `_posts/`: Where blog posts go
- `Gemfile`: Ruby dependencies

## Step 4: Customize Your Site

Let's make it personal.

### Edit Configuration

Open `_config.yml` and modify:
```yaml
title: "Your Blog Title"
description: "Your blog description"
author: "Your Name"
url: "https://yourusername.github.io"
```

For example, mine looks like:
```yaml
title: "Kabileshwaran Kabil"
description: "Learning in public • Writing, building, and sharing progress"
author: "Kabileshwaran"
url: "https://kabileshwarankabil.github.io"
```

### Create Your First Post

1. Create a file in `_posts/` with format: `YYYY-MM-DD-title.md`
2. Add front matter:
   ```markdown
   ---
   layout: post
   title: "My First Post"
   date: 2026-01-17 00:00:00 +0530
   categories: [General]
   ---
   ```
3. Write your content below the front matter

## Step 5: Add a Theme

Jekyll has themes to make your site look good.

### Using a Gem-based Theme

1. Edit `Gemfile` and add:
   ```ruby
   gem "minima"
   ```
2. Edit `_config.yml` and add:
   ```yaml
   theme: minima
   ```
3. Run `bundle install` to install the theme

### Customizing the Theme

I created custom layouts and styles. For example:

- Created `_layouts/default.html` for the main layout
- Added custom CSS in `assets/css/style.scss`
- Created includes like `_includes/header.html`

## Step 6: Test Locally

Before deploying, test your site locally.

1. In your repository folder, run:
   ```bash
   bundle exec jekyll serve
   ```
2. Open `http://localhost:4000` in your browser
3. Make changes and see them instantly

## Step 7: Deploy to GitHub Pages

### Push Your Code

1. Add all files:
   ```bash
   git add .
   ```
2. Commit:
   ```bash
   git commit -m "Initial blog setup"
   ```
3. Push:
   ```bash
   git push origin main
   ```

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

Your site will be available at `https://yourusername.github.io` within a few minutes.

## Step 8: Advanced Customizations

As I learned more, I added:

### Custom Domain

1. Buy a domain (like from Namecheap)
2. In repository settings, add your domain in "Custom domain"
3. Create a `CNAME` file with your domain

### Dark Mode

I implemented dark mode using CSS variables and JavaScript:
- CSS custom properties for colors
- JavaScript to toggle themes
- Local storage to remember preference

### Comments System

I could add Disqus or similar for comments.

## Common Issues and Solutions

### Site Not Loading
- Check if repository name is exactly `username.github.io`
- Ensure it's public
- Wait 10-15 minutes after enabling Pages

### Jekyll Build Errors
- Run `bundle install` to install dependencies
- Check `_config.yml` for syntax errors
- Use `jekyll build --trace` for detailed errors

### Local Server Issues
- Make sure port 4000 is free
- Try `bundle exec jekyll serve --host 0.0.0.0`

## What I Learned

Building this blog taught me:
- Version control with Git
- Static site generation
- Web development basics (HTML, CSS, SCSS)
- Deployment and hosting
- Writing and sharing knowledge

## Next Steps

Now that the basics are set up, I can:
- Write more posts regularly
- Improve the design
- Add more features like search, tags
- Connect social media
- Analyze traffic with Google Analytics

## Conclusion

Creating a blog with GitHub Pages was easier than I expected. It took me about a day to get the basic setup working, and I've been improving it ever since. If you're a beginner like I was, don't be intimidated - follow these steps and you'll have your blog running in no time.

Remember, the key is to start simple and iterate. Your first version doesn't need to be perfect. Mine certainly wasn't!

Happy blogging! 🚀