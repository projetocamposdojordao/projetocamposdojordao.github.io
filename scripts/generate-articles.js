- name: Commit generated posts
  run: |
    git config user.name "github-actions[bot]"
    git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
    git add _posts

    if git diff --staged --quiet; then
      echo "Nenhuma mudança para commit."
      exit 0
    fi

    git commit -m "Generate Jekyll articles"
    git pull --rebase origin main
    git push origin main
