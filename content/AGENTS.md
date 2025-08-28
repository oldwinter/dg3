---
{"publish":true,"permalink":"/AGENTS.md","created":"2025-08-22T12:26:11.781+08:00","modified":"2025-08-28T20:03:53.023+08:00","cssclasses":""}
---


# Repository Guidelines

This repository is an Obsidian-based digital garden. Notes are Markdown with YAML frontmatter, organized using Zettelkasten/PARA. Publishing is controlled by the `publish: true` flag and automated by a Python script.

## Project Structure & Module Organization
- Notes: `🍀 花园导览/`, `📥 Inbox/`, `Atlas/`, `Cards/`, `Calendar/`, `Extras/`, `Sources/`, `Spaces/`.
- Script: `publish_by_frontmatter.py` at the repo root.
- Metadata: YAML frontmatter per note; backlinks via `[[...]]`; tags via `#标签`.

## Build, Test, and Development Commands
- Run publish: `python publish_by_frontmatter.py` — selects notes with `publish: true`, copies to the publish repo, and performs Git actions.
- Configure inside the script: `VAULT_PATH`, `SHOWCASE_PATH`, `FORCE_INCLUDE_DIRS`.
- Link check: in Obsidian, use “检查失效链接” to validate backlinks before publishing.

## Coding Style & Naming Conventions
- Markdown: Chinese prose; English for technical terms. Headings `#` → `####`. Use `[[双链]]`, `#标签`, atomic notes, and MOCs. Emoji prefixes are allowed (e.g., `🧰`, `📂`). Frontmatter fields include `publish`, `title`, `date created`, `date modified`, `tags`.
- Python: Follow PEP 8, 4-space indent, descriptive names. Keep configuration constants together and avoid hard-coding secrets.

## Testing Guidelines
- Publishing: (1) ensure `publish: true` is set, (2) run the script, (3) confirm sensitive files are excluded, (4) verify Git actions succeed and only intended files appear in the publish repo.
- Links: use Obsidian’s “检查失效链接”; spot-check external URLs in edited notes.

## Commit & Pull Request Guidelines
- Commits: imperative mood and focused scope. Examples: `Cards: add MOC for AI notes`, `script: filter sensitive files`.
- PRs: clear description, linked issues, before/after screenshots for MOCs/Canvas, and notes on any script or config changes.

## Security & Configuration Tips
- Keep personal data and keys out of notes; `.gitignore` should exclude sensitive artifacts.
- The publish script filters sensitive files, but always review changes before pushing.

