#!/usr/bin/env python3
"""Generate a blog image (placeholder if needed). Saves to src/static/images/blog/<slug>.jpg"""
import sys, os, re, pathlib, hashlib, urllib.request

def slugify(title: str) -> str:
    s = title.lower()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[-\s]+', '-', s)
    return s.strip('-')

def main():
    title = sys.argv[1] if len(sys.argv) > 1 else "AI automation for local businesses"
    slug = slugify(title)
    repo_root = pathlib.Path(__file__).parent.parent.parent
    out_dir = repo_root / "src" / "static" / "images" / "blog"
    out_dir.mkdir(parents=True, exist_ok=True)
    dst = out_dir / f"{slug}.jpg"

    # Deterministic seed from slug for pseudo-random but stable image
    seed = int(hashlib.md5(slug.encode()).hexdigest()[:8], 16)
    url = f"https://picsum.photos/seed/{seed}/1024/576"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
        with open(dst, 'wb') as f:
            f.write(data)
        print(f"src/static/images/blog/{slug}.jpg")
    except Exception as e:
        # last-resort: create a tiny solid placeholder file (1x1 gray) so pipeline continues
        dst.parent.mkdir(parents=True, exist_ok=True)
        gray = b'\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00'
        with open(dst, 'wb') as f:
            f.write(gray)
        print(f"src/static/images/blog/{slug}.jpg")

if __name__ == "__main__":
    main()
