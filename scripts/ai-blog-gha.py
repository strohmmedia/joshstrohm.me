#!/usr/bin/env python3
"""
Fast-path AI blog generator for AutomatewithJosh.com
Usage: python3 ai-blog-gha.py --topic "Post title" [--push] [--dry-run]
"""
import argparse, datetime, json, os, re, subprocess, sys
from pathlib import Path

POSTS_DIR = Path("src/content/blog")
IMAGES_DIR = Path("public/images/blog")
SLUG_RE = re.compile(r'[^\w\s-]')

def slugify(title: str) -> str:
    s = title.lower()
    s = SLUG_RE.sub('', s)
    s = re.sub(r'[-\s]+', '-', s)
    return s.strip('-')

def llm_draft(topic: str) -> str:
    import urllib.request, json
    key = os.getenv("OPENROUTER_API_KEY")
    if not key:
        return (
            f"**In short:** This post covers practical automation tactics for {topic}.\n\n"
            "## Identify\n\n- List repetitive tasks that cost time.\n"
            "## Architect\n\n- Choose lightweight integrations.\n"
            "## Implement\n\n- Build, test, and iterate.\n\n"
            "Automation is a discipline. Start small, measure time saved, and expand.\n"
        )
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://automatewithjosh.com",
    }
    payload = {
        "model": "inclusionai/ling-2.6-1t:free",
        "messages": [
            {"role": "system", "content": (
                "You write concise, action-oriented blog posts for SMB automation. "
                "No fluff. Lead with the answer. Use plain hyphens (-) only (no em/en dashes). "
                "Keep to ~500-800 words. Use headings. Provide practical steps."
            )},
            {"role": "user", "content": f"Write a helpful blog post titled: {topic}"}
        ],
        "temperature": 0.6,
    }
    try:
        req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode())
        return data["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"LLM call failed: {e}", file=sys.stderr)
        return (
            f"**In short:** Automation for {topic} saves time.\n\n"
            "## Identify\n\n- Find repetitive tasks.\n"
            "## Architect\n\n- Use simple tools.\n"
            "## Implement\n\n- Test and iterate.\n"
        )

def generate_image(title: str, slug: str) -> Path:
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    out_path = IMAGES_DIR / f"{slug}.jpg"
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key:
        try:
            return _gemini_image(title, slug, out_path)
        except Exception as e:
            print(f"Gemini image failed: {e}", file=sys.stderr)
    try:
        import urllib.request
        req = urllib.request.Request("https://picsum.photos/1024/576.jpg")
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
        with open(out_path, "wb") as f:
            f.write(data)
        print(f"Used picsum placeholder for {slug}")
        return out_path
    except Exception:
        out_path.touch()
        return out_path

def _gemini_image(title: str, slug: str, out_path: Path) -> Path:
    import urllib.request, json, base64
    api_key = os.getenv("GEMINI_API_KEY")
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent"
    headers = {"x-goog-api-key": api_key, "Content-Type": "application/json"}
    low = title.lower()
    if any(k in low for k in ("automation", "workflow", "pipeline", "process")):
        concept = (
            "An abstract flowing ribbon of luminous particles tracing a precise path "
            "across a dark matte backdrop with subtle nodes. Negative space left for text. "
            "Mood efficient and orchestrated."
        )
    else:
        concept = (
            "A minimalist clean composition with a single striking element reflecting topic, "
            "balanced negative space for headline, soft studio lighting, modern editorial."
        )
    prompt = (
        f"{concept} Blog title: \"{title}\". "
        "No text, no letters, no logos. 16:9 landscape, photorealistic."
    )
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = json.loads(resp.read().decode())
    inline = None
    for c in data.get("candidates", [{}]):
        for p in c.get("content", {}).get("parts", []):
            if "inlineData" in p:
                inline = p["inlineData"]["data"]
                break
        if inline:
            break
    if not inline:
        raise RuntimeError("No inline data in Gemini response")
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(inline))
    return out_path

def remove_extra_posts(keep_stem: str):
    for md in POSTS_DIR.glob("*.md"):
        if md.stem != keep_stem:
            md.unlink()
            print(f"Removed post: {md.name}")
    keep_image = f"{keep_stem}.jpg"
    for img in IMAGES_DIR.glob("*.jpg"):
        if img.name == keep_image:
            continue
        referenced = False
        for md in POSTS_DIR.glob("*.md"):
            if img.name in md.read_text():
                referenced = True
                break
        if not referenced:
            img.unlink()
            print(f"Removed orphan image: {img.name}")

def git_commit_and_push(slug: str, push: bool):
    subprocess.run(["git", "add", "-A"], check=True)
    subprocess.run(["git", "commit", "-m", f"Add: {slug}"], check=False)
    if push:
        subprocess.run(["git", "push", "origin", "main"], check=True)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--topic", required=True)
    parser.add_argument("--push", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    POSTS_DIR.mkdir(parents=True, exist_ok=True)
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    date_str = datetime.date.today().isoformat()
    slug = slugify(args.topic)
    filename = f"{date_str}-{slug}.md"
    path = POSTS_DIR / filename
    image_rel = f"/images/blog/{slug}.jpg"
    print(f"Generating: {args.topic} -> {filename}")
    draft = llm_draft(args.topic)
    frontmatter = f"---\ntitle: \"{args.topic}\"\ndate: \"{date_str}\"\nimage: \"{image_rel}\"\n---\n\n"
    content = frontmatter + draft
    if args.dry_run:
        print("=== DRY RUN ===")
        print(content[:1000])
        return
    path.write_text(content, encoding="utf-8")
    print(f"Wrote: {path}")
    img_path = generate_image(args.topic, slug)
    print(f"Image: {img_path}")
    remove_extra_posts(f"{date_str}-{slug}")
    git_commit_and_push(slug, push=args.push)
    print("Done.")

if __name__ == "__main__":
    main()
