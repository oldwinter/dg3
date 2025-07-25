---
{"publish":true,"permalink":"/Sources/GithubStarsSync/quartz.md","title":"quartz","description":"🌱 a fast, batteries-included static-site generator that transforms Markdown content into fully functional websites","created":"2022-08-21","modified":"2025-07-25","published":"2025-07-25T18:31:45.899+08:00","tags":["github开源"],"cssclasses":""}
---


x:: [[Cards/quartz syncer]]

注意点:  
要使用vercel或github pages或cloudflare pages，不能用netlify，因为netlify会自动将url小写，带来bug。

核心2个点，命令参考dg3仓库的deploy. yaml文件：

- frontmatter需要有title，且value值加双引号。我用linter实现自动生成title，但其不支持自动加双引号，目前我是自己用sed命令加上双引号，linter作者说下个版本将支持title的value也加双引号。
- 目前已支持[[Cards/wikilink]]，但依旧需要指定绝对引用路径，而我更习惯最短路径的引用方式，所以在构建时，我用mv命令将md文件批量移动至根目录，从而减少改文件链接的麻烦。

## ，新的v4版本适配

尽量少改动代码，这样能随时热更新同步作者发布的最新版本。

[GitHub - oldwinter/dg3: 开源免费的obsidian发布方案quartz](https://github.com/oldwinter/dg3)

官方推荐cloudflare和githubpage，这2个网内访问慢。所以我只能用netlify了，vercel对xxx.html文件，不影响xxx格式，必须要加上html才能访问，而quartz上面不知道怎么加html后缀，并且其实就算加上，也不够优雅。

## 2024-05-28 ，modified和created日期都不好用，换成使用publishDate字段

每一个待发布的笔记，frontmatter都新增如下字段。

publishDate: 2024-01-02
