name: Generate Articles

on:
  workflow_dispatch:

permissions:
  contents: write

jobs:
  generate:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm install

      - name: Generate articles
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: node scripts/generate-articles.js

      - name: Commit generated posts
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add _posts
          git diff --staged --quiet || git commit -m "Generate Jekyll articles"
          git push
