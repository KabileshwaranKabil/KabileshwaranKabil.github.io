---
layout: default
title: DSA Integration
permalink: /DSA_INTEGRATION/
---

DSA Integration
===============

This project can include your LeetCode solutions from your repo `https://github.com/KabileshwaranKabil/dsa-learning-lab.git`.

Two recommended integration options:

1) Git submodule (simple, local)

 - From your site repo root:

```bash
git submodule add https://github.com/KabileshwaranKabil/dsa-learning-lab.git dsa_repo
git commit -m "Add dsa repo as submodule"
```

 - Then copy or symlink solution markdown files into the `_dsa` collection (or move them). Each solution should be a Markdown file with front matter, e.g:


1) GitHub Action to sync (recommended for automation)

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

To make the sync fully automatic whenever you push to `dsa-learning-lab`, add a small workflow in that repository which sends a `repository_dispatch` event to this site repo. Steps:

1. Create a Personal Access Token (classic) with `repo` scope (or at least `repo:status`, `repo_deployment`, `public_repo` for public repo and `repo` for private).
2. In the `dsa-learning-lab` repo, add a secret named `SITE_REPO_PAT` with that token.
3. Add this workflow to `dsa-learning-lab` at `.github/workflows/notify-site.yml`:
This page describes two reliable ways to include your LeetCode / DSA solutions inside this site and how to automate the sync.

Overview
--------

There are two recommended approaches:

- Option 1 — Git submodule (simple, manual): keep a local copy of your solutions inside the site repo as a submodule and commit/merge when you want updates.
- Option 2 — Automated sync (recommended): use a GitHub Action in this site repo plus a small workflow in your DSA repo that triggers the site to pull and import new files automatically on push.

Both approaches assume solution files are Markdown (`.md`). Each solution should ideally include YAML front matter so the site can surface metadata (title, id, difficulty, language, tags). Example front matter to include at the top of a solution file:

```yaml
---
title: "Two Sum"
leetcode_id: 1
difficulty: Easy
language: Python
tags: [array, hash-table]
excerpt: "Two-sum solution using hash map (O(n) time, O(n) space)."
---

Solution notes and code blocks follow here.
```

If a file lacks front matter, the repository sync script included in this site will attempt to generate basic front matter automatically (`scripts/sync_dsa.py` and `scripts/fix_dsa_meta.py` are included in this repo).

Option 1 — Git submodule (quick and local)
-----------------------------------------

Use a submodule if you prefer explicit control and infrequent updates:

```bash
cd path/to/KabileshwaranKabil.github.io
git submodule add https://github.com/KabileshwaranKabil/dsa-learning-lab.git dsa_src
git commit -m "Add dsa-learning-lab as submodule"
```

After adding the submodule you can copy, symlink, or point your build step to import Markdown files from `dsa_src` into the site's `_dsa/` collection. The helper script `scripts/sync_dsa.py` can be used to copy and normalize files into `_dsa/`.

Option 2 — Automated sync (recommended)
--------------------------------------

This site already contains a syncing workflow and helper scripts. The approach is:

1. This site repo runs a workflow that checks out the `dsa-learning-lab` repository into a folder (e.g. `dsa_src`).
2. It runs `python scripts/sync_dsa.py --src dsa_src --dest _dsa` to copy Markdown files into the `_dsa/` collection (the script preserves subfolders).
3. Optionally run `python scripts/fix_dsa_meta.py --dest _dsa` to normalize front matter (title, leetcode_id, language detection).
4. The workflow commits `_dsa/` changes back to the site repo.

Workflow in the site repo
~~~~~~~~~~~~~~~~~~~~~~~~

The site includes `.github/workflows/sync-dsa.yml` which can be triggered manually, on a schedule, or via a `repository_dispatch` event. The repo-side workflow checks out the DSA repo and runs the sync script.

Triggering the sync automatically from your DSA repo
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To make the sync run automatically whenever you push to `dsa-learning-lab`, add a small workflow in that repository which calls the GitHub API to dispatch an event to this site repo.

Steps:

1. Create a Personal Access Token (classic) with `repo` scope (for private repositories) or `public_repo` (for public). Keep this token safe.
2. In the `dsa-learning-lab` repository, add a secret named `SITE_REPO_PAT` with that token (Repository > Settings > Secrets > Actions).
3. Add this workflow file to `dsa-learning-lab` at `.github/workflows/notify-site.yml`:

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

Notes on security and permissions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- If the DSA repo is private, the PAT must have `repo` scope and be stored as a secret in the DSA repo.
- The site repo's workflow uses the `repository_dispatch` event (type `dsa-sync`). The site workflow should be configured to listen for that event and will then run the sync script.

Using the included helper scripts (local testing)
------------------------------------------------

You can test and run the import locally before relying on automation.

1. Clone both repos locally (site repo and `dsa-learning-lab`).
2. From the site repo root run:

```bash
python scripts/sync_dsa.py --src ../dsa-learning-lab --dest _dsa
python scripts/fix_dsa_meta.py --dest _dsa
```

The sync script copies Markdown files and preserves folder structure. The metadata fixer (`fix_dsa_meta.py`) will:

- Add a `title` if missing (derived from filename)
- Extract a `leetcode_id` from the filename if present
- Detect the language from fenced code blocks and set `language` when possible

Troubleshooting & tips
----------------------

- File naming: The sync script uses the filename to infer `leetcode_id` when available. For accurate IDs, include the problem number in directory or filename (e.g. `1-two-sum/README.md` or `1-two-sum.md`).
- If some files are not detected correctly, run `python scripts/fix_dsa_meta.py --dest _dsa --dry-run` to preview changes.
- If you prefer submodules, keep `dsa_src` as a submodule and add a small build step that copies files from `dsa_src` into `_dsa` during site build.

What is already included in this site to help
-------------------------------------------

- `scripts/sync_dsa.py` — copies `.md` files from a checked-out DSA repo into `_dsa/`.
- `scripts/fix_dsa_meta.py` — normalizes front matter for files under `_dsa/`.
- `.github/workflows/sync-dsa.yml` — site-side workflow that runs the sync and commits `_dsa/` updates. It listens for `repository_dispatch` with event type `dsa-sync`.
- `prepared_pr/notify-site.yml` and `prepared_pr/PR_INSTRUCTIONS.md` — a ready workflow and instructions you can use to create a PR in the DSA repo if you want me to help add the notify workflow there.

If you'd like, I can:

- Add the `notify-site.yml` directly to your `dsa-learning-lab` (I can open a PR for you), or
- Run a one-time import now and tidy `_dsa/` metadata (I've already added scripts to do this), or
- Improve metadata extraction (parse README headers or LeetCode links inside files to infer exact IDs and tags).

Choose which option you'd like me to do next and I'll proceed (I can open a PR in your DSA repo for the notify workflow, run the sync now, or prepare the image/formatting updates for `_dsa` files).
