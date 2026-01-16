---
layout: post
title: "Git Basics Cheat Sheet"
date: 2026-01-16 00:00:00 +0530
categories: [Notes]
tags: [learning, cs, git, version-control, development]
---

This post documents a simple and beginner-friendly Git cheat sheet created as part of my learning journey.
It highlights commonly used Git commands with clear explanations and practical examples, and is intended to help newcomers understand basic version control workflows.


### 1. Check Git Version

```bash

git --version

```

**Example output:**

```text

git version 2.43.0

```

Displays the currently installed Git version.


### 2. Configure Git (One-Time Setup)

```bash

git config --global user.name "yourname"
git config --global user.email "youremail@gmail.com"

```

Configures your identity, which is attached to every commit you make.

```bash

git config --list

```

**Example output:**

```text

user.name=yourname
user.email=youremail@gmail.com

```


### 3. Initialize a Repository

```bash

git init

```

**Example output:**

```text

Initialized empty Git repository

```

Creates a new Git repository in the current directory.


### 4. Check Repository Status

```bash

git status

```

**Example output:**

```text

On branch main
Untracked files:
  index.html

```

Shows the current state of files (untracked, modified, or staged).


### 5. Add Files to the Staging Area

```bash

git add index.html

```

Stages a specific file.

```bash

git add .

```

Stages all changes in the current directory.


### 6. Commit Changes

```bash

git commit -m "Add index file"

```

**Example output:**

```text

1 file changed, 10 insertions(+)

```

Records a snapshot of staged changes in the repository.


### 7. View Commit History

```bash

git log --oneline

```

**Example output:**

```text

a3f5c21 Add index file

```

Displays a compact view of commit history.


### 8. Working with Branches

```bash

git branch

```

**Example output:**

```text

* main

```

Lists branches and highlights the active one.

```bash

git branch feature

```

Creates a new branch.

```bash

git checkout feature

```

Switches to the specified branch.


### 9. Merge Branches

```bash

git checkout main
git merge feature

```

**Example output:**

```text

Updating a3f5c21..b7d9e11
Fast-forward

```

Integrates changes from one branch into another.


### 10. Connect to a Remote Repository

```bash

git remote add origin https://github.com/user/repo.git

```

Links the local repository to a remote GitHub repository.

```bash

git remote -v

```

**Example output:**

```text

origin  https://github.com/user/repo.git (fetch)
origin  https://github.com/user/repo.git (push)

```


### 11. Push and Pull Changes

```bash

git push origin main

```

Uploads local commits to the remote repository.

```bash

git pull

```

Fetches and merges changes from the remote repository.


### 12. Undo Common Mistakes

```bash

git restore file.txt

```

Discards local changes in a file.

```bash

git reset file.txt

```

Removes a file from the staging area without deleting changes.

```bash

git reset --hard

```

Resets the working directory completely (use with caution).


### Key Git Concepts (Quick Reference)

* **Repository** → A directory tracked by Git
* **Staging Area** → Files prepared for commit
* **Commit** → A saved snapshot of changes
* **Branch** → An independent line of development
* **Clone** → A local copy of a remote repository
* **Pull** → Fetch + merge remote changes


### Closing Note

This cheat sheet reflects my approach to learning: keeping concepts simple, practical, and well-documented. I plan to expand this collection as I continue exploring software development tools and workflows.