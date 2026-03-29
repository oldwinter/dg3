---
title: Graph
tags:
  - plugin/component
image:
---

Interactive graph visualization.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

See [[graph view]] for detailed usage information.

## Configuration

This plugin accepts the following configuration options:

- `localGraph`: Options for the local graph view.
- `globalGraph`: Options for the global graph view.

Both `localGraph` and `globalGraph` accept the following options:

- `drag`: Enable dragging nodes. Defaults to `true`.
- `zoom`: Enable zooming. Defaults to `true`.
- `depth`: The depth of the graph. Defaults to `1` for local and `-1` for global.
- `scale`: The initial scale of the graph.
- `repelForce`: The force that pushes nodes apart.
- `centerForce`: The force that pulls nodes to the center.
- `linkDistance`: The distance between linked nodes.
- `fontSize`: The font size of node labels.
- `opacityScale`: The scale of node opacity.
- `removeTags`: Tags to exclude from the graph.
- `showTags`: Whether to show tags in the graph.
- `enableRadial`: Whether to enable radial layout.
- `focusOnHover`: Whether to focus on the hovered node (global only).

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/graph
  enabled: true
  options:
    localGraph:
      drag: true
      zoom: true
      depth: 1
      scale: 1.1
      repelForce: 0.5
      centerForce: 0.3
      linkDistance: 30
      fontSize: 0.6
      opacityScale: 1
      removeTags: []
      showTags: true
      enableRadial: false
    globalGraph:
      drag: true
      zoom: true
      depth: -1
      scale: 0.9
      repelForce: 0.5
      centerForce: 0.3
      linkDistance: 30
      fontSize: 0.6
      opacityScale: 1
      removeTags: []
      showTags: true
      focusOnHover: true
      enableRadial: true
```

## API

- Category: Component
- Function name: `ExternalPlugin.Graph()`.
- Source: [`quartz-community/graph`](https://github.com/quartz-community/graph)
- Install: `npx quartz plugin add github:quartz-community/graph`
