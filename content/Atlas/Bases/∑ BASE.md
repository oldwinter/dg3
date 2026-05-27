---
publish: true
permalink: /Atlas/Bases/∑ BASE.md
aliases:
  - Bases
title: ∑ BASE
created: 2025-05-22
modified: 2026-05-05
published: 2026-05-16T01:30:29.087+08:00
tags:
  - AI生成
---

x: [[base 使用技巧]]

## PARA

- 旧 `📥 Inbox.base` 已随根目录 Inbox 清理退役；新内容按 [[这条笔记该去哪]] 分流到 `Calendar/Daily notes/`、`Sources/Clippings/`、`Sources/`、`Cards/` 或 `Spaces/`。
- [[Resources.base]]
- [[Archive.base]]
- [[Areas.base]]
- [[Projects.base]]

## 模板文件

> 放到或被引用到不同的文件中，能起到动态数据视图的效果。

模板文件中，包含了this.file这样的表达，从而表现为：放到不同文件夹，会有不同表现。

##

[[∑ Bases 控制台.base]]

## 任务视图

- [[Atlas/Bases/TaskNotes/Views/tasks-default.base|TaskNotes 默认任务视图]]
- [[Atlas/Bases/TaskNotes/Views/kanban-default.base|TaskNotes Kanban 视图]]
- [[Atlas/Bases/TaskNotes/Views/agenda-default.base|TaskNotes Agenda 视图]]
- [[Atlas/Bases/TaskNotes/Views/calendar-default.base|TaskNotes Calendar 视图]]

## 模板汇总

## 分类汇总

### 知识编译与 LLM Wiki

- [[LLM Wiki 工作台.base]]
- [[AI 工作流工作台.base]]
- [[AI Agent 知识系统样板.base]]
- [[发布工作台.base]]
- [[项目推进工作台.base]]
- [[LifeOS 工作台.base]]

`LLM Wiki 工作台` 是 `Atlas/LLM Wiki/` 的主巡检入口，用来把 source summary、query、synthesis、topic view、lint 和 promotion 回桥队列放在同一个操作面里。接手 LLM Wiki 时优先从这里判断当前该补 source、补 query、补 synthesis、做 promotion，还是维护控制页。

`AI Agent 知识系统样板` 是 `web-to-base` 的首个真实样板：源笔记在 `_system/docs/collections/ai-agent-knowledge-system-sample/`，Base 用 `collection_id == "ai-agent-knowledge-system-sample"` 和文件夹双重过滤，演示如何把本库 AI Agent / Codex / LLM Wiki 相关节点做成可复用的规范 frontmatter 列表。

当前最常用的 LLM Wiki 工作台视图包括：

- `Synthesis｜核心方法论`
- `Synthesis｜阅读地图`
- `Synthesis｜工具主线`
- `Topics｜Obsidian 资产包`
- `Topics｜Skills`
- `Topics｜Skills Eval`
- `Topics｜Tools`
- `Queries｜跨主题高价值`
- `Cross-theme｜核心原则`
- `Promotion｜待回桥`
- `Promotion｜已回桥`
- `Promotion｜需目标入口`
- `Promotion｜控制页保留`

2026-04-28 已复查三个核心方法论入口：`Synthesis｜核心方法论 = 16`、`Queries｜跨主题高价值 = 181`、`Cross-theme｜核心原则 = 109`，三者都没有缺 `sources` 或 `related`。Sprint 322 刷新 `Queries｜跨主题高价值`：当前 185 页，全部 `review`；缺 `sources = 0`、缺 `related = 0`、缺 `compiled_from = 0`、缺 `llm-wiki` 标签 = 0。当前使用口径见 [[Atlas/LLM Wiki/Queries/LLM Wiki 工作台里，哪些核心方法论视图适合先看]]：先用 `Synthesis｜核心方法论` 做短名单，后两者作为宽巡检 / 原则矿池，不因为结果集大就新增窄视图。

`Synthesis｜阅读地图` 是 LLM Wiki reading map 总巡检面，只收 `type: synthesis` 且文件名包含 `阅读地图` 的页面。2026-04-28 Sprint 318 静态复查：当前 21 页，状态为 done 15、review 6；缺 `sources = 0`、缺 `related = 0`、缺 `compiled_from = 0`，已有 `promotion_target` 的 reading map 为 15 页。6 个 `review + 无 promotion_target` 页面分别是 Prompt 控制杆、问题定义与提示控制、工具主题、技能市场治理、数据采集与输入层和主题成熟度方法页，属于子主题 / 总入口 / 控制面，不应为了降低 review 数字批量改 `done`。当前不改 `.base` 筛选，也不新增 reading map 子视图。

`Synthesis｜工具主线` 是工具主题综合页的第一入口，比 `Topics｜Tools` 更窄：只收 `type: synthesis` 且带 `tools / raycast / claude-code / codex / obsidian` 标签的页面。2026-04-28 Sprint 308 静态复查：当前 62 页，状态为 33 个 done、29 个 review；标签命中为 Obsidian 22、Codex 13、Raycast 12、Claude Code 11、tools 4，没有缺 `sources` 或 `related`。它不收 Skills 主线和 AI Toolchain 治理资产，后两者继续走 `Topics｜Skills`、`Topics｜Skills Eval` 和 `Topics｜AI Toolchain`。

其中 `Topics｜Obsidian 资产包` 用来集中复查 Obsidian 主线的底座约束清单、输入入口包和视图共振包；三包都已经有 v0.1 和巡检 checklist，后续继续这条线时优先从这里进入，不要从 Obsidian 宽视图里盲扫。

2026-04-28 Sprint 325 单独复查 `Topics｜Obsidian 资产包`：该视图不是显式路径公式，而是 `obsidian` 标签叠加标题关键词筛选；静态结果为 `OBSIDIAN_ASSETS = 12`，类型为 6 个 query、6 个 synthesis，状态为 6 个 done、6 个 review。缺 `sources = 0`、缺 `related = 0`、缺 `compiled_from = 0`、缺 `llm-wiki` 标签 = 0，`promotion_target` 命中为 6。当前判断：资产包窄视图继续稳定承接底座约束、输入入口和视图共振三包，不改 `.base` 筛选，也不新增 Obsidian Bases / Intake / Canvas 子视图。

`Topics｜Skills` 是 Skills 主线的大视图，承接 skill 价值、渐进式加载、repo-local / 默认层 / 市场分发、触发质量、measurement、eval、个人 AI 基础设施和职业工作流入口等页面。2026-04-28 Sprint 307 静态复查：当前 71 页，类型分布为 28 个 source\_summary、26 个 query、17 个 synthesis；状态为 10 个 done、61 个 review。其中 13 页与 `Topics｜Skills Eval` 重叠，1 页与 `Topics｜AI Toolchain` 重叠，18 页同时带其他工具标签。当前不收窄 `Topics｜Skills`，不新增 `Topics｜Skills Governance` 子视图；继续 Skills 线时，默认主线从这里进，真实触发 / benchmark / measurement 闭环从 `Topics｜Skills Eval` 进。

`Topics｜Skills Eval` 用来集中复查 skills 主题里的触发、测量、benchmark、真实任务样本和 review 闭环。2026-04-27 复查后结果集从 9 页补强到 13 页；2026-04-28 已把 `json-canvas` 下一轮推进到真实旧 Canvas 样本，引用 [[Atlas/Canvas/Claude Code Agent Harness 的 Action Space 设计拆解.canvas]] 并用 validator 支持 `source_canvas_path`。真实 `iteration-004` 首次尝试被 Claude CLI 503 阻断，后续 45 秒最小探针仍 timeout，当前没有可判分 raw Canvas；继续 Skills eval 时先确认最小探针稳定恢复，再跑 `with_skill / baseline` 和人工视觉 review。探针未恢复前，不要每个 heartbeat 重试模型 benchmark；优先转向本地可验证的 review 资产或工作台结果集。

`Topics｜Tools` 是 Raycast / Claude Code / Codex / Obsidian / Skills 五类工具主题的宽联合巡检面。2026-04-28 Sprint 306 静态复查：当前 319 页，类型分布为 143 个 query、101 个 source\_summary、75 个 synthesis；状态为 43 个 done、1 个 draft、275 个 review。它和 `Topics｜Skills Eval` 的重叠是 13 页，和 `Topics｜AI Toolchain` 的重叠只有 4 页，主要是 `obsidian-cli` 证据链；因此当前不把它收窄，也不新增 `Topics｜Tools Governance` 子视图。使用时把它当横向盘点入口，不当待清空队列；具体推进仍优先进入 `Topics｜Raycast`、`Topics｜ClaudeCode`、`Topics｜Codex`、`Topics｜Obsidian`、`Topics｜Skills`、`Topics｜Skills Eval` 或 `Topics｜AI Toolchain`。

`Topics｜Harness` 是 Harness Engineering 主线的持续复查面，当前会接住 [[Atlas/LLM Wiki/Queries/什么时候 agent 失败应该进入 harness ratchet]] 这类新 query。继续 Harness 线时，优先从这里挑真实长任务 harness、coding harness、组织控制论或失败 ratchet 样本；不要再扩近义定义页。2026-04-28 Sprint 289 已把 [[Atlas/LLM Wiki/Queries/哪些 AI Agent 生态材料已经值得进入 harness 约束包]] 从 `draft` 提到 `review`，用 staged-only 验证链、checkpoint / handoff 和 `json-canvas` 外部服务阻断校准长期约束、状态恢复和故障归因边界。Sprint 290 已给 [[Atlas/LLM Wiki/Queries/什么时候 agent 失败应该进入 harness ratchet]] 补入本库近期样本，区分 Base-like 可见层低估任务池这类应进入 ratchet 的系统缺口、`json-canvas` 外部服务阻断这类不应误归因给 skill 的依赖故障，以及 staged-only 验证这类应固定为 checkpoint 前验证链的补救动作；下一步如果继续 Harness，优先补新的可复现失败如何被验证或被规则 / hook / handoff 接住。

