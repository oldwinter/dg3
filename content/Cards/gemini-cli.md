---
{"publish":true,"permalink":"/Cards/gemini-cli.md","created":"2025-06-25","modified":"2025-07-10","tags":["AI工具","linux命令"],"cssclasses":""}
---


![CleanShot 2025-07-10 at 17.50.48@2x.png](https://pub-pic.oldwinter.top/2025/07/d7bbeeb0693c3a6118a7a252a8e6ecdc.png)

运行了20分钟还没结束，是不是快被我榨干了。

## 使用教程

[Title Unavailable \| Site Unreachable](https://github.com/google-gemini/gemini-cli/blob/main/docs/index.md)

## 个人使用经验

[[Cards/gemini cli 使用经验]]

## 快速迭代中，定期执行更新

```
npm update -g @google/gemini-cli
```

## 如何在linux没浏览器的环境中，登录

```
npm install -g @google/gemini-cli
gemini
```

远程先安装gemini-cli，然后等要经过浏览器验证的时候，先ctrl c退出。接着

在本机登录后，将~/.gemini目录下的文件拷贝到远程linux的~/.gemini目录。

## 如何多账号轮询，避免降级到flash模型

## 目前的tools

    - ReadFolder
    - ReadFile
    - SearchText
    - FindFiles
    - Edit
    - WriteFile
    - WebFetch
    - ReadManyFiles
    - Shell
    - Save Memory

和cursor对比一下，目前主要缺少向量化嵌入，然后进行语义化搜索代码的功能。以及这些cursor多的功能，其实可有可无：

- 创建mermaid。
- 编辑 jupyter notebook

![[Spaces/1-Project/Cursor/cursor 1.0 有的全部tools]]
