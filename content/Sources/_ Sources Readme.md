---
publish: true
permalink: /Sources/_ Sources Readme.md
aliases:
  - Sources Readme
  - 来源说明
title: About Sources
created: 2022-06-22
modified: 2026-08-10
published: 2026-08-23T13:55:49.180Z
tags:
  - source
---

up:: [[ACCESS 笔记组织法]]

## 主要子文件夹说明

- `AI/`: 存放与 AI / AIGC 相关的文献、资料、生成稿和案例
- `Articles/`: 存放网络文章、博客文章等的文献笔记和摘要
- `Books/`: 存放书籍阅读笔记、摘要和思考
- `Clippings/`: 存放 Obsidian Web Clipper 等工具剪藏的原始资料；根 `Clippings/` 已于 2026-07-26 合并、2026-08-09 / 2026-08-23 两次补遗归位后退役（入口统一在 `Sources/Clippings/`）
- `Courses/`: 存放在线课程、培训等的学习笔记和资料
- `CuboxSync/`: 从Cubox同步的网络收藏和剪藏内容
- `GithubStarsSync/`: 从GitHub Stars同步的开源项目和代码库资料
- `Movies + TV/`: 存放影视作品相关的观后感和评论
- `Newsletter + RSS/`: 存放订阅的新闻邮件和RSS内容
- `Skills/`: 存放 skill 管理卡片、用途说明、触发边界和个人评分；可运行 skill 仍在 `.agents/skills/`
- `DataSamples/`: 存放 JSON、embedding、Elasticsearch / OpenSearch mapping 等数据样例和归档样本
- `WuCaiSync/`: 从五彩同步的网络高亮和标注内容
- [[导入空正文索引]]：承接已删除的无正文、无入链同步导入记录，避免空壳单页继续占据笔记数量。
- [[GithubStarsSync 生成页归档索引]]：承接已删除的无入链 GitHub Stars 同步生成页；这些页正文只是 frontmatter 的模板展开，索引保留 repo URL、描述、stars、语言和 topics。
- [[Sources/Movies + TV/豆瓣影音无评论归档索引|豆瓣影音无评论归档索引]]：承接已删除的无入链、无个人评分、空 Comment 的豆瓣影音同步记录；索引保留标题、类型、评分、日期、类型、国家、导演和 Douban ID。
- [[Sources/Movies + TV/豆瓣影音评分归档索引|豆瓣影音评分归档索引]]：承接已删除的无非同步日志入链、保留个人评分但无手写评论的豆瓣影音同步记录；索引保留个人评分、豆瓣评分、日期、类型、国家、导演、Douban ID 和正文图片链接。
- [[Sources/Books/微信读书同步元数据归档索引|微信读书同步元数据归档索引]]：承接已删除的零入链或只被 2022 年度回顾引用、且无高亮 / 无读书笔记 / 无有效评论的微信读书同步书目；索引保留书目元数据和原简介，并用 aliases 承接旧年度回顾链接。

## Source lifecycle

来源层的核心职责是保留 provenance，而不是把所有外部材料都改写成常青笔记。推荐流转：

```text
raw import / clipping
  → source summary
  → synthesis / concept
  → MOC / Area / guide 回桥
```

- 原始导入：保留在 `Sources/Clippings/`、`Sources/CuboxSync/`、`Sources/GithubStarsSync/` 等来源目录。
- 编译层：有价值的来源优先进入 [[Atlas/LLM Wiki/_index|LLM Wiki]]，用 source summary、query、synthesis 承接。
- 常青层：稳定判断再回桥到 `Cards/`、`Spaces/` 或 [[∑ 全库MOC索引]]。
- root `Clippings/` 已退役且目录已空；新剪藏只进 `Sources/Clippings/`。若根目录再次出现遗留文件，先扫引用和同名碰撞，再小批 `git mv`，不改正文。
- 本轮全库审计后的来源整理入口是 [[Atlas/MOCs/Source Intake 与 Provenance Hub|Source Intake 与 Provenance Hub]]；重复和 source-of-record 候选见 [[_system/reports/vault-audit-2026-07-01/clippings-dedupe-manifest|Clippings Dedupe Manifest]]。

## 当前入口

- 剪藏入口：[[Sources/Clippings/_ Clippings Readme|Clippings Readme]]
- Cubox 导入登记：[[Sources/CuboxSync/_ CuboxSync Index|CuboxSync Index]]
- LLM Wiki 编译层：[[Atlas/LLM Wiki/_index|LLM Wiki Index]]
- 全库主题入口：[[∑ 全库MOC索引]]

## 个人用法

Spaces 中的 Resource 偏向 action 行动，以及作为 project 和 area 的强相关的支撑材料，以内容为分类依据。

而这里的 Sources，偏向于剪藏、搜集，以资源文件类型为分类依据。

另外就是有明显系列化、批量资源的，比如一门课程，一个 rss 订阅，一部电视剧等，都放这里，可以做为将来的检索条件。

## 原文解释

The beast-like Evernote Web Clipper approaches Gandalf trying to infect and corrupt your PKM sanctuary with hordes of low-value articles you'll never read and that will drown your own thinking a pit of orc-like chaos.

# 📚 来源 (Sources) / 文献笔记 说明

这个文件夹主要存放**文献笔记 (Literature Notes)**。

文献笔记是针对你阅读或参考的外部信息来源（如书籍、文章、论文、视频等）所做的笔记。

**核心目的：**

- **理解与消化:** 用自己的话总结、转述原文的关键信息和论点。
- **记录思考:** 写下阅读过程中的疑问、评论、联想和启发。
- **建立连接:** 将文献中的观点与自己已有的知识卡片 (Permanent Notes) 联系起来。
- **方便溯源:** 记录完整的文献来源信息（作者、标题、年份、链接等）。

**与 Clippings 的区别：**

- Clippings 是原始内容的剪藏。
- Sources 是对原始内容进行**主动阅读和思考后**的产物，是用自己的话写成的笔记。

**处理流程：**

1. 阅读一篇文献（可能来自 Clippings 或其他地方）。
2. 在此文件夹下创建对应的文献笔记。
3. 在笔记中用自己的话总结要点，记录思考。
4. 将文献笔记中提炼出的核心思想、新概念转化为 `Cards/`、`Spaces/` 或 `Atlas/LLM Wiki/` 中的稳定笔记。
5. 在永久笔记和文献笔记之间建立链接。
