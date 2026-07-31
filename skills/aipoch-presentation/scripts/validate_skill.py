#!/usr/bin/env python3

import json
import re
import sys
from pathlib import Path

skill_dir = Path(__file__).resolve().parent.parent
errors = []

required = [
    "SKILL.md",
    "agents/openai.yaml",
    "references/brand-foundations.md",
    "references/presentation-system.md",
    "references/content-rules.md",
    "references/motion-and-delivery.md",
    "references/tokens.json",
    "assets/aipoch-mark.svg",
    "assets/aipoch-logo-primary.svg",
    "assets/aipoch-logo-inverse.svg",
    "assets/starter/index.html",
    "assets/starter/styles.css",
    "assets/starter/deck.js",
    "assets/starter/media/aipoch-logo-primary.svg",
    "assets/starter/media/aipoch-background-01.png",
    "assets/starter/media/image-concentric-pattern.png",
    "scripts/validate_deck.mjs",
    "scripts/render_deck.mjs",
]

for relative in required:
    if not (skill_dir / relative).is_file():
        errors.append(f"Missing required file: {relative}")

skill_md = (skill_dir / "SKILL.md").read_text(encoding="utf-8")
frontmatter = re.match(r"^---\n(.*?)\n---", skill_md, re.DOTALL)
if not frontmatter:
    errors.append("SKILL.md is missing YAML frontmatter.")
else:
    metadata = frontmatter.group(1)
    if not re.search(r"^name:\s+aipoch-presentation$", metadata, re.MULTILINE):
        errors.append("SKILL.md name must be aipoch-presentation.")
    if not re.search(r"^description:\s+\S", metadata, re.MULTILINE):
        errors.append("SKILL.md description is missing.")

if "TODO" in skill_md:
    errors.append("SKILL.md still contains TODO markers.")

try:
    tokens = json.loads(
        (skill_dir / "references/tokens.json").read_text(encoding="utf-8")
    )
    if tokens.get("presentation", {}).get("width") != 1920:
        errors.append("Presentation width token must be 1920.")
    if tokens.get("presentation", {}).get("height") != 1080:
        errors.append("Presentation height token must be 1080.")
    if tokens.get("color", {}).get("highlight") != "#F1DD67":
        errors.append("Highlight token must match the Design System.")
except (OSError, json.JSONDecodeError) as error:
    errors.append(f"Invalid tokens.json: {error}")

openai_yaml = (skill_dir / "agents/openai.yaml").read_text(encoding="utf-8")
if "$aipoch-presentation" not in openai_yaml:
    errors.append("agents/openai.yaml default prompt must mention $aipoch-presentation.")
for asset in ("./assets/aipoch-mark.svg", "./assets/aipoch-logo-primary.svg"):
    if asset not in openai_yaml:
        errors.append(f"agents/openai.yaml is missing icon reference: {asset}")

if errors:
    print(json.dumps({"valid": False, "errors": errors}, ensure_ascii=False, indent=2))
    sys.exit(1)

print(json.dumps({"valid": True, "skill": str(skill_dir)}, ensure_ascii=False, indent=2))
