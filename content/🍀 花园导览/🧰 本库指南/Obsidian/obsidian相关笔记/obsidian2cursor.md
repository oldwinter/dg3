---
date created: 2025-01-27
date modified: 2025-01-27
title: Obsidian2Cursor 插件开发笔记
tags:
  - obsidian
  - cursor
  - 插件开发
  - 开发工具
type: project
status: processing
publish: true
---

# Obsidian2Cursor 插件开发笔记

## 💡 灵感来源

发现 cursor 和 idea 插件，能选中文件，并让其在另一个文件中打开。

考虑在 [[Spaces/3-Resource/软件梳理/安卓软件/Obsidian]] 中实现类似功能：

一方面，需要在每个 app 中都安装一个插件，有点麻烦。另一方面，我日常高频使用 [[Spaces/3-Resource/软件梳理/macos软件/Raycast]]，想将其做为控制中枢，之前它有个 warp2finder 这样的插件，所以我想，应该是能做到类似效果的。

## 🎯 决定

没有写过 raycast 插件，不会 typescript，也不懂 react，全程使用 [[Spaces/3-Resource/软件梳理/macos软件/Cursor]] 的 agent 模式开发。

尝试过以后 raycast 行不通，无法在 Obsidian 或者 cursor 应用外，获取当前选中的文件。所以先开发 [[Obsidian 插件]]。

## 📋 开发进展

### 前期调研
- [x] 研究 Cursor 和 IDE 插件的实现方式
- [x] 评估 Raycast 插件的可行性
- [ ] 确定技术栈和开发方案

### 技术难点
- Raycast 无法获取外部应用的文件选择状态
- 需要在 Obsidian 内部实现文件传递机制

## 🔗 相关笔记

- [[Spaces/3-Resource/软件梳理/macos软件/Cursor]] - AI 编程工具
- [[Spaces/3-Resource/软件梳理/安卓软件/Obsidian]] - 知识管理工具  
- [[Spaces/3-Resource/软件梳理/macos软件/Raycast]] - Mac 效率工具
- [[插件开发]] - 相关开发经验

## 💭 个人思考

这个项目体现了工具之间协作的重要性，虽然 Raycast 方案不可行，但通过 Obsidian 插件实现文件传递到 Cursor 的想法很有价值。可以考虑：

1. 开发 Obsidian 插件实现核心功能
2. 后续探索其他工具集成方案
3. 积累插件开发经验

## 🎯 下一步行动

- [ ] 学习 Obsidian 插件开发基础
- [ ] 使用 Cursor Agent 模式进行开发
- [ ] 测试插件的可用性和稳定性

## 🏷️ 相关标签

#项目管理 #工具集成 #效率提升