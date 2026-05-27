---
publish: true
permalink: /🍀 花园导览/🧰 本库指南/Obsidian/Plugins/Dataview.md
aliases:
  - Dataviewjs
title: Dataview
created: 2022-06-09
modified: 2023-03-14
published: 2026-05-16T01:35:26.704+08:00
---

除了偶尔充当性能刺客，让我打开某个文件的时候，卡半天。其他都很好。[[∑ BASE|Bases]]性能嘎嘎好，永不背刺。

> 今天又被这个dataview被辞了，打开这个文件，卡了好久。

## 本质

[[frontmatter]]本质就是表格的一列列属性。dataview的本质就是表格的filter筛选功能。

## 调试技巧

打开调试控制台，在dataviewjs里面可以直接console.log，以查看所有变量。目前还没找到比较好的智能提示代码的方法。先这样将就用。如下，打开调试控制台，可以看到，打印出了obsidian系统api自带的全部方法和变量。

Dataview 动态块已退役；历史正文保留。

## 感悟

dataview 的牛逼之处，在于它让我们成为自己笔记库的大数据分析师。不管我们创建的数据有多么杂乱，往往根据自己的思维方式所创建出文件的『文件夹、标签、链接』出现一定的范式而变得有迹可循，再配合上创建时间修改时间等信息，从自己的笔记海洋中抓取自己想要的数据，变得简单。这也是 [[自下而上]]的方法必须要配套的[[工具和方法论]]。

官网：

[GitHub - blacksmithgu/obsidian-dataview: A high-performance data index and query language over Markdown files, for https://obsidian.md/.](https://github.com/blacksmithgu/obsidian-dataview)

## 简单的 dataview 语法

[Queries - Dataview](https://blacksmithgu.github.io/obsidian-dataview/query/queries/)

## 常用范例

dataviewjs常用使用示例范例

dataview常用使用示例范例

可能在ob会用一辈子的dataview代码

## dataviewjs 的参考资料

鸟姐的dataviewjs技巧
[ObsidianDataview文档中文 - 知乎](https://www.zhihu.com/column/c_1504479637841866752)

[Obsidian 插件之 Dataview - 少数派 (sspai.com)](https://sspai.com/post/68183)

dataviewjs 可以实现更灵活的语法，比如表格插入一个自增长的变量，实现表格的 No 行号显示效果。

dataviewjs 社区有很多酷炫的玩法和现有代码，当要用的时候，先去找找看，别自己造轮子。

dataview 有种数据挖掘的感觉。通过不同角度分析和挖掘自己的大脑曾经的思考轨迹和路径。

## dataviewjs 的内置函数与变量

[[dataview的数据来源]]

不支持代码智能联想，只能手动记忆或查表。

[Codeblock Reference - Dataview](https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/)

## Query

### 预备数据：

测试 dataviewjs 的查询效果，勿删

测试 outlinks

### 代码

相当于获取 dataview 对象的内部数据，然后需要通过 Render 函数，类似 console.log 打印出来，才能看到。

目前看，只能根据 tag、文件夹、路径/文件名这几个属性 query 页面 pages

Dataview 动态块已退役；历史正文保留。

## Render

就是将数据打印 print 出来

Dataview 动态块已退役；历史正文保留。

## Dataviews

dataviews 和 notion 的 dataview 类似，打印展示 table、list、tasklist 等视图。

相当于是前面获取了 pages 以后，这里对 pages 进行 profile 处理，获取自己关心的一些属性，参照前面打印出来的属性值即可，比如 tags、etags、cdate

获取到的是 promise，render 函数相当于阻塞获取数据，以及 where 函数相当于是传入一个筛选功能的函数

taskList 起到了 render 函数同样的作用。

Dataview 动态块已退役；历史正文保留。

## Utility

相当于提供了一些通用函数进行便捷 utils 处理。

Dataview API 示例已退役；历史说明保留。

## File IO

必须阅读模式下才生效，实时阅览模式下会报错

Dataview 动态块已退役；历史正文保留。

## Query Evaluation

貌似没啥用

Dataview 动态块已退役；历史正文保留。

## example

Dataview 动态块已退役；历史正文保留。

### 未完成 tasks

Dataview 动态块已退役；历史正文保留。

Dataview 动态块已退役；历史正文保留。

### 已完成 tasks

Dataview 动态块已退役；历史正文保留。
