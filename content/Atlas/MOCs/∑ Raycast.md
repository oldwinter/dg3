---
publish: true
permalink: /Atlas/MOCs/∑ Raycast.md
created: 2025-07-07
modified: 2025-07-07
published: 2026-02-08T13:48:32.044+08:00
---

# ∑ Raycast

Raycast 是一款适用于 macOS 的可扩展启动器，旨在通过将日常任务和工具整合到一个统一的界面中来提高生产力。它不仅仅是一个应用程序启动器，更是一个强大的命令中心，允许用户通过快捷键、别名和脚本来自动化和简化工作流程。

## 入门与迁移

- [[从Alfred迁移至Raycast]]
- [[Raycast 该怎么用？我们帮你准备了一份实用指南 - 少数派-2024-11-18]]
- [[Raycast折腾之路（常用功能篇） - Goalonez Blog-2024-07-18]]
- [[能少一个是一个：我用 Raycast 替代了这些应用 - 少数派-2022-05-30]]

## 核心功能

Raycast 的强大之处在于其丰富的原生功能，这些功能可以替代许多独立的应用程序。

### AI 功能

Raycast AI 将大型语言模型集成到您的日常工作流程中，提供快速问答、文本生成、代码辅助等功能。

- **概述**: [[Raycast AI]]
- **AI Chat**: [[Raycast AI Chat]]
- **AI Command & Preset**: [[Raycast AI Command]], [[Raycast AI Preset]]
- **AI 扩展**: [[Raycast AI Extension]], [[Raycast Companion]]
- **模型与限制**:
  - [[raycast 支持的模型models清单]]
  - [[Raycast AI Models Request Limits]]
  - [[raycast ai 上下文限额测试]]
  - [[raycast ai 的自带提示词破解]]
  - [[raycast 的deepseek r1模型喜欢玩包含latex的高级和抽象]]
- **自定义 API**:
  - [[一个搭配最新Raycast，无痛用自己的API畅享QuickAI功能的CF Workers - 开发调优  开发调优, Lv2]]
  - [[fake-raycast-backend]]
  - [[raycast-ai-openrouter-proxy]]
  - [[raycast-relay]]
  - [[raycast2api]]

### 窗口管理

Raycast 提供了强大的窗口管理功能，可以替代 [[Rectangle]] 等专用工具。

- [[Raycast Window Management]]
- [[raycast windows management 快捷键布局.canvas]]

### 其他核心功能

- **剪贴板历史**: [[Raycast Clipboard]]
- **代码片段**: [[Raycast Snippets]]
- **快速链接与深度链接**: [[Raycast Quicklinks]], [[Raycast Deeplink]], [[Raycast 小技巧之 Quicklink 二三事 - 少数派-2022-05-30]]
- **应用启动与快捷键**:
  - [[raycast 一键快速应用 平替 rcmd]]
  - [[全局快捷键将app一键打开或隐藏]]
  - [[Raycast Hyper Key]]
- **浮动笔记**: [[Raycast Notes]]
- **其他**:
  - [[raycast 2fa插件管理]]
  - [[raycast 快速查看时区]]
  - [[Raycast Auto Quit Applications]]
  - [[Raycast Focus]]

## 扩展与开发

Raycast 的生态系统是其核心优势之一，允许用户通过插件和脚本无限扩展其功能。

- **插件**:
  - [[raycast插件]]
  - [[categorized-raycast-extensions]]
  - [[raycast-g4f]]
- **插件开发**: [[raycast插件开发]]
- **脚本**: [[极具潜力的效率启动器 App，Raycast 脚本功能详解 - 少数派-2022-05-30]]

## 使用技巧与心得

- [[Raycast 小技巧 奇技淫巧]]
- [[Raycast 我最常用的功能]]
- [[raycast topN常用功能]]
- [[raycast wrapped 年底年度总结]]
- [[Heptabase 最完整模板中文教學及配合 Raycast 使用模板的方法]]
- [[基于raycast快速根据博主ID等信息打开小二后台对应页面的演示以及配置方法]]

---

## 合并内容

# ∑ Raycast MOC

> Raycast是一个强大的macOS启动器和生产力工具，集成了AI功能、应用管理、窗口控制等多种功能。本MOC汇总了仓库中所有Raycast相关的笔记和资源。

## 🎯 核心功能

### AI功能

- [[Raycast AI]] - AI功能总览
- [[Raycast AI Chat]] - AI聊天功能
- [[Raycast AI Command]] - AI命令功能
- [[Raycast AI Preset]] - AI预设配置
- [[raycast 支持的模型models清单]] - 支持的AI模型列表

### 应用管理与快捷键

- [[全局快捷键将app一键打开或隐藏]] - 应用快捷键管理
- [[raycast 一键快速应用 平替 rcmd]] - 快速应用切换
- [[Raycast Window Management]] - 窗口管理功能

### 实用工具

- [[raycast 2fa插件管理]] - 2FA管理
- [[raycast 快速查看时区]] - 时区查看
- [[Raycast Deeplink]] - 深链接功能
- [[raycast wrapped 年底年度总结]] - 年度总结功能

## 📝 使用心得

### 个人使用经验

- [[Raycast 我最常用的功能]] - 个人使用心得
- [[raycast topN常用功能]] - 最常用功能清单

### 开发与定制

- [[raycast插件开发]] - 插件开发指南
- [[Atlas/Bases/raycast 插件清单.base|Raycast 插件清单]] - 插件清单数据库

## 🛠️ 技术资源

### 开源项目

- [[raycast-ai-openrouter-proxy]] - AI路由代理
- [[raycast-g4f]] - GPT4Free集成
- [[raycast-relay]] - 中继服务
- [[raycast2api]] - API转换工具
- [[fake-raycast-backend]] - 虚拟后端
- [[categorized-raycast-extensions]] - 分类的Raycast扩展

### 教程与文档

- [[Raycast 系列教程]] - 来自少数派的系列教程
- [[Raycast 使用指南]] - 详细使用指南
- [[Raycast + Heptabase]] - 与Heptabase的集成使用

## 📊 功能分类

### 🔥 最常用功能Top5

1. 一键快速应用切换
2. 窗口管理
3. 剪贴板历史
4. 快速AI提问
5. AI聊天

### 🤖 AI功能特色

- 支持50+种AI模型（Claude、GPT、Gemini等）
- 自定义AI命令
- 预设AI对话模板
- 快速AI文本处理

### 🔧 扩展功能

- 2FA管理
- 时区查看
- 代码片段管理
- 快速链接
- 进程管理

## 📚 学习路径

### 入门级

1. [[raycast topN常用功能]] - 了解核心功能
2. [[Raycast 我最常用的功能]] - 参考实际使用经验
3. [[全局快捷键将app一键打开或隐藏]] - 学习快捷键设置

### 进阶级

1. [[Raycast AI]] - 深入了解AI功能
2. [[Raycast Window Management]] - 掌握窗口管理
3. [[raycast 2fa插件管理]] - 配置安全工具

### 高级定制

1. [[raycast插件开发]] - 开发自定义插件
2. [[Raycast Deeplink]] - 集成深链接功能
3. 相关开源项目 - 学习社区解决方案

## 🔗 相关资源

### 配置文件

- [[Atlas/Bases/raycast 插件清单.base|Raycast 插件清单]] - 插件配置数据库
- Raycast配置文件 - 完整配置备份

### 社区资源

- GitHub星标项目 - 相关开源工具
- 少数派教程 - 详细使用指南
- Goalonez Blog - 深度使用技巧

---

_最后更新：2025-07-06_
_相关笔记数量：48个文件_