Sprint 323 已复查 `Topics｜Harness`：当前 51 页，类型为 concept 1、query 12、source\_summary 33、synthesis 5；状态为 done 5、review 46。缺 `sources = 0`、缺 `related = 0`、缺 `compiled_from = 0`、缺 `llm-wiki` 标签 = 0；已有 `promotion_target` 的页面为 5。当前判断：这条线结构完整，下一步不新增 `Topics｜Harness Ratchet` 或 `Topics｜Coding Harness` 子视图，继续等真实失败、长任务恢复或组织控制论案例。

`Topics｜Search` 是搜索与检索基础设施主线的持续复查面。当前最值得从这里看的不是更多工具清单，而是 [[Atlas/LLM Wiki/Synthesis/检索治理资产的最小清单：共享巡检协议、默认评测模板与更新回放样式如何落地]]、`multiclaw-search-evidence-package-001`、`exa-vector-retrieval-baseline-001`、[[Atlas/LLM Wiki/Queries/业务搜索证据包什么时候才能从种子 case 升级成默认评测 gate]]、[[Atlas/LLM Wiki/Queries/Kubernetes 检索基础设施容量为什么必须先算运行时内存和安全余量]]、[[Atlas/LLM Wiki/Queries/检索索引更新为什么必须把 embedding 缺口变成可回放 gate]]、[[Atlas/LLM Wiki/Queries/检索索引回放为什么必须把写入并发和控制面限流纳入 gate]]、[[Atlas/LLM Wiki/Queries/检索基础设施为什么必须把成本、环境隔离和性能收益一起纳入容量 gate]]、[[Atlas/LLM Wiki/Queries/检索性能退化为什么必须把 QPS、内存压力和 JVM GC 放进同一个观测 gate]]、[[Atlas/LLM Wiki/Queries/检索索引重建为什么必须设计可暂停、可恢复和别名切换 gate]] 和 [[Atlas/LLM Wiki/Queries/业务搜索链路上线前为什么必须用同一批 case 对比成功率、耗时、成本和失败类型]] 这组“默认评测模板 -> 种子 case -> gate 升级条件 -> runtime capacity gate -> embedding coverage gate -> write concurrency gate -> cost / isolation / performance gate -> QPS / GC observability gate -> reindex recoverable replay / alias switch gate -> business-search benchmark close”。2026-04-28 Sprint 389 后复查结果集为 61 页，类型分布为 32 个 query、12 个 source\_summary、17 个 synthesis；相比 Sprint 387 新增的是业务搜索链路 Benchmark 收尾和同批 case / 失败分桶 / close decision gate 样本，属于 Search 线预期增长。Sprint 281 已把检索治理资产页补成“证据缺口优先”口径：Multiclaw 现在有 `sources.jsonl`、`runs/{run_id}` 和 EvalResult 设计契约，但还没有真实 run evidence；Exa 向量 case 也缺具体 query/filter/index 版本和召回/延迟证据。Sprint 282 进一步扫描确认当前工作区没有实际 `sources.jsonl`、`run_log.jsonl`、`eval.json` 或 `runs/` 工件文件。Sprint 382 把 OpenSearch KNN 容量预算接入：向量检索底座必须先算 runtime memory、JVM/native split 和安全余量，再谈扩容、缩容或成本优化。Sprint 383 把 embedding 覆盖缺口接入：向量检索质量异常前，先确认目标对象是否已经进入可检索状态，并把缺口统计绑定到索引版本、embedding 版本、backfill / rebuild 运行证据、失败分桶和关闭复测。Sprint 384 把并发写入限流接入：backfill / rebuild 还必须记录并发预算、控制面限流、退避重试、失败批次、恢复重跑和关闭复测。Sprint 385 把成本 / 容量治理接入：容量 gate 还必须解释成本基线、环境隔离、HA 目标、数据增长、性能收益和缩容 / 关停条件。Sprint 386 把 QPS / GC 观测接入：性能退化必须同时看 QPS、尾延迟、JVM GC、内存压力、拒绝率、merge / circuit breaker 和当前动作。Sprint 387 把 reindex 可恢复回放接入：索引级重建必须同时看异步任务、切片 / 节流、取消 / 降档、幂等重跑、覆盖校验、增量补录、别名切换和收尾恢复。Sprint 389 把业务搜索 benchmark 执行样本候选接入：多条搜索链路上线前必须使用同一批 case，对比成功率、耗时、成本、失败类型、fallback 表现和环境保护；没有 case manifest、run artifact 和最终指标时仍不能升级成默认 gate。继续 Search 线时，先产生或接入真实 run evidence、更新回放样式关闭证据、性能复核关闭证据、benchmark run artifact、默认评测模板执行样本最终指标或重建后质量复测证据，不要继续堆第三条种子 case，也不要继续写同义 embedding 覆盖率、写入并发参数、成本估算、节点规格、JVM / GC 调参、reindex 命令参数或 benchmark 维度页。

`Inbox｜待整理草稿` 是 LLM Wiki draft 队列。2026-04-28 Sprint 317 静态复查：初查 draft 为 27 页，类型为 concept 1、query 12、source\_summary 5、synthesis 9，全部已有 `sources` 和 `related`。唯一 concept draft 是 [[Atlas/LLM Wiki/Concepts/AI 编译层]]；它的定义、来源和工作台承接已稳定，本轮将其从 `draft` 推进到 `review`，并把“待继续确认”改成当前复核口径。复查后 draft 为 26 页，类型为 query 12、source\_summary 5、synthesis 9；剩余多是 Clippings 后段控制页 / 检查表和少量来源摘要，不批量改状态。Sprint 326 继续单页复核早期 query [[Atlas/LLM Wiki/Queries/应如何将新 source 编译进 LLM Wiki]]：该页的流程已经被 `[[_playbook]]`、`[[_schema]]` 和 LLM Wiki 工作台承接，已从 `draft` 推进到 `review`，并补入“先判断是否值得编译 -> source\_summary -> query / synthesis -> 入口回写”的当前口径；复查后 `INBOX_DRAFTS = 25`，类型为 query 11、source\_summary 5、synthesis 9。Sprint 327 继续单页复核早期 source\_summary [[Atlas/LLM Wiki/Source Summaries/Raycast 我最常用的功能 - 源摘要]]：该页已被 Raycast 阅读地图、入门综合页和高频动作 query 承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 24`，类型为 query 11、source\_summary 4、synthesis 9。Sprint 328 继续单页复核 [[Atlas/LLM Wiki/Source Summaries/不同预算程序员的 AI 模型使用分层 - 源摘要]]：该页已被模型阅读地图、AI 编程工具生态阅读地图和模型采用策略 query 承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 23`，类型为 query 11、source\_summary 3、synthesis 9。Sprint 329 继续单页复核 [[Atlas/LLM Wiki/Source Summaries/Gemini CLI 自动退出问题 - 源摘要]]：该页已被 [[Atlas/LLM Wiki/Synthesis/Agent-ready interface：从 CLI 到 Browser]] 和 [[Atlas/LLM Wiki/Synthesis/AI 工具链 阅读地图]] 承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 22`，类型为 query 11、source\_summary 2、synthesis 9。Sprint 330 继续单页复核 [[Atlas/LLM Wiki/Source Summaries/视频疲劳 - 源摘要]]：该页已被 PKM 阅读地图、内容生产链和 YouTube 来源采集边界 query 承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 21`，类型为 query 11、source\_summary 1、synthesis 9。Sprint 331 继续单页复核 [[Atlas/LLM Wiki/Source Summaries/From Hierarchy to Intelligence - 源摘要]]：该页已被 AI 产品组织来源、AI-first strategy 来源和个人 AI 使用路径综合页承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 20`，类型为 query 11、synthesis 9，source\_summary draft 已清到 0。Sprint 332 继续单页复核 [[Atlas/LLM Wiki/Queries/个人网络边界最小检查清单是什么]]：该页已被个人网络边界检查表、Clippings 后段再启动规则和数字花园身份线索检查承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 19`，类型为 query 10、synthesis 9。

Sprint 333 继续单页复核 [[Atlas/LLM Wiki/Queries/个人 AI 账号基础设施最小清单是什么]]：该页已被个人 AI 账号基础设施检查表、Clippings 后段再启动规则和数字花园身份线索检查承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 18`，类型为 query 9、synthesis 9。

Sprint 334 继续单页复核 [[Atlas/LLM Wiki/Queries/内容生产链发布前最小检查清单是什么]]：该页已被内容生产链发布前检查表、PKM 阅读路径和数字花园发布边界承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 17`，类型为 query 8、synthesis 9。

Sprint 335 继续单页复核 [[Atlas/LLM Wiki/Queries/桌面浏览器编辑器配置进入个人操作面的最低门槛是什么]]：该页已被个人操作面配置检查表、Clippings 后段再启动规则和个人操作面执行形态承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 16`，类型为 query 7、synthesis 9。

Sprint 336 继续单页复核 [[Atlas/LLM Wiki/Queries/生活健康消费材料进入 LifeOS 的最低门槛是什么]]：该页已被 LifeOS 材料进入门槛检查表、PKM 阅读地图和 LifeOS 工作台承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 15`，类型为 query 6、synthesis 9。

