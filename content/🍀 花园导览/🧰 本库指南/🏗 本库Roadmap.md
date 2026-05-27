---
publish: true
permalink: /🍀 花园导览/🧰 本库指南/🏗 本库Roadmap.md
title: 🏗 本库Roadmap
created: 2022-07-03
modified: 2026-04-26
published: 2026-05-16T01:35:26.653+08:00
---

up:: [[🍀 花园导览]]

> [!INFO] 提示
> 此处只记录和obsidian相关、和本库如何使用相关的事项。

## 当前 v3 演进方向

本库下一阶段不再只按“Obsidian 示例库”演进，而是朝个人 AI 知识操作系统收束：原始资料继续留在 vault，[[Atlas/LLM Wiki/_index|LLM Wiki]] 负责把 source / query / synthesis 编译成可复用判断，[[Atlas/Bases/LLM Wiki 工作台.base|LLM Wiki 工作台]]、Canvas 和 MOC 负责把这些判断变成可巡检、可回桥的入口面。

当前仓库级路线图见 [[_system/docs/plans/2026-04-26-oldwinter-notes-evolution-roadmap|oldwinter-notes 演进路线图]]。如果想理解这套系统为什么不只是“更多笔记”，优先读：

- [[Atlas/LLM Wiki/Synthesis/在 Obsidian 内实践 LLM Wiki：输入层、视图层与编译层|在 Obsidian 内实践 LLM Wiki]]
- [[Atlas/LLM Wiki/Synthesis/LLM Wiki 演进策略：何时补 source、query、synthesis 与入口面|LLM Wiki 演进策略]]
- [[Atlas/LLM Wiki/Synthesis/主题成熟度快照：已进入主分工与回桥规则阶段的主题|主题成熟度快照]]
- [[Atlas/LLM Wiki/Synthesis/个人 AI 工作流分层图|个人 AI 工作流分层图]]

下一轮落地计划见 [[_system/docs/plans/2026-04-26-oldwinter-notes-roadmap-execution-plan|oldwinter-notes roadmap 落地执行计划]]。它把路线图拆成 README v3 叙事、LLM Wiki promotion 第二轮、发布工作台、小批结构卫生和 agent-ready contract 五个可执行 sprint。

## 🤔 PLANNED

- 将库中的至少 2000 个文件发布出来。
- 逐步补齐公开入口的 v3 叙事：解释本库如何从双链笔记库，演进成 AI-native 的知识编译与工作台系统。

## 🏹 DOING #todo/本周

- 将AI+Obsidian的心得笔记先发布出来。
- 考虑录制一个视频，讲解本库的设计哲学和使用方法。
- 创建并同时维护英文版 knowledge garden。
- 更新：将剪藏的文章和内容同步到obsidian，使用cursor让AI读取我的剪藏，从而更懂我。
- 继续把已经稳定的 LLM Wiki 综合判断，轻量回写到主 MOC、花园导览和常青 note，避免编译层长期停在 staging。

## 🎉 DONE

- [[旧笔记如何迁移至obsidian等双链笔记]]
- 把历史已发布过的笔记，通过[[publish_by_frontmatter.py]]脚本重新整理push到knowledge-garden，同时，使用[[quartz syncer]]，更方便地实时更新[[garden.oldwiner.top]].
- 因为隐私过多，导致2年多没更新数字花园成为了数字荒冢，[[2025-07-09]]重新捡起来。
- 通过1个月以上的实践，将[[ACCESS 笔记组织法]]的工作流完善。
  - 完成[[常见笔记组织方法]]的[[混合笔记法]]，将ACCESS的使用流程固化下来。
- 完成[[🍀 花园导览]]模块，方便观众浏览已成熟的核心内容
- 完成[[§ 如何成为学习高手 - 高冷冷]]课程的学习笔记，作为[[obsidian如何做短课程笔记]]的实践探索
- 完成[[obsidian 目前最完美的免费发布方案 - 渐进式教程]]
- 完成[[从anki、onenote到obsidian，一名小镇做题家的笔记进化史]]
- 写几篇obsidian相关的成熟的文章发表，争取1个月内将star冲到100个
- 完成[[常青笔记]]的阅读笔记，作为obsidian如何做文章阅读笔记的实践探索
- 完成[[🧰 本库使用指南]]的更细致的引导内容，[[obsidian 不可回避的缺点及其解决方案]]，并更新自己常用的插件列表[[2022年7月，obsidian 依然必装的 10 个插件]]，[[∑ obsidian插件]]。
- 完成[[§ 本库obsidian使用说明书]]。
- 重构：
  - 缩减体积。图片等附件改用图床，缩减库体积。删除不必要上传的文件。目前库总大小<20MB
  - 借助[[File Cooker]]插件，重新调整文件夹结构。
- 写几篇obsidian相关的成熟的文章发表，争取8月底将star冲到200个。
- 提供成熟内容的完整地图，占10%，并能让读者通过10%内容里面的双链，浏览到80%也许还不成熟的思考和内容。
