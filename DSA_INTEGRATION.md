DSA Integration
================

This project can include your LeetCode solutions from your repo `https://github.com/KabileshwaranKabil/dsa-learning-lab.git`.

Two recommended integration options:

1) Git submodule (simple, local)

 - From your site repo root:

```bash
git submodule add https://github.com/KabileshwaranKabil/dsa-learning-lab.git dsa_repo
git commit -m "Add dsa repo as submodule"
```

 - Then copy or symlink solution markdown files into the `_dsa` collection (or move them). Each solution should be a Markdown file with front matter, e.g:

```yaml
---
title: "Two Sum"
leetcode_id: 1
difficulty: Easy
language: JavaScript
tags: [array, hash-table]
---

Solution notes and code...
```

2) GitHub Action to sync (recommended for automation)

 - Create a workflow that clones the `dsa-learning-lab` repo on push and copies `.md` files into `_dsa/`, then commits back to the site repo. This keeps your site updated automatically.

Example (high-level): use `actions/checkout@v4` to fetch both repos, run a script to copy files, then `peaceiris/actions-gh-pages` or a push action to update the site branch.

What I added to this site
- A `dsa` collection registered in `_config.yml` (output: true)
- An index page at `/dsa/` that lists items in the `dsa` collection (`/dsa/index.md`).
- A card include at `_includes/dsa-card.html` to render each solution elegantly.
- Styling in `assets/css/style.scss` for a responsive grid and card UI.

Next steps I can do for you (pick any):

- A: Add a GitHub Action workflow file `.github/workflows/sync-dsa.yml` that automatically copies markdown from your `dsa-learning-lab` repo into `_dsa/` on every push.
- B: Add a small script to convert your solution files into the required front matter and move them into `_dsa/` locally, and run it now if you give permission to clone the other repo.
- C: I can implement submodule synchronization guidance and a small helper script to import existing Markdown into `_dsa/`.

Which option do you want me to implement? (A, B, or C)

Triggering sync on push from your DSA repo
----------------------------------------

To make the sync fully automatic whenever you push to `dsa-learning-lab`, add a small workflow in that repository which sends a `repository_dispatch` event to this site repo. Steps:

1. Create a Personal Access Token (classic) with `repo` scope (or at least `repo:status`, `repo_deployment`, `public_repo` for public repo and `repo` for private).
2. In the `dsa-learning-lab` repo, add a secret named `SITE_REPO_PAT` with that token.
3. Add this workflow to `dsa-learning-lab` at `.github/workflows/notify-site.yml`:

```yaml
name: Notify Site Repo

on:
	push:
		branches: [ main ]

jobs:
	notify:
		runs-on: ubuntu-latest
		steps:
			- name: Send repository_dispatch to site
				env:
					PAT: ${{ secrets.SITE_REPO_PAT }}
				run: |
					curl -X POST \
						-H "Accept: application/vnd.github+json" \
						-H "Authorization: Bearer $PAT" \
						https://api.github.com/repos/KabileshwaranKabil/KabileshwaranKabil.github.io/dispatches \
						-d '{"event_type":"dsa-sync"}'
```

This calls the site repo's workflow (we listen for `repository_dispatch` with type `dsa-sync`). The site workflow then checks out the DSA repo and runs the sync script.

If you prefer, I can add this `notify-site.yml` to your DSA repo for you — you'll need to provide a PAT (or add it yourself) because the action needs permission to call the site API.
