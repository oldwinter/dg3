---
publish: true
permalink: /Spaces/2-Area/windows高效使用/Windows Hyper键快捷键分配.md
title: Windows Hyper键快捷键分配
created: 2024-11-21
modified: 2026-05-01
published: 2026-05-16T01:30:27.353+08:00
---

hyper 使用 [[MyKeyMap]] 配置

2025-6-19：换成使用raycast定义。但是windows 上hyper键使用[[AutoHotkey]]改完后有问题，所以就直接映射成windows键，先用win键顶一顶。

也可以直接使用[[PowerToys|PowerToys]]的键盘管理器，直接映射。 // 最终选这个方案比较稳定

![PixPin\_2025-06-26\_03-39-05.png](https://pub-pic.oldwinter.top/2025/06/06b12446cd6fa027be58550ddb448c00.png)

## KMonad 尝试结论

- 软件：KMonad
- 平台：Windows
- 状态：已卸载，当前不再使用
- 尝试方案：把 `Caps Lock` 映射成“伪 Hyper”，实际输出为 `Ctrl + Alt + Shift`
- 已知问题：
  - “真 Hyper”=`Win + Ctrl + Alt + Shift` 在 Windows 上会触发 Office Key 行为，误打开 Microsoft 365 页面。
  - 改成不带 `Win` 的“伪 Hyper”后，这台机器上仍然存在识别异常，`Caps Lock` 不能稳定替代为修饰键。
- 结论：这次 KMonad 方案在当前 Windows 环境下存在 bug，已放弃；最终仍优先用 [[PowerToys]] 或直接映射 Win 键。

参考：

- KMonad: <https://github.com/kmonad/kmonad>
- Microsoft Support, Office Key: <https://support.microsoft.com/en-us/office/using-the-office-key-df8665d3-761b-4a16-84b8-2cfb830e6aff>
