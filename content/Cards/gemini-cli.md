---
date created: 2025-06-25
date modified: 2025-07-10
tags:
  - AI工具
publish: true
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


## 完整工具清单（共14个）

### 文件操作类（5个）

1. read_file - 读取文件内容

2. edit_file - 编辑或创建文件

3. search_replace - 搜索替换文本

4. delete_file - 删除文件

5. list_dir - 列出目录内容

### 搜索类（3个）

1. codebase_search - 语义搜索代码

2. grep_search - 正则表达式搜索

3. file_search - 文件路径模糊搜索

### 执行类（1个）

1. run_terminal_cmd - 执行终端命令

### 专用编辑类（1个）

1. edit_notebook - 编辑Jupyter notebook

### 信息获取类（1个）

1. web_search - 网络搜索

### 可视化类（1个）

1. create_diagram - 创建Mermaid图表

### 知识管理类（1个）

1. add_to_memory - 存储知识到知识库

### 修复类（1个）

1. reapply - 重新应用编辑


## mcp

通过mcp引入。
### 交互类（1个）

这个mcp可以极大地缩减快速请求次数的消耗。

1. mcp_interactive-feedback_interactive_feedback - 交互式反馈
