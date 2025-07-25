---
{"publish":true,"permalink":"/Cards/claude code.md","created":"2025-04-17","modified":"2025-06-25","published":"2025-07-23T16:46:12.722+08:00","tags":["powershell命令","linux命令"],"cssclasses":""}
---


使用[[Cards/claude code router]]绕过官方限制。或者使用各种第三方的中转站： [[Cards/claude code 第三方中转站]]

[[📥 Inbox/claude code windows]]

## 使用技巧

1. 先创建claude说明文件。本仓库的范例：CLAUDE
2. 复杂问题，使用 plan mode ，切换快捷键 shift + tab
3. 连接到ide，比如cursor。
	1. cursor中安装claude code。
	2. cc中输入/ide进行连接。


## 通知音效

telegram 和folo频道推荐

找到让 Claude Code 完成时提醒我的办法了，最优雅的方式是配置 Claude Code 的 hooks，让它每次完成时播放音效。

编辑设置文件 ~/.claude/settings.json
{
  "model": "sonnet",
  "hooks": {
        "Stop": [
            {
                "hooks": [
                    {
                        "type": "command",
                        "command": "afplay ~/Sounds/notification.mp3"
                    }
                ]
            }
        ],
        "Notification": [
            {
                "hooks": [
                    {
                        "type": "command",
                        "command": "afplay ~/Sounds/notification.mp3"
                    }
                ]
            }
        ]
  }
}


## 危险模式，让其全自动驾驶
```
claude --dangerously-skip-permissions
```



## 使用其他模型

[[📥 Inbox/kimi v2用于claude code]]
