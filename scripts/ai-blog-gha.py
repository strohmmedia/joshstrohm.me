#!/usr/bin/env python3
"""
AI Blog generator (image + post). Saves post to src/content/blog,
image to public/images/blog.
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
    s = SLUGIFY_RE.sub("", s)
    s = re.sub(r"[-\s]+", "-", s)
    return s.strip("-")

def pick_topic():
    topics_file = os.path.join(REPO_ROOT, "topics.txt")
    if os.path.isfile(topics_file):
        with open(topics_file) as f:
            topics = [ln.strip() for ln in f if ln.strip()]
        if topics:
            return random.choice(topics)
    return "AI automation for local SMBs — 3 quick wins"

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
        print(f"LLM error: {e}", file=sys.stderr)
        return None

def generate_post(title):
    system = ("You're an expert writer for SMBs. Write a clear, engaging blog post. "
              "Tone: approachable and professional. Use short paragraphs and actionable steps. "
              "Output ONLY the post body (no frontmatter).")
    user = f"Topic: {title}\nWrite a ~500-800 word post: hook, 3-4 practical sections, closing next steps."
    body = call_llm(system, user)
    if not body:
        body = f"(Practical automation ideas for {title})\n\nContent draft."
    return body

def generate_image(title):
    cmd = [sys.executable, os.path.join(REPO_ROOT, "scripts", "generate_image.py"), title]
    try:
        out = subprocess.check_output(cmd, stderr=subprocess.STDOUT, text=True).strip()
        if out and os.path.exists(os.path.join(REPO_ROOT, out)):
            return out
    except Exception as e:
        print(f"Image generation failed: {e}", file=sys.stderr)
    # fallback path
    return f"public/images/blog/{slugify(title)}.jpg"

def create_post(title):
    os.makedirs(os.path.join(REPO_ROOT, POSTS_DIR), exist_ok=True)
    today = datetime.date.today().isoformat()
    slug = slugify(title)
    body = generate_post(title)
    img_rel = generate_image(title)

    # frontmage path should be web path (public served at /)
    web_path = "/" + img_rel if not img_rel.startswith("/") else img_rel

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
image: "{web_path}"
---

"""
    with open(path, 'w', encoding='utf-8') as f:
        f.write(fm + body.strip() + "\n")
    return path

def main():
    title = pick_topic()
    print(f"Topic: {title}")
    p = create_post(title)
    print(f"Created: {p}")

if __name__ == "__main__":
    main()
