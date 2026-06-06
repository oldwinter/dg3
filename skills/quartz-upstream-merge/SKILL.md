---
name: quartz-upstream-merge
description: Sync this repository's Quartz v5 fork with upstream jackyzha0/quartz. Use when asked to git pull latest, merge upstream v5, resolve Quartz/plugin/content conflicts, verify the build/tests, push v5, or check the deployed garden site after an upstream merge.
---

# Quartz Upstream Merge

## Overview

Use this workflow to update `oldwinter/dg3` from `jackyzha0/quartz` `v5` while preserving this fork's content, Netlify deploy setup, community plugins, and local theme decisions.

## Workflow

1. Confirm the working tree and remotes:
   ```powershell
   git status --short --branch
   git remote -v
   git branch --show-current
   ```
   Work from `v5`. If local `v5` is behind `origin/v5`, fast-forward it first.

2. Fetch remotes separately:
   ```powershell
   git fetch origin --prune
   git fetch upstream --prune
   git merge --ff-only origin/v5
   git merge upstream/v5
   ```
   Do not use `git fetch origin upstream`; Git treats `upstream` as a ref on `origin`.

3. Resolve conflicts with repo intent:
   - `quartz.lock.json`: prefer the newer plugin lock entries that match the current `quartz.config.yaml`; remove stale plugin locks not referenced by config.
   - `quartz.config.yaml`: preserve fork-specific site configuration, `baseUrl: garden.oldwinter.top`, and the disabled `quartz-themes` entry unless the user asks to re-enable it.
   - `netlify.toml`: preserve the build command that restores plugins and renames `content/AboutTheGarden.md` to `content/index.md` during deploy.
   - `content/**`: prefer user content unless the build failure identifies a concrete invalid Markdown or slug issue.

4. After conflict resolution, verify the lockfile and plugin restore:
   ```powershell
   node -e "JSON.parse(require('fs').readFileSync('quartz.lock.json','utf8')); console.log('quartz.lock.json OK')"
   npx quartz plugin restore
   ```
   `plugin restore` may warn that it is deprecated; `plugin install --clean` is the newer equivalent. Existing plugin directories may be skipped locally.

5. Run verification before committing:
   ```powershell
   npx quartz build
   npx tsc --noEmit
   npm test
   ```
   Known non-blocking warnings include `note-properties` direct `eval`, circular transclusions, invalid content dates, and the LXGW WenKai Google font `Bad Request`.

6. If Windows build fails with `ENOENT` under `public\tags\...`, inspect the generated tag slug. Markdown headings written as an h2 immediately followed by bold text, such as `##**Reference Heading**`, can be parsed into a tag-like value containing `*`; normalize them to a plain h2 with a space after the hashes, such as `## Reference Heading`, and rebuild.

7. Commit and push:
   ```powershell
   git status --short --branch
   git commit
   git push origin v5
   ```
   Use a merge commit for the upstream merge. If follow-up docs or skills are added, prefer a separate commit.

8. Check deployment after push:
   - Correct domain: `https://garden.oldwinter.top`
   - Common typo to flag: `garden.oldwiter.top` is missing `n` and fails SSL.
   - The site deploys from Netlify headers, even if the user says Vercel.
   - Check a representative page with `Invoke-WebRequest`; inspect the `index-*.css` hash and HTTP 200. Use browser/headless screenshot for visual checks when UI or theme behavior changed.

## Current Repo Notes

- `quartz-themes` is kept in config but disabled to preserve the default Quartz theme and canvas page styling.
- `.quartz/` is ignored and should not be committed.
- `public/` is ignored build output and should not be committed.
- Build locally with `npx quartz build`; Netlify's deploy command does extra content renaming for the homepage.