Sprint 337 继续单页复核 [[Atlas/LLM Wiki/Queries/Clippings 里的生活健康消费材料什么时候值得处理]]：该页已被 LifeOS 最低门槛 query、LifeOS 材料进入门槛检查表、PKM 阅读地图和 Clippings 后段规则承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 14`，类型为 query 5、synthesis 9。

Sprint 338 继续单页复核 [[Atlas/LLM Wiki/Queries/Clippings 里的账号福利和羊毛材料什么时候值得处理]]：该页已被个人 AI 账号基础设施最小清单、个人 AI 账号基础设施检查表、数字花园身份线索检查和 Clippings 后段规则承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 13`，类型为 query 4、synthesis 9。

Sprint 339 继续单页复核 [[Atlas/LLM Wiki/Queries/Clippings 里的网络代理和 DNS 材料什么时候值得起主题]]：该页已被个人网络边界最小检查清单、个人网络边界检查表、数字花园发布身份线索检查和 Clippings 后段规则承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 12`，类型为 query 3、synthesis 9。

Sprint 340 继续单页复核 [[Atlas/LLM Wiki/Queries/Clippings 里的桌面浏览器和编辑器配置什么时候值得处理]]：该页已被个人操作面配置进入门槛 query、个人操作面配置检查表、个人操作面执行形态和 Raycast 阅读地图承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 11`，类型为 query 2、synthesis 9。

Sprint 341 继续单页复核 [[Atlas/LLM Wiki/Queries/Clippings 里的内容制作、模型安全和开发部署碎片什么时候值得处理]]：该页已被内容生产链发布前检查表、AI coding demo 后最小运行责任检查表、模型主题阅读地图和 Clippings 后段规则承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 10`，类型为 query 1、synthesis 9。

Sprint 342 继续单页复核 [[Atlas/LLM Wiki/Queries/哪些 AI Agent 生态材料已经值得进入编排角色草图]]：该页已被 Agent Orchestration 阅读地图、角色分工清单 query、Agent 编排案例形态和主分工页承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 9`，类型为 synthesis 9，query draft 已清到 0。

Sprint 343 继续单页复核 [[Atlas/LLM Wiki/Synthesis/个人网络边界检查表]]：该页已被个人网络边界最小检查清单、网络代理 DNS Clippings 规则、Clippings 后段再启动规则和数字花园发布身份线索检查承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 8`，类型为 synthesis 8。

Sprint 344 继续单页复核 [[Atlas/LLM Wiki/Synthesis/个人 AI 账号基础设施检查表]]：该页已被个人 AI 账号基础设施最小清单、账号福利羊毛 Clippings 规则、Clippings 后段再启动规则和数字花园身份线索检查承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 7`，类型为 synthesis 7。

Sprint 345 继续单页复核 [[Atlas/LLM Wiki/Synthesis/个人操作面配置检查表]]：该页已被个人操作面配置进入门槛、桌面浏览器编辑器 Clippings 规则、个人操作面执行形态和 Clippings 后段再启动规则承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 6`，类型为 synthesis 6。

Sprint 346 继续单页复核 [[Atlas/LLM Wiki/Synthesis/LifeOS 材料进入门槛检查表]]：该页已被 LifeOS 最低门槛 query、生活健康消费 Clippings 规则、Clippings 后段再启动规则、PKM 阅读地图和 LifeOS 工作台承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 5`，类型为 synthesis 5。

Sprint 347 继续单页复核 [[Atlas/LLM Wiki/Synthesis/内容生产链发布前检查表]]：该页已被内容生产链发布前最小检查清单、内容生产链子层、数字花园发布边界和内容制作 / 模型安全 / 开发部署暂缓池规则承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 4`，类型为 synthesis 4。

Sprint 348 继续单页复核 [[Atlas/LLM Wiki/Synthesis/Clippings 后段再启动规则：什么时候恢复处理剩余来源]]：该页已被后段收束入口、暂缓池总览、阶段完成快照、剩余 58 路由清单和六条门槛 / 检查表承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 3`，类型为 synthesis 3。

Sprint 349 继续单页复核 [[Atlas/LLM Wiki/Synthesis/Clippings 暂缓池分流总览：哪些材料继续留池，哪些值得起主题]]：该页已被后段再启动规则、阶段完成快照、剩余 58 路由清单、六类专项规则 / 检查表和旧队列记录承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 2`，类型为 synthesis 2。

Sprint 350 继续单页复核 [[Atlas/LLM Wiki/Synthesis/Clippings 后段阶段完成快照：P86-P99 收束结果]]：该页已被后段收束入口、暂缓池分流总览、后段再启动规则、剩余 58 路由清单、LLM Wiki 工作台和 roadmap 追踪面承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 1`，类型为 synthesis 1。

Sprint 351 继续单页复核 [[Atlas/LLM Wiki/Synthesis/Clippings 剩余 58 路由清单]]：该页已被阶段完成快照、后段再启动规则、暂缓池分流总览、旧队列记录和 `Synthesis｜Clippings 路由与再启动` 工作台窄视图承接，已从 `draft` 推进到 `review`；复查后 `INBOX_DRAFTS = 0`。当前判断：draft inbox 已阶段性清零，但这只是控制页有效性复核，不恢复 Clippings 逐篇 ingest，不新增 source\_summary，也不修改 `.base` 筛选。

`Sources｜源摘要` 是 source\_summary 层的总入口，只按 `type == "source_summary"` 收全量源摘要。2026-04-28 Sprint 314 静态复查：当前 266 页，状态为 261 个 review、5 个 draft；缺 `sources = 0`、缺 `compiled_from = 0`、缺 `related = 0`，`promotion_target` 命中为 0，符合 source\_summary 默认不承担 promotion 的口径。复查发现 [[Atlas/LLM Wiki/Source Summaries/README - 源摘要]] 与 [[Atlas/LLM Wiki/Source Summaries/AboutTheGarden - 源摘要]] 两个早期源摘要缺 `llm-wiki` 标签，已最小补齐并更新 `modified`；复查后源摘要层缺 `llm-wiki` 标签为 0。Sprint 327 将 [[Atlas/LLM Wiki/Source Summaries/Raycast 我最常用的功能 - 源摘要]] 从 `draft` 推进到 `review` 后，source\_summary draft 从 5 降到 4；该页不补 `promotion_target`，因为它作为来源摘要已经通过 `sources / compiled_from / related` 进入 Raycast 主题链。Sprint 328 将 [[Atlas/LLM Wiki/Source Summaries/不同预算程序员的 AI 模型使用分层 - 源摘要]] 从 `draft` 推进到 `review` 后，source\_summary draft 从 4 降到 3；该页同样不补 `promotion_target`，因为稳定价值是补料证据而不是待回桥行动。Sprint 329 将 [[Atlas/LLM Wiki/Source Summaries/Gemini CLI 自动退出问题 - 源摘要]] 从 `draft` 推进到 `review` 后，source\_summary draft 从 3 降到 2；该页不补 `promotion_target`，因为稳定价值是 CLI 运行面故障的可诊断性样本，具体 `settings.json` 参数仍需按当前 Gemini CLI 版本复核。Sprint 330 将 [[Atlas/LLM Wiki/Source Summaries/视频疲劳 - 源摘要]] 从 `draft` 推进到 `review` 后，source\_summary draft 从 2 降到 1；该页不补 `promotion_target`，因为稳定价值是输入密度与视频采集边界样本，而不是待回桥行动。Sprint 331 将 [[Atlas/LLM Wiki/Source Summaries/From Hierarchy to Intelligence - 源摘要]] 从 `draft` 推进到 `review` 后，source\_summary draft 从 1 降到 0；该页不补 `promotion_target`，因为稳定价值是组织侧补料证据，不是待回桥行动。当前不改 `.base` 筛选，也不新增 source\_summary lint 子视图。

`Knowledge｜概念与实体` 是 LLM Wiki 概念 / 实体层的总入口，只收 `type == "concept"` 或 `type == "entity"`。2026-04-28 Sprint 315 静态复查：当前 6 页，包括 5 个 concept、1 个 entity；状态为 review 3、done 2、draft 1。缺 `sources = 0`、缺 `compiled_from = 0`、缺 `related = 0`，`promotion_target` 命中为 2。复查发现 [[Atlas/LLM Wiki/Concepts/数字花园]]、[[Atlas/LLM Wiki/Concepts/AI 编译层]]、[[Atlas/LLM Wiki/Concepts/第二大脑]] 与 [[Atlas/LLM Wiki/Entities/oldwinter]] 四个早期概念 / 实体缺 `llm-wiki` 标签，已最小补齐并更新 `modified`；复查后知识层缺 `llm-wiki` 标签为 0。当前不改 `.base` 筛选，也不新增 concept / entity lint 子视图。

`Lint｜缺来源/缺链接/弱连接` 是 LLM Wiki 的结构卫生总视图，用来同时看缺 `sources`、缺 `related`、弱入链和待晋升项。2026-04-28 Sprint 316 静态复刻：初查 `ALL_NON_NOTE = 1031`，`LINT_ALL = 1`，其中缺来源 0、缺相关链接 0、待晋升 0、弱连接 1；唯一候选是 [[Atlas/LLM Wiki/Queries/哪些 skill 已经值得进入实验市场清单]]。它已经有来源和 related，真实问题是 [[Atlas/LLM Wiki/Synthesis/Skills 阅读地图]] 的“可复用的案例层”段落提到实验市场清单但没有链接实际 query。本轮只把该 query 补入阅读地图列表，复查后 `LINT_ALL = 0`。当前不改 `.base` 公式，也不新增 lint 子视图。

