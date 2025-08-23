---
{"publish":true,"permalink":"/Cards/claude code.md","created":"2025-04-17","modified":"2025-08-13","tags":["powershell命令","linux命令"],"cssclasses":""}
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

npm install -g @musistudio/claude-code-router
```

##

```
npm install -g @anthropic-ai/claude-code
```

##

使用[[Sources/GithubStarsSync/claude-code-router]]绕过官方限制。或者使用各种第三方的中转站： [[Cards/claude code 第三方中转站]]

[[📥 Inbox/claude code windows]]

## 常用快捷键

control + r展开被收缩的文本，以查看详情。

## 常用命令

>如果命令不适应，使用开源的可视化界面也不错[[📥 Inbox/Claudia]]

###

/init命令

先创建claude说明文件。本仓库的范例：CLAUDE

###

/compact 把信息用简单的语法总结一下

压缩上下文，但总觉得会失真，不一定好用，倒不如另起一个对话呢

/clear

清空上下文

### 控制模型思考强度

官方说明的，在对话前面加think，让其思考强度更高

think  
think hard  
think harder

ultrathink

### 记忆模式

输入\#号触发

### 和ide联动编辑

/ide

好处：

vscode中选中代码，则cc里面能感知  
cc改的代码，ide里面能看到diff

### 一次性对话

> 但其实不如直接用warp的ai命令了。

claude -p "今天您吃了吗"

[[Sources/GithubStarsSync/claude-code-router\|ccr]]也是支持的，命令就是`ccr code -p "今天您吃了吗"`

###

前面加!，临时用于执行命令，而不是自然语言提问。

### 权限控制

#### 危险模式，让其全自动驾驶

也叫yolo模式？

```
claude --dangerously-skip-permissions
```

#### 精细化控制

/permissions

规则文档：[Identity and Access Management - Anthropic](https://docs.anthropic.com/en/docs/claude-code/iam#tool-specific-permission-rules)

可以直接把文档丢给ai，让ai生成规则行。

### 自定义命令

> 不通用，考虑直接使用系统级别的比如raycast 的snippet更好。

Create custom slash commands by adding .md files to .claude/commands/ in your project or ~/.claude/commands/ for commands that work 
    in any project

### 导出内容

/export

###
1. 复杂问题，使用 plan mode ，切换快捷键 shift + tab
2. 连接到ide，比如cursor。
	1. cursor中安装claude code。
	2. cc中输入/ide进行连接。
3. 输入`\ + 回车` 可以换行
	1. 有些软件里的命令行，支持 `shift + 回车` 换行，如果不行，就用 `\+回车` 换行
4. 使用 `shift + tab` 切换到 `plan mode`
	
	1. 这样 claude 会先与你过一下开发计划，然后再去开发，结果更可控

## hook配置

[Get started with Claude Code hooks - Anthropic](https://docs.anthropic.com/en/docs/claude-code/hooks-guide)

[Hooks reference - Anthropic](https://docs.anthropic.com/en/docs/claude-code/hooks)

### 写完后自动进行lint检查等

### 通知音效

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

## sub agent

>map reduce， 子agent是并行执行的，会获取精简的上下文。
/agent

## 其他常用参数

## 使用其他模型

[[📥 Inbox/kimi v2用于claude code-官方token-不用ccr的情况下]]

## 参考教学视频

[AI编程工具Claude Code详细攻略，一期视频精通 - YouTube](https://www.youtube.com/watch?v=e5O8A5pcVgg)
