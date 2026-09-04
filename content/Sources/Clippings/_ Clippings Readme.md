---
publish: true
permalink: /Sources/Clippings/_ Clippings Readme.md
title: _ Clippings Readme
created: 2026-05-12
modified: 2026-08-23
published: 2026-08-23T13:56:20.625Z
tags:
  - clippings
---

# 📰 剪藏文库 (Clippings) 说明

> [!note] 2026-07-26：根目录 `Clippings/` 已整体并入本目录（50 文件，git 历史保留；1 个同名碰撞带 `(root import)` 后缀，4 个疑似重复标 `duplicate_of`）。根剪藏队列就此退役，下表历史状态标记继续有效。

> [!note] 2026-08-09（Q4 补遗）：巡检发现根 `Clippings/` 仍有 3 个遗留剪藏（1 tracked + 2 untracked）→ 已全部 `git mv`/`mv` 归位本目录（无重名冲突），根目录已删除，退役状态最终完成。

> [!note] 2026-08-23（再次补遗）：整理后根 `Clippings/` 又出现 6 个新剪藏（无同名碰撞、无内容入链）。用户确认「处理」后 `git mv` 并入本目录，根目录再次删除。历史 `_system/memory/` 里旧 `[[Clippings/...]]` 不改写。

这个文件夹用于统一存放从 Obsidian Web Clipper、网页、书籍或其他来源剪藏 / 摘录的原始内容。根目录 `Clippings/` 已退役，新的剪藏入口统一放在 `Sources/Clippings/`。

这里的内容是外部信息的原始副本，通常未经深度处理。它的价值在于 provenance：知道某个判断最初来自哪里。

## 目的

- 快速保存感兴趣的文章、段落、图片等。
- 作为后续学习和研究的素材库。
- 为 [[Atlas/LLM Wiki/_index|LLM Wiki]] 的 source summary、query 和 synthesis 提供原始证据。

## 处理流程

1. **收集**：使用网页剪藏工具（如 Obsidian Web Clipper、MarkDownload 等）或其他方式将内容保存到此文件夹。
2. **筛选**：定期浏览剪藏内容，判断其价值。
3. **编译**：对于有价值的内容，优先进入 [[Atlas/LLM Wiki/_index|LLM Wiki]]，再决定是否回桥到 `Cards/`、`Spaces/` 或 [[∑ 全库MOC索引]]。
4. **溯源**：在新笔记中链接回原始剪藏，方便复核。
5. **清理**：只有在确认无入链、无 provenance 价值、无隐私 / 发布风险后，才进入删除或归档候选。

## 2026-07-01 审计后的处理入口

- 来源处理总入口：[[Atlas/MOCs/Source Intake 与 Provenance Hub|Source Intake 与 Provenance Hub]]
- root Clippings 确认包：[[_system/reports/vault-audit-2026-07-01/confirmation-packs/root-clippings-lifecycle-confirmation-pack|Root Clippings Lifecycle Confirmation Pack]]
- 重复候选：[[_system/reports/vault-audit-2026-07-01/clippings-dedupe-manifest|Clippings Dedupe Manifest]]

Root Clippings 的下一步不是清空，而是逐条标记 `compiled`、`queued`、`keep-source`、`duplicate` 或 `ignore-for-now`。

## Root Clippings review queue

root `Clippings/` 是 retired import queue，不再作为新的剪藏入口。现有文件先逐条 review，不批量移动或删除。

