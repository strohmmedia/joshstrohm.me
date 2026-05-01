#!/usr/bin/env python3
"""
GitHub Actions runner for AI blog automation (push to main).
Generates a draft and commits directly to main.
"""
import datetime, os, re, sys, subprocess, random, requests

POSTS_DIR = "src/content/blog"
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SLUGIFY_RE = re.compile(r'[^\w\s-]')

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
LLM_MODEL = "inclusionai/ling-2.6-1t:free"
LLM_API_URL = "https://openrouter.ai/api/v1/chat/completions"

def slugify(title: str) -> str:
    s = title.lower()
    s = SLUGIFY_RE.sub('', s)
    s = re.sub(r'[-\s]+', '-', s)
    return s.strip('-')

def pick_topic():
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

def call_llm(system: str, user: str):
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
        "max_tokens": 1200
    }
    try:
        r = requests.post(LLM_API_URL, headers=headers, json=payload, timeout=120)
        r.raise_for_status()
        return r.json()["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"LLM error: {e}")
        return None

def generate_post(title):
    system = """You're an expert writer for SMBs. Write an engaging, practical blog post.
Tone: approachable and professional. Use short paragraphs and actionable steps.
Output ONLY the post body (no frontmatter)."""
    user = f"Topic: {title}\nWrite a ~500-800 word post: hook, 3-4 practical sections, closing next steps."
    body = call_llm(system, user)
    if not body:
        body = f"(Generated post for {title})\n\nThis section contains practical automation ideas for {title}."
    return body

def create_post(title, body):
    os.makedirs(os.path.join(REPO_ROOT, POSTS_DIR), exist_ok=True)
    today = datetime.date.today().isoformat()
    slug = slugify(title)
    filename = f"{today}-{slug}.md"
    path = os.path.join(REPO_ROOT, POSTS_DIR, filename)
    i = 1
    while os.path.exists(path):
        filename = f"{today}-{slug}-{i}.md"
        path = os.path.join(REPO_ROOT, POSTS_DIR, filename)
        i += 1
    rt = max(1, round(len(body.split()) / 200))
    fm = f"""---
title: "{title}"
date: "{today}"
excerpt: "Practical automation tips and quick wins for modern businesses."
readTime: "{rt} min read"
featured: false
image: "/images/blog/{slug}.jpg"
---

"""
    with open(path, 'w', encoding='utf-8') as f:
        f.write(fm + body.strip() + "\n")
    return path

def main():
    title = pick_topic()
    print(f"Topic: {title}")
    body = generate_post(title)
    p = create_post(title, body)
    print(f"Created: {p}")

if __name__ == "__main__":
    main()
