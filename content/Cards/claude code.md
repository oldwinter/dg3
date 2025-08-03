---
{"publish":true,"permalink":"/Cards/claude code.md","created":"2025-04-17","modified":"2025-08-02","tags":["powershell命令","linux命令"],"cssclasses":""}
---


用量监控[[📥 Inbox/claude code monitor]]
##

在多个子环境中使用

```
orb -m ubuntu -u root
```

如果使用非root模式，则安装有点麻烦。如果使用root，则无法使用 claude 的疯狂模式。

```
curl https://mise.run | sh

echo "eval \"\$(/root/.local/bin/mise activate bash)\"" >> ~/.bashrc

source ~/.bashrc

mise trust

mise use node

npm install -g @anthropic-ai/claude-code
```

##

```
npm install -g @anthropic-ai/claude-code
```

##

使用[[Sources/GithubStarsSync/claude-code-router]]绕过官方限制。或者使用各种第三方的中转站： [[Cards/claude code 第三方中转站]]

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

```

{
  "model": "Qwen/Qwen3-235B-A22B-Thinking-2507",
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
  },
  "permissions": { "allow": [ "Bash(ls:*)", "ReadFile:*", "Edit" ], "deny": [ "Bash(rm:*)", "Bash(sudo:*)" ] }
}

```

## 危险模式，让其全自动驾驶

也叫yolo模式？

```
claude --dangerously-skip-permissions
```

## 其他常用参数

## 使用其他模型

[[📥 Inbox/kimi v2用于claude code-官方token-不用ccr的情况下]]
