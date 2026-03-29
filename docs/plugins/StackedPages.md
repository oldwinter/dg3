---
title: StackedPages
tags:
  - plugin/component
image:
---

Andy Matuschak-style stacked pages (sliding panes). Clicking internal links opens pages side by side in a horizontal stack, allowing you to trace your path through your notes. Each pane shows a full page and can be individually scrolled or closed.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Usage

Once enabled, clicking any internal link on a page opens the linked page as a new pane to the right instead of navigating away. The URL updates with a `#stacked=slug1,slug2` hash encoding your current stack, so you can share or bookmark a specific trail of pages.

Stacked pages are disabled on mobile by default (below 800px) since horizontal panning doesn't work well on small screens. On mobile, links navigate normally.

### Interactions

- **Click a link**: Opens the target page in a new pane to the right. If the maximum number of panes is reached, the leftmost pane is removed.
- **Close a pane**: Click the × button in the pane header to remove it from the stack.
- **Collapsed spines**: When panes overflow the viewport, earlier panes collapse to a thin vertical spine showing the page title. Click a spine to bring that pane back into focus.
- **Browser back/forward**: The full stack state is stored in the URL hash and integrated with browser history, so back/forward navigation works as expected.

## Configuration

This plugin accepts the following configuration options:

- `paneWidth`: Width of each stacked pane in pixels. Defaults to `640`.
- `maxPanes`: Maximum number of panes visible at once. Defaults to `5`.
- `enableOnMobile`: Whether to enable stacked pages on mobile devices. Defaults to `false`.
- `mobileBreakpoint`: Viewport width (in pixels) below which the mobile behavior applies. Matches the Quartz mobile breakpoint. Defaults to `800`.
- `showSpines`: Whether to show collapsed spine headers when panes overflow. Defaults to `true`.
- `animateTransitions`: Whether to animate pane open/close transitions. Defaults to `true`.

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/stacked-pages
  enabled: true
  layout:
    position: afterBody
    priority: 50
    display: all
  options:
    paneWidth: 640
    maxPanes: 5
    enableOnMobile: false
    mobileBreakpoint: 800
    showSpines: true
    animateTransitions: true
```

## API

- Category: Component
- Function name: `ExternalPlugin.StackedPages()`.
- Source: [`quartz-community/stacked-pages`](https://github.com/quartz-community/stacked-pages)
- Install: `npx quartz plugin add github:quartz-community/stacked-pages`
