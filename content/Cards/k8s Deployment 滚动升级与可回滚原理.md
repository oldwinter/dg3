---
publish: true
permalink: /Cards/k8s Deployment 滚动升级与可回滚原理.md
title: k8s Deployment 滚动升级与可回滚原理
created: 2025-12-11
modified: 2025-12-11
published: 2026-03-14T14:29:19.017+08:00
tags:
  - k8s
  - devops
---

## 滚动升级 & 回滚机制

```mermaid
flowchart TD
    step1["① 掐入口<br/>把旧版本 v1 readiness 设为 false<br/>新流量不再打到 v1"] --> step2
    step2["② 拉新版本 v2<br/>先启动少量 Pod，做健康检查"] --> step3
    step3{"健康检查通过？"} -->|否| rollback["暂停或回滚：直接恢复 v1"]
    step3 -->|是| step4
    step4["③ 切流量<br/>Service 逐步把新流量给 v2<br/>旧 Pod 只处理遗留请求"] --> step5
    step5["④ 优雅退出旧 Pod<br/>v1 完成在途请求后退出，不再接新流量"] --> step6
    step6["⑤ 扩容 v2<br/>按需要增加更多 v2 Pod<br/>最终承接全部流量"] --> done([完成滚动])
```

- Deployment 控制器先创建新 ReplicaSet，再“加新 Pod、减旧 Pod”，由 `maxSurge`/`maxUnavailable` 控制并行度。
- Service 通过就绪探针选择可用 Pod，未就绪的新 Pod 不接流量；旧 Pod 缩容前仍保持 Ready。
- 失败时可 `kubectl rollout undo deployment/<name>` 回滚到上一个 revision（旧 ReplicaSet 仍在，只是被缩容到 0）。
- 支持 `rollout pause/resume`，便于人工验证或观察指标后再继续。

## Pod 优雅退出：感知 kill 信号

```mermaid
sequenceDiagram
    participant Kubelet
    participant Pod as Pod/Container
    participant Service

    Kubelet->>Service: 将 Pod readiness 设为 false（摘流）
    Service-->>Clients: 不再转发请求到该 Pod
    Kubelet->>Pod: 发送 SIGTERM
    Pod->>Pod: 执行 preStop Hook（可睡眠/完成收尾）
    Pod->>Pod: 停止接收新请求，完成在途请求
    Note over Pod: 需在 terminationGracePeriod 内退出
    Kubelet-->>Pod: 如超时发送 SIGKILL 强制退出
```

实现要点：

- 在应用内捕获 SIGTERM，关闭接入、等待在途请求完成，再退出进程。
- 配置 `preStop` Hook（如短暂 sleep 或调用下线接口）和 `terminationGracePeriodSeconds`，确保有足够时间优雅收尾。
- `readinessProbe` 失败后会立即摘流，避免在退出过程中继续接新请求。
