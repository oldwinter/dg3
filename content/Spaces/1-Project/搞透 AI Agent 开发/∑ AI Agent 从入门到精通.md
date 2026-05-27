---
publish: true
permalink: /Spaces/1-Project/搞透 AI Agent 开发/∑ AI Agent 从入门到精通.md
aliases:
  - AI Agent 从入门到精通
  - 搞透 AI Agent 开发
title: ∑ AI Agent 从入门到精通
created: 2025-05-06
modified: 2026-05-17
published: 2026-05-17T00:33:22.344+08:00
tags:
  - AI生成
---

[AI Agents Roadmap - roadmap.sh](https://roadmap.sh/ai-agents)

##

## 当前 LLM Wiki 入口

这页不需要再扩成一套平行 `AI Agent` 总论。当前更稳的理解方式，是把 Agent 材料分发到三条主线：工作面 / surface 回到 [[Atlas/LLM Wiki/Synthesis/AI 工具链 阅读地图|AI 工具链]]，多执行单元和收口回到 [[Atlas/LLM Wiki/Synthesis/Agent Orchestration 阅读地图|Agent Orchestration]]，长期控制资产回到 [[Atlas/LLM Wiki/Synthesis/Harness Engineering 阅读地图|Harness Engineering]]。

优先阅读：

- [[Atlas/LLM Wiki/Synthesis/AI Agent 案例包的主线回桥：surface 清单、编排角色草图与 harness 约束包如何分发|AI Agent 案例包的主线回桥]]
- [[Atlas/LLM Wiki/Synthesis/Agent Orchestration 阅读地图|Agent Orchestration 阅读地图]]
- [[Atlas/LLM Wiki/Synthesis/Agent Orchestration 主分工：角色、收口与接口表面如何接力|Agent Orchestration 主分工]]
- [[Atlas/LLM Wiki/Synthesis/Harness Engineering 阅读地图|Harness Engineering 阅读地图]]
- [[Droid Missions：长任务软件交付的任务操作系统]]
- [[Multica 产品研究：本地 Agent 协作层与竞品地图]]

## 历史材料分流

这批旧材料不需要全部改造成常青笔记，但可以作为理解 agent stack 的入口：

- [[PI_MONO_源码全景分析]]：看一个 agent runtime / LLM gateway / coding harness / UI runtime 如何被拆成 monorepo 分层。
- [[codex-autoresearch skill 原理解读]]：看一个 Codex 长任务 skill 如何把目标、验证、迭代记录和回滚协议组织成可恢复循环。
- [[langchain的所有产品梳理]] 和 [[langchain 中chains和agents的区别]]：保留 LangChain 生态和 chain / agent 边界的最小索引。
- [[向量相似性搜索 - vector similarity]]：接到检索与 RAG 基础概念，不和 agent 编排主线混在一起。

## 当前项目推进判断

[[_system/docs/plans/2026-04-26-project-task-date-debt-triage|项目任务日期债务复查报告]] 已把 `研究并拥抱 ai agent 实现软件交付到完整端到端工作流，并布道全员` 从普通任务池里拆出来。它不应该直接补一个日期后继续拖延，而要先判断落位：

- 个人长期学习 / 方法论：回到本页和 [[Atlas/Bases/AI 工作流工作台.base|AI 工作流工作台]]。
- 团队布道 / enablement：拆成一次分享、一个 demo、一个 checklist。
- 交付流程改造：落成模板、验收标准、示例 PR 或失败回放。
- 公司协作任务：等待 Linear / 公司项目补 owner、权限和截止时间，本库只保留索引。

最低原则：如果说不清下一步要读什么、演示什么、改哪个流程、产出哪个资产，就不要把它当成普通 sprint 任务补日期。