| 文件 | 当前判断 | 下一步 |
|---|---|---|
| [[Sources/Clippings/Codex App 边玩边赚钱实战教学：那些不为人知的使用秘诀]] | compiled | 已编译到 [[Atlas/LLM Wiki/Source Summaries/Codex App 多工作面实战 - 源摘要]]；源文件 archive-in-place |
| [[Sources/Clippings/Codex-maxxing - Jason Liu]] | compiled | 已编译到 [[Atlas/LLM Wiki/Source Summaries/Codex-maxxing 长运行工作循环 - 源摘要]]；源文件 archive-in-place |
| [[Sources/Clippings/Deep into LLM 回车后的 2.5 秒发生了什么?”]] | review | 判断是否进入 LLM 推理 / 产品体验来源队列 |
| [[Sources/Clippings/Designing, Refining, and Maintaining Agent Skills at Perplexity]] | compiled | 已编译到 [[Atlas/LLM Wiki/Source Summaries/Perplexity Agent Skills 设计维护指南 - 源摘要]]；源文件 archive-in-place |
| [[Sources/Clippings/Generative UI Is the New Frontend]] | review | 判断是否进入前端 / 生成式 UI MOC |
| [[Sources/Clippings/Hermes 24小时工作的秘密：Cron、Gateway 和 Heartbeat]] | compiled | 已编译到 [[Atlas/LLM Wiki/Source Summaries/Hermes Cron Gateway Heartbeat 长期自治运行时 - 源摘要]]；源文件 archive-in-place |
| [[Sources/Clippings/How Anthropic enables self-service data analytics with Claude]] | review | 判断是否进入企业 AI / 数据分析来源队列 |
| [[Sources/Clippings/How to Build a Self-Improving AI Company]] | compiled | 已编译到 [[Atlas/LLM Wiki/Source Summaries/Self-Improving AI Company - 源摘要]]；源文件 archive-in-place |
| [[Sources/Clippings/How to Build an Obsidian Vault That Runs Your Entire Business While You Sleep - (Full Course)]] | compiled | 已编译到 [[Atlas/LLM Wiki/Source Summaries/Obsidian Vault Business Operating System - 源摘要]]；源文件 archive-in-place |
| [[Sources/Clippings/Meta-Meta-Prompting The Secret to Making AI Agents Work]] | compiled | 已编译到 [[Atlas/LLM Wiki/Source Summaries/Meta-Meta-Prompting Making AI Agents Work - 源摘要]]；源文件 archive-in-place |
| [[Sources/Clippings/Monorepo vs Multi-Repo AI  Architecture-based AI Tool Selection]] | compiled | 已编译到 [[Atlas/LLM Wiki/Source Summaries/Monorepo vs Multi-Repo AI 工具选型架构边界 - 源摘要]]；源文件 archive-in-place |
| [[Sources/Clippings/OpenAI 如何使用 Codex]] | review | 判断是否进入 Codex / AI coding 来源队列 |
| [[Sources/Clippings/The Organization Is the Bottleneck]] | compiled | 已编译到 [[Atlas/LLM Wiki/Source Summaries/The Organization Is the Bottleneck - 源摘要]]；源文件 archive-in-place |
| [[Sources/Clippings/Under the River (2026)]] | review | 判断是否保留为媒体 / 兴趣来源 |
| [[Sources/Clippings/Using Codex Goals Effectively]] | compiled | 已编译到 [[Atlas/LLM Wiki/Source Summaries/Using Codex Goals Effectively - 源摘要]]；源文件 archive-in-place |
| [[Sources/Clippings/Why everyone suddenly wants to be seen as 'high agency']] | compiled | 已编译到 [[Atlas/LLM Wiki/Source Summaries/high agency 技术圈能动性叙事与边界 - 源摘要]]；源文件 archive-in-place |
| [[Sources/Clippings/You're probably only using 3% of Raycast  你可能只用了Raycast 3%的功能]] | review | 判断是否进入 Raycast / 效率工具生态 |
| [[Sources/Clippings/为什么我认为 Obsidian 是当前最好用的知识管理笔记软件？ - 少数派]] | review | 判断是否进入 Obsidian / PKM 来源队列 |
| [[Sources/Clippings/深度｜红杉资本对话硅谷传奇创始人：投了YouTube、Instagram后发现，大多数创始人把投资人当老板，把融资当交易_腾讯新闻]] | review | 判断是否进入创业 / 投资 / 组织来源队列 |
| [[Sources/Clippings/面向开发者的AI 提效 Harness指南]] | compiled | 已编译到 [[Atlas/LLM Wiki/Source Summaries/面向开发者的AI 提效 Harness指南 - 源摘要]]；源文件 archive-in-place |

## 清理规则

- 新剪藏进入 `Sources/Clippings/`，不要继续写入 root `Clippings/`。
- root `Clippings/` 的旧文件必须先判断 `compiled`、`compile-later`、`keep-source` 或 `ignore-for-now`。
- 对同步 / 剪藏原文优先补 source summary 或回桥链接，不直接风格化重写正文。
- 删除前至少确认：无入链、无 LLM Wiki / MOC provenance 依赖、无隐私或发布风险。

**目标：** 避免让这里成为信息的坟场，定期处理，将有价值的信息融入到自己的知识体系和 [[Atlas/LLM Wiki/_index|LLM Wiki]] 中。