`Topics｜AI Coding Tools` 是 AI 编程工作面的大视图，也会接住 Automated Testing / 原型验证与验收治理这批页面。当前 Automated Testing 线已经有 [[Atlas/LLM Wiki/Synthesis/原型验证与验收治理 阅读地图]]、[[Atlas/LLM Wiki/Synthesis/验证治理资产的最小工件包：共享巡检协议、固定 job 骨架与 handoff 模板如何落地]]、[[Atlas/LLM Wiki/Queries/Markdown 增量验证链哪些部分值得脚本化，哪些应该留在 handoff]]、[[Atlas/LLM Wiki/Source Summaries/Apifox T0 门禁测试 - 源摘要]]、[[Atlas/LLM Wiki/Queries/CI-CD 更新后为什么必须先跑 T0 门禁用例再扩大验收]] 和只读 helper [[Extras/Scripts/py-scripts/check_changed_markdown.py]]；继续这条线时先找真实失败样本、T0 gate 执行报告 / 关闭证据或 helper 输出问题，不要为了“有主题”新增 `Topics｜Automated Testing` 窄视图。2026-04-28 Sprint 388 后，`Topics｜AI Coding Tools` 当前 124 页，Automated Testing / 验证治理核心子集约 28 页，仍然能由大视图解释，不需要新增窄视图。

2026-04-28 已给 [[Atlas/LLM Wiki/Synthesis/AI 编程工作面默认的案例校验：项目记忆、验证链与 builder 退出如何反证上浮边界]] 补入本库近期实证样本：文件化 roadmap / handoff 说明项目记忆应该外化但具体路径属于 repo-local，`check_changed_markdown.py` staged-only 验证说明通用门禁和本库语义要分层，`json-canvas` iteration-004 的 Claude CLI 503 阻断说明 builder / generator 结果必须退出到 validator、aggregator 和人工 review，外部服务故障不能伪装成 skill 失败。继续 AI Coding Tools 线时，优先找新的真实失败样本或跨 repo 复用证据，不要把本库 runner 细节直接上浮成所有 AI 编程工作面的默认。

2026-04-28 已把 [[Atlas/LLM Wiki/Synthesis/AI coding demo 后最小运行责任检查表]] 和 [[Atlas/LLM Wiki/Queries/AI coding 做完 demo 后最小运行责任清单是什么]] 从 `draft` 提到 `review`：本库 staged-only 验证、发布 preflight / redaction gate、`json-canvas` iteration-004 的 503 与后续 45 秒探针超时，分别校准了观测 / 退场、部署 / 配置 / 数据、任务 / 观测三类运行责任。继续 AI Coding Tools 线时，优先补真实小工具从 demo 到长期运行的闭环证据；不要把这两页直接改成跨项目通用模板。

`Topics｜Models` 是模型主题的大视图，承接底层模型能力、后训练体感、供应商 / 产品 / 工作面分层、2025 模型世界观、评测入口和真实采用策略。2026-04-28 静态复查：当前 59 页，类型分布为 23 个 query、18 个 source\_summary、18 个 synthesis；其中 12 页已 `done`，47 页仍为 `review`。结果集覆盖模型归因、选型顺序、产品封装、工作面入口、RLVR / Software 3.0 / 开放模型、tokenizer 旁证和预算 / 任务粒度 / 工作面分层，不需要新增 `Topics｜Models 2025` 或 `Topics｜Model Eval` 子视图。继续 Models 线时，优先补真实供应商约束清单、产品封装清单或工作面入口清单的案例证据，不要回到模型排行榜平铺。

`Topics｜Orchestration` 是 Agent Orchestration / agent-ready interface / runtime artifact / quality gate 的大视图。2026-04-28 静态复查：当前 59 页，类型分布为 22 个 query、22 个 source\_summary、15 个 synthesis；其中 5 页已 `done`，54 页仍为 `review`。结果集覆盖 agent-ready surface、CLI / browser 执行面、角色分层、评审收口、主链状态机、Run Manager / Review Hook / Artifact Manager、eval gate、runtime memory 和 MCP / context engineering，不需要新增 `Topics｜Orchestration Runtime` 或 `Topics｜Agent Quality Gate` 子视图。Sprint 292 已给 [[Atlas/LLM Wiki/Queries/什么时候编排层已经该收成 Run Manager、Review Hook 与 Artifact Manager，而不是继续停在多 agent 想象]] 补入本库连续 roadmap 执行样本：`task_plan / progress / findings`、90 天 roadmap、execution plan 与 git checkpoint 对应 Run Manager；frontmatter validator、diff check、staged-only 语义检查和人工确认边界对应 Review Hook；LLM Wiki、Bases 控制台、roadmap、worklog、daily memory 与 git commit 对应 Artifact Manager。Sprint 293 已新增 [[Atlas/LLM Wiki/Queries/个人电脑作为 agent runtime 时，哪些权限必须默认隔离，哪些能力可以安全开放]]，把 personal computer runtime 样本接到权限分层：只读上下文、可逆本地改动、登录态、外部副作用、凭据支付和破坏性动作必须拆开处理。Sprint 294 已在 [[Atlas/LLM Wiki/Queries/什么时候 agent 产品主链路该先固化阶段产物和状态机，而不是追求自治 agent]] 补入阶段产物数据契约：Chat / Search / Enrich / Outreach / Approval / Follow / Eval 每段都要有最小产物、稳定字段和不变量。Sprint 295 已在 [[Atlas/LLM Wiki/Queries/什么时候 agent runtime 的记忆应该从对话上下文升级为可回放运行工件]] 补入恢复路径 / 人工接管样本：每个阶段要能指出最近安全产物、待处理人工决策、fallback、下一道 verifier 和 replay 入口。继续 Orchestration 线时，优先补真实恢复路径、人工兜底或新的数据契约样本，不要退回多 agent 想象、抽象框架清单，也不要为了这些样本另起通用 runtime、安全清单工作台或 schema registry。

`AI 工作流工作台` 是路线图 Phase 2 的第一个工作台化增量，用来把 `Claude Code / Codex / Skills / Harness / Agent-ready interface / Agent Orchestration` 这些已经在 LLM Wiki 中成熟的 AI 工作流主题，收成可巡检的操作面。

当前视图按决策面分组：

- `入口｜阅读地图与总览`
- `执行面｜Claude Code`
- `执行面｜Codex`
- `执行资产｜Claude+Codex`
- `能力层｜Skills`
- `系统层｜Harness`
- `接口与编排｜Agent-ready`
- `治理｜主分工与回桥`
- `待处理｜弱连接与待晋升`

其中 `执行资产｜Claude+Codex` 是 Claude Code / Codex 执行资产包的主复查面。当前结果集预期命中 10 页：6 个核心资产包 query、2 个“继续回桥主阅读路径”支撑 query、2 个案例形态 synthesis。6 个核心资产包 query 都已经有 v0.1、巡检 checklist，并补入了本库案例或边界案例：

- Claude Code：长期执行包、团队接力包、组织 rollout 清单
- Codex：任务准备清单、远程执行清单、默认推进清单

接手这条线时，不要继续抽象讨论“AI 编程工具怎么用”，也不要继续给六个清单补同类案例。案例质量复查已经完成，六类证据形态都足够；结果集质量复查也已确认当前 10 页命中合理，暂不需要改 `.base` 过滤、字段或排序。后续只有新增新的执行资产包或支撑页时，再复查这个视图是否需要调整。

当前这个工作台已经不只是 `draft / lint / topics`：

- 还有 `Synthesis｜全部综合页`
- `Sources｜源摘要`
- `Knowledge｜概念与实体`
- `Synthesis｜工具主线`
- `Synthesis｜系统与治理`
- `Synthesis｜核心方法论`
- `Queries｜全部问题页`
- `Queries｜跨主题高价值`
- `Cross-theme｜核心原则`

`Synthesis｜全部综合页` 是 LLM Wiki synthesis 层的总入口，只按 `type == "synthesis"` 收全量综合页。2026-04-28 Sprint 312 静态复查：当前 268 页，状态为 155 个 done、104 个 review、9 个 draft；缺 `sources` 为 0、缺 `related` 为 0，已有 `promotion_target` 的 synthesis 为 155 页。标签命中前列为 Kubernetes 46、AI Coding Tools 30、AI Toolchain 25、Obsidian 22、PKM 20、Models 18、Skills 17、Orchestration 15、Prompt Engineering 14。当前判断：综合层整体结构干净，总入口适合做全量巡检，不是待清空队列；具体推进仍回到 `Synthesis｜工具主线`、`Synthesis｜系统与治理`、`Synthesis｜方法与基础设施` 或单主题视图。

`Sources｜源摘要` 是 LLM Wiki source\_summary 层的总入口，只按 `type == "source_summary"` 收全量源摘要。2026-04-28 Sprint 314 静态复查：当前 266 页，状态为 261 个 review、5 个 draft；缺 `sources = 0`、缺 `compiled_from = 0`、缺 `related = 0`，`promotion_target` 命中为 0。两个早期源摘要缺 `llm-wiki` 标签已最小补齐，复查后源摘要层缺 `llm-wiki` 标签为 0。当前判断：源摘要层结构完整，总入口适合巡检来源覆盖和抽样，不适合把 261 个 review 当作清空队列。

`Knowledge｜概念与实体` 是 LLM Wiki concept / entity 层的总入口。2026-04-28 Sprint 315 静态复查：当前 6 页，类型为 5 个 concept、1 个 entity；状态为 review 3、done 2、draft 1；缺 `sources = 0`、缺 `compiled_from = 0`、缺 `related = 0`，已有 `promotion_target` 的知识页为 2 页。四个早期概念 / 实体缺 `llm-wiki` 标签已最小补齐，复查后知识层缺 `llm-wiki` 标签为 0。当前判断：这一层规模很小且结构完整，总入口适合关系巡检，不需要新增 concept / entity lint 子视图。

