#!/usr/bin/env python3
"""
AI Blog Automator
Usage:
  python3 ai-blog.py --topic "AI automation for SMBs" [--dry-run] [--push]
  python3 ai-blog.py --batch topics.txt
"""
import argparse, datetime, os, re, json, subprocess, sys, time
from pathlib import Path

try:
    import feedparser, requests, trafilatura
except ImportError:
    print("Missing deps. Install: feedparser trafilatura requests")
    sys.exit(1)

# -- CONFIG --
POSTS_DIR = Path("src/content/blog")      # relative to repo root
REPO_ROOT = Path.cwd()                   # run from repo root
SLUGIFY_RE = re.compile(r'[^\w\s-]')

# LLM CONFIG - adjust to your provider/model
# Example for OpenAI-compatible API (OpenRouter, OpenAI, local, etc.)
LLM_API_URL = os.getenv("LLM_API_URL", "https://api.openai.com/v1/chat/completions")
LLM_API_KEY = os.getenv("LLM_API_KEY", "")          # set in env
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-4o-mini")
# --

def slugify(title: str) -> str:
    s = title.lower()
    s = SLUGIFY_RE.sub('', s)
    s = re.sub(r'[-\s]+', '-', s)
    return s.strip('-')

def search_sources(topic: str, max_results=5):
    """Simple Google News RSS search + basic web search fallback."""
    # Google News RSS
    rss_url = f"https://news.google.com/rss/search?q={topic.replace(' ', '+')}+when:7d&hl=en-US&gl=US&ceid=US:en"
    feed = feedparser.parse(rss_url)
    urls = []
    for entry in feed.entries[:max_results]:
        urls.append(entry.link)
    # If not enough, fallback to trafilatura/fetch via search
    if len(urls) < max_results:
        # Try a simple textise dot iitty using a public search if available
        # (trafilatura has its own fetch/download but we'd need more infra)
        pass
    return urls[:max_results]

def fetch_content(url: str) -> str:
    """Extract article text from URL."""
    try:
        downloaded = trafilatura.fetch_url(url)
        text = trafilatura.extract(downloaded, include_comments=False, include_tables=False)
        if text:
            return text.strip()
    except Exception as e:
        print(f"  Warn: failed to fetch {url}: {e}", file=sys.stderr)
    return ""

def llm_write_prompt(topic: str, sources_text: str) -> str:
    """Return the LLM prompt/system for article generation."""
    system = """You are an expert tech and business writer. Write a clear, engaging blog post for SMB owners.
The tone is professional but approachable. Use short paragraphs and include practical takeaways.
Output ONLY the blog body (no frontmatter). Do not include placeholders like [image] or [title].
"""
    user = f"""Topic: {topic}
Sources (for facts/context):
{sources_text}

Write the blog post body (~500-800 words). Include:
- A strong opening hook
- 3-4 short sections with practical insights
- A concise closing with next steps
"""
    return system, user

def call_llm(system: str, user: str) -> str:
    """Call LLM API and return generated text."""
    if not LLM_API_KEY:
        print("Error: LLM_API_KEY not set. Set env LLM_API_KEY or configure your model.", file=sys.stderr)
        print("Falling back to mock content.", file=sys.stderr)
        return f"[Draft for topic]\n\nThis is a generated draft about {system}. Please replace with real content."

    headers = {"Authorization": f"Bearer {LLM_API_KEY}", "Content-Type": "application/json"}
    payload = {
        "model": LLM_MODEL,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user}
        ],
        "temperature": 0.7
    }
    try:
        resp = requests.post(LLM_API_URL, headers=headers, json=payload, timeout=120)
        resp.raise_for_status()
        data = resp.json()
        return data["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"LLM call failed: {e}", file=sys.stderr)
        return f"[Draft for topic]\n\nLLM generation failed. Please write manually."

def create_post_file(title: str, body: str, dry_run: bool = False) -> Path:
    """Create .md with frontmatter in POSTS_DIR."""
    POSTS_DIR.mkdir(parents=True, exist_ok=True)
    today = datetime.date.today().isoformat()
    slug = slugify(title)
    filename = f"{today}-{slug}.md"
    path = POSTS_DIR / filename

    if path.exists():
        print(f"File exists: {path}", file=sys.stderr)
        # Try variant
        counter = 1
        while path.exists():
            filename = f"{today}-{slug}-{counter}.md"
            path = POSTS_DIR / filename
            counter += 1

    read_time = max(1, round(len(body.split()) / 200))
    frontmatter = f"""---
title: "{title}"
date: "{today}"
excerpt: "Practical insights and takeaways for modern businesses."
readTime: "{read_time} min read"
featured: false
image: "/images/blog/{slug}.jpg"
---

"""
    full = frontmatter + body.strip() + "\n"

    if dry_run:
        print("--- DRY RUN ---")
        print(full)
        print("--- END DRY RUN ---")
        return path

    path.write_text(full, encoding='utf-8')
    print(f"Created: {path}")
    return path

def git_commit_and_push(filepath: Path, commit_msg: str, dry_run: bool = False):
    """Stage, commit, push."""
    rel = filepath.relative_to(REPO_ROOT)
    cmds = [
        ["git", "add", str(rel)],
        ["git", "commit", "-m", commit_msg],
        ["git", "push", "origin", "main"]
    ]
    for cmd in cmds:
        print(f"Running: {' '.join(cmd)}")
        if dry_run:
            continue
        try:
            subprocess.run(cmd, cwd=REPO_ROOT, check=True)
        except subprocess.CalledProcessError as e:
            print(f"Git step failed: {e}", file=sys.stderr)
            sys.exit(1)

def process_topic(topic: str, dry_run: bool = False, push: bool = False):
    print(f"Processing topic: {topic}")
    urls = search_sources(topic, max_results=5)
    print(f"Found {len(urls)} sources")
    sources_text = ""
    for u in urls:
        txt = fetch_content(u)
        if txt:
            sources_text += f"\n---\nFrom {u}:\n{txt[:1200]}\n"
    if not sources_text:
        sources_text = "(No sources fetched)"

    system, user = llm_write_prompt(topic, sources_text)
    body = call_llm(system, user)
    out_path = create_post_file(topic, body, dry_run=dry_run)

    if dry_run:
        return

    if push:
        commit_msg = f"Add: {topic}"
        git_commit_and_push(out_path, commit_msg, dry_run=dry_run)
        print("Pushed to origin/main — Vercel will auto-deploy.")

def main():
    parser = argparse.ArgumentParser(description="AI Blog Automator")
    parser.add_argument("--topic", help="Blog post topic")
    parser.add_argument("--batch", help="Text file with one topic per line")
    parser.add_argument("--dry-run", action="store_true", help="Don't write files or push")
    parser.add_argument("--push", action="store_true", help="Commit and push after generating")
    args = parser.parse_args()

    if not args.topic and not args.batch:
        parser.print_help()
        sys.exit(1)

    if args.topic:
        process_topic(args.topic, dry_run=args.dry_run, push=args.push)

    if args.batch:
        batch_path = Path(args.batch)
        if not batch_path.is_file():
            print(f"Batch file not found: {batch_path}", file=sys.stderr)
            sys.exit(1)
        topics = [line.strip() for line in batch_path.read_text().splitlines() if line.strip()]
        for t in topics:
            process_topic(t, dry_run=args.dry_run, push=args.push)
            time.sleep(2)

if __name__ == "__main__":
    main()
