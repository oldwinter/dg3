---
title: AliasRedirects
tags:
  - plugin/emitter
image: https://images.unsplash.com/photo-1601735479770-bb5de9dbe844
---

This plugin emits HTML redirect pages for aliases and permalinks defined in the frontmatter of content files.

For example, A `foo.md` has the following frontmatter

```md title="foo.md"
---
title: "Foo"
alias:
  - "bar"
---
```

The target `host.me/bar` will be redirected to `host.me/foo`

Note that these are permanent redirect.

The emitter supports the following aliases:

- `aliases`
- `alias`

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## API

- Category: Emitter
- Function name: `ExternalPlugin.AliasRedirects()`.
- Source: [`quartz-community/alias-redirects`](https://github.com/quartz-community/alias-redirects)
- Install: `npx quartz plugin add github:quartz-community/alias-redirects`
