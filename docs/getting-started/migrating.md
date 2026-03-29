---
title: "Migrating to Quartz 5"
aliases:
  - "migrating from Quartz 3"
  - "migrating from Quartz 4"
---

This guide covers migrating to Quartz 5 from previous versions. If you're already on Quartz 5 and want to update to the latest version, see [[getting-started/upgrading|Upgrading Quartz]] instead.

## Migrating from Quartz 4

### Overview

Quartz 5 introduces a community plugin system that fundamentally changes how plugins and components are managed. Most plugins that were built into Quartz 4 are now standalone community plugins maintained under the [quartz-community](https://github.com/quartz-community) organization. This guide walks through the changes needed to migrate your configuration.

### What Changed

- **Plugin system**: Plugins are now standalone Git repositories, installed via `npx quartz plugin add`
- **Import pattern**: Community plugins use `ExternalPlugin.X()` (from `.quartz/plugins`) instead of `Plugin.X()` (from `./quartz/plugins`)
- **Layout structure**: `quartz.layout.ts` is gone — layout position is now a per-plugin property in `quartz.config.yaml`, with `layout.groups` for flex containers (e.g. toolbar) and `layout.byPageType` for per-page-type overrides
- **Page Types**: A new plugin category for page rendering (content, folder, tag pages)
- **Component references**: In layout files, community components use `Plugin.X()` (from `.quartz/plugins`) instead of `Component.X()` (from `./quartz/components`)

### Step-by-Step Migration

#### 1. Set Up Quartz 5 with a Template

The easiest way to migrate is to use `npx quartz create`, which generates a complete `quartz.config.yaml` from a template with all default plugins pre-configured:

```shell
npx quartz create --template default --strategy copy --source /path/to/your/content
```

Available templates: `default`, `obsidian`, `ttrpg`, `blog`. Pick the one closest to your setup — `obsidian` is recommended if you use an Obsidian vault.

> [!tip] Choosing a template
> Each template comes with all 30+ default plugins pre-configured. The main differences are content strategy (OFM support, link resolution) and optional plugins (comments, maps). You can customize everything in `quartz.config.yaml` afterward.

After running `create`, install all the plugins referenced in the generated config:

```shell
npx quartz plugin resolve
```

This reads your `quartz.config.yaml` and installs every plugin listed in it. No need to run 30 individual `npx quartz plugin add` commands.

> [!note] Custom or optional plugins
> If you used optional plugins in v4 (comments, reader-mode, breadcrumbs, recent-notes, citations, etc.), add them after the initial setup:
>
> ```shell
> npx quartz plugin add github:quartz-community/comments
> npx quartz plugin add github:quartz-community/reader-mode
> npx quartz plugin add github:quartz-community/breadcrumbs
> npx quartz plugin add github:quartz-community/recent-notes
> ```
>
> See [[plugins/index|Plugins]] for the full list of available community plugins.

> [!info] Alternative: Use `npx quartz migrate`
> If you have an existing `quartz.config.ts` and `quartz.layout.ts` from v4, you can run `npx quartz migrate` instead. This reads your old config files and generates `quartz.config.yaml` with your existing settings. You'll still need to run `npx quartz plugin resolve` afterward to install the plugins. See [[cli/migrate|quartz migrate]] for details.

#### 2. Update quartz.config.yaml

**Before (v4):**

```ts title="quartz.config.ts"
import * as Plugin from "./quartz/plugins"

plugins: {
  transformers: [
    Plugin.FrontMatter(),
    Plugin.CreatedModifiedDate({ priority: ["frontmatter", "git", "filesystem"] }),
    Plugin.Latex({ renderEngine: "katex" }),
  ],
  filters: [Plugin.RemoveDrafts()],
  emitters: [
    Plugin.AliasRedirects(),
    Plugin.ComponentResources(),
    Plugin.ContentPage(),
    Plugin.FolderPage(),
    Plugin.TagPage(),
    Plugin.ContentIndex({ enableSiteMap: true, enableRSS: true }),
    Plugin.Assets(),
    Plugin.Static(),
    Plugin.NotFoundPage(),
  ],
}
```

**After (v5):**

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/note-properties
    enabled: true
    options:
      delimiters: "---"
      language: yaml
    order: 5
  - source: github:quartz-community/created-modified-date
    enabled: true
    options:
      priority:
        - frontmatter
        - git
        - filesystem
    order: 10
  - source: github:quartz-community/latex
    enabled: true
    options:
      renderEngine: katex
    order: 80
  - source: github:quartz-community/remove-draft
    enabled: true
  - source: github:quartz-community/alias-redirects
    enabled: true
  - source: github:quartz-community/content-index
    enabled: true
    options:
      enableSiteMap: true
      enableRSS: true
  - source: github:quartz-community/favicon
    enabled: true
  - source: github:quartz-community/og-image
    enabled: true
  - source: github:quartz-community/cname
    enabled: true
  - source: github:quartz-community/content-page
    enabled: true
  - source: github:quartz-community/folder-page
    enabled: true
  - source: github:quartz-community/tag-page
    enabled: true
  # ... more plugins
```

Key changes:

- Plugins are now referenced by their GitHub source (`github:org/repo`)
- Plugin type (transformer, filter, emitter, pageType) is determined by the plugin's manifest, not by which array you place it in
- Execution order is controlled by the `order` field (lower numbers run first)
- Each plugin entry has `enabled`, `options`, `order`, and optionally `layout` fields
- Install community plugins with `npx quartz plugin add github:quartz-community/<name>`

#### 3. Update layout configuration

**Before (v4):**

```ts title="quartz.layout.ts"
import * as Component from "./quartz/components"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({ links: { ... } }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta(), Component.TagList()],
  left: [Component.PageTitle(), Component.Search(), Component.Darkmode(), Component.Explorer()],
  right: [Component.Graph(), Component.TableOfContents(), Component.Backlinks()],
}
```

**After (v5):**

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/breadcrumbs
    enabled: true
    layout:
      position: beforeBody
      priority: 5
  - source: github:quartz-community/article-title
    enabled: true
    layout:
      position: beforeBody
      priority: 10
  - source: github:quartz-community/content-meta
    enabled: true
    layout:
      position: beforeBody
      priority: 20
  - source: github:quartz-community/tag-list
    enabled: true
    layout:
      position: beforeBody
      priority: 30
  - source: github:quartz-community/page-title
    enabled: true
    layout:
      position: left
      priority: 10
  - source: github:quartz-community/search
    enabled: true
    layout:
      position: left
      priority: 20
  - source: github:quartz-community/darkmode
    enabled: true
    layout:
      position: left
      priority: 30
  - source: github:quartz-community/explorer
    enabled: true
    layout:
      position: left
      priority: 50
  - source: github:quartz-community/graph
    enabled: true
    layout:
      position: right
      priority: 10
  - source: github:quartz-community/backlinks
    enabled: true
    layout:
      position: right
      priority: 30
  - source: github:quartz-community/footer
    enabled: true
    options:
      links:
        GitHub: https://github.com/jackyzha0/quartz
        Discord Community: https://discord.gg/cRFFHYye7t

layout:
  byPageType:
    content: {}
    folder:
      exclude:
        - reader-mode
      positions:
        right: []
    tag:
      exclude:
        - reader-mode
      positions:
        right: []
    "404":
      positions:
        beforeBody: []
        left: []
        right: []
```

