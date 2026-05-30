#!/usr/bin/env python3
from PIL import Image
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
SRC_DIRS = [ROOT / 'assets' / 'images']
OUT_DIR = ROOT / 'assets' / 'images' / 'optimized'
SIZES = [320, 720, 1200]
QUALITY = 80

def ensure_out():
    OUT_DIR.mkdir(parents=True, exist_ok=True)

def process_image(p: Path):
    try:
        im = Image.open(p)
    except Exception as e:
        print(f"Skipping {p}: {e}")
        return

    name = p.stem
    for w in SIZES:
        try:
            # compute height preserving ratio
            ratio = w / im.width
            h = int(im.height * ratio)
            out_path = OUT_DIR / f"{name}-{w}.webp"
            im.resize((w, h), Image.LANCZOS).save(out_path, 'WEBP', quality=QUALITY, method=6)
            print(f"Wrote {out_path}")
        except Exception as e:
            print(f"Failed {p} @ {w}: {e}")

def main():
    ensure_out()
    exts = ['.png', '.jpg', '.jpeg']
    files = []
    for d in SRC_DIRS:
        files.extend([p for p in d.rglob('*') if p.suffix.lower() in exts])

    print(f"Found {len(files)} images")
    for f in files:
        process_image(f)

if __name__ == '__main__':
    main()