`Queries｜全部问题页` 是 LLM Wiki query 层的总入口，只按 `type == "query"` 收全量问题页。2026-04-28 Sprint 313 静态复查：当前 491 页，状态为 473 个 review、12 个 draft、6 个 done；缺 `sources` 为 0、缺 `related` 为 0，已有 `promotion_target` 的 query 为 6 页。复查发现 1 个早期 query 缺 `llm-wiki` 标签，已给 [[Atlas/LLM Wiki/Queries/应如何将新 source 编译进 LLM Wiki]] 最小补齐标签并更新 `modified`；复查后 query 层缺 `llm-wiki` 标签为 0。全量 query 入口适合做问题池巡检和抽样，不适合把 473 个 review 当作待清空 backlog。

`Synthesis｜系统与治理` 是系统层 synthesis 入口，当前只收 `type: synthesis` 且带 `skills / orchestration / models` 标签的页面。2026-04-28 Sprint 309 静态复查：当前 49 页，状态为 27 个 done、22 个 review；标签命中为 Models 18、Skills 17、Orchestration 15。复查时发现 [[Atlas/LLM Wiki/Synthesis/Skill 触发与测量闭环：description、undertrigger、measurement 与 eval 如何接力]] 缺 `sources`，已按已有 `compiled_from` 最小补齐；复查后缺 `sources = 0`、缺 `related = 0`。当前不改 `.base` 筛选，不新增系统治理子视图。

新增 `Topics｜...` 视图时不要只因为“有几篇相关 note”就扩工作台。当前维护门槛是：主题已经有 reading map / 主分工 / 回桥规则之一，或已有 8 页以上稳定页面，或现有标签历史不一致导致已有视图明显漏掉结果；否则先用已有视图或补标签。

`Synthesis｜成熟主题骨架` 是已经进入主分工 / 回桥规则阶段的主题巡检面。2026-04-28 静态复查：当前 43 页，其中主分工 13 页、回桥规则 30 页；状态为 39 个 done、4 个 review。4 个 review 主要是主题成熟度、方法与基础设施共享主分工 / 回桥规则等控制面页面，不是待回桥悬挂。当前不改 `.base` 筛选；继续成熟主题线时，优先处理 review 控制页是否仍然有效，或挑 done 的主题骨架补真实案例证据，不要再新建近义主分工页。

2026-04-28 已复查这 4 个 review 控制页：2 个主题成熟度页已经被 `_index`、`_playbook` 和 `_overview` 接住，2 个方法与基础设施共享骨架页已经被方法与基础设施覆盖总览、AI 编程工具生态、AI 工具链、Agent Orchestration 和 PKM 阅读地图接住。它们不是待回桥页面，也不是状态遗漏；当前继续保留 `status: review` 和空 `promotion_target`，不为了让结果集全绿而改成 `done`。

`Synthesis｜回桥规则` 公式当前命中 32 页，其中 2 页是主题成熟度方法 / 快照页，因为文件名包含“回桥规则”；语义上真实的回桥规则页是 30 页。2026-04-28 复查后确认：真实回桥规则页里 29 页为 `done` 且已有 `promotion_target`，剩余 1 页是方法与基础设施共享回桥规则控制页，继续保留 `review`。当前不改 `.base`；如后续需要严格队列，再考虑给控制页和真实规则页拆视图。

`Synthesis｜主分工` 也呈现同一模式：公式当前命中 13 页，其中 2 页是主题成熟度方法 / 快照页；语义上真实的主分工页是 11 页。2026-04-28 复查后确认：真实主分工页里 10 页为 `done` 且已有 `promotion_target`，剩余 1 页是方法与基础设施共享主分工控制页，继续保留 `review`。当前不改 `.base`；如后续需要严格队列，再考虑给真实主分工页拆窄视图。

2026-04-28 已复查成熟骨架后面的案例证据池：按标题命中 `案例形态 / 案例校验 / 最小清单 / 检查表 / 证据` 的 synthesis 共 40 页，其中 `done=27`、`review=7`、`draft=6`，且 27 个 `done` 都已有 `promotion_target`。这说明成熟骨架并不是缺少案例承接；下一步更适合挑 `review / draft` 资产做真实证据补强，而不是继续新增同义案例页或拆更多工作台视图。

2026-04-26 复查结果：`Topics｜Intake` 当前 22 页，`Topics｜Search` 当前 46 页，`Topics｜Digital Garden` 当前 33 页；三者都有可解释结果集，本轮不改筛选条件。Intake 视图从旧记录的 10 页增长到 22 页，是因为公开采集回放、操作型 docs、入库模板和稍后读模板校验已经形成一组稳定 query / source\_summary / synthesis，不是误收。2026-04-28 复查 `Topics｜Intake` 为 23 页，类型分布为 14 个 query、5 个 source\_summary、4 个 synthesis；新增交叉主要来自业务搜索证据包 gate query 带入 `intake`，属于搜索证据包进入输入证据链的合理边界，不改筛选条件。2026-04-28 复查 `Topics｜Digital Garden` 为 35 页，类型分布为 1 个 concept、25 个 query、5 个 source\_summary、4 个 synthesis；结果集主要围绕数字花园发布层、公开边界、P0 manifest / redaction gate、内容级脱敏和网络边界检查，属于预期承载范围，不改筛选条件。后续优先改结果集准确性、排序、字段或入口说明，少加新视图。

最近又补出了新一批主题视图：

- `Topics｜PKM`
- `Topics｜AI Toolchain`
- `Topics｜Intake`
- `Topics｜Search`
- `Topics｜Digital Garden`
- `Topics｜Prompt`
- `Topics｜Prompt 工作台资产`
- `Topics｜AI Coding Tools`
- `Topics｜Kubernetes`

以及两组更适合继续推进这批新主题的工作视图：

- `Synthesis｜方法与基础设施`
- `Queries｜方法与基础设施`

`Synthesis｜方法与基础设施` 是方法论、生态与基础设施主题的宽 synthesis 入口，只收 `type: synthesis` 且带 `pkm / ai-toolchain / prompt-engineering / ai-coding-tools / kubernetes` 标签的页面。2026-04-28 Sprint 310 静态复查：当前 135 页，状态为 91 个 done、43 个 review、1 个 draft；标签命中为 Kubernetes 46、AI Coding Tools 30、AI Toolchain 25、PKM 20、Prompt Engineering 14；缺 `sources` 为 0、缺 `related` 为 0。它是跨方法 / 基础设施 synthesis 巡检面，不是待清空队列；当前不改 `.base` 筛选，不新增方法基础设施子视图。继续这条线时，优先从真实证据、失败样本、运行面案例或主题间共享骨架补强，不回到泛方法名词或视图拆分。

`Queries｜方法与基础设施` 是同一组方法 / 基础设施主题的问题池，只收 `type: query` 且带 `pkm / ai-toolchain / prompt-engineering / ai-coding-tools / kubernetes` 标签的页面。2026-04-28 Sprint 311 静态复查：当前 279 页，状态为 277 个 review、1 个 done、1 个 draft；标签命中为 Kubernetes 70、AI Coding Tools 69、AI Toolchain 58、PKM 54、Prompt Engineering 30，只有 2 页同时命中多个本组标签；缺 `sources` 为 0、缺 `related` 为 0。它适合按主题抽样找高复用问题，不适合当作 279 个待清空事项；当前不改 `.base` 筛选，不新增 query 子视图。

其中 `Topics｜AI Toolchain` 是 AI 工具链治理的大视图。2026-04-28 Sprint 304 静态复查：当前 100 页，类型分布为 58 个 query、17 个 source\_summary、25 个 synthesis；状态为 17 个 done、1 个 draft、82 个 review。结果集覆盖接口治理、局部自治包、平台试错、repo-local runner、组织默认 / repo-local 覆盖、旁路登记 / 回收、AI coding 工作面、software-for-one 上浮和 agent-ready surface，属于合理宽视图；当前不新增 `Topics｜AI Toolchain Governance`、`Topics｜MCP` 或 `Topics｜Software for One` 子视图。继续 AI Toolchain 线时，优先补真实治理资产流转、runner 抽取或接口生命周期案例，不要继续堆工作面榜单、MCP 总论或同义工具清单。Sprint 283 已给 [[Atlas/LLM Wiki/Synthesis/AI 工具链治理资产的最小清单：接口治理清单、局部自治包与平台试错清单如何落地]] 补首批本库样本：changed Markdown helper、`json-canvas` / `obsidian-bases` eval runner 属于局部自治包；`obsidian-cli` 先作为接口治理候选，后续看权限边界和审计证据再决定是否上提。Sprint 296 已把 `check_changed_markdown.py` 进一步校准为 staged-only verifier 型 repo-local runner：它可复跑、可 review、默认只读，但强绑定本库 Markdown / frontmatter / roadmap 回写语义，继续留在局部自治包。Sprint 297 已把 `.omx`、`.trellis` 和可见 `tmp/` 退役校准为局部旁路安全回收样本：确认退役后移除调用点或默认输出，更新入口文档，同时保留 `.gitignore` guard 防止旧状态误入仓库。Sprint 298 已把 `obsidian-cli` 补成 source-summary-backed interface lifecycle 样本：默认只读、scoped mutating 和高权限确认三层需要分开治理。Sprint 299 已把该样本继续压成允许 / 确认 / 禁止动作清单；Sprint 300 已补失败回放最小事实，把 Base CLI 状态耦合、Base 可见层低估任务池和 active-file 写入漂移收成回放模板；Sprint 301 已补 lifecycle owner、复核周期和撤销 / 降级条件；Sprint 302 已补 live command surface、限定路径 search 成功和 Base active-file 耦合的只读证据；Sprint 303 已补 Ruby/YAML fallback verifier，确认 LLM Wiki 工作台 46 个 views 与 `Topics｜AI Toolchain` 视图存在；Sprint 304 已确认 4 个 `obsidian-cli` 证据页都落在 `Topics｜AI Toolchain` 结果集里；Sprint 353 已把项目推进工作台可见层低估任务池写成第二条真实 failure replay：严格 YAML / Base-like 可见层只有 `10` 条 project-related active task 和 `0` 条 Linear 元数据债务，容错字段扫描仍有 `43` 条 active task 与 `33` 条 Linear 元数据待补。下一步优先补人工确认记录或跨 repo 复用证据；Base / task 结果继续配 fallback verifier 使用。

