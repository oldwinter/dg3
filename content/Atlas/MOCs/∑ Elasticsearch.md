---
publish: true
permalink: /Atlas/MOCs/∑ Elasticsearch.md
created: 2025-11-09T20:22:32.822+08:00
modified: 2026-03-14
published: 2026-03-14T20:10:39.314+08:00
---

# ∑ Elasticsearch

> Elasticsearch 专题学习与写作路线入口，配合 Canvas 使用。
> 如果你现在要看的是 OpenSearch 服务、AWS 托管、迁移、性能与生产运维总览，优先看 [[∑ OpenSearch & Elasticsearch]]。

## 0. 定位与边界

- 本页负责：Elasticsearch 的学习路径、写作大纲、专题拆解、Canvas 入口。
- 相邻总览页：[[∑ OpenSearch & Elasticsearch]] 负责更大的搜索/检索实践总图。
- 上层地图：[[∑ 技术栈全景图]] 负责技术领域级导航，不展开本页的大纲细节。

## 1. 路线图入口

- Canvas 地图：[[Elasticsearch-从入门到精通.canvas]]

建议用法：

- 从 Canvas 选择阶段/节点 → 跳转到对应原子笔记。
- 本页作为 Elasticsearch 在本库中的总导航（MOC）。

## 2. 学习与写作任务总览（Todo 大纲）

说明：

- 使用 Obsidian 任务语法 `- [ ]`。
- 默认全部未完成，写完对应内容后改为 `- [x]`。
- 每条任务建议对应一个独立原子笔记（或一组紧密相关小节）。

### Phase 1 · 基础认知

- 编写 [[ES-基础-什么是Elasticsearch]]：定位、核心特性、典型场景、与关系型数据库对比。
- 编写 [[ES-基础-核心能力总览]]：全文检索、结构化查询、聚合分析、分布式、高可用。
- 编写 [[ES-基础-学习路径与知识地图]]：解释本路线各 Phase 之间的关系和依赖。

### Phase 2 · 核心数据模型与倒排索引

- 编写 [[ES-模型-索引文档与历史Type概念]]：Index、Document、Type（历史）、\_id、\_source。
- 编写 [[ES-模型-分片与副本设计]]：Primary/Replica、分片数量规划、常见误区和原则。
- 编写 [[ES-模型-倒排索引原理]]：倒排索引结构、与 B+ 树对比、为何有利于搜索。
- 编写 [[ES-模型-Near-Real-Time机制]]：refresh、segment、flush、merge 与可见性。

### Phase 3 · 安装与基础操作

- 编写 [[ES-安装-本地与Docker环境搭建]]：本地单机、Docker Compose、基础配置示例。
- 编写 [[ES-安装-集群基础配置与版本选择]]：版本策略、License 注意点、配置项说明。
- 编写 [[ES-操作-REST接口与KibanaConsole入门]]：Dev Tools 使用、基本 HTTP 请求习惯。
- 编写 [[ES-操作-Bulk写入与常见错误]]：\_bulk 格式、常见 400/413 等错误排查。

### Phase 4 · 查询 DSL 与搜索基础

- 编写 [[ES-查询DSL-整体概览]]：Query DSL 结构、query vs filter 概念。
- 编写 [[ES-查询DSL-bool查询与组合条件]]：must/should/must\_not/filter 的模式和示例。
- 编写 [[ES-查询DSL-全文检索与精确匹配]]：match/multi\_match vs term/terms 的适用场景与坑。
- 编写 [[ES-查询DSL-分页策略与深分页问题]]：from+size、search\_after、scroll 的对比与建议。
- 编写 [[ES-查询DSL-相关度评分与排序策略]]：BM25 基本思想、\_score、function\_score 实战。

### Phase 5 · 聚合分析与可观测性基础

- 编写 [[ES-聚合-基础概念与常用Bucket]]：bucket/metric、terms/range/date\_histogram 等。
- 编写 [[ES-聚合-指标类Metric与多层聚合]]：avg/sum/max/percentiles/cardinality 等用法。
- 编写 [[ES-聚合-日志分析与业务指标实践]]：错误率、延迟分布、业务 KPI 的典型聚合方案。

### Phase 6 · Mapping 设计与分词策略

- 编写 [[ES-Mapping-字段类型与索引策略]]：常用类型、index/Doc\_values 配置策略。
- 编写 [[ES-Mapping-text与keyword最佳实践]]：text+keyword 双字段模式、排序/聚合注意点。
- 编写 [[ES-Mapping-nested与object建模]]：一对多、数组建模、nested 查询示例。
- 编写 [[ES-分词-Analyzer与自定义分词方案]]：standard/ik、自定义 analyzer、同义词和拼音。
- 编写 [[ES-Mapping-动态映射与常见坑]]：dynamic mapping、字段爆炸问题、index template 规范化。

### Phase 7 · 集群架构与生产部署

- 编写 [[ES-集群-节点角色与拓扑设计]]：master/data/ingest/coordinating 角色与推荐拓扑。
- 编写 [[ES-集群-冷热分层与多AZ部署原则]]：Hot-Warm-Cold 架构设计要点。
- 编写 [[ES-集群-部署方式与滚动升级]]：自建、云托管、滚动升级步骤与注意事项。

### Phase 8 · 性能优化与容量规划

- 编写 [[ES-性能-索引与时间分区设计]]：按时间建索引、ILM 策略、历史数据归档。
- 编写 [[ES-性能-查询优化与慢查询分析]]：filter 优先、避免前缀通配符、profile/explain 使用。
- 编写 [[ES-性能-资源规划与Segment管理]]：Heap、磁盘、segment merge 对性能的影响与调优。

### Phase 9 · 安全、监控与稳定性

- 编写 [[ES-安全-权限模型与访问控制]]：用户角色、索引级权限、多租户考虑。
- 编写 [[ES-安全-避免公网暴露与合规要求]]：不暴露 9200、网关/代理实践。
- 编写 [[ES-监控-核心指标与告警设计]]：cluster health、GC、I/O、慢查询、磁盘水位等。
- 编写 [[ES-稳定性-常见故障与排查思路]]：红黄状态、脑裂、磁盘打满、分片分配异常案例。

### Phase 10 · 高级功能与生态整合

- 编写 [[ES-高级-ES-SQL与EQL实践]]：常见查询示例、适用场景与限制。
- 编写 [[ES-高级-Ingest-Pipeline与采集链路]]：处理链设计、与 Beats/Logstash 配合。
- 编写 [[ES-高级-向量搜索与语义检索]]：dense\_vector、kNN 搜索、混合检索策略。
- 编写 [[ES-高级-与LogstashBeatsK8s等生态集成]]：采集、传输、服务编排的实战指引。

### Phase 11 · 综合实战案例

- 编写 [[ES-实战-日志与监控平台搭建]]：端到端架构、索引设计、告警配置。
- 编写 [[ES-实战-站内搜索与电商搜索]]：索引设计、排序策略、同义词和自动补全方案。
- 编写 [[ES-实战-实时业务指标与Dashboard]]：实时聚合、看板设计、与数仓的分工。

## 3. 使用与维护建议

- 在 [[∑ OpenSearch & Elasticsearch]] 和 [[∑ 技术栈全景图]] 中保持本页入口可见。
- 为每条 ES 相关实战踩坑/文章阅读笔记，选择对应的 `ES-*` 节点挂载，保持主题归档。
- 定期回顾上述 todo，查漏补缺，逐步将 Canvas 中所有节点沉淀为常青笔记。
