---
title: ReaderMode
tags:
  - plugin/component
image:
---

Distraction-free reading mode.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

See [[reader mode]] for detailed usage information.

## Configuration

This plugin accepts the following configuration options:

- `enabled`: Whether to enable reader mode. Defaults to `true`.

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/reader-mode
  enabled: true
```

## API

- Category: Component
- Function name: `ExternalPlugin.ReaderMode()`.
- Source: [`quartz-community/reader-mode`](https://github.com/quartz-community/reader-mode)
- Install: `npx quartz plugin add github:quartz-community/reader-mode`
