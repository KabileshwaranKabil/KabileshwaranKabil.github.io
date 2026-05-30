How to add notify workflow to `dsa-learning-lab`

1. Clone your DSA repo and create a branch:

```bash
git clone https://github.com/KabileshwaranKabil/dsa-learning-lab.git
cd dsa-learning-lab
git checkout -b feat/add-notify-workflow
```

2. Copy the prepared workflow file into the repo:

```bash
mkdir -p .github/workflows
cp ../KabileshwaranKabil.github.io/prepared_pr/notify-site.yml .github/workflows/notify-site.yml
```

3. Add secret `SITE_REPO_PAT` in DSA repo settings (Repository > Settings > Secrets > Actions) with a PAT that can dispatch events to the site repo.

4. Commit and push the branch, then open a PR:

```bash
git add .github/workflows/notify-site.yml
git commit -m "chore: add notify workflow to trigger site sync on push"
git push origin feat/add-notify-workflow
```

Then create a Pull Request on GitHub and merge it into `main`.

Optional: If you want, provide a PAT here and I can open the PR for you automatically.
