---
title: Plugins
image:
---

Quartz's functionality is provided by a collection of first-party community plugins. Each plugin can be enabled, disabled, and configured via `quartz.config.yaml`. See [[configuration#Plugins|Configuration]] for details on how to manage plugins.

> [!info] Internal vs Community Plugins
> Quartz has two kinds of plugins:
>
> - **Community plugins** are standalone repositories under [`quartz-community`](https://github.com/quartz-community). In TS overrides, they use `ExternalPlugin.X()` (imported from `.quartz/plugins`).
> - **Internal plugins** are built into Quartz core (Assets, Static, ComponentResources, NotFoundPage). In TS overrides, they use `Plugin.X()` (imported from `./quartz/plugins`).

## Plugin types

Quartz plugins fall into several categories:

- **Transformers** process content during the build, e.g. parsing frontmatter, highlighting syntax, or resolving links.
- **Filters** decide which content files to include or exclude from the output.
- **Page Types** generate HTML pages — one per content file, folder, tag, canvas, or bases view.
- **Components** render UI elements in the page layout (sidebars, headers, footers, etc.).

## First-party plugins

### Transformers

| Plugin                           | Repository                                                                                                      | Enabled | Required | Description                                                |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- | :-----: | :------: | ---------------------------------------------------------- |
| [[Frontmatter\|Note Properties]] | [`quartz-community/note-properties`](https://github.com/quartz-community/note-properties)                       |   ✅    |    ✅    | Parses frontmatter and displays note properties.           |
| [[CreatedModifiedDate]]          | [`quartz-community/created-modified-date`](https://github.com/quartz-community/created-modified-date)           |   ✅    |    ❌    | Determines creation and modification dates.                |
| [[SyntaxHighlighting]]           | [`quartz-community/syntax-highlighting`](https://github.com/quartz-community/syntax-highlighting)               |   ✅    |    ❌    | Syntax highlighting for code blocks.                       |
| [[ObsidianFlavoredMarkdown]]     | [`quartz-community/obsidian-flavored-markdown`](https://github.com/quartz-community/obsidian-flavored-markdown) |   ✅    |    ❌    | Obsidian-specific Markdown extensions.                     |
| [[GitHubFlavoredMarkdown]]       | [`quartz-community/github-flavored-markdown`](https://github.com/quartz-community/github-flavored-markdown)     |   ✅    |    ❌    | GitHub Flavored Markdown support.                          |
| [[TableOfContents]]              | [`quartz-community/table-of-contents`](https://github.com/quartz-community/table-of-contents)                   |   ✅    |    ❌    | Generates table of contents data from headings.¹           |
| [[CrawlLinks]]                   | [`quartz-community/crawl-links`](https://github.com/quartz-community/crawl-links)                               |   ✅    |    ⚠️    | Parses and resolves links. Removing it is not recommended. |
| [[Description]]                  | [`quartz-community/description`](https://github.com/quartz-community/description)                               |   ✅    |    ❌    | Generates page descriptions for metadata.                  |
| [[Latex]]                        | [`quartz-community/latex`](https://github.com/quartz-community/latex)                                           |   ✅    |    ❌    | Renders LaTeX math expressions.                            |
| [[Citations]]                    | [`quartz-community/citations`](https://github.com/quartz-community/citations)                                   |   ❌    |    ❌    | Academic citation support via BibTeX.                      |
| [[HardLineBreaks]]               | [`quartz-community/hard-line-breaks`](https://github.com/quartz-community/hard-line-breaks)                     |   ❌    |    ❌    | Treats single newlines as hard line breaks.                |
| [[OxHugoFlavoredMarkdown]]       | [`quartz-community/ox-hugo`](https://github.com/quartz-community/ox-hugo)                                       |   ❌    |    ❌    | ox-hugo Markdown compatibility.                            |
| [[RoamFlavoredMarkdown]]         | [`quartz-community/roam`](https://github.com/quartz-community/roam)                                             |   ❌    |    ❌    | Roam Research Markdown compatibility.                      |

### Filters

| Plugin              | Repository                                                                                  | Enabled | Required | Description                             |
| ------------------- | ------------------------------------------------------------------------------------------- | :-----: | :------: | --------------------------------------- |
| [[RemoveDrafts]]    | [`quartz-community/remove-draft`](https://github.com/quartz-community/remove-draft)         |   ✅    |    ❌    | Filters out pages marked as drafts.     |
| [[ExplicitPublish]] | [`quartz-community/explicit-publish`](https://github.com/quartz-community/explicit-publish) |   ❌    |    ❌    | Only publishes pages explicitly marked. |

### Page Types

| Plugin          | Repository                                                                          | Enabled | Required | Description                                     |
| --------------- | ----------------------------------------------------------------------------------- | :-----: | :------: | ----------------------------------------------- |
| [[ContentPage]] | [`quartz-community/content-page`](https://github.com/quartz-community/content-page) |   ✅    |    ❌    | Generates HTML pages for Markdown content.      |
| [[FolderPage]]  | [`quartz-community/folder-page`](https://github.com/quartz-community/folder-page)   |   ✅    |    ❌    | Generates folder listing pages.                 |
| [[TagPage]]     | [`quartz-community/tag-page`](https://github.com/quartz-community/tag-page)         |   ✅    |    ❌    | Generates tag listing pages.                    |
| [[CanvasPage]]  | [`quartz-community/canvas-page`](https://github.com/quartz-community/canvas-page)   |   ✅    |    ❌    | Renders JSON Canvas files as interactive pages. |
| [[BasesPage]]   | [`quartz-community/bases-page`](https://github.com/quartz-community/bases-page)     |   ✅    |    ❌    | Renders Obsidian Bases files as database views. |

### Emitters

| Plugin                       | Repository                                                                                | Enabled | Required | Description                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------- | :-----: | :------: | ----------------------------------------------- |
| [[AliasRedirects]]           | [`quartz-community/alias-redirects`](https://github.com/quartz-community/alias-redirects) |   ✅    |    ❌    | Generates redirect pages for aliases.           |
| [[ContentIndex]]             | [`quartz-community/content-index`](https://github.com/quartz-community/content-index)     |   ✅    |    ❌    | Generates sitemap, RSS feed, and content index. |
| [[Favicon]]                  | [`quartz-community/favicon`](https://github.com/quartz-community/favicon)                 |   ✅    |    ❌    | Emits the site favicon.                         |
| [[CustomOgImages\|OG Image]] | [`quartz-community/og-image`](https://github.com/quartz-community/og-image)               |   ✅    |    ❌    | Generates Open Graph social preview images.     |
| [[CNAME]]                    | [`quartz-community/cname`](https://github.com/quartz-community/cname)                     |   ✅    |    ❌    | Emits a CNAME file for custom domains.          |

### Components

| Plugin                         | Repository                                                                                    | Enabled | Required | Description                                  |
| ------------------------------ | --------------------------------------------------------------------------------------------- | :-----: | :------: | -------------------------------------------- |
| [[ArticleTitle]]               | [`quartz-community/article-title`](https://github.com/quartz-community/article-title)         |   ✅    |    ❌    | Renders the article title as an h1 heading.  |
| [[ContentMeta]]                | [`quartz-community/content-meta`](https://github.com/quartz-community/content-meta)           |   ✅    |    ❌    | Displays creation date and reading time.     |
| [[TagList]]                    | [`quartz-community/tag-list`](https://github.com/quartz-community/tag-list)                   |   ❌    |    ❌    | Renders tags as clickable links.             |
| [[PageTitle]]                  | [`quartz-community/page-title`](https://github.com/quartz-community/page-title)               |   ✅    |    ❌    | Renders the site title as a home link.       |
| [[darkmode\|Darkmode]]         | [`quartz-community/darkmode`](https://github.com/quartz-community/darkmode)                   |   ✅    |    ❌    | Toggle between light and dark themes.        |
| [[reader mode\|Reader Mode]]   | [`quartz-community/reader-mode`](https://github.com/quartz-community/reader-mode)             |   ✅    |    ❌    | Distraction-free reading mode toggle.        |
| [[explorer\|Explorer]]         | [`quartz-community/explorer`](https://github.com/quartz-community/explorer)                   |   ✅    |    ❌    | File tree explorer sidebar.                  |
| [[graph view\|Graph View]]     | [`quartz-community/graph`](https://github.com/quartz-community/graph)                         |   ✅    |    ❌    | Interactive link graph visualization.        |
| [[full-text search\|Search]]   | [`quartz-community/search`](https://github.com/quartz-community/search)                       |   ✅    |    ❌    | Full-text search functionality.              |
| [[backlinks\|Backlinks]]       | [`quartz-community/backlinks`](https://github.com/quartz-community/backlinks)                 |   ✅    |    ❌    | Shows pages that link to the current page.   |
| [[breadcrumbs\|Breadcrumbs]]   | [`quartz-community/breadcrumbs`](https://github.com/quartz-community/breadcrumbs)             |   ✅    |    ❌    | Breadcrumb navigation trail.                 |
| [[comments\|Comments]]         | [`quartz-community/comments`](https://github.com/quartz-community/comments)                   |   ❌    |    ❌    | Comment system integration (Giscus, etc.).   |
| [[Footer]]                     | [`quartz-community/footer`](https://github.com/quartz-community/footer)                       |   ✅    |    ❌    | Page footer with configurable links.         |
| [[recent notes\|Recent Notes]] | [`quartz-community/recent-notes`](https://github.com/quartz-community/recent-notes)           |   ❌    |    ❌    | Displays a list of recently modified notes.  |
| [[Spacer]]                     | [`quartz-community/spacer`](https://github.com/quartz-community/spacer)                       |   ✅    |    ❌    | Flexible spacer for layout groups.           |
| [[TableOfContents]]¹           | [`quartz-community/table-of-contents`](https://github.com/quartz-community/table-of-contents) |   ✅    |    ❌    | Renders the table of contents in the layout. |
| [[EncryptedPages]]             | [`quartz-community/encrypted-pages`](https://github.com/quartz-community/encrypted-pages)     |   ✅    |    ❌    | Password-protected encrypted pages.          |
| [[StackedPages]]               | [`quartz-community/stacked-pages`](https://github.com/quartz-community/stacked-pages)         |   ✅    |    ❌    | Andy Matuschak-style stacked sliding panes.  |

> ¹ TableOfContents is a dual-category plugin (transformer + component). It appears in both the Transformers and Components tables.
