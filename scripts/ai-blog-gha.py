#!/usr/bin/env python3
"""
GitHub Actions runner for AI blog automation.
Uses OpenRouter (inclusionai/ling-2.6-1t:free) to draft posts.
"""
import datetime
import os
import re
import sys
import subprocess
import random
import json
import requests

POSTS_DIR = "src/content/blog"
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SLUGIFY_RE = re.compile(r'[^\w\s-]')

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
if not OPENROUTER_API_KEY:
    print("::error::OPENROUTER_API_KEY not set")
    sys.exit(1)

LLM_MODEL = "inclusionai/ling-2.6-1t:free"
LLM_API_URL = "https://openrouter.ai/api/v1/chat/completions"

def slugify(title: str) -> str:
    s = title.lower()
    s = SLUGIFY_RE.sub('', s)
    s = re.sub(r'[-\s]+', '-', s)
    return s.strip('-')

def pick_topic():
    """Pick a topic from topics.txt or use a default list."""
    topics_file = os.path.join(REPO_ROOT, "topics.txt")
    if os.path.isfile(topics_file):
        with open(topics_file) as f:
            topics = [line.strip() for line in f if line.strip()]
        if topics:
            return random.choice(topics)
    defaults = [
        "AI automation for local SMBs — 3 quick wins",
        "How to reduce admin work with AI tools",
        "Stop losing leads: simple automation for service businesses",
        "3 workflow automations that save 10 hours a week",
        "AI-powered follow-ups that close more deals"
    ]
    return random.choice(defaults)

def call_llm(system: str, user: str) -> str:
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/strohmmedia/joshstrohm.me",
        "X-Title": "AI Blog Automation"
    }
    payload = {
        "model": LLM_MODEL,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user}
        ],
        "temperature": 0.7,
        "max_tokens": 1000
    }
    try:
        resp = requests.post(LLM_API_URL, headers=headers, json=payload, timeout=120)
        resp.raise_for_status()
        data = resp.json()
        return data["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"LLM call failed: {e}")
        return None

def generate_post(title: str):
    system = """You are an expert tech and business writer. Write a clear, engaging blog post for SMB owners.
Tone: professional but approachable. Use short paragraphs and include practical takeaways.
Output ONLY the blog body (no frontmatter). Do not include placeholders like [image] or [title]."""
    user = f"""Topic: {title}
Write a blog post (~500-800 words) with:
- A strong opening hook
- 3-4 practical sections with actionable steps
- A concise closing with next steps"""
    body = call_llm(system, user)
    if not body:
        body = f"[Draft for topic]\n\nThis section would include practical automations for {title}."
    return body

def create_post_file(title: str, body: str):
    os.makedirs(os.path.join(REPO_ROOT, POSTS_DIR), exist_ok=True)
    today = datetime.date.today().isoformat()
    slug = slugify(title)
    filename = f"{today}-{slug}.md"
    path = os.path.join(REPO_ROOT, POSTS_DIR, filename)
    counter = 1
    while os.path.exists(path):
        filename = f"{today}-{slug}-{counter}.md"
        path = os.path.join(REPO_ROOT, POSTS_DIR, filename)
        counter += 1

    read_time = max(1, round(len(body.split()) / 200))
    frontmatter = f"""---
title: "{title}"
date: "{today}"
excerpt: "Practical automation tips for modern businesses."
readTime: "{read_time} min read"
featured: false
image: "/images/blog/{slug}.jpg"
---

"""
    with open(path, 'w', encoding='utf-8') as f:
        f.write(frontmatter + body.strip() + "\n")
    return path

def git_commit_and_push(branch_name: str, filepath: str):
    relpath = os.path.relpath(filepath, REPO_ROOT)
    subprocess.run(["git", "config", "user.name", "AI Blog Bot"], cwd=REPO_ROOT, check=True)
    subprocess.run(["git", "config", "user.email", "ai-blog@hermes.agent"], cwd=REPO_ROOT, check=True)
    subprocess.run(["git", "checkout", "-b", branch_name], cwd=REPO_ROOT, check=True)
    subprocess.run(["git", "add", relpath], cwd=REPO_ROOT, check=True)
    subprocess.run(["git", "commit", "-m", f"Add: {os.path.basename(relpath)}"], cwd=REPO_ROOT, check=True)
    subprocess.run(["git", "push", "--set-upstream", "origin", branch_name], cwd=REPO_ROOT, check=True)

def main():
    title = pick_topic()
    print(f"Topic: {title}")
    body = generate_post(title)
    filepath = create_post_file(title, body)
    print(f"Created: {filepath}")

    branch_name = f"ai-blog/{datetime.date.today().isoformat()}-{slugify(title)}"
    git_commit_and_push(branch_name, filepath)
    print(f"Branch pushed: {branch_name}")

if __name__ == "__main__":
    main()
