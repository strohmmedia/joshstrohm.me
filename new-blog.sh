#!/bin/bash
# Generate a new blog post + Gemini 3.1 Flash hero image and commit to main.
# Usage: ./new-blog.sh "Your Post Title"
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 \"Post Title\""
  exit 1
fi

TITLE="$1"
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')
DATE=$(date +%Y-%m-%d)
FILENAME="$DATE-$SLUG.md"
POST_DIR="src/content/blog"
IMAGE_DIR="public/images/blog"

mkdir -p "$POST_DIR" "$IMAGE_DIR"

# Generate image via Gemini (uses GEMINI_API_KEY if set)
python3 scripts/gemini_image_gen.py "$TITLE" "$SLUG"

# Generate LLM draft via OpenRouter (fallback to placeholder if no key)
if [ -n "$OPENROUTER_API_KEY" ]; then
  python3 scripts/ai-blog-gha.py --topic "$TITLE"
else
  echo "No OPENROUTER_API_KEY set — creating placeholder draft."
  cat > "$POST_DIR/$FILENAME" << EOF
---
title: "$TITLE"
date: "$DATE"
excerpt: "Automation tips and quick wins for modern businesses."
readTime: "5 min read"
featured: false
image: "/images/blog/$SLUG.jpg"
---

(Generated draft for $TITLE)\n\nThis section contains practical automation ideas and quick wins for $TITLE.
EOF
fi

# If the LLM script created a different filename, rename to match image slug
for f in "$POST_DIR"/*.md; do
  if grep -q "$TITLE" "$f" 2>/dev/null; then
    mv "$f" "$POST_DIR/$FILENAME" 2>/dev/null || true
    break
  fi
done

# Commit and push
git add "$POST_DIR/$FILENAME" "$IMAGE_DIR/$SLUG.jpg"
git commit -m "Add: $TITLE" || echo "Nothing to commit"
git push origin main
echo "Published: $TITLE"
