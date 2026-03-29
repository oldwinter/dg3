---
title: BasesPage
tags:
  - plugin/pageType
  - plugin/component
image:
---

This plugin provides support for [Obsidian Bases](https://obsidian.md/changelog/2025-04-15-desktop-v1.8.0/) (`.base` files) in Quartz. It reads `.base` files from your vault, resolves matching notes based on the query definition, and renders them as interactive database-like views with support for tables, lists, cards, and maps. It uses the `default` [[layout#Page Frames|page frame]] (three-column layout with sidebars).

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Features

- **Table view**: Sortable columns with automatic type rendering (strings, numbers, booleans, arrays, links).
- **List view**: Compact list with metadata chips for each entry.
- **Cards view**: Card layout with optional image property support.
- **Map view**: Placeholder for future map-based visualization.
- **Multiple views**: A single `.base` file can define multiple views, displayed as switchable tabs.
- **Filters**: Recursive filter trees with `and`/`or`/`not` operators.
- **Formulas**: Computed properties via formula expressions.
- **Summaries**: Column-level aggregations (Sum, Average, Min, Max, Median, etc.).
- **Property configuration**: Custom display names for properties.
- **Link rendering**: Wikilinks and Markdown links within cell values are rendered as clickable links.

## Configuration

This plugin accepts the following configuration options:

- `defaultViewType`: The default view type when none is specified in the `.base` file. Defaults to `"table"`.
- `customViews`: A map of custom view renderers. Keys are view type names. These override built-in renderers for the same type, or add new view types. Requires a TS override.

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/bases-page
  enabled: true
```

For custom view renderers, use a TS override in `quartz.ts`:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins"

ExternalPlugin.BasesPage({
  defaultViewType: "table",
  customViews: {
    myView: ({ entries, view, basesData, total, locale }) => {
      // return JSX
    },
  },
})
```

## API

- Category: Page Type, Component
- Function name: `ExternalPlugin.BasesPage()`.
- Source: [`quartz-community/bases-page`](https://github.com/quartz-community/bases-page)
- Install: `npx quartz plugin add github:quartz-community/bases-page`
