- name: Commit generated posts
  run: |
    git config user.name "github-actions[bot]"
    git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
    git add _posts
    git diff --staged --quiet || git commit -m "Generate Jekyll articles"
    git pull --rebase origin main
    git push origin main
