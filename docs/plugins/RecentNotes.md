---
title: RecentNotes
tags:
  - plugin/component
image:
---

Shows recently modified notes.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

See [[recent notes]] for detailed usage information.

## Configuration

This plugin accepts the following configuration options:

- `title`: The title of the recent notes section. Defaults to `Recent notes`.
- `limit`: The maximum number of recent notes to display. Defaults to `5`.
- `showTags`: Whether to display the tags for each note. Defaults to `true`.
- `linkToMore`: A slug to a page that shows more notes. Defaults to `""`.

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/recent-notes
  enabled: true
  options:
    title: Recent notes
    limit: 5
    showTags: true
    linkToMore: ""
```

## API

- Category: Component
- Function name: `ExternalPlugin.RecentNotes()`.
- Source: [`quartz-community/recent-notes`](https://github.com/quartz-community/recent-notes)
- Install: `npx quartz plugin add github:quartz-community/recent-notes`
