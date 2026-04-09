---
publish: true
permalink: /Extras/Scripts/ts-scripts/obsidian-scripts/___README.md
created: 2025-08-21
modified: 2026-03-30
published: 2026-03-30T01:31:09.390+08:00
---

# Obsidian 脚本目录

这个目录现在按“主入口 / archive / examples”拆开了。目的很简单：常用脚本留在顶层，低频脚本和学习脚本别再和生产入口混在一起。

需要安装 [[codescript toolkit]] 插件。

所有脚本执行前，都==一定做好备份==，至少先有一个 git 提交点。

## 当前结构

- 根目录
  - 现在仍建议直接运行的脚本
- `archive/`
  - 低频脚本、重复脚本、历史脚本
- `examples/`
  - 学习和调试用脚本，不建议当生产入口

## 当前主入口脚本

- [[Extras/Scripts/ts-scripts/obsidian-scripts/今日笔记总结报告.ts]]
- [[Extras/Scripts/ts-scripts/obsidian-scripts/本周笔记总结报告.ts]]
- [[Extras/Scripts/ts-scripts/obsidian-scripts/时间筛选笔记.ts]]
- [[Extras/Scripts/ts-scripts/obsidian-scripts/脚本运行状态检查.ts]]
- [[Extras/Scripts/ts-scripts/obsidian-scripts/搜索匹配已安装插件，并为所有插件创建笔记文件.ts]]
- [[Extras/Scripts/ts-scripts/obsidian-scripts/提取当前打开文件名的对应应用图标.ts]]
- [[Extras/Scripts/ts-scripts/obsidian-scripts/已安装应用统计报告-mac-win均有.ts]]

## 归档说明

- `archive/` 里的脚本不是立即删除，而是先退出主入口。
- `examples/` 里的脚本只用于学习、调试、熟悉 API。
- 如果某个归档脚本未来重新高频使用，再移回根目录。

## 运行建议

- 优先只给主入口脚本绑定快捷键或 URL 调用。
- `archive/` 和 `examples/` 默认不要挂到高频工作流。
- 先看脚本头部注释，再决定是否运行，不凭文件名猜用途。
