---
publish: true
permalink: /Sources/AIGC/∑ k8s 入门到精通 MOC.md
title: ∑ k8s 入门到精通 MOC
created: 2025-06-20
modified: 2025-06-20
published: 2026-03-29T19:26:27.620+08:00
---

up:: [[∑ Kubernetes & K8s]]

# ☸️ k8s 入门到精通 MOC

> **Kubernetes（k8s）**：云原生时代事实上的容器编排标准，负责容器化应用的部署、伸缩与管理。

## 📋 快速索引

- [[#🎯 学习概览]]
- [[#🛣️ 学习路径]]
- [[集群安装]]
- [[#🧩 核心概念与组件]]
- [[#📐 基础资源与操作]]
- [[#🚪 服务暴露与网络]]
- [[#💾 存储与持久化]]
- [[#🔒 安全与证书]]
- [[#⚙️ 运维 & 调试]]
- [[#🚀 生态工具链]]
- [[#👷 实战 & 最佳实践]]

---

## 🎯 学习概览

- [[Kubernetes]]：主入口卡片
- [[k8s 快速入门]]：零基础快速上手
- [[k8s 学习or开发环境安装]]：学习环境选型
- [[k8s 本地开发]]：本地/远程混合调试方案（mirrord、tilt 等）
- [Kubernetes 官方文档](https://kubernetes.io/zh-cn/docs/) （外链）

### 学习目标分级

| 级别 | 关键词 | 目标 |
|------|--------|------|
| 入门 | 安装 · 核心概念 | 能手动部署简单应用 |
| 进阶 | 网络 · 存储 · Helm | 能在团队内维护业务集群 |
| 熟练 | GitOps · Observability | 能独立运营中型生产集群 |
| 精通 | Operator · 性能调优 | 能设计大规模多集群方案 |

---

## 🛣️ 学习路径

### 1️⃣ 基础入门（1~2 周）

- 环境：[[k3s]]
- 命令：[[kubectl]] 基础操作
- 资源：Pod / Deployment / Service

### 2️⃣ 核心掌握（2~4 周）

- 组件：[[kubernetes 核心组件及架构]]（api-server、scheduler、controller、etcd…）
- 网络：[[k8s 网络架构解析]]、Service / Ingress / CNI
- 存储：[[pv和pvc]]、StorageClass
- 配置：ConfigMap / Secret / Namespace（参见 [[k8s default 命名空间]]）

### 3️⃣ 进阶实战（1~3 月）

- Helm：[[helm常用命令]]、[[helm包目录结构]]
- GitOps：[[gitops|GitOps]]（Argo CD、Flux CD）
- 观测：Prometheus + Grafana、[[k9s]]
- 调试：[[kubevpn]]、ktconnect

### 4️⃣ 专家之路（3 月 +）

- Operator：Kopf / Kubebuilder
- 性能调优：调度器策略、自定义调度
- 多集群 & 混合云：Cluster API、托管 K8s（EKS / ACK）比较（参见 [[自建k8s与使用阿里云ack优缺点分析]]）

---

## 🔧 本地/集群安装

- [[k8s 学习or开发环境安装]]
- [[k8s 本地开发]]
- [[k8s 快速入门]]
- 迷你发行版：[[k3s]] / k3d / MicroK8s

---

## 🧩 核心概念与组件

| 模块 | 关键卡片 |
|------|----------|
| 控制平面 | [[etcd]] |
| Node 组件 | [[kubelet]], [[kube-proxy]], [[cri容器运行时-containerd]] |
| 工作负载 | Deployment · StatefulSet · DaemonSet |
| 配置 | ConfigMap · Secret |
| 调度 | Taints / Tolerations, Affinity |
| 架构图表 | [[kubectl 命令执行流程图]]：kubectl 与组件间交互流程 |

---

## 📐 基础资源与操作

- [[kubernetes 核心资源类型]]：所有 API 资源速查
- [[k8s service]]：Service 综述 & DNS 解析
- [[k8s namespace]]：资源隔离
- [[k8s default 命名空间]]：default 的利弊
- [[k8s kubectl 获取所有资源对象和类型]]

---

## 🚪 服务暴露与网络

- ClusterIP / NodePort / LoadBalancer / ExternalName
- Ingress & Ingress Controller
- Service DNS：[[k8s service dns域名识别机制]]
- NetworkPolicy —— 出入流量控制
- ServiceMesh 方向：Istio / Linkerd（见 [[istio基于gateway网关的灰度发布]]、[[istio 架构与命令执行流程图]]）

---

## 💾 存储与持久化

- [[pv和pvc]]：PV & PVC 设计动机
- StorageClass & 动态供给
- CSI 驱动生态
- [[Kubernetes PV、PVC、StorageClass 的关系]]（外链）

---

## 🔒 安全与证书

- [[k8s 中的全部证书解析]]：集群证书全景
- RBAC：角色、绑定与 ServiceAccount
- Admission Webhook & OPA
- Secret & 加密配置

---

## ⚙️ 运维 & 调试

- 日志：[[fluentd]]、Loki、Elasticsearch
- 交互 CLI：[[kubectx]]
- 资源排错：[[k8s 集群日志查看与故障排查方法]]
- Node 心跳：[[kube-node-lease]]
- [[k8s 集群内对service ping不通的原因]]

---

## 🚀 生态工具链

- 包管理：[[helm]]、[[helm vs kustomize]]、Kustomize
- 开发调试：[[mirrord]], [[tilt]], Bridge to Kubernetes
- 网络诊断：[[rewrite-target]]
- CI/CD：Jenkins X, Tekton
- 观测：Prometheus, Grafana, Jaeger, Loki

---

## 👷 实战 & 最佳实践

- GitOps：[[gitops|GitOps]]、[[FluxCD]]
- 故障演练：Chaos Mesh
- 灰度与流量治理：Ingress、Gateway API、Service Mesh
- 云厂商托管：[[不要自建k8s与使用阿里云ack优缺点分析]]
- PaaS 与平台工程：[[k8s PaaS]]

---

> **备注**：本 MOC 仅收录仓库内已有卡片。如需深入，可在仓库中搜索关键字（k8s / Kubernetes）或补充新笔记。
