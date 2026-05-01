#!/usr/bin/env python3
"""
Generate a blog image using local MCP/hermes_tools.image_generate.
Saves to public/images/blog/<slug>.jpg and returns relative path.
"""
import sys, os, json, subprocess, pathlib, datetime, hashlib

# We call the internal hermes_tools.image_generate via Python import if available.
# If not, we fallback to curl to Pollinations/Flux (public, no key).

def slugify(title: str) -> str:
    import re
    s = title.lower()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[-\s]+', '-', s)
    return s.strip('-')

def generate_via_mcp(prompt: str, slug: str):
    """Attempt to use Hermes MCP image_generate."""
    try:
        # Try dynamic import of hermes_tools (installed in env)
        from hermes_tools import image_generate
        # image_generate returns {"image": "path_or_url"}
        out = image_generate(prompt=prompt, aspect_ratio="landscape")
        if isinstance(out, dict) and out.get("image"):
            src = out["image"]
            dst_dir = pathlib.Path("public/images/blog")
            dst_dir.mkdir(parents=True, exist_ok=True)
            dst = dst_dir / f"{slug}.jpg"
            # If src is a URL, download; if local path, copy
            if src.startswith("http"):
                import urllib.request
                urllib.request.urlretrieve(src, dst)
            else:
                import shutil
                shutil.copy(src, dst)
            return str(dst)
    except Exception as e:
        print(f"MCP image gen failed, will use fallback: {e}")
    return None

def generate_fallback(prompt: str, slug: str):
    """Fallback: use Pollinations (no key required) or any public endpoint."""
    import urllib.request, urllib.parse
    # Pollinations: https://image.pollinations.ai/prompt/<prompt>...?width=1024&height=576&nologo=true
    q = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{q}?width=1024&height=576&nologo=true&safe=true"
    dst_dir = pathlib.Path("public/images/blog")
    dst_dir.mkdir(parents=True, exist_ok=True)
    dst = dst_dir / f"{slug}.jpg"
    try:
        urllib.request.urlretrieve(url, dst)
        return str(dst)
    except Exception as e:
        print(f"Fallback image failed: {e}")
        return None

def main():
    title = sys.argv[1] if len(sys.argv) > 1 else "AI automation for local businesses"
    slug = slugify(title)
    prompt = f"A clean, modern, professional illustration for a business blog post titled '{title}'. Minimalist geometric patterns, dark mode color palette (#0a0a0a background, electric blue #00d4ff accent), subtle tech elements, no text, suitable for hero image, 16:9 aspect."

    out_path = generate_via_mcp(prompt, slug) or generate_fallback(prompt, slug)
    if out_path and os.path.exists(out_path):
        rel = os.path.relpath(out_path, start=os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        print(rel)  # prints path like public/images/blog/slug.jpg
    else:
        print("")
        sys.exit(1)

if __name__ == "__main__":
    main()