其中 `Topics｜PKM` 是数字花园、第二大脑和个人知识管理方法论的大视图。2026-04-28 静态复查：当前 97 页，类型分布为 54 个 query、23 个 source\_summary、20 个 synthesis；状态为 16 个 done、3 个 draft、78 个 review。结果集覆盖数字花园公开边界、维护成本、第二大脑 / AI 第二大脑、系统联动、流程入口、内容生产链、任务出口、长期回写和可编排学习台，属于合理宽视图；当前不新增 `Topics｜PKM Execution`、`Topics｜Second Brain` 或 `Topics｜Content Chain` 子视图。继续 PKM 线时，优先补真实系统分层、维护成本、SOP / 模板晋升或长期回写案例，不要回到泛 PKM 方法名词和工具榜单。

2026-04-28 已给 [[Atlas/LLM Wiki/Synthesis/PKM 的案例形态：系统联动清单、执行出口清单与长期回写清单如何分工]] 补入本库近期实证样本：四个工作台和 Quickstart 对应系统联动清单，发布 preflight / 项目日期债务确认卡 / LifeOS 周记 / 入链审计对应执行出口清单，LLM Wiki promotion、roadmap worklog、daily memory 和 Bases 控制台对应长期回写清单。继续 PKM 线时，优先找新的真实系统分层、维护成本或 SOP / 模板晋升样本；不要新增 PKM 子视图或继续堆方法名词。

其中 `Topics｜Kubernetes` 是 Kubernetes / 云原生生产运行面的大视图。2026-04-28 按工作台实际筛选口径复算：当前 181 页，类型分布为 98 个 query、37 个 source\_summary、46 个 synthesis；状态为 37 个 done、144 个 review。结果集覆盖学习面 vs 生产运行面、容器化前置层、声明式交付、运行时治理、可观测反馈闭环、AWS 底座、LLM 推理 serving、多集群 drift / 例外治理、端到端可靠交付、生产迁移回滚、schema migration 兼容窗口、staging / prod 配置差异归属、Kargo / GitOps / ArgoCD 回滚控制面、请求扇出 / 后台任务 / 依赖初始化容量事故、Terraform / IaC 生产变更的 blast radius / saved plan / 回滚路径 gate、新集群上线前的门槛用例 / 外部依赖 / 日志告警预演、OpenSearch KNN / 向量检索运行时内存容量 gate、迁移演练问题到回滚入口清单、节点池更换 runbook、队列清零 / 下游追平 gate、PVC / 存储切换 gate、上线前压力与稳定性验收链、LLM 推理服务扩容压测的并发档位 / 数据集隔离 / fallback 容量 gate、生产事故里的依赖瓶颈 / 观测缺口复盘、事故 action item 回写到容量 / 观测 / 隔离 / 演练 / runbook gate、运维交接中的故障演练 / 手动恢复路径、Service Mesh 降级后的 sidecar 生命周期 / 服务发现路径验收、API Gateway 下游卡顿后的 in-flight / 内存 / 背压 gate、长连接服务自动扩容失效、零停机发布的 Endpoint 摘除 / 连接耗尽、监控组件下线前的告警覆盖 / 残留资源验收、监控组件自身的容量 / 隔离 / 回退验收、Istio / Gateway 灰度发布的真实流量路径验收、Nginx Ingress 超时的真实请求链路 / 客户端中断语义验收、gRPC / HTTP2 长连接下的真实 RPC 负载分布验收、托管集群升级后的核心组件 / 外部服务解析路径验收，以及与搜索 / 检索基础设施的交叉。当前不新增 `Topics｜Kubernetes Runtime`、`Topics｜Kubernetes Multi-cluster` 或 `Topics｜Kubernetes Observability` 子视图；Search / Retrieval 已有独立视图，Kubernetes 视图继续保留共享底座交叉。继续 Kubernetes 线时，优先补发布后的观测 / 降级证据、真实回滚失败回放或新的容量 gate 执行证据，不要回到 K8s 概念教程、云服务清单或同义 MDU / schema / overlay / runbook / 队列清零 / PVC gate / 压测 SLO / 推理容量压测 / 托管责任 / 自动扩容 / 零停机 / 监控下线 / 监控上线 / 灰度路径 / Ingress 超时 / gRPC LB / 故障演练 / 回滚 checklist / GitOps 回滚控制面 / 事故复盘模板 / 事故 action item / Service Mesh 降级 / API Gateway 背压 / 请求扇出 / 依赖初始化 / Terraform targeted plan / saved plan / 新集群上线门槛 / OpenSearch KNN 内存预算原则页。

其中 `Topics｜Prompt` 是 Prompt Engineering / context engineering / prompt eval 的大视图。2026-04-28 静态复查：当前 57 页，类型分布为 30 个 query、13 个 source\_summary、14 个 synthesis；状态为 5 个 done、52 个 review。结果集覆盖控制杆分层、问题定义、zero / one / few-shot、system prompt / repo rule / skill 分工、context loader、memory、judge、measurement、gold tasks、失败样本和记忆污染；`Topics｜Prompt 工作台资产` 已承担控制杆清单、承载层清单和失败回放清单的窄视图，所以当前不新增 `Topics｜Prompt Eval`、`Topics｜Context Engineering` 或 `Topics｜Prompt Memory` 子视图。继续 Prompt 线时，优先补真实失败样本、gold task、context loader 问题或已验证承载层模板，不要回到 prompt 技巧清单。

2026-04-28 Sprint 291 已给 [[Atlas/LLM Wiki/Queries/哪些动态局部材料最适合稳定交给 context loader，而不该继续手贴]] 补入本库近期校准：`继续 roadmap` 这类任务里，最新 checkpoint / git status、当天 memory 与 worklog 尾部、当前目标主题的窄控制面更适合进入 context loader；根 `AGENTS.md`、playbook 和 skill 说明仍属 repo rule / skill，稳定画像和长期偏好仍属 memory。继续 Prompt 线时不要把这些材料重新塞进更长 prompt，而要继续区分装载时机和承载层。

其中 `Topics｜Prompt 工作台资产` 是 Prompt 主题从技巧库进入可执行资产层后的窄视图，当前集中复查 7 页：案例形态、最小清单、晋升规则、控制杆清单、承载层清单、控制杆到承载层晋升、失败回放清单。继续 Prompt 主题时优先从这里判断真实 prompt 资产该落到哪张清单，不要回到“继续收集好用提示词”的旧路径。

Sprint 324 已复查 `Topics｜Prompt 工作台资产`：公式显式路径 7 条，缺文件 0；当前结果集 7 页，类型为 query 4、synthesis 3，状态为 done 1、review 6。缺 `sources = 0`、缺 `related = 0`、缺 `compiled_from = 0`、缺 `llm-wiki` 标签 = 0；已有 `promotion_target` 的页面为 1。当前判断：这个窄视图仍能承接控制杆清单、承载层清单和失败回放清单，不需要改公式或新增 Prompt 子视图。

其中 `Topics｜Raycast` 是 Raycast / macOS Workflow / 个人操作面的大视图。2026-04-28 静态复查：当前 52 页，类型分布为 27 个 query、13 个 source\_summary、12 个 synthesis；状态为 12 个 done、1 个 draft、39 个 review。结果集覆盖收敛层、动作路由、前台入口、后台自动化、系统控制面、控制台入口、本库真实控制面候选和字段化入口清单，属于合理宽视图；当前不新增 `Topics｜Raycast Automation`、`Topics｜Raycast Control Surface` 或 `Topics｜macOS Workflow` 子视图。继续 Raycast 线时，优先确认真实配置位置并落 1 到 2 个无副作用入口案例，不要回到启动器功能百科或另起 macOS 平行主题树。

2026-04-28 Sprint 305 已做 Raycast 配置源只读复核：本机 Raycast 应用支持目录当前只暴露运行态 / 缓存 / 加密状态，vault 内也只找到 `.rayconfig` 备份而非 repo-local script commands 目录。结论是继续不生成 Raycast 配置、不解析 `.rayconfig`，控制台入口候选只保留字段化设计；若未来真落地，先由用户确认明文源配置目录，并且本库命令产物统一写到 `.tmp/`。

其中 `Topics｜ClaudeCode` 是 Claude Code 长期执行面、团队接力、组织 rollout 和能力分层的大视图。2026-04-28 静态复查：当前 74 页，类型分布为 39 个 query、24 个 source\_summary、11 个 synthesis；状态为 5 个 done、69 个 review。结果集覆盖环境工程、长上下文与记忆、CLAUDE.md / skills / hooks / subagents 分层、team workflow、bot / GHA 入口、文件化 handoff、审计回放、组织 rollout，以及 prompt cache / KV cache / skills / orchestration 交叉；属于合理宽视图。`AI 工作流工作台` 的 `执行资产｜Claude+Codex` 已承担长期执行包、团队接力包、组织 rollout 清单等窄视图职责；当前不新增 `Topics｜ClaudeCode Team Workflow`、`Topics｜ClaudeCode Skills` 或 `Topics｜ClaudeCode Rollout` 子视图。继续 Claude Code 线时，优先补真实 bot / GHA 入口、handoff template 或审计回放边界证据，不要回到个人使用技巧或视图拆分。

