---
publish: true
---

# ES-基础-什么是Elasticsearch

定位：回答「Elasticsearch 到底是什么、解决什么问题、适合谁用」的总览卡，作为全套路线的入口。

## 大纲

1. 为什么会有 Elasticsearch（背景与动机）
2. Elasticsearch 的核心定义与特性
3. 能力边界与典型使用场景
4. 与关系型数据库和其他搜索技术的对比
5. 与 OpenSearch 的关系（简要）
6. 使用 Elasticsearch 前应该先想清楚的问题

## Todo 要点（查漏补缺清单）

- 梳理 Lucene → Elasticsearch 的演进：为什么需要一层分布式封装。
- 用 1-2 句话给出「官方级」定义（分布式、RESTful、搜索与分析引擎）。
- 列出典型场景：
  - 网站/应用站内搜索（文档、商品、内容检索）。
  - 日志检索（ELK/Elastic Stack）。
  - Metrics/APM/安全审计与可观测性。
  - 实时数据分析和 Dashboard。
- 明确与关系型数据库（MySQL/PostgreSQL 等）的核心差异：
  - 数据模型：文档 vs 行。
  - 查询方式：全文检索、相关度评分 vs 精确匹配、JOIN。
  - 扩展方式：水平扩展 vs 传统垂直/分库分表。
  - 事务语义、一致性与持久化保障差异。
- 总结「适合用 ES 的问题」和「不适合用 ES 充当的角色」（如强事务账务系统）。
- 简要介绍 Elasticsearch 与 OpenSearch 的分裂：
  - License 改变的背景（Elastic License vs Apache 2.0）。
  - 简单说明：学习 ES 的概念，对理解 OpenSearch 也有帮助。
- 给出 2-3 个你自己项目中的候选场景，判断是否适合用 ES（做实践映射）。
