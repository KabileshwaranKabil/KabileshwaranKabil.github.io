#!/usr/bin/env python3
import argparse
import os
from pathlib import Path
import re
import yaml


def title_from_filename(name: str) -> str:
    name = Path(name).stem
    name = re.sub(r"[-_]+", " ", name)
    return name.title()


def has_front_matter(text: str) -> bool:
    return text.lstrip().startswith("---")


def make_front_matter(path: Path, first_paragraph: str) -> str:
    fm = {}
    fm["title"] = title_from_filename(path.name)
    digits = re.findall(r"(\d+)", path.name)
    if digits:
        fm["leetcode_id"] = int(digits[0])
    fm["difficulty"] = ""
    fm["language"] = ""
    fm["tags"] = []
    if first_paragraph:
        fm["excerpt"] = first_paragraph.strip()
    return yaml.safe_dump(fm, sort_keys=False)


def extract_first_paragraph(text: str) -> str:
    lines = [l.strip() for l in text.splitlines()]
    para = []
    started = False
    for line in lines:
        if line == "":
            if started:
                break
            continue
        para.append(line)
        started = True
    return " ".join(para)[:240]


def normalize_and_copy(src_path: Path, dest_path: Path):
    text = src_path.read_text(encoding="utf-8")
    if has_front_matter(text):
        out = text
    else:
        first_para = extract_first_paragraph(text)
        fm_yaml = make_front_matter(src_path, first_para)
        out = f"---\n{fm_yaml}---\n\n{text}"

    dest_path.parent.mkdir(parents=True, exist_ok=True)
    dest_path.write_text(out, encoding="utf-8")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--src", required=True, help="Source repo path (checked out)")
    parser.add_argument("--dest", required=True, help="Destination folder relative to site root (_dsa)")
    args = parser.parse_args()

    src = Path(args.src)
    dest = Path(args.dest)

    if not src.exists():
        print(f"Source path {src} does not exist")
        return

    md_files = list(src.rglob("*.md"))
    print(f"Found {len(md_files)} markdown files in {src}")

    for f in md_files:
        rel = f.relative_to(src)
        out_path = dest / rel
        # ensure .md extension
        if out_path.suffix.lower() != ".md":
            out_path = out_path.with_suffix('.md')
        print(f"Copying {f} -> {out_path}")
        normalize_and_copy(f, out_path)


if __name__ == "__main__":
    main()