其中 `Topics｜Codex` 是 Codex 任务单元、执行位置、远程执行链和默认推进边界的大视图。2026-04-28 静态复查：当前 49 页，类型分布为 22 个 query、14 个 source\_summary、13 个 synthesis；状态为 5 个 done、44 个 review。结果集覆盖 Goal / Context / Constraints / Done when 任务卡、local environments、CLI / App / IDE / Cloud surface 分工、GitHub / Cloud 触发路径、PR review / merge 边界、默认推进策略、commit discipline，以及 Claude Code / Codex / orchestration 角色分工；属于合理宽视图。`AI 工作流工作台` 的 `执行资产｜Claude+Codex` 已承担任务准备清单、远程执行清单和默认推进清单等窄视图职责；当前不新增 `Topics｜Codex Surfaces`、`Topics｜Codex Remote Execution` 或 `Topics｜Codex Merge Boundary` 子视图。继续 Codex 线时，优先补真实 PR / check / run 证据、local environments 契约或远程任务回放样本，不要回到产品 surface 枚举。

`Topics｜ClaudeCode+Codex` 是 Claude Code 与 Codex 两条 AI coding 执行面的大联合视图，不是严格交集视图。2026-04-28 静态复查：当前 113 页，类型分布为 56 个 query、33 个 source\_summary、24 个 synthesis；状态为 10 个 done、103 个 review；其中 `claude-only=64`、`codex-only=39`、两者同时命中 10 页。结果集适合做两条执行面的联合巡检；如果只想看资产包、清单和案例形态，继续用 [[Atlas/Bases/AI 工作流工作台.base]] 的 `执行资产｜Claude+Codex`，不要把这个联合视图误读成 cross-only 队列，也不要新增 `Topics｜ClaudeCode ∩ Codex` 子视图。

其中 `Topics｜Obsidian` 是 Obsidian 底座、输入层、视图层、AI 工作系统和 PKM / LifeOS 交叉的大视图。2026-04-28 静态复查：当前 99 页，类型分布为 41 个 query、36 个 source\_summary、22 个 synthesis；状态为 11 个 done、88 个 review。结果集覆盖 file-over-app、低结构起步、Web Clipper / Cubox / Jotting 输入层、Dataview / Bases / Canvas 视图层、AI IDE 文件工作面共振、LifeOS / 周期笔记、渐进式总结和可编排学习台；属于合理宽视图。`Topics｜Obsidian 资产包` 仍稳定命中 12 页，类型为 6 个 query、6 个 synthesis；状态为 6 个 done、6 个 review，足以承担底座约束、输入入口和视图共振三包窄视图职责。当前不新增 `Topics｜Obsidian Bases`、`Topics｜Obsidian Intake` 或 `Topics｜Obsidian Canvas` 子视图。继续 Obsidian 线时，优先补真实本库视图资产、输入模板、低摩擦起步或 AI 工作面共振案例，不要回到插件功能百科或视图拆分。

2026-04-28 已给 [[Atlas/LLM Wiki/Synthesis/Obsidian 的执行形态：source notes、视图资产与执行共振入口如何分工]] 补入本库近期实证样本：Source Summaries / memory / roadmap 对应 source notes，五个工作台和 LLM Wiki Canvas 对应视图资产，AGENTS / Quickstart / justfile / changed Markdown helper / checkpoint 节奏对应执行共振入口。继续 Obsidian 线时，优先找新的真实输入模板、视图资产质量问题或 AI 工作面共振案例；不要新增 Obsidian 子视图或回到插件百科。

`Topics｜Raycast+Obsidian` 是 Raycast 个人操作面与 Obsidian 长期知识底座的联合视图，不是严格交集视图。2026-04-28 静态复查：当前 150 页，类型分布为 67 个 query、49 个 source\_summary、34 个 synthesis；状态为 23 个 done、1 个 draft、126 个 review；其中 `raycast-only=51`、`obsidian-only=98`、两者同时命中 1 页。这个视图适合看前台操作入口与长期知识系统的相邻材料；如果要看真正交叉，只看 [[Atlas/LLM Wiki/Queries/Raycast 和 Obsidian 在个人工作流里分别负责什么]] 这一类问题即可。当前不新增 `Topics｜Raycast ∩ Obsidian` 子视图。

如果是在接手 `Sources/Clippings/` 后段，优先看这组三个视图：

- `Synthesis｜Clippings 路由与再启动`
- `Synthesis｜Clippings 后段收束`
- `Queries｜Clippings 后段收束`

2026-04-28 Sprint 319 已复查 `Synthesis｜Clippings 后段收束`：当前 5 页，状态为 review 1、draft 4；缺 `sources = 0`、缺 `related = 0`、缺 `compiled_from = 0`，`promotion_target` 命中为 0。结果集集中在后段收束入口、剩余 58 路由清单、再启动规则、阶段完成快照和暂缓池分流总览，属于 Clippings 后段控制面，不是恢复逐篇 ingest 的队列；当前不改 `.base`，不批量改 draft 状态，也不新增 source\_summary。

2026-04-28 Sprint 320 已复查 `Synthesis｜Clippings 路由与再启动`：当前 6 页，状态为 review 2、draft 4；缺 `sources = 0`、缺 `related = 0`、缺 `compiled_from = 0`，`promotion_target` 命中为 0。比 `Synthesis｜Clippings 后段收束` 多出的页面是旧队列记录 [[Atlas/LLM Wiki/Synthesis/Clippings 未编译来源主题盘点：下一批 LLM Wiki 批处理队列]]；整组仍是再启动判断面和路由面，不是 source\_summary 队列。当前没有真实需求、案例缺口、模板升级、证据修正或用户点名触发器；不恢复逐篇 ingest，不新增 source\_summary，不修改 `.base` 筛选，也不批量改 draft 状态。

2026-04-28 Sprint 321 已复查 `Queries｜Clippings 后段收束`：当前 7 页，状态为 review 2、draft 5；缺 `sources = 0`、缺 `related = 0`、缺 `compiled_from = 0`，`promotion_target` 命中为 0。结果集由总停止条件、暂缓池起主题规则和网络代理 / 账号福利 / 生活健康消费 / 桌面浏览器编辑器配置 / 内容制作模型安全开发部署五类专项规则组成；这批是处理边界 query，不是待升级队列。当前不批量改 draft 状态，不新增 query 子视图，也不把这些规则页回退成 source\_summary。

如果你现在是想继续推进这套仓库里的 llm-wiki，通常最先点的是：

- `Synthesis｜核心方法论`
- `Synthesis｜工具主线`
- `Queries｜跨主题高价值`
- `Cross-theme｜核心原则`

如果你是在处理 LLM Wiki 到 canonical note 的晋升和回桥，优先看：

- `Promotion｜待回桥`
- `Promotion｜已回桥`
- `Promotion｜需目标入口`
- `Promotion｜控制页保留`

当前口径：`promotion_target` 只表示有明确晋升目标；`review` 仍是待确认，`done` 才表示目标页已接住判断且编译层页面稳定。`source_summary` 默认不需要 `promotion_target`，除非摘要产生了需要回写的新判断。`Promotion｜需目标入口` 用来收住被入口引用但暂时没有明确 canonical target 的真实知识页；当前这类候选已清空。`Promotion｜控制页保留` 专门放当前确认应保留复核的 Clippings 控制面、LLM Wiki 方法页和 roadmap/control 页。2026-04-28 复查：`Promotion｜待回桥 = 0`、`Promotion｜需目标入口 = 0`、`Promotion｜控制页保留 = 10`、`Promotion｜已回桥 = 163`；当前没有真实待回桥悬挂项，不要为了降低控制页数量批量改 `done`。

`发布工作台` 承接路线图 Phase 5，用来把公开边界从临时判断变成可巡检视图。它不执行发布脚本，只提供这些判断面：

- `入口｜公开主入口`
- `协议｜发布控制面`
- `候选｜可公开`
- `风险｜需脱敏`
- `草稿｜待成熟`
- `已发布｜publish true`
- `最近｜公开相关修改`

其中 `协议｜发布控制面` 是发布前控制协议的只读入口，集中显示文章发布工作流、发布双清单、target profile / dry-run、内容级脱敏、P0 manifest 与 redaction gate 巡检协议。它只用于导航和复核，不执行发布、不生成报告、不替代真实发布前的人类确认。

当前这个视图由 `formula.发布控制入口` 维护显式路径清单，而不是按标题关键词宽泛匹配；新增发布控制协议页、脚本说明页或稳定工具入口时，先把路径加入这个公式，再复查视图是否命中预期。

2026-04-26 第一轮结果集复查发现：`候选｜可公开` 和 `草稿｜待成熟` 原先会把未发布的 `Calendar/` / `Atlas/Bases/TaskNotes/` 私密目录页面纳入候选。当前已在公式中排除 `formula.私密目录`，不再把私密目录当作公开候选。

2026-04-26 第二轮风险结果集复查发现：`风险｜需脱敏` 原先把 `api / API / key / Key / SK / 账号 / 成本` 等弱关键词应用到全库文件名，导致 `Calendar/Tasks`、`.agents/skills/SKILL.md`、`tmp/` 备份页和普通技术教程大量进入发布风险视图。当前已把规则拆成 `强敏感词`、`弱敏感词` 和 `公开风险面`：强敏感词只在公开风险面触发，弱敏感词只在已发布页面触发，同时把 `tmp/`、`.agents/` 纳入非公开目录。按本轮静态统计，风险视图从约 490 条收窄到 24 条。

2026-04-26 第三轮风险收口已把 8 个 `publish: true` 但位于非公开目录的 `Calendar/` 页面改为 `publish: false`；`publish: true` 非公开目录命中降为 0。随后复查剩余 16 条，确认它们主要是 `hyperkey / monkey / Keyboard / 手机 / API / LLM token / 隐私边界` 这类标题级公式噪声。当前已把 `强敏感词` 进一步收窄到明确凭据、密码组合、密钥、证件、银行卡、手机号和 `API key / access token` 等高信号标题，`风险｜需脱敏` 静态命中降为 0。注意：这只表示 Base 标题级风险面已收束；真实发布前仍要跑 P0 manifest + `publish_redaction_report.py --fail-on-high` 的内容级 gate。