Key changes:

- Layout position is now a property on each plugin entry (`layout.position`, `layout.priority`)
- `sharedPageComponents` is gone — all layout is plugin-driven
- Per-page-type overrides live in the `layout.byPageType` section
- Empty arrays (`[]`) clear a position for that page type
- The `exclude` field removes specific plugins from a page type

#### 4. Update CI/CD

Add `npx quartz plugin restore` to your build pipeline, before `npx quartz build`. This installs plugins from the lockfile at their pinned versions.

If your CI uses `quartz.config.default.yaml` (or contributors may add plugins to config without updating the lockfile), also run `npx quartz plugin resolve` to install any config-referenced plugins that are missing from the lockfile:

```shell
npx quartz plugin restore  # install pinned plugins from lockfile
npx quartz plugin resolve  # install any config-referenced plugins not yet in lockfile
npx quartz build
```

See [[hosting]] for detailed CI/CD examples and [[ci-cd]] for advanced configuration.

#### 5. Commit and Deploy

```shell
git add quartz.config.yaml quartz.lock.json
git commit -m "chore: migrate to Quartz 5 plugin system"
```

> [!tip] Cleaning up leftover plugins
> After migrating, you may have plugins installed from v4 that are no longer in your v5 config. Run `npx quartz plugin prune` to remove them. Use `--dry-run` first to preview what would be removed.

### Plugin Reference Table

Mapping v4 plugin names to v5 equivalents:

| v4                                  | v5                                          | Type                  |
| ----------------------------------- | ------------------------------------------- | --------------------- |
| `Plugin.FrontMatter()`              | `ExternalPlugin.NoteProperties()`           | Community             |
| `Plugin.CreatedModifiedDate()`      | `ExternalPlugin.CreatedModifiedDate()`      | Community             |
| `Plugin.SyntaxHighlighting()`       | `ExternalPlugin.SyntaxHighlighting()`       | Community             |
| `Plugin.ObsidianFlavoredMarkdown()` | `ExternalPlugin.ObsidianFlavoredMarkdown()` | Community             |
| `Plugin.GitHubFlavoredMarkdown()`   | `ExternalPlugin.GitHubFlavoredMarkdown()`   | Community             |
| `Plugin.CrawlLinks()`               | `ExternalPlugin.CrawlLinks()`               | Community             |
| `Plugin.Description()`              | `ExternalPlugin.Description()`              | Community             |
| `Plugin.Latex()`                    | `ExternalPlugin.Latex()`                    | Community             |
| `Plugin.RemoveDrafts()`             | `ExternalPlugin.RemoveDrafts()`             | Community             |
| `Plugin.ContentPage()`              | `ExternalPlugin.ContentPage()`              | Community (pageTypes) |
| `Plugin.FolderPage()`               | `ExternalPlugin.FolderPage()`               | Community (pageTypes) |
| `Plugin.TagPage()`                  | `ExternalPlugin.TagPage()`                  | Community (pageTypes) |
| `Plugin.NotFoundPage()`             | `Plugin.PageTypes.NotFoundPageType()`       | Internal (pageTypes)  |
| `Plugin.ComponentResources()`       | `Plugin.ComponentResources()` (unchanged)   | Internal              |
| `Plugin.Assets()`                   | `Plugin.Assets()` (unchanged)               | Internal              |
| `Plugin.Static()`                   | `Plugin.Static()` (unchanged)               | Internal              |
| `Plugin.AliasRedirects()`           | `ExternalPlugin.AliasRedirects()`           | Community             |
| `Plugin.ContentIndex()`             | `ExternalPlugin.ContentIndex()`             | Community             |

