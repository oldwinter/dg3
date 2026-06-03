---
publish: true
permalink: /🍀 花园导览/🧰 本库指南/AI + 知识管理核心工作流.md
aliases:
  - AI 知识管理工作流
  - AI-native 知识管理核心工作流
title: AI + 知识管理核心工作流
created: 2026-05-31
modified: 2026-05-31
published: 2026-05-31T13:38:18.993Z
tags:
  - AI生成
---

# AI + 知识管理核心工作流

本库现在最值得遵守的不是某个固定分类法，而是一条持续把信息向前推进的工作流：

```text
Capture -> Route -> Compile -> Canonicalize -> Execute -> Review
```

每天不需要把整个库整理干净。只要让新增内容前进一步，长期系统就会变得更好用。

## 一句话版本

| 环节 | 你做什么 | AI 做什么 | 产物 |
|---|---|---|---|
| Capture | 先记录，不纠结分类 | 帮你补上下文、标题和来源 | Daily / Sources |
| Route | 判断这条内容该去哪 | 按 [[这条笔记该去哪]] 分流 | Cards / Sources / Spaces / Tasks |
| Compile | 选值得消化的来源 | 提炼 source summary、query、synthesis | LLM Wiki |
| Canonicalize | 把成熟判断放回正本 | 压缩定义、判断和双链 | MOC / Area / Guide |
| Execute | 把行动项变成任务 | 拆任务、补验收标准 | Calendar Tasks |
| Review | 周期性回看下一步 | 找重复、断链、未回桥和过长页 | Plan / Memory / Workbench |

## 每天怎么用

1. 新想法先放 `Calendar/Daily notes/`。
2. 外部资料先放 `Sources/`，不要直接改写成常青笔记。
3. 可复用概念才进 `Cards/`。
4. 可执行事项进 `Calendar/Tasks/`。
5. 值得长期复用的来源，再让 AI 进 [[Atlas/LLM Wiki/_index|LLM Wiki]] 编译。
6. 成熟结论必须回到 `Atlas/MOCs/`、`Spaces/2-Area/` 或公开指南，不要永远停在编译层。

## 每周怎么整理

每周只做一个小批次：

- 3 到 5 个 LLM Wiki 回桥。
- 5 到 10 个短 Cards 复核。
- 1 个项目 / Area 的入口整理。
- 1 个 cleanup dry-run 产生的确认包。

不要一口气清空未链接、短文件、重复 hash 或 Daily backlog。那些数字是候选池，不是删除清单。

## AI 应该怎么参与

### Router

让 AI 判断一条笔记属于哪一层：Daily、Sources、Cards、Spaces、Atlas、Tasks 或 Extras。

### Compiler

让 AI 把高价值来源编译成 LLM Wiki 的 source summary、query 或 synthesis。

### Canonicalizer

让 AI 把已经成熟的综合判断压成：

- 1 句定义
- 2 到 4 条核心判断
- 2 到 4 个高价值双链
- 明确的事实 / 判断 / 待确认边界

### Operator

让 AI 跑 dry-run、manifest、frontmatter validator、Canvas check 和 Base query。涉及删除、移动、批量改写时，只先出确认包。

### Reviewer

让 AI 定期找四类问题：

- 同源重复
- 入链锚点为空
- 编译层未回桥
- 计划 / memory / AI summary 过长

## 整理时的默认优先级

1. 路径污染先于语义整理。
2. 明显临时产物先于知识页。
3. 无入链空壳先于有入链锚点。
4. redirect / stub 先于 hard delete。
5. 来源证据保留先于压缩文件数。
6. 回桥成熟判断先于继续 ingest。

## 不要做

- 不把短卡片当垃圾。
- 不把 `Sources/` 原文当待清理正文。
- 不把任务状态藏在 Daily 或长文里。
- 不为了减少数字批量删未链接文件。
- 不把 LLM Wiki 当全库分类法。
- 不把整理过程写成新的长期知识正本。

## 什么时候算完成

一轮整理只要满足下面四件事就可以停止：

1. 有一个明确小批次。
2. 有 dry-run 或人工复核证据。
3. 有回写位置：Guide、MOC、Area、Task、Memory 或确认包。
4. 验证通过，或者明确记录了未通过原因。

整理不是把库变空，而是让未来的自己和 AI 更容易找到、理解、决策和行动。
