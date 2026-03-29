---
title: ExplicitPublish
tags:
  - plugin/filter
image:
---

This plugin filters content based on an explicit `publish` flag in the frontmatter, allowing only content that is explicitly marked for publication to pass through. It's the opt-in version of [[RemoveDrafts]]. See [[private pages]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## API

- Category: Filter
- Function name: `ExternalPlugin.ExplicitPublish()`.
- Source: [`quartz-community/explicit-publish`](https://github.com/quartz-community/explicit-publish)
- Install: `npx quartz plugin add github:quartz-community/explicit-publish`