Component layout mapping:

| v4 Layout                     | v5 Layout                                |
| ----------------------------- | ---------------------------------------- |
| `Component.Explorer()`        | `Plugin.Explorer()`                      |
| `Component.Graph()`           | `Plugin.Graph()`                         |
| `Component.Search()`          | `Plugin.Search()`                        |
| `Component.Backlinks()`       | `Plugin.Backlinks()`                     |
| `Component.Darkmode()`        | `Plugin.Darkmode()`                      |
| `Component.Footer()`          | `Plugin.Footer()`                        |
| `Component.TableOfContents()` | `Plugin.TableOfContents()`               |
| `Component.Head()`            | `Component.Head()` (unchanged, internal) |
| `Component.Spacer()`          | `Plugin.Spacer()`                        |

---

## Migrating from Quartz 3

As you already have Quartz locally, you don't need to fork or clone it again. Simply just checkout the v4 branch, install the dependencies, restore plugins, and import your old vault. Then follow the [Quartz 4 migration steps above](#migrating-from-quartz-4) to get to v5.

```bash
git fetch
git checkout v4
git pull upstream v4
npm i
npx quartz plugin restore
npx quartz create
```

If you get an error like `fatal: 'upstream' does not appear to be a git repository`, make sure you add `upstream` as a remote origin:

```shell
git remote add upstream https://github.com/jackyzha0/quartz.git
```

When running `npx quartz create`, you will be prompted as to how to initialize your content folder. Here, you can choose to import or link your previous content folder and Quartz should work just as you expect it to.

> [!note]
> If the existing content folder you'd like to use is at the _same_ path on a different branch, clone the repo again somewhere at a _different_ path in order to use it.

### Key changes from Quartz 3

1. **Removing Hugo and `hugo-obsidian`**: Hugo worked well for earlier versions of Quartz but it also made it hard for people outside of the Golang and Hugo communities to fully understand what Quartz was doing under the hood and be able to properly customize it to their needs. Quartz now uses a Node-based static-site generation process which should lead to much more helpful error messages and an overall smoother user experience.
2. **Full-hot reload**: The many rough edges of how `hugo-obsidian` integrated with Hugo meant that watch mode didn't re-trigger `hugo-obsidian` to update the content index. This lead to a lot of weird cases where the watch mode output wasn't accurate. Quartz now uses a cohesive parse, filter, and emit pipeline which gets run on every change so hot-reloads are always accurate.
3. **Replacing Go template syntax with JSX**: Quartz 3 used [Go templates](https://pkg.go.dev/text/template) to create layouts for pages. However, the syntax isn't great for doing any sort of complex rendering (like [text processing](https://github.com/jackyzha0/quartz/blob/hugo/layouts/partials/textprocessing.html)) and it got very difficult to make any meaningful layout changes to Quartz 3. Quartz now uses an extension of JavaScript syntax called JSX which allows you to write layout code that looks like HTML in JavaScript which is significantly easier to understand and maintain.
4. **A new extensible [[configuration]] and [[configuration#Plugins|plugin]] system**: Quartz 3 was hard to configure without technical knowledge of how Hugo's partials worked. Extensions were even hard to make. Quartz 5's configuration and plugin system is designed to be extended by users while making updating to new versions of Quartz easy.

### Things to update

- You will need to update your deploy scripts. See the [[hosting]] guide for more details.
- Ensure that your default branch on GitHub is updated from `hugo` to `v5`.
- [[folder and tag listings|Folder and tag listings]] have also changed.
  - Folder descriptions should go under `content/<folder-name>/index.md` where `<folder-name>` is the name of the folder.
  - Tag descriptions should go under `content/tags/<tag-name>.md` where `<tag-name>` is the name of the tag.
- Some HTML layout may not be the same between Quartz 3 and Quartz 5. If you depended on a particular HTML hierarchy or class names, you may need to update your custom CSS to reflect these changes.
- If you customized the layout of Quartz 3, you may need to translate these changes from Go templates back to JSX as Quartz 5 no longer uses Hugo. For components, check out the guide on [[creating components]] for more details on this.