2026-04-27 结果集复查：当前 `协议｜发布控制面 = 11`、`风险｜需脱敏 = 0`、`已发布｜publish true = 560`、`候选｜可公开 = 1382`、`草稿｜待成熟 = 1326`、`最近｜公开相关修改 = 1521`。本轮未发现新的私密目录误收或标题级风险噪声，不改 `.base` 公式；继续发布层时优先跑真实 preflight rehearsal，而不是调整标题规则。

`项目推进工作台` 是路线图 Phase 2 的第二个工作台化增量，用来把项目资料层和任务执行层放在同一个巡检面里。它只读取 `Spaces/1-Project/` 与 `Calendar/Tasks/` 的既有字段，不批量回填项目属性。

当前视图按推进判断分组：

- `项目｜索引与MOC`
- `项目｜最近交付证据`
- `任务｜进行中`
- `任务｜本周与过期`
- `任务｜按项目分组`
- `待补｜无项目归属`
- `任务｜日期债务`
- `待补｜Linear同步元数据`
- `风险｜长期未推进`

2026-04-26 第一轮结果集复查发现：任务视图原先会把 `Calendar/Tasks/Converted/`、`Calendar/Tasks/Archive/` 和年份归档目录里的历史迁移任务纳入当前推进面，导致 `任务｜进行中` 约 88 条、`待补｜无项目归属` 约 84 条，噪声过高。当前已把 `formula.活跃任务` 收窄为非 done 且不在归档 / 转换目录中的任务；复查后 `任务｜进行中 = 16`、`任务｜本周与过期 = 13`、`任务｜按项目分组 = 2`、`待补｜无项目归属 = 14`、`风险｜长期未推进 = 14`。

2026-04-26 第二轮结果集收口已小批补齐 13 个高置信 active task 的 `projects`，并把 `Buy groceries` 这类 `contexts: errands` 的非项目杂务从项目推进面排除，而不是伪造项目归属。当前 `项目相关任务 = 15`，其中 `with projects = 15`、`待补｜无项目归属 = 0`；`Buy groceries` 仍保留在任务系统里，但不再污染项目推进工作台。

2026-04-26 第三轮复查发现：项目推进面剩余问题已经从“无项目归属”转成日期债务和 Linear 同步元数据债务。[[_system/docs/plans/2026-04-26-project-task-date-debt-triage]] 命中 48 条需要复核的 active project-related task，其中 13 条 `due` 过期、15 条 `scheduled` 过期、33 条没有日期。当前已在工作台新增 `任务｜日期债务` 和 `待补｜Linear同步元数据` 两个只读视图；继续项目线时先人工 triage，不自动批量改 `due`、`scheduled`、`status` 或 `projects`。

2026-04-26 第四轮复查把日期债务报告补成可执行人工处理面：P0 / P1 有决策树，P2 已按平台安全、搜索迁移、产品增长和 AI Agent 软件交付主线拆出分流表，并压缩成五步 triage checklist。接手项目推进时可以从工作台打开 `任务｜日期债务` / `待补｜Linear同步元数据`，再进入 [[_system/docs/plans/2026-04-26-project-task-date-debt-triage]]；仍不要自动批量改任务字段。

2026-04-27 结果集复查：当前 `任务｜进行中` 对应 project-related active tasks 为 11，且 11 条都有 `projects`；`待补｜无项目归属 = 0`，`任务｜日期债务 = 11`，其中 `due` 过期 8 条、`scheduled` 过期 10 条、缺日期 1 条；`待补｜Linear同步元数据 = 0`。这说明项目推进工作台当前没有字段归属漂移，剩余问题集中在日期债务人工确认卡，不应批量改 task note。

2026-04-28 复查补充：严格 YAML / Base-like 静态解析当前只看到 10 条 project-related active task、10 条日期债务和 0 条 Linear 元数据债务；但 [[_system/docs/plans/2026-04-26-project-task-date-debt-triage]] 的容错字段扫描仍看到 43 条 project-related active task，其中 33 条 Linear 同步项缺日期 / 缺项目。接手项目线时不要只看 Base 可见结果，先用报告的容错口径复核；本轮不批量修 task frontmatter，也不自动写回任务字段。

`LifeOS 工作台` 是路线图 Phase 2 的第三个工作台化增量，用来把健康知识、训练动作、饮食减脂、睡眠精力和显式 LifeOS 复盘候选放到一个只读巡检面里。它不记录健康数据，也不批量改 daily note 或复盘 note 字段。

当前视图按生活系统判断分组：

- `入口｜健康与LifeOS`
- `健康｜全部运动健康`
- `训练｜力量动作库`
- `训练｜有氧与拉伸`
- `饮食｜减脂与营养`
- `恢复｜睡眠与精力`
- `复盘｜LifeOS显式复盘`
- `待补｜弱连接健康主题`

2026-04-26 结果集复查发现：旧 `复盘｜计划与回顾` 直接纳入整个 `Calendar/Plan & Review/`，静态规模为 106 页，其中前排大量是 `AI summaries`，且仅 5 页含健康关键词；排除 `AI summaries` 后只有 2 页，但它们命中的是技术系统的“健康检查 / 健康检测”，不是个人 LifeOS 复盘。当前已把周期复盘 scope 收窄为显式 LifeOS / 健康 / 运动 / 训练 / 睡眠 / 饮食 / 精力命名或 `lifeos / health / fitness` 标签的非 AI summary 复盘；复查后工作台 scope 为 250 页，`复盘｜LifeOS显式复盘 = 0`，这表示当前还没有显式个人 LifeOS 周期复盘入口，而不是要把技术健康检查误纳入 LifeOS。

2026-04-26 弱连接小批回桥：用线性入链扫描复查 `Spaces/2-Area/运动健康/` 下 249 页，发现 63 页入链不超过 1。未批量处理动作库细碎动作页，只把 3 个高价值入口页回桥到健康导览和运动健康 MOC：`有氧运动库`、`运动装备库`、`211饮食法`；复查后它们的静态入链分别为 2、2、3。

2026-04-26 弱连接视图结果集复查发现：`待补｜弱连接健康笔记` 的旧口径会被力量动作库、拉伸动作库、有氧运动库、肌肉库和运动装备库叶子页刷屏。当前已将视图改名为 `待补｜弱连接健康主题`，并用 `formula.非叶子健康主题` 排除这些叶子目录和明确误入健康目录的 `中文博客排版指南`；静态复查从 `target_files=243 / low_link_rows=61` 收敛为 `target_files=112 / low_link_rows=0`。后续这条视图只服务主题页、原则页和决策页回桥，不处理动作明细。

2026-04-26 复盘入口规则：`复盘｜LifeOS显式复盘` 只收显式命名或 `lifeos / health / fitness` 标签的非 AI summary 周期复盘。未来新建周/月复盘如果确实覆盖个人健康、训练、睡眠、饮食或精力，应按 `Calendar/Plan & Review/AGENTS.md` 加 `lifeos` 或 `health` 标签，并写 `## LifeOS 复盘`；技术系统的“健康检查”不要打 LifeOS 标签。

2026-04-27 结果集复查：当前 LifeOS scope 为 250 页，其中运动健康资料 249 页、健康导览入口 1 页；`入口｜健康与LifeOS = 7`、力量训练候选 73、有氧与拉伸 28、饮食减脂 25、睡眠精力 2，`复盘｜LifeOS显式复盘 = 0`。按入链审计脚本排除动作库 / 肌肉库 / 装备库等叶子目录后，`待补｜弱连接健康主题 = 0`。这表示当前 LifeOS 工作台没有新的弱连接主题要回桥；下一步应补真实 LifeOS 周期复盘入口，而不是继续把技术 health check 误收进来。

2026-04-27 真实复盘入口：[[Calendar/Plan & Review/Weekly/2026-04-W18]] 已按 `Calendar/Plan & Review/AGENTS.md` 加入 `lifeos` 标签和 `## LifeOS 复盘` 小节。静态复查后 `复盘｜LifeOS显式复盘 = 1`，入口内容只记录本周尚无结构化睡眠 / 训练 / 饮食 / 精力数据和下周观察问题，不回填历史健康数据。

### 整理与维护

- [[笔记整理工作台.base]]

### 书、电影、电视剧

- [[📺电视剧管理.base]]
- [[🎥电影管理.base]]
- [[微信读书管理.base]]

### 私人工具与 prompts

- （已隐藏：不公开入口）
- [[Snippets管理.base]]
- [[prompts管理.base]]
- [[图片生成提示词工作台.base]]

`图片生成提示词工作台` 用来管理图片生成提示词、检索状态、成图附件 / URL、出图模型和复盘记录。源记录优先落在 `Sources/AI/图片生成记录/`，已有 Cards 里的“图片生成”提示词也会通过分类或文件名进入视图。

### 资源类型文件

- [[全库ob文件.base]]
- [[全库资源文件.base]]
- [[icon list.base]]
- [[canvas管理.base]]

### 任务、todo、计划与回顾

- [[项目推进工作台.base]]
- [[review notes.base]]
- [[todo list.base]]

### 剪藏管理

> - 暂时有bug，等base修复

- [[CuboxSync文件管理.base]]
- [[webclipping and cubox.base]]
- [[wucai剪藏管理.base]]

### 软件、产品、插件

- [[App应用软件管理.base]]
- [[好用网站管理.base]]
- [[AI 产品和公司.base]]
- [[Obsidian插件.base]]
- [[vscode插件.base]]
- [[chrome插件.base]]
