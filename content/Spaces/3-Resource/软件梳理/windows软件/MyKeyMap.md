---
{"publish":true,"permalink":"/Spaces/3-Resource/软件梳理/windows软件/MyKeyMap.md","description":"一款基于 AutoHotkey 的键盘映射工具","created":"2024-08-17","modified":"2025-07-13","published":"2025-07-13T14:13:18.728+08:00","tags":["windows软件","github开源"],"cssclasses":""}
---


目前可以用于取代[[Spaces/3-Resource/软件梳理/macos软件/Raycast]]中的热键，按一次呼出，再按一次隐藏。就很优雅。

配置备份：界面没有导入导出，直接复制到data目录

![[config.json]]

## 独特优势

快速的配置hyper + 字母，给应用设置快捷键，从而可以快速切换/隐藏窗口。

caps + r，默认直接可以起到同应用不同窗口的切换，类似macos 的 cmd \` 快捷键的作用。

## 配置技巧

### 激活窗口

## 🚀 启动程序或激活窗口

### 概述

- 此功能用来启动程序或激活窗口，其中「 激活窗口 」是亮点，因为程序往往只启动一次，却要激活它的窗口几十上百次
	
- 基于模糊搜索的启动器 ( 比如开始菜单 ) 确实很方便，但在面对「 常用软件 」时，它们还不够方便:
	
	1. 模糊搜索具有模糊性，需要担心和处理不匹配的情况，而快捷键是精准确定的，无脑按就行
		
	2. 模糊搜索消耗的按键次数更多，至少要按 5 个键才能启动，而快捷键只需 1/2/3 个键
		
	3. 缺乏激活窗口的能力，而激活窗口的频率要比启动频率高得多

特殊的：

![PixPin_2025-07-13_14-12-59.png](https://pub-pic.oldwinter.top/2025/07/a226bba0c74f18a4520b3383cd2f2084.png)

clash verge，qq和微信，需要用到函数，并在软件内配置全局快捷键，比如clash我配置的ctrl shift alt p

![PixPin_2025-07-13_14-11-47.png](https://pub-pic.oldwinter.top/2025/07/5370351fd65ed2554fb1e94e5c13b08e.png)

```
ProcessExistSendKeyOrRun("clash-verge.exe", "^+!p", "shortcuts\Clash Verge.lnk")
```
