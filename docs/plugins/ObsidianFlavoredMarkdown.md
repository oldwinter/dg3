---
title: ObsidianFlavoredMarkdown
tags:
  - plugin/transformer
image:
---

This plugin provides support for [[Obsidian compatibility]].

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `comments`: If `true` (default), enables parsing of `%%` style Obsidian comment blocks.
- `highlight`: If `true` (default), enables parsing of `==` style highlights within content.
- `wikilinks`:If `true` (default), turns [[wikilinks]] into regular links.
- `callouts`: If `true` (default), adds support for [[callouts|callout]] blocks for emphasizing content.
- `mermaid`: If `true` (default), enables [[Mermaid diagrams|Mermaid diagram]] rendering within Markdown files.
- `parseTags`: If `true` (default), parses and links tags within the content.
- `parseBlockReferences`: If `true` (default), handles block references, linking to specific content blocks.
- `enableInHtmlEmbed`: If `true`, allows embedding of content directly within HTML. Defaults to `false`.
- `enableYouTubeEmbed`: If `true` (default), enables the embedding of YouTube videos and playlists using external image Markdown syntax.
- `enableTweetEmbed`: If `true` (default), enables the embedding of tweets as static blockquotes from Twitter/X URLs.
- `enableVideoEmbed`: If `true` (default), enables the embedding of video files.
- `enableCheckbox`: If `true`, adds support for interactive checkboxes in content, including custom task characters (e.g. `- [?]`, `- [!]`, `- [/]`). Defaults to `false`.
- `enableObsidianUri`: If `true` (default), marks `obsidian://` protocol links with a CSS class and data attribute for custom styling.
- `disableBrokenWikilinks`: If `true`, replaces links to non-existent notes with a dimmed, disabled link. Defaults to `false`.

> [!warning]
> Don't remove this plugin if you're using [[Obsidian compatibility|Obsidian]] to author the content!

## API

- Category: Transformer
- Function name: `ExternalPlugin.ObsidianFlavoredMarkdown()`.
- Source: [`quartz-community/obsidian-flavored-markdown`](https://github.com/quartz-community/obsidian-flavored-markdown)
- Install: `npx quartz plugin add github:quartz-community/obsidian-flavored-markdown`
