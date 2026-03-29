---
publish: true
permalink: /Calendar/Daily notes/2025/aws 环境更新公告.md
created: 2025-11-21
modified: 2025-12-02
---

数据apiserver\
算法agent

算法search

后端api server

aws opensearch集群

---

📣 aws环境变更

变更环境： 预发环境\
变更组件：算法agent\
断服时长：1分钟

镜像版本号： anotherme-agent:2025-11-25-d0fdcc4\
更新内容：

1. 邮件功能增加更全面的 try-except 与 日志
2. chatAgent 中的 xml 输出增加结构校验并支持 retry
3. 修复 column remove 时的 schema 错误
4. 精简表格信息（删除 source，evidence path，meta\_info，并出去无用的 json 结构）

---

📣 aws环境变更

变更环境： 预发环境\
变更组件：

- 算法search
- 后端api server // 由守迪操作
- infra爬虫
  断服时长：5分钟
  镜像版本号：
- anotherme-search:11-24-allinone-2
- null
- crawler:2025-11-24
  更新内容：
- signals，activity，candidate，search4个容器合并成1个search容器。若干优化。
- 后端代码配套算法search的更新。
- 爬虫新增mongodb的缓存能力，以及超时提前返回时，依然完成剩余的scraperdo的请求并缓存。
  其他：
  下线多余的signal、candidate、activity 3个服务容器。

---

📣 aws环境变更

变更环境：

- 预发环境
- 🍐压测环境\
  变更组件： aws opensearch集群\
  断服时长：不断服，但对查询性能有轻微影响，预计持续72小时。\
  镜像版本号：无

更新内容：

- 对linkedin user数据做reindex操作，占满集群40%的cpu，可能会一定程度上影响查询并发能力。
- 将linkedin company数据切换至新版的修复了embedding数组过长则数据错乱问题的index。

---

变更环境： 压测环境\
变更组件：

- 算法agent
- 算法search
- 数据apiserver
  断服时长：1分钟
  镜像版本号：
- anotherme-agent:2025-11-26-64f706
- anotherme-search:11-26
- data-search-api:2025-11-26
  更新内容：
- 算法agent
  1. 支持intent aware search功能 (company)
  2. 使用a22b生成用户搜索的intent
  3. 基于语义搜索，根据intent对结果进行精排
  4. 通过intent\_search\_weight设置intent的强度（当前推荐1.0）,当前为0.0 （未开启）
  5. Shopify
  6. 数据库更新 - 支持展示商家的logo图片
  7. 修复了 es 语言生成 bug
  8. TableSearch
  9. 更新出表等待逻辑，调整 timeout 策略
  10. 修复部分默认列的 deepsearch 任务无法创建/类型错误的问题
  11. 修复 add\_more
  12. 单元测试
  13. 适配了新版的多路搜索的单元测试 （暂无shortcut）
- 算法search
  - 增加了widesearch的幻觉抑制
- 数据apiserver
  - 新增batch/ids接口支持转发shopify到本地es

---

变更环境： 🍐压测环境\
变更组件：

- 前端
  断服时长：不断服
  镜像版本号：
- front:0.0.5

---

变更环境： 🍐压测环境\
变更组件：

- 算法agent
  断服时长：1分钟
  镜像版本号：
- anotherme-agent:2025-11-26-4369698
  更新内容：
- 算法agent
  1. 支持 expert mode
  2. 修复搜索bug：修复should 与filter/must同时存在时，minimum\_should\_match默认为0，导致搜索质量低的问题

---

变更环境： 🍐压测环境\
变更组件：

- 算法agent
- 算法search
  断服时长：1分钟
  镜像版本号：
- anotherme-agent:2025-11-26-af282bf
- anotherme-search:11-26-night-3
  更新内容：\
  bugfix

---

**变更环境：**

- 🌍生产环境
- 预发环境

**变更组件：**

- 前端
- cloudflare域名配置

**断服时长：** 不断服

**镜像版本号：**

**更新内容：**

预发环境顺移做为生产环境，域名变更为：\
落地页： lev8.com\
应用主页： app.lev8.com

原预发环境下线，但原有域名，自动301永久重定向到生产环境。

\*\*潜在影响： \*\*

之前的预发环境share链接，往后可能会触发重定向，需要手动改一下域名到新域名。例如：\
https://staging-app.golumo.ai/share/019abf9a-303f-7d3d-8ae1-660ab4bc766c

需要手动改成 https://app.lev8.com/share/019abf9a-303f-7d3d-8ae1-660ab4bc766c

---

📣 aws环境变更

**变更环境：**

- 🌍生产环境
- 🍐压测环境

