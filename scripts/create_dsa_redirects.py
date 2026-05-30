#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DSA_DIR = ROOT / '_dsa'

def make_index_for_dir(d: Path):
    # if index.md or README.md exists, skip
    if (d / 'index.md').exists() or (d / 'README.md').exists():
        return False
    md_files = [p for p in d.iterdir() if p.suffix.lower() == '.md']
    if not md_files:
        return False
    target = md_files[0].name
    title = d.name.replace('-', ' ').replace('_', ' ').title()
    content = f"---\ntitle: \"{title}\"\n---\n\n<!-- Redirect to {target} -->\n<meta http-equiv=\"refresh\" content=\"0; url={target}\">\n\nIf you are not redirected automatically, follow this <a href=\"{target}\">link</a>.\n"
    (d / 'index.md').write_text(content, encoding='utf-8')
    return True

def main():
    created = 0
    if not DSA_DIR.exists():
        print('_dsa directory not found')
        return
    for d in DSA_DIR.rglob('*'):
        if d.is_dir():
            if make_index_for_dir(d):
                print('Created index.md in', d)
                created += 1
    print('Total created:', created)

if __name__ == '__main__':
    main()
