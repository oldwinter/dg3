---
title: quartz plugin
---

The `plugin` command is the heart of the Quartz v5 plugin management system. it allows you to install, configure, and update plugins directly from the command line.

All plugins are stored in the `.quartz/plugins/` directory, and their versions are tracked in `quartz.lock.json`.

## Subcommands

### list

List all currently installed plugins and their versions.

```shell
npx quartz plugin list
```

### add

Add a new plugin from a Git repository.

```shell
npx quartz plugin add github:username/repo
```

To install from a specific branch or ref, append `#ref` to the source:

```shell
npx quartz plugin add github:username/repo#my-branch
npx quartz plugin add git+https://github.com/username/repo.git#my-branch
npx quartz plugin add https://github.com/username/repo.git#my-branch
```

You can also add a plugin from a local directory. This is useful for local development or airgapped environments:

```shell
npx quartz plugin add ./path/to/my-plugin
npx quartz plugin add ../sibling-plugin
npx quartz plugin add /absolute/path/to/plugin
```

Local plugins are symlinked into `.quartz/plugins/`, so any changes you make to the source directory are reflected immediately without re-installing.

When a branch is specified, it is stored in the lockfile. All subsequent commands (`install`, `update`, `restore`, `check`, `resolve`) will respect that branch automatically.

### remove

Remove an installed plugin.

```shell
npx quartz plugin remove plugin-name
```

### install

Install all plugins listed in your `quartz.lock.json` file. This is useful when setting up the project on a new machine.

```shell
npx quartz plugin install
```

### update

Update specific plugins or all plugins to their latest versions.

```shell
npx quartz plugin update plugin-name
npx quartz plugin update # updates all
```

### restore

Restore plugins to the exact versions specified in the lockfile. Unlike `install`, this will downgrade plugins if the lockfile specifies an older version. This is recommended for CI/CD environments.

```shell
npx quartz plugin restore
```

### enable / disable

Toggle a plugin's status in your `quartz.config.yaml` without removing its files.

```shell
npx quartz plugin enable plugin-name
npx quartz plugin disable plugin-name
```

### config

View or modify the configuration for a specific plugin.

```shell
# View config
npx quartz plugin config plugin-name

# Set a value
npx quartz plugin config plugin-name --set key=value
```

### check

Check if any of your installed plugins have updates available.

```shell
npx quartz plugin check
```

### prune

Remove installed plugins that are no longer referenced in your `quartz.config.yaml`. This is useful for cleaning up after removing plugin entries from your configuration.

> [!note]
> The `resolve` command also removes orphaned plugins as part of its synchronization. Use `prune` when you only want to clean up without installing anything new.

```shell
npx quartz plugin prune
```

Use `--dry-run` to preview which plugins would be removed without making changes:

```shell
npx quartz plugin prune --dry-run
```

### resolve

Synchronize your installed plugins with your `quartz.config.yaml`. This installs plugins that are in your config but missing from the lockfile, and removes plugins that are in the lockfile but no longer referenced in your config.

```shell
npx quartz plugin resolve
```

Use `--dry-run` to preview which plugins would be installed without making changes:

```shell
npx quartz plugin resolve --dry-run
```

## Common Workflows

### Adding and Enabling a Plugin

To add a new plugin and start using it:

1. Add the plugin: `npx quartz plugin add github:quartz-community/example`
2. Enable it: `npx quartz plugin enable example`

### Updating Everything

To keep your plugins fresh:

```shell
npx quartz plugin update
```

### Managing Configuration

If you want to change a plugin setting without opening the YAML file:

```shell
npx quartz plugin config explorer --set useSavedState=true
```

### Cleaning Up Unused Plugins

If you've removed plugins from your config and want to clean up leftover files:

```shell
npx quartz plugin prune --dry-run  # preview first
npx quartz plugin prune            # remove orphaned plugins
```

### Setting Up from Config

When setting up on a new machine or in CI, resolve ensures your installed plugins match your config — installing missing plugins and removing any that are no longer referenced:

```shell
npx quartz plugin resolve
```

### Testing with Branches

If a plugin author has a fix or feature on a separate branch, you can install it directly without waiting for a release to the default branch:

```shell
# Install from a feature branch
npx quartz plugin add github:username/repo#fix/some-bug

# Later, switch back to the default branch by re-adding without a ref
npx quartz plugin remove repo
npx quartz plugin add github:username/repo
```

The branch ref is tracked in `quartz.lock.json`, so `update` and `check` will continue to follow the specified branch until the plugin is re-added without one.

Both `prune` and `resolve` will fall back to `quartz.config.default.yaml` if no `quartz.config.yaml` is present.

### Local Plugin Development

For local plugin development or airgapped environments, you can add a plugin from a local directory:

```shell
npx quartz plugin add ./my-local-plugin
```

Local plugins are symlinked into `.quartz/plugins/`, so changes reflect immediately. When you run `update`, local plugins are rebuilt (npm install + npm run build) without any git operations. The `check` command will show local plugins with a "local" status instead of checking for remote updates.

To switch a local plugin back to a git source:

```shell
npx quartz plugin remove my-local-plugin
npx quartz plugin add github:username/my-local-plugin
```

### Subdirectory (Monorepo) Plugins

Some plugins live in a subdirectory of a larger repository rather than at the root. For these, you can specify the plugin source as an object in `quartz.config.yaml` with a `subdir` field:

```yaml title="quartz.config.yaml"
plugins:
  - source:
      repo: "https://github.com/username/monorepo.git"
      subdir: plugin
    enabled: true
```

This tells Quartz to clone the full repository but install only the contents of the specified subdirectory.

You can combine `subdir` with `ref` to pin a branch or tag, and `name` to override the plugin directory name:

```yaml title="quartz.config.yaml"
plugins:
  - source:
      repo: "https://github.com/username/monorepo.git"
      subdir: packages/my-plugin
      ref: v2.0
      name: my-plugin
    enabled: true
```

See [[configuration#Advanced Source Options|Advanced Source Options]] for the full reference on object source fields.

> [!note]
> The `plugin add` CLI command works with string sources. To use the object source format with `subdir`, edit `quartz.config.yaml` directly, then run `npx quartz plugin resolve` to install it.

## Interactive Mode

Running the plugin command without any subcommand will launch the [[cli/tui|TUI]], which provides a visual interface for all these operations.

```shell
npx quartz plugin
```
