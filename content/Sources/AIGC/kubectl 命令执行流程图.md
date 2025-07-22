---
title: kubectl 命令执行流程图
date created: 2025-01-28
date modified: 2025-01-28
tags:
  - k8s
  - kubectl
  - 流程图
  - mermaid
  - 架构图
  - AI生成
publish: true
---

# 🔧 kubectl 命令执行流程图

> 详细展示 kubectl 典型命令在 k8s 控制面和数据面各组件间的流程流转

## 📋 快速导航

- [[Sources/AIGC/kubectl 命令执行流程图#🏗️ 整体架构图]]
- [[Sources/AIGC/kubectl 命令执行流程图#⏱️ 详细执行时序图]]
- [[Sources/AIGC/kubectl 命令执行流程图#🔍 关键流程说明]]
- [[Sources/AIGC/kubectl 命令执行流程图#🔗 相关资源]]

---

## 🏗️ 整体架构图

```mermaid
graph TB
    subgraph "🖥️ 用户层"
        U[👤 用户]
        kubectl[🔧 kubectl]
    end
    
    subgraph "☁️ 控制面 (Master Node)"
        API[⚙️ kube-apiserver<br/>🔹 API 网关<br/>🔹 认证授权<br/>🔹 请求验证]
        etcd[💾 etcd<br/>🔹 集群状态存储<br/>🔹 配置数据<br/>🔹 分布式 KV]
        CM[🎛️ controller-manager<br/>🔹 资源控制器<br/>🔹 状态协调<br/>🔹 生命周期管理]
        Scheduler[📅 kube-scheduler<br/>🔹 Pod 调度<br/>🔹 节点选择<br/>🔹 资源分配]
    end
    
    subgraph "🖥️ 数据面 (Worker Node)"
        kubelet[🤖 kubelet<br/>🔹 Pod 生命周期<br/>🔹 节点状态上报<br/>🔹 容器管理]
        proxy[🌐 kube-proxy<br/>🔹 服务代理<br/>🔹 负载均衡<br/>🔹 网络规则]
        CRI[🐳 容器运行时<br/>🔹 容器操作<br/>🔹 镜像管理<br/>🔹 containerd/Docker]
    end
    
    subgraph "🔄 典型命令流程"
        direction TB
        GET["kubectl get<br/>📋 查询资源"]
        DELETE["kubectl delete<br/>🗑️ 删除资源"]
        APPLY["kubectl apply<br/>📦 创建/更新资源"]
        LOGS["kubectl logs<br/>📜 查看日志"]
    end
    
     控制面组件交互
    API <--> etcd
    API --> CM
    API --> Scheduler
    CM --> API
    Scheduler --> API
    
     命令流程
    GET --> API
    DELETE --> API
    APPLY --> API
    LOGS --> API
    
    %% 样式
    classDef controlPlane fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef dataPlane fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef userLayer fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef commandFlow fill:#fff3e0,stroke:#e65100,stroke-width:2px
    
    class API,etcd,CM,Scheduler controlPlane
    class kubelet,proxy,CRI dataPlane
    class U,kubectl userLayer
    class GET,DELETE,APPLY,LOGS commandFlow
```

---

## ⏱️ 详细执行时序图

```mermaid
sequenceDiagram
    participant User as 👤 用户
    participant kubectl as 🔧 kubectl
    participant API as ⚙️ kube-apiserver<br/>(控制面)
    participant etcd as 💾 etcd<br/>(控制面)
    participant CM as 🎛️ controller-manager<br/>(控制面)
    participant Scheduler as 📅 kube-scheduler<br/>(控制面)
    participant kubelet as 🤖 kubelet<br/>(数据面)
    participant proxy as 🌐 kube-proxy<br/>(数据面)
    participant CRI as 🐳 容器运行时<br/>(数据面)

    Note over User, CRI: kubectl get pods 命令流程
    
    User->>kubectl: kubectl get pods
    kubectl->>API: HTTP GET /api/v1/pods
    Note right of kubectl: 认证 & 授权检查
    API->>etcd: 查询 Pod 资源
    etcd-->>API: 返回 Pod 列表
    API-->>kubectl: JSON 格式 Pod 数据
    kubectl-->>User: 格式化输出 Pod 信息

    Note over User, CRI: kubectl delete pod 命令流程
    
    User->>kubectl: kubectl delete pod <name>
    kubectl->>API: HTTP DELETE /api/v1/pods/<name>
    API->>etcd: 标记 Pod 为删除状态<br/>(设置 deletionTimestamp)
    etcd-->>API: 确认更新
    
    Note right of API: 控制面处理删除事件
    API->>CM: 通知 Pod 删除事件
    CM->>API: 处理 finalizers<br/>清理相关资源
    
    Note right of CM: 数据面执行删除
    API->>kubelet: 监听到 Pod 删除事件
    kubelet->>CRI: 停止容器
    CRI-->>kubelet: 容器停止完成
    kubelet->>API: 报告 Pod 终止状态
    API->>etcd: 从 etcd 中删除 Pod 记录
    
    API-->>kubectl: 返回删除确认
    kubectl-->>User: 显示删除成功

    Note over User, CRI: kubectl apply deployment 命令流程
    
    User->>kubectl: kubectl apply -f deployment.yaml
    kubectl->>API: HTTP POST/PUT /apis/apps/v1/deployments
    API->>etcd: 存储 Deployment 资源
    
    Note right of API: 控制面创建 Pod
    API->>CM: 通知 Deployment 创建
    CM->>API: 创建 ReplicaSet
    API->>etcd: 存储 ReplicaSet
    CM->>API: 创建 Pod
    API->>etcd: 存储 Pod 资源
    
    Note right of Scheduler: 调度器分配节点
    API->>Scheduler: 监听未调度 Pod
    Scheduler->>API: 选择合适节点<br/>更新 Pod.spec.nodeName
    API->>etcd: 更新 Pod 调度信息
    
    Note right of kubelet: 数据面创建容器
    API->>kubelet: 监听到 Pod 调度事件
    kubelet->>CRI: 拉取镜像 & 创建容器
    CRI-->>kubelet: 容器创建完成
    kubelet->>API: 报告 Pod 运行状态
    API->>etcd: 更新 Pod 状态
    
    Note right of proxy: 网络规则更新
    API->>proxy: 监听 Service 变化
    proxy->>proxy: 更新 iptables/ipvs 规则
    
    API-->>kubectl: 返回创建结果
    kubectl-->>User: 显示创建成功

    Note over User, CRI: kubectl logs 命令流程
    
    User->>kubectl: kubectl logs <pod-name>
    kubectl->>API: HTTP GET /api/v1/pods/<name>/log
    API->>kubelet: 转发日志请求到目标节点
    kubelet->>CRI: 获取容器日志
    CRI-->>kubelet: 返回日志流
    kubelet-->>API: 转发日志数据
    API-->>kubectl: 流式返回日志
    kubectl-->>User: 实时显示日志输出
```

---

## 🔍 关键流程说明

### 📋 kubectl get 查询流程
1. **认证授权**：kubectl 向 API Server 发送 HTTP GET 请求
2. **数据查询**：API Server 从 etcd 获取资源数据
3. **结果返回**：数据经过格式化后返回给用户

### 🗑️ kubectl delete 删除流程
1. **标记删除**：API Server 在 etcd 中标记资源为删除状态
2. **控制面处理**：Controller Manager 处理删除逻辑和 finalizers
3. **数据面执行**：kubelet 停止容器，最终从 etcd 中移除记录

### 📦 kubectl apply 创建流程
1. **资源存储**：API Server 将 Deployment 存储到 etcd
2. **控制器响应**：Controller Manager 创建 ReplicaSet 和 Pod
3. **调度分配**：Scheduler 为 Pod 选择合适的节点
4. **容器创建**：kubelet 通过 CRI 创建实际容器
5. **网络配置**：kube-proxy 更新网络规则

### 📜 kubectl logs 日志流程
1. **请求转发**：API Server 将日志请求转发到目标节点
2. **日志获取**：kubelet 从容器运行时获取日志数据
3. **流式返回**：日志以流的形式实时返回给用户

---

## 🔗 相关资源

### 核心组件文档
- [[Sources/AIGC/∑ k8s 入门到精通 MOC]]：完整学习路径
- [[Spaces/1-Project/2025年ack和k8s学习回顾/kubernetes 核心组件及架构]]：组件详解
- [[k8s技术架构图]]：现有架构图

### 工具链相关
- [[Spaces/3-Resource/软件梳理/linux常用命令/kubectl]]：命令行工具详解
- [[Spaces/1-Project/2025年ack和k8s学习回顾/kubelet]]：节点代理组件
- [[Spaces/1-Project/2025年ack和k8s学习回顾/kube-proxy]]：网络代理组件

### 实践指南
- [[Spaces/1-Project/2025年ack和k8s学习回顾/k8s 快速入门]]：快速上手指南
- [[k8s 本地开发]]：本地开发环境

---

> **说明**：本文档基于 [[Sources/AIGC/∑ k8s 入门到精通 MOC]] 的知识体系创建，旨在提供 kubectl 命令执行的可视化流程参考。 