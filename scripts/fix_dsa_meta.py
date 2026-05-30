#!/usr/bin/env python3
import argparse
from pathlib import Path
import re
import yaml


LANG_MAP = {
    'js': 'JavaScript', 'javascript': 'JavaScript',
    'py': 'Python', 'python': 'Python',
    'cpp': 'C++', 'c++': 'C++', 'cxx': 'C++',
    'java': 'Java',
    'cs': 'C#', 'c#': 'C#', 'csharp': 'C#',
    'go': 'Go',
    'rb': 'Ruby', 'ruby': 'Ruby',
}


def read_file(path: Path) -> str:
    return path.read_text(encoding='utf-8')


def write_file(path: Path, text: str):
    path.write_text(text, encoding='utf-8')


def parse_front_matter(text: str):
    if not text.lstrip().startswith('---'):
        return None, text
    parts = text.lstrip().split('\n')
    # find second '---'
    try:
        sep_idx = [i for i,l in enumerate(parts) if l.strip()=='---'][1]
    except Exception:
        return None, text
    fm_lines = parts[1:sep_idx]
    body = '\n'.join(parts[sep_idx+1:])
    fm = yaml.safe_load('\n'.join(fm_lines)) or {}
    return fm, body


def dump_front_matter(fm: dict) -> str:
    return '---\n' + yaml.safe_dump(fm, sort_keys=False) + '---\n\n'


def detect_code_language(text: str):
    # look for ```lang or ``` lang
    m = re.search(r'```\s*([a-zA-Z0-9#++-]+)', text)
    if not m:
        return None
    lang = m.group(1).lower()
    return LANG_MAP.get(lang, lang.title())


def title_from_filename(name: str) -> str:
    name = Path(name).stem
    name = re.sub(r'^[0-9]+[-_]?','', name)
    name = re.sub(r'[-_]+', ' ', name)
    return name.title()


def extract_id_from_filename(name: str):
    m = re.search(r'([0-9]+)', name)
    return int(m.group(1)) if m else None


def normalize_file(path: Path, dry_run=False):
    text = read_file(path)
    fm, body = parse_front_matter(text)
    changed = False
    if fm is None:
        fm = {}
    # title
    if 'title' not in fm or not fm.get('title'):
        fm['title'] = title_from_filename(path.name)
        changed = True

    # leetcode id
    file_id = extract_id_from_filename(path.name)
    if file_id is not None:
        if fm.get('leetcode_id') != file_id:
            fm['leetcode_id'] = file_id
            changed = True

    # language detect from code blocks
    detected = detect_code_language(body)
    if detected:
        # If they never solved JS, replace JS entries
        if fm.get('language') != detected:
            # if fm had JavaScript but detection says otherwise OR fm missing
            if fm.get('language') in (None, '', 'JavaScript') or True:
                fm['language'] = detected
                changed = True

    # write back
    if changed and not dry_run:
        out = dump_front_matter(fm) + body.lstrip()
        write_file(path, out)
    return changed, fm


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dest', required=True, help='Destination folder with .md files')
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()

    dest = Path(args.dest)
    if not dest.exists():
        print(f'Destination {dest} does not exist')
        return

    md_files = list(dest.rglob('*.md'))
    print(f'Found {len(md_files)} markdown files under {dest}')
    total_changed = 0
    for f in md_files:
        changed, fm = normalize_file(f, dry_run=args.dry_run)
        if changed:
            total_changed += 1
            print(f'Updated: {f} -> {fm.get("language")} id={fm.get("leetcode_id")}')

    print(f'Total files updated: {total_changed}')


if __name__ == '__main__':
    main()
