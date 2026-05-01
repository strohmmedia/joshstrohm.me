#!/usr/bin/env python3
"""
Generate a blog hero image using Gemini 3.1 Flash Image Preview (Nano Banana).
Saves to public/images/blog/<slug>.jpg.
Usage: gemini_image_gen.py "Post Title" [output_basename]
"""
import sys, os, json, base64, urllib.request, urllib.error, re

def slugify(title: str) -> str:
    s = title.lower()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[-\s]+', '-', s)
    return s.strip('-')

def generate_image(title: str, out_name: str = None) -> str:
    if out_name is None:
        out_name = slugify(title)

    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out_dir = os.path.join(repo_root, "public", "images", "blog")
    os.makedirs(out_dir, exist_ok=True)
    dst = os.path.join(out_dir, f"{out_name}.jpg")

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        api_key = "AIzaSyCG7UFABhZm8oA99ikYFsRSbt32r8L-Isw"

    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent"
    headers = {
        "x-goog-api-key": api_key,
        "Content-Type": "application/json"
    }

    # Derive visual concept from title keywords to avoid repetitive looks.
    low = title.lower()
    if any(k in low for k in ("gemini", "image", "generate", "flash", "vision")):
        concept = (
            "A cinematic, high-contrast close-up of a glowing crystalline microchip "
            "refracting light into soft prismatic gradients. "
            "Shallow depth of field, sharp focus on the crystal, "
            "negative space on the right for headline overlay. "
            "Mood: innovative and forward-looking."
        )
    elif any(k in low for k in ("automation", "workflow", "pipeline", "process", "bot")):
        concept = (
            "An abstract, flowing ribbon of luminous particles tracing a precise path "
            "across a dark matte backdrop, with subtle nodes hinting at steps. "
            "Negative space left of center for typography. "
            "Mood: efficient and orchestrated."
        )
    elif any(k in low for k in ("api", "integration", "webhook", "connect", "endpoint")):
        concept = (
            "Two sleek geometric planes intersecting with a thin thread of light linking them, "
            "set against a deep, quiet background. "
            "Soft vignette, ample negative space for headline. "
            "Mood: seamless and reliable."
        )
    else:
        concept = (
            "A minimalist, clean composition with a single striking element that reflects the post topic, "
            "balanced negative space for headline, soft studio lighting, "
            "modern and editorial style. "
            "Mood: professional and focused."
        )

    prompt = (
        f"{concept} "
        f"Blog post title: \"{title}\". "
        "No text, no letters, no UI, no logos. "
        "Aspect 16:9 landscape, photographed, photorealistic, 8k resolution."
    )

    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode(),
        headers=headers,
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        raise RuntimeError(f"Gemini API error {e.code}: {body}")

    inline = None
    for c in data.get("candidates", [{}]):
        for p in c.get("content", {}).get("parts", []):
            if "inlineData" in p:
                inline = p["inlineData"]["data"]
                break
        if inline:
            break

    if not inline:
        raise RuntimeError("No inline image data in Gemini response")

    with open(dst, "wb") as f:
        f.write(base64.b64decode(inline))

    return dst

def main():
    if len(sys.argv) < 2:
        print("Usage: gemini_image_gen.py \"Post Title\" [output_basename]")
        sys.exit(1)
    title = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else None
    path = generate_image(title, out)
    print(path)

if __name__ == "__main__":
    main()
