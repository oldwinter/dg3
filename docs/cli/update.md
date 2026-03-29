---
title: quartz update
---

The `update` command updates your installed plugins to their latest versions. It is a convenient shortcut for `npx quartz plugin update`.

## Usage

Update all installed plugins:

```shell
npx quartz update
```

Update specific plugins by name:

```shell
npx quartz update my-plugin another-plugin
```

## How it Works

For each plugin, `update` fetches the latest commit from the plugin's remote repository and rebuilds it. If a plugin was installed from a specific branch (e.g., `github:user/repo#my-branch`), updates will track that branch instead of the default branch. Local plugins (added from a file path) are rebuilt without any git operations. The lockfile (`quartz.lock.json`) is updated with the new commit hashes.

This is functionally identical to running:

```shell
npx quartz plugin update
```

## Flags

The `update` command supports the standard [[cli/index|common flags]] (`--directory`, `--verbose`).

## See Also

- [[cli/upgrade|quartz upgrade]] — upgrade the Quartz framework itself
- [[cli/plugin|quartz plugin]] — full plugin management (install, remove, enable, disable, etc.)