**变更组件：**

- 算法 agent

**断服时长：** 1分钟

**镜像版本号：**

- anotherme-agent:2025-11-28-e83b380
- anotherme-search:11-28

**更新内容：**

```shell
**1. Feature**
- **开启 intent search 功能**
**2. Fix**
- **修复 wide search 与数据库条目重复的问题**
- **修复插入数据时 data index 错位的问题**
- **修复搜索计划不 aware 表格搜索是否失败导致的新增列与预期数不符的问题**
- **修复了删除列之后表格没有排序的问题**
**3. Improve**
- **添加 timeout & 重复 pattern 检测 重试机制**
- **更新 deepsearch 结果提取逻辑，防止提取到竞品公司**
- **增加对于 worker 异常退出时的容错处理与日志**
search模块更新log：
- 增加reranker轮询fallback
- wide search/signal search最后一轮强制返回优化，增加retry
```

---

📣 aws环境变更

**变更环境：**

- 🌍生产环境
- 🍐压测环境

**变更组件：**

- 算法 agent

**断服时长：** 1分钟

**镜像版本号：**

- anotherme-agent:2025-12-02-e67926 生产环境
- anotherme-agent:2025-12-02-a8fe8b 压测环境

**更新内容：**

```shell
e67926737daa4471e781f8f6117480a16c1a079b（正式环境）

1. 为 embedding 提取增加了错误处理
    

a8fe8b41de2b89e3947b50c2b50186dcb61791b8（预发环境）

1. 为 embedding 提取增加了错误处理
    
2. 支持表格更新后持续搜索，防止关键条件替换后任务无法继续
    

新添加环境变量

SILICONFLOW_API_KEY=
```

---

📣 aws环境变更

**变更环境：**

- 🌍生产环境
- 🍐压测环境

**变更组件：**

- 数据 apiserver

**断服时长：** 1分钟

**镜像版本号：**

- data-search-api:2025-12-02

**更新内容：**

```shell
修复了当opensearch服务短暂不可用又恢复后，apiserver没有自动恢复的问题。
```

---

📣 aws环境变更

**变更环境：**

- 🌍生产环境
- 🍐压测环境

**变更组件：**

- 算法agent
- 算法search
- infra llm-router

**断服时长：** 不断服

**镜像版本号：**

- anotherme-agent:2025-12-05-76ebe57
- anotherme-search:12-05

**更新内容：**

```shell
```

---

📣 aws环境变更

**变更环境：**

- 🌍生产环境
- 🍐压测环境

**变更组件：**

- 算法agent
- 算法search
- infra llm-router

**断服时长：** 不断服

**镜像版本号：**

- anotherme-agent:2025-12-05-76ebe57
- anotherme-search:12-05

**更新内容：**

```
agent 模块：
### Features

- **角色更新**：从 Lumo 更新到 **Levi**
    
- **表格操作**：支持在聊天中删除行 & 添加行
    
- **搜索逻辑**：在数据库搜索中实现了 DeepSearch 回退机制
    
- **邮件集成**：将 Email Water 适配接入 Email API
    

### Fixes

- 修复了默认列中的重复问题
    
- 维度名称中包含 '&' 符号的处理问题
    
- 修复了删除列的逻辑，防止列数与搜索计划不一致
    
- 修正了并发状态下的换行逻辑，改为使用原始 `data_idx` 而非行索引映射
    

### Improvements

- 更新了 NL2SQL 的 prompt，使生成的关键词更简洁
    
- 优化 shopify 的维度拆解的 prompt
    
- Wide Search 重构
  
search 模块：
更新：新增email waterfall接口，完善llm调用参数

infra 模块：
- llm router，新增aws供应商。极大地提升litellm的qwen3-next-80b-a3b模型的并发性能。
  

```

---

📣 aws环境变更

**变更环境：**

- 🍐压测环境

**变更组件：**

- 算法agent
- 数据apiserver

上新组件：

- 后端 mail-mvp

**断服时长：** 1分钟

**镜像版本号：**

- anotherme-agent:2025-12-08-0f7dc5f
- data-search-api:2025-12-08

**更新内容：**

```
Feature:
支持了检索子条件的score映射功能（归一化），规避不同子条件imbalance问题，提升搜索的质量
支持了搜索的竞品分析exclude能力 (初版)
Improve:
db 字段选择模型从 gemini-flash 切换到 Qwen-235b-a22b
Fix：
修复了 table 生成过程中 llm header 没有绑定的问题

## data search
压测环境的linkedin company数据，切换至11月份的新版本。

## 后端 
mail-mvp首次部署。注：前端还未上线配套版本。
```
