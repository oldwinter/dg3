---
{"publish":true,"permalink":"/Atlas/Canvas/» canvas使用经验.md","title":"» canvas使用经验","created":"2023-02-27","modified":"2025-07-15","published":"2025-07-15T19:37:32.520+08:00","cssclasses":""}
---


## 熟悉各种操作

官网教程，拉到 TIPS那，每个操作都有动画演示：[Obsidian Canvas - Obsidian](https://obsidian.md/canvas)

## 当前缺陷

[[🍀 花园导览/🧰 本库指南/Obsidian/obsidian相关笔记/obsidian canvas当前的致命缺陷]]

## 使用原则

如果还没想好怎么用，就先当成思维导图用，规划好 起点和终点，起点最好是最左边或最上边，终点是最右边或最下边。最好避免四个方向都发散，会导致千头万绪，然后后面自己都看不懂了。

## 使用技巧

- canvas选中文件，然后使用 move to 功能，可以很方便转移文件到指定文件夹。
- 将canvas pin以后，双击白板内的md文件的标题，会在另一个tab页中打开该文件，非常实用。
- 要检索某个md文件或canvas文件，是否被其他canvas引用，目前反向链接面板无数据，可以通过[[🍀 花园导览/🧰 本库指南/Obsidian/Plugins/Omnisearch]]搜索，曲线救国实现。
- canvas中可以嵌入excalidraw源文件，直接显式图片
	- [[canvas 嵌入高级视图使用示例.canvas|canvas 嵌入高级视图使用示例]]
	- [[Atlas/Bases/∑ BASE\|Bases]]文件，可以直接显示
	- [[🍀 花园导览/🧰 本库指南/Obsidian/Plugins/Lineage\|类似gingko的插件]]也可以直接显示
	- [[🍀 花园导览/🧰 本库指南/Obsidian/Plugins/DB Folder]]文件，直接显式表格
	- [[Cards/Advanced Slides]]的代码块形式的内嵌
	- 卡片也支持md语法，因此可以支持mermaid，表格等任意md数据形式。
	- 目前不支持直接显示
		- mindmap
		- kanban
- 考虑使用[[Cards/金字塔原理]]，自上而下地构建canvas，可以模仿roadmap.sh网站，将宽度限制恒定，高度无限，这样更容易收住，也更容易画图。
- canvas过大的时候，如果要搜索某个元素，使用[[🍀 花园导览/🧰 本库指南/Obsidian/Plugins/Quick Switcher++]]的$模式，可以直达。设成了 cmd + k 快捷键。在md文件中，这个功能是快速到header节点。
	- ![image.png](https://my-public-pic.oss-cn-hangzhou.aliyuncs.com/20250531014727939.png)
- 如果要查看obsidian各种附件的反向链接，可以先临时拖动到canvas，然后安装[[🍀 花园导览/🧰 本库指南/Obsidian/Plugins/Advanced Canvas]]插件后，在canvas中，点击附件，通过反向链接面板，就能查看到其被什么笔记引用了。

## 使用canvas candy可以稍微美化一下卡片

使用[[🍀 花园导览/🧰 本库指南/Obsidian/Plugins/canvas candy\|canvas candy]]
