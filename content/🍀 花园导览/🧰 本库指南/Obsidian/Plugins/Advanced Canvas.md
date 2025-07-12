---
date created: 2024-05-11
date modified: 2025-07-10
tags:
  - obsidian插件
status:
rating: 7
publish: true
---

2025-6-7 新版本可以完全平替掉[[🍀 花园导览/🧰 本库指南/Obsidian/Plugins/Enhanced Canvas\|Enhanced Canvas]]的功能，只需要到反向面板中查看既可，而且也能直接跳转到canvas中对应的位置，而且canvas中的卡片如果有引用，也可以显示。

搞一个示例canvas，把所有高级特性演示一遍。

## 技巧

### 自动生成edge边

给canvas-edges加上另外的文件双链，则会在canvas自动生成连线。被连的也要手动拖进canvas。

![CleanShot 2025-06-09 at 02.24.20@2x.png](https://pub-pic.oldwinter.top/2025/06/c0644a92158fec4bde0f12c60db3185f.png)

### 连线卡片自动出现反链和出链。

![CleanShot 2025-06-09 at 02.29.25@2x.png](https://pub-pic.oldwinter.top/2025/06/38a90750f7da967fe4180a9609f30465.png)

### 双击卡片或笔记的下边框，自动变到合适高度

### 自动聚焦到canvas的某个具体节点

当前canvas后面输入#就能自动列出id，但是这里id都是数字，看不懂哪个是哪个节点。第二个问题是，只识别卡片，不识别文件，文件得自己打开源码查找或替换id。

id设置成中文也行，只要是唯一的值。

[[macos 必备软件.canvas#xxxx|macos 必备软件]]

[[内网穿透原理解析.canvas#9be3b3c44cf4d1e2|内网穿透原理解析]]
