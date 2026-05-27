---
publish: true
permalink: /Atlas/_ Atlas Readme.md
title: About Atlas
created: 2022-06-23
modified: 2026-05-04
published: 2026-05-16T01:30:28.730+08:00
---

# 🗺️ 知识图谱 (Atlas) 说明

这里是本库的知识图谱、导航和工作台层，不再承担普通内容笔记的归档职责。

经过思考和提炼后的主题内容通常进入 `Cards/` 或 `Spaces/`；Atlas 负责把这些内容组织成 MOC、Base、Canvas、LLM Wiki 编译层和可巡检的控制台。

**目标：**

- 建立一个相互连接的知识网络。
- 促进深度思考和知识创新。
- 方便地检索和重用知识。

**主要子文件夹说明：**

- `Bases/`: 存放 Obsidian Bases 视图和工作台；任务系统视图已收拢到 `Bases/TaskNotes/`
- `Canvas/`: 存放 Obsidian Canvas 画板文件，用于可视化思考和知识结构梳理
- `Categories/`: 存放各种分类体系和标准，帮助组织和归类知识
- `Draws/`: 存放绘图源文件、导出图和其他图形化资料；子层分为 `Canvas/`、`Excalidraw/`、`Exports/`、`Cropped/` 和 `Notes/`
- `LLM Wiki/`: 存放 source summary、concept、query、synthesis 等编译层产物
- `MOCs/`: 存放内容地图 (Maps of Content)，作为知识导航的枢纽

Skill 管理卡片现在放在 `Sources/Skills/`；对应管理视图仍在 `Atlas/Bases/skills管理.base`。

原 `Atlas/Collections/` 已退役。web-to-base 这类系统集合样板移动到 `_system/docs/collections/`；临时属性化卡片本体回到 `Cards/`，说明保留在 `_system/docs/structure/card-property-staging`。

**核心方法论：**

- 参考 Zettelkasten 方法，强调笔记间的链接。
- 笔记应该原子化、概念化，并用自己的话来写。
- 定期回顾和重构这里的知识。

up:: [[ACCESS 笔记组织法]]

## 我的理解

Atlas意思是地图集。

Dataviews专门放各类数据聚合查询的结果。其实有很多专门化定制化的插件可以做更多事儿，但由于笔记量少，现在对dataview的依赖度还没那么高，先用着，静观其变。\
单个案例或项目的MOC，考虑直接放在对应文件夹里面，相当于起到一个个文件夹的readme和导览的作用。这里专门放这些MOC的MOC。目前我的笔记还不丰富，所以把某个子主题的MOC都直接放在对应文件夹里面了，这样也方便基于该MOC新建文件。随着规模扩大，这里的MOC的MOC应该会有用武之地。

## 原文解释

An Atlas is a "map of maps".

The Atlas folder contains your Maps of Content (MOCs).

You'll usually navigate to them using your Home note, but keeping them in a folder away from your ever-growing note collection allows you to maintain them more easily as well as quickly navigate between them using the sidebar.

These notes are so important, they truly deserve their own folder.
