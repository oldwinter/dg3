---
title: Welcome to Quartz 5
---

Quartz is a fast, batteries-included static-site generator that transforms Markdown content into fully functional websites. Thousands of students, developers, and teachers are [[showcase|already using Quartz]] to publish personal notes, websites, and [digital gardens](https://jzhao.xyz/posts/networked-thought) to the web.

## 🪴 Get Started

Quartz requires **at least [Node](https://nodejs.org/) v22** and `npm` v10.9.2 to function correctly. Ensure you have this installed on your machine before continuing.

Then, in your terminal of choice, enter the following commands line by line:

```shell
git clone -b v5 https://github.com/jackyzha0/quartz.git
cd quartz
npm i
npx quartz plugin restore
npx quartz create
```

This will guide you through initializing your Quartz with content, including choosing a [[cli/create#templates|project template]] and configuring your site's base URL. Once you've done so, see how to:

1. [[authoring content|Writing content]] in Quartz
2. [[configuration|Configure]] Quartz's behaviour
3. Change Quartz's [[layout]]
4. [[build|Build and preview]] Quartz
5. Sync your changes with [[setting up your GitHub repository|GitHub]]
6. [[hosting|Host]] Quartz online

## 🔧 Features

- [[Obsidian compatibility]], [[full-text search]], [[graph view]], [[wikilinks|wikilinks, transclusions]], [[backlinks]], [[features/Latex|Latex]], [[syntax highlighting]], [[popover previews]], [[Docker Support]], [[i18n|internationalization]], [[comments]] and [many more](./features/) right out of the box
- Hot-reload on configuration edits and incremental rebuilds for content edits
- Simple JSX layouts and [[creating components|page components]]
- [[SPA Routing|Ridiculously fast page loads]] and tiny bundle sizes
- Fully-customizable parsing, filtering, and page generation through [[making plugins|plugins]]

For a comprehensive list of features, visit the [features page](./features/). You can read more about the _why_ behind these features on the [[philosophy]] page and a technical overview on the [[architecture]] page.

### 🚧 Troubleshooting + Updating

Having trouble with Quartz? Try searching for your issue using the search feature or check the [[troubleshooting]] page. If you haven't already, [[upgrading|upgrade]] to the newest version of Quartz to see if this fixes your issue.

If you're still having trouble, feel free to [submit an issue](https://github.com/jackyzha0/quartz/issues) if you feel you found a bug or ask for help in our [Discord Community](https://discord.gg/cRFFHYye7t). You can also browse the [[community]] page for third-party plugins and resources.
