---
title: Explorer
tags:
  - plugin/component
image:
---

File tree explorer sidebar.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

See [[explorer]] for detailed usage information.

## Configuration

This plugin accepts the following configuration options:

- `title`: The title of the explorer. Defaults to `Explorer`.
- `folderClickBehavior`: The behavior when a folder is clicked. Can be `"link"` to navigate or `"collapse"` to toggle. Defaults to `collapse`.
- `folderDefaultState`: The default state of folders. Can be `"collapsed"` or `"open"`. Defaults to `collapsed`.
- `useSavedState`: Whether to use local storage to save the state of the explorer. Defaults to `true`.

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/explorer
  enabled: true
  options:
    title: Explorer
    folderClickBehavior: collapse
    folderDefaultState: collapsed
    useSavedState: true
```

## API

- Category: Component
- Function name: `ExternalPlugin.Explorer()`.
- Source: [`quartz-community/explorer`](https://github.com/quartz-community/explorer)
- Install: `npx quartz plugin add github:quartz-community/explorer`
