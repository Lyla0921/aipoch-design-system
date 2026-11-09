#!/usr/bin/env python3
"""Package the complete local illustration skill for the site's download link."""
from pathlib import Path
import zipfile

root = Path(__file__).resolve().parent.parent
skill = root / "skills/aipoch-illustration"
target = root / "dist/skills/aipoch-illustration.zip"
target.parent.mkdir(parents=True, exist_ok=True)
files = sorted(path for path in skill.rglob("*") if path.is_file()
               and not any(part.startswith(".") or part == "__pycache__"
                           for part in path.relative_to(skill).parts))
if not (skill / "SKILL.md").is_file():
    raise SystemExit("Missing illustration SKILL.md")
with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as bundle:
    for path in files:
        bundle.write(path, Path(skill.name) / path.relative_to(skill))
print(f"Packaged {len(files)} skill files: {target}")
