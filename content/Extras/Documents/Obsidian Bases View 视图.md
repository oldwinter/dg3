---
{"publish":true,"permalink":"/Extras/Documents/Obsidian Bases View 视图.md","created":"2025-07-25","modified":"2025-08-19","cssclasses":""}
---


Views allow you to organize the information in a [Base](https://help.obsidian.md/bases) in multiple different ways. A base can contain several views, and each view can have a unique configuration to display, sort, and filter files.

For example, you may want to create a base called "Books" that has separate views for "Reading list" and "Recently finished".

## Layout

Currently, bases can be displayed as a **table** or **cards**. In the future more layout types will be added. See [Bases roadmap](https://help.obsidian.md/bases/roadmap).

Current layout options:

- **Table layout** displays each file as a row in a table. Columns are populated from the [Properties](https://help.obsidian.md/properties) in your notes.
- **Cards layout** displays each file as a card in a grid. The view settings allow you to optionally configure an image property, which can be an image URL or [attachment](https://help.obsidian.md/attachments) link.

Each layout type provides its own configuration options and actions. To see a view's configuration options:

1. Click the view name in the top left of the bases toolbar.
2. Click the right arrow next to the current view.
3. Choose **Configure view**.

### Table

Table does not have any specific view configuration.

### Cards

#### Image property

Cards support an optional cover image, which is [property](https://help.obsidian.md/properties) that's displayed as an image at the top of the card. The property can be any of the following:

- A link to a local attachment `"[[link/to/attachment.jpg]]"`
- An external link (URL)
- A hex color code (`#000000`)

#### Image fit

If you have an image property configured, this option will determine how the image should be displayed in the card.

- **Cover:** The image fills the card's content box. If it does not fit, the image will be cropped.
- **Contain:** The image is scaled until it fits within the card's content box. The image will not be cropped.

#### Image aspect ratio

The size of the cover image is determined based on its aspect ratio. The default aspect ratio is 1:1 meaning all your images will be square. Adjust this option to make the image wider or taller.

## Filters

A base without filters shows all the files in your vault. Filters allow you to narrow down results to only show files that meet specific criteria. For example, you can use filters to only display files with a specific [tag](https://help.obsidian.md/tags) or within a specific folder. Many filter types are available.

Click the **Filters** button at the top of a base to add filters.

- **All views** applies filters to all views in the base.
- **This view** applies filters to the active view.

#### Properties, operators, values

Filters have three components:

1. **Property** — lets you choose a [property](https://help.obsidian.md/properties) in your vault, including [file properties](https://help.obsidian.md/bases/syntax#File%20properties).
2. **Operator** — lets you choose how to compare the conditions. The list of available operators depends on the property type (text, date, number, etc)
3. **Value** — lets you choose the value you are comparing to. Values can include math and [functions](https://help.obsidian.md/bases/functions).

#### Conjunctions

- **All the following are true** is an `and` statement — results will only be shown if *all* conditions in the filter group are met.
- **Any of the following are true** is an `or` statement — results will be shown if *any* of the conditions in the filter group are met.
- **None of the following are true** is a `not` statement — results will not be shown if *any* of the conditions in the filter group are met.

#### Filter groups

Filter groups allow you to create more complex logic by creating combinations on conjunctions.

#### Advanced filter editor

Click the code button to use the **advanced filter** editor. This displays the raw [syntax](https://help.obsidian.md/bases/syntax) for the filter, and can be used with more complex [functions](https://help.obsidian.md/bases/functions) that cannot be displayed using the point-and-click interface.

## Limit, copy, and export results

### Copy to clipboard

This action copies the view to your clipboard. Once in your clipboard you can paste it into a Markdown file, or into other document apps including spreadsheets like Google Sheets, Excel, and Numbers.

### Export CSV

This action saves a CSV of your current view.
