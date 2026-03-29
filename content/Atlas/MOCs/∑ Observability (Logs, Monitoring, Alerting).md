---
publish: true
permalink: /Atlas/MOCs/∑ Observability (Logs, Monitoring, Alerting).md
aliases:
  - ∑ Observability (Logs, Monitoring, Alerting)
  - 可观测性
  - 日志、监控与告警
title: Observability (Logs, Monitoring, Alerting)
created: 2025-12-26T22:54:32.908+08:00
modified: 2026-03-07T20:38:08.859+08:00
published: 2026-03-07T20:38:08.859+08:00
tags:
  - MOC
  - Observability
  - Logs
  - Monitoring
  - Alerting
---

# ∑ Observability (Logs, Monitoring, Alerting)

This Map of Contents aggregates notes related to the three pillars of Observability: Logs, Monitoring, and Alerting.

可观测性不只是把 Prometheus、Loki、告警机器人都装上，而是回答 3 个连续问题：

- **Monitoring**：系统现在怎么样了。
- **Logs / Traces**：刚才到底发生了什么。
- **Alerting**：什么时候需要把人叫醒，以及叫醒谁。

## Current Backbone

- [[k8s 集群 日志与监控]] - Area 层的基础入口
- [[日志、告警、监控系统建设]] - 项目层的方案与拆解
- [[日志监控与指标（Prometheus Loki Grafana）]] - 学习与实现要点
- [[当前线上业务告警]] - 现网告警现状
- [[PRR]] - 生产就绪与可观测性要求
- [[映兔自研的微服务框架]] - 架构层面的可观测性位置

## Task Threads

- [[业务日志告警重新配置，并开放，先从api server开始整改。]]
- [[Prometheus监控会导致eks auto mode的node异常挂掉]]
- [[Prometheus 完成后，需要配置grafana，能进行有效监控，并对一些异常进行通知和告警]]
- [[mongodb 的慢查询，超过10秒，则告警]]
- [[llm调用失败的告警]]
- [[当前环境配置持续监测的健康检查，并进行飞书群告警]]
- [[信鹏的loki日志系统，部署到aws eks集群里]]
- [[现网拨测和uptime监控]]

## Overview

- [[k8s集群日志查看与故障排查方法]]
- [[日志监控与指标（Prometheus Loki Grafana）]]
- [[持续优化 aws eks 的弹性伸缩性能，监控、日志、告警能力]]
- [[日志、告警、监控系统建设]]
- [[k8s 集群 日志与监控]]

## 📊 Monitoring

> Collecting and analyzing metrics to understand the state of the system.

### Strategy & Configuration

- [[监控告警体系建设]]
- [[告警和监控]]
- [[aws 监控告警配置 - cloudwatch完整使用]]
- [[各种余额的费用监控，统一告警的dashboard配置]]
- [[阿里云Prometheus监控服务下线策略]]
- [[预发环境整体监控告警策略配置架构图.canvas]]

### Specific Monitors

- [[spot 节点可用性全局监控  aws 阿里云]]
- [[terminal 终端中监控gpu的使用状态]]
- [[现网拨测和uptime监控]]
- [[uptime-kuma 服务可用性监控]]

## 📝 Logs

> Recording events to understand what happened.

### Implementation & Practice

- [[日志log系统改造]]
- [[日志系统改造细节]]
- [[aws eks opentelemetry 调用链日志采集上报]]
- [[cloudwatch 业务日志使用方法]]
- [[elasticsearch 日志查看]]

### Troubleshooting & Experience

- [[429 日志]]
- [[0818错误日志]]
- [[sls日志消费问题]]
- [[pod 被杀以后， 优雅退出的日志打印]]
- [[小二后台体验日志]]
- [[mirrord 使用日志]]

### Solution Specific (SLS etc)

- [[sls 配置 日志采集黑名单]]
- [[sls日志 阿里云]]
- [[后端 sls 日志搜索方法和技巧]]
- [[映兔阿里云上的日志、监控、告警 sls]]

## 🔔 Alerting

> Notifying relevant parties when metrics cross thresholds or specific events occur.

- [[第三方api 告警配置]]
- [[当前线上业务告警]]
- [[映兔线上告警处理步骤]]
- [[后端业务P0-P2告警问题定位和处理]]
- [[一站式云原生智能告警运维平台——SLS新版告警发布！-阿里云开发者社区-2023-10-09]]

## 🛠 Tools Stack

### ELK & Loki

- [[ELK]]
- [[Loki]]
- [[∑ OpenSearch & Elasticsearch|OpenSearch & Elasticsearch]]

### Prometheus & Grafana

- [[日志监控与指标（Prometheus Loki Grafana）]]

### Cloud Services

- [[aws 监控告警配置 - cloudwatch完整使用]]
- [[sls日志 阿里云]]

up:: [[∑ 项目与工作管理]]
