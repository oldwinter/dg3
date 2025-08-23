---
{"publish":true,"permalink":"/Spaces/3-Resource/软件梳理/macos软件/Cursor.md","title":"Cursor","created":"2023-12-02","modified":"2024-11-21","tags":["windows软件","macOS软件","AI产品/编程","raycast插件"],"cssclasses":""}
---


[[📥 Inbox/cursor cli]]

[[Spaces/1-Project/Cursor/cursor 使用技巧总结]]
[[Spaces/1-Project/Cursor/cursor和idea比如goland之间互相跳转]]

[[Spaces/1-Project/Cursor/cursor开发ios 项目]]

[[Spaces/3-Resource/账号密码/cursor账号清单]]

[[Spaces/1-Project/Cursor/cursor-auto 试用]]
## 默认快捷键配置

向前向后改成 cmd + `[`

cmd + p ，输入 shortcut，打开 JSON 格式的用户自定义快捷键设置，改成如下：

```
// Place your key bindings in this file to override the defaultsauto[]
[
    {
        "key": "cmd+[",
        "command": "-editor.action.outdentLines",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "cmd+]",
        "command": "-editor.action.indentLines",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "cmd+[",
        "command": "workbench.action.navigateBack",
        "when": "canNavigateBack"
    },
    {
        "key": "cmd+]",
        "command": "workbench.action.navigateForward",
        "when": "canNavigateForward"
    }
]
```

## 使用技巧

用它生成 Git commit 信息

chat 框中，@Git ，找到 Git commit ，然后粘贴下面的提示词既可。

```
You are an expert software engineer.
Review the provided context and diffs which are about to be committed to a git repo.
Review the diffs carefully.
Generate a commit message for those changes.
The commit message MUST use the imperative tense.
The commit message should be structured as follows: <type>: <description>
Use these for <type>: fix, feat, build, chore, ci, docs, style, refactor, perf, test
Reply with JUST the commit message, without quotes, comments, questions, etc!
```

[[Cards/ai 生成界面和样式代码]]