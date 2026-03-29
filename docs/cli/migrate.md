---
title: quartz migrate
---

The `migrate` command helps you transition your project from Quartz 4 to Quartz v5 by converting your configuration files.

## When to Use

Use this command if you have an existing Quartz 4 project and want to upgrade to the new YAML-based configuration system introduced in v5.

## What it Does

When you run `npx quartz migrate`, the CLI performs several automated steps:

1. **Read Configuration**: It parses your existing `quartz.config.ts` and `quartz.layout.ts` files.
2. **Map Plugins**: It identifies the plugins you are using and maps them to their v5 equivalents.
3. **Generate YAML**: It creates a new `quartz.config.yaml` file that contains all your settings, theme colors, and plugin configurations.
4. **Backup**: It keeps your old `.ts` files so you can refer back to them if needed.

```shell
npx quartz migrate
```

## Verification

After running the migration, you should check the following:

- **Theme Colors**: Ensure your custom colors were correctly transferred to the `theme` section of `quartz.config.yaml`.
- **Plugin Options**: Verify that any custom options you passed to plugins (like `linkClickBehavior`) are present in the new config.
- **Layout**: Check that your component order in the `layout` section matches your previous setup.

For a comprehensive guide on the entire migration process, including manual steps, see [[getting-started/migrating]].
