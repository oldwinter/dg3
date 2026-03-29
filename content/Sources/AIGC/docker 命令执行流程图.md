---
publish: true
permalink: /Sources/AIGC/docker 命令执行流程图.md
title: docker 命令执行流程图
created: 2025-01-28
modified: 2025-01-28
---

d

# 🐋 Docker 命令执行流程图

> 详细展示 docker 典型命令在 Docker 系统各层组件间的流程流转

## 📋 快速导航

- [[#🏗️ Docker 整体架构图]]
- [[#⏱️ 详细执行时序图]]
- [[#🔍 关键流程说明]]
- [[#🔗 相关资源]]

---

## 🏗️ Docker 整体架构图

```mermaid
graph TB
    subgraph "🖥️ 用户层"
        U[👤 用户]
        docker[🐋 docker CLI<br/>🔹 命令行客户端<br/>🔹 REST API 调用<br/>🔹 用户交互界面]
    end
    
    subgraph "🎛️ Docker 守护进程层"
        dockerd[⚙️ dockerd<br/>🔹 Docker 守护进程<br/>🔹 API 服务器<br/>🔹 镜像管理<br/>🔹 网络管理]
        registry[🌐 Docker Registry<br/>🔹 镜像仓库<br/>🔹 Docker Hub<br/>🔹 私有仓库]
    end
    
    subgraph "🔧 高级运行时层"
        containerd[🛠️ containerd<br/>🔹 容器生命周期管理<br/>🔹 镜像拉取与存储<br/>🔹 网络配置<br/>🔹 存储管理]
    end
    
    subgraph "⚡ 低级运行时层"
        runc[🚀 runc<br/>🔹 OCI 运行时<br/>🔹 容器创建<br/>🔹 进程管理<br/>🔹 Namespace 隔离]
        shim[🔌 containerd-shim<br/>🔹 容器进程守护<br/>🔹 IO 重定向<br/>🔹 信号转发]
    end
    
    subgraph "💾 存储与网络层"
        storage[💽 存储驱动<br/>🔹 镜像层存储<br/>🔹 容器读写层<br/>🔹 数据卷管理]
        network[🌐 网络驱动<br/>🔹 Bridge 网络<br/>🔹 Host 网络<br/>🔹 Overlay 网络]
    end
    
    subgraph "🔄 典型命令流程"
        direction TB
        PS["docker ps<br/>📋 列出容器"]
        RUN["docker run<br/>🚀 运行容器"]
        RM["docker rm<br/>🗑️ 删除容器"]
        LOGS["docker logs<br/>📜 查看日志"]
        IMAGES["docker images<br/>🖼️ 列出镜像"]
        PULL["docker pull<br/>⬇️ 拉取镜像"]
    end
    
    %% 用户交互
    U --> docker
    docker <--> dockerd
    
    %% 守护进程层交互
    dockerd <--> registry
    dockerd --> containerd
    
    %% 运行时层交互
    containerd --> runc
    containerd --> shim
    runc --> shim
    
    %% 存储网络层交互
    containerd --> storage
    containerd --> network
    
    %% 命令流程
    PS --> dockerd
    RUN --> dockerd
    RM --> dockerd
    LOGS --> dockerd
    IMAGES --> dockerd
    PULL --> dockerd
    
    %% 样式
    classDef userLayer fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef daemonLayer fill:#e3f2fd,stroke:#0d47a1,stroke-width:2px
    classDef highRuntime fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef lowRuntime fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef infrastructure fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    classDef commandFlow fill:#f1f8e9,stroke:#33691e,stroke-width:2px
    
    class U,docker userLayer
    class dockerd,registry daemonLayer
    class containerd highRuntime
    class runc,shim lowRuntime
    class storage,network infrastructure
    class PS,RUN,RM,LOGS,IMAGES,PULL commandFlow
```

---

## ⏱️ 详细执行时序图

```mermaid
sequenceDiagram
    participant User as 👤 用户
    participant CLI as 🐋 docker CLI
    participant Daemon as ⚙️ dockerd
    participant Registry as 🌐 Docker Registry
    participant containerd as 🛠️ containerd
    participant runc as 🚀 runc
    participant shim as 🔌 shim
    participant Storage as 💽 存储驱动
    participant Network as 🌐 网络驱动

    Note over User, Network: docker ps 命令流程
    
    User->>CLI: docker ps
    CLI->>Daemon: GET /containers/json
    Daemon->>containerd: 查询容器列表
    containerd-->>Daemon: 返回容器信息
    Daemon-->>CLI: JSON 格式容器数据
    CLI-->>User: 格式化输出容器列表

    Note over User, Network: docker pull 命令流程
    
    User->>CLI: docker pull <image>
    CLI->>Daemon: POST /images/create
    Daemon->>Registry: 查询镜像 manifest
    Registry-->>Daemon: 返回镜像层信息
    
    loop 下载镜像层
        Daemon->>Registry: 下载镜像层
        Registry-->>Daemon: 返回层数据
        Daemon->>Storage: 存储镜像层
    end
    
    Daemon-->>CLI: 下载完成确认
    CLI-->>User: 显示拉取成功

    Note over User, Network: docker run 命令流程
    
    User->>CLI: docker run <image> <cmd>
    CLI->>Daemon: POST /containers/create
    
    Note right of Daemon: 镜像准备阶段
    Daemon->>Storage: 检查镜像是否存在
    alt 镜像不存在
        Daemon->>Registry: 拉取镜像
        Registry-->>Daemon: 返回镜像数据
        Daemon->>Storage: 存储镜像层
    end
    
    Note right of Daemon: 容器创建阶段
    Daemon->>containerd: 创建容器
    containerd->>Storage: 创建容器读写层
    containerd->>Network: 分配网络配置
    containerd->>runc: 创建容器进程
    runc->>shim: 启动容器守护进程
    
    Note right of runc: 容器运行阶段
    runc->>runc: 设置 Namespace<br/>配置 cgroups<br/>执行容器进程
    runc-->>shim: 容器启动完成
    shim-->>containerd: 报告容器状态
    containerd-->>Daemon: 容器运行中
    
    Daemon-->>CLI: 返回容器 ID
    CLI-->>User: 显示容器启动成功

    Note over User, Network: docker rm 命令流程
    
    User->>CLI: docker rm <container>
    CLI->>Daemon: DELETE /containers/<id>
    
    Note right of Daemon: 容器停止阶段
    Daemon->>containerd: 停止容器
    containerd->>shim: 发送 SIGTERM 信号
    shim->>shim: 等待进程退出
    alt 优雅退出失败
        shim->>shim: 发送 SIGKILL 信号
    end
    
    Note right of containerd: 资源清理阶段
    shim-->>containerd: 容器进程已退出
    containerd->>Storage: 删除容器读写层
    containerd->>Network: 清理网络配置
    containerd-->>Daemon: 容器已删除
    
    Daemon-->>CLI: 返回删除确认
    CLI-->>User: 显示删除成功

    Note over User, Network: docker logs 命令流程
    
    User->>CLI: docker logs <container>
    CLI->>Daemon: GET /containers/<id>/logs
    Daemon->>containerd: 请求容器日志
    containerd->>shim: 获取容器输出
    shim->>Storage: 读取日志文件
    Storage-->>shim: 返回日志数据
    shim-->>containerd: 转发日志流
    containerd-->>Daemon: 返回日志数据
    Daemon-->>CLI: 流式返回日志
    CLI-->>User: 实时显示日志输出

    Note over User, Network: docker images 命令流程
    
    User->>CLI: docker images
    CLI->>Daemon: GET /images/json
    Daemon->>Storage: 查询本地镜像
    Storage-->>Daemon: 返回镜像列表
    Daemon-->>CLI: JSON 格式镜像数据
    CLI-->>User: 格式化输出镜像列表
```

---

## 🔍 关键流程说明

### 📋 docker ps 查询流程

1. **API 调用**：docker CLI 向 dockerd 发送 REST API 请求
2. **容器查询**：dockerd 通过 containerd 获取容器状态信息
3. **结果返回**：数据经过格式化后返回给用户

### ⬇️ docker pull 拉取流程

1. **镜像查询**：dockerd 向 Registry 查询镜像 manifest
2. **层下载**：并行下载镜像的各个层
3. **本地存储**：存储驱动将镜像层保存到本地文件系统

### 🚀 docker run 运行流程

1. **镜像准备**：检查镜像是否存在，不存在则自动拉取
2. **容器创建**：containerd 创建容器实例和网络配置
3. **进程启动**：runc 设置隔离环境并启动容器进程
4. **守护监控**：containerd-shim 负责容器进程的生命周期管理

### 🗑️ docker rm 删除流程

1. **容器停止**：发送 SIGTERM 信号优雅停止，必要时使用 SIGKILL
2. **资源清理**：清理容器读写层、网络配置等资源
3. **状态更新**：从容器列表中移除容器记录

### 📜 docker logs 日志流程

1. **日志请求**：dockerd 通过 containerd 请求容器日志
2. **文件读取**：containerd-shim 从存储中读取日志文件
3. **流式返回**：日志以流的形式实时返回给用户

### 🖼️ docker images 镜像流程

1. **本地查询**：dockerd 通过存储驱动查询本地镜像
2. **元数据获取**：收集镜像大小、创建时间等元数据
3. **格式化输出**：将镜像列表格式化显示给用户

---

## 🏗️ Docker 架构分层说明

### 🖥️ 用户层

- **docker CLI**：用户交互的命令行工具，通过 REST API 与 dockerd 通信

### 🎛️ 守护进程层

- **dockerd**：Docker 的核心守护进程，负责 API 服务、镜像管理、网络管理
- **Docker Registry**：镜像仓库，可以是 Docker Hub 或私有仓库

### 🔧 高级运行时层

- **containerd**：高级容器运行时，负责容器生命周期管理、镜像存储、网络配置

### ⚡ 低级运行时层

- **runc**：OCI 标准的容器运行时，负责实际创建和运行容器
- **containerd-shim**：容器守护进程，负责容器进程的监控和 IO 重定向

### 💾 基础设施层

- **存储驱动**：管理镜像层和容器读写层（overlay2、aufs 等）
- **网络驱动**：提供容器网络功能（bridge、host、overlay 等）

---

## 🔗 相关资源

### 容器技术基础

- [[cri容器运行时-containerd]]：容器运行时详解
- [[docker 实践]]：Docker 实战指南

### 相关架构图

- [[kubectl 命令执行流程图]]：k8s 命令执行流程
- [[k8s技术架构图]]：Kubernetes 架构对比

### 学习资源

- [Docker 官方文档](https://docs.docker.com/)：Docker 官方文档
- [containerd 文档](https://containerd.io/)：containerd 官方文档
- [OCI 规范](https://opencontainers.org/)：开放容器标准

---

## 💡 实用提示

### 🔧 调试技巧

- 使用 `docker system df` 查看 Docker 空间使用情况
- 使用 `docker system events` 实时监控 Docker 事件
- 使用 `docker inspect` 查看容器或镜像的详细信息

### 🚀 性能优化

- 使用多阶段构建减小镜像大小
- 合理使用 `.dockerignore` 文件
- 利用镜像层缓存机制加速构建

### 🔒 安全最佳实践

- 不在镜像中存储敏感信息
- 使用非 root 用户运行容器
- 定期更新基础镜像和依赖

---

> **说明**：本文档详细展示了 Docker 各组件间的交互流程，有助于理解 Docker 的内部工作机制和容器技术的底层原理。
