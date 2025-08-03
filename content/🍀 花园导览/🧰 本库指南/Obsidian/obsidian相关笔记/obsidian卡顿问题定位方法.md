---
{"publish":true,"permalink":"/🍀 花园导览/🧰 本库指南/Obsidian/obsidian相关笔记/obsidian卡顿问题定位方法.md","created":"2023-12-21","modified":"2024-11-21","cssclasses":""}
---


## obsidian 卡顿问题定位方法

1. option cmd i，打开 devoloper tool
2. 切换到 performance tab
3. 点击录制，开始打字或其他会造成界面卡顿的操作。
4. 停止录制。
	1. 切换到 sources tab
	2. 逐个点开 plugin:xxx 文件，只要被刚才的操作执行到的 function，这边都会有其时间耗用的显示。由于 js 是单线程，某段 50ms 以上的函数执行会阻塞界面 render，从而带来卡顿感，可视为怀疑对象。
	3. 以上方法可能不灵
5. 按下图，找到卡顿的帧，然后点开它的 call tree：就能找到调用的源头在哪个插件里面。

![Pasted image 20240514232311](https://pub-pic.oldwinter.top/2025/06/1a82c57b65944bfe7be38179d1c31bc3.png)