---
{"publish":true,"permalink":"/Spaces/3-Resource/软件梳理/macos软件/Warp.md","title":"Warp","created":"2023-01-06","modified":"2024-08-07","published":"2025-07-29T23:04:29.138+08:00","tags":["macOS软件","AI产品/编程","windows软件","raycast插件","AI工具"],"cssclasses":""}
---


## 最牛逼的特性

远程 ssh 的terminal ，warpify以后，可以支持各种智能识别功能。
![CleanShot 2025-07-01 at 14.34.08@2x.png](https://pub-pic.oldwinter.top/2025/07/3b89a0661693c7ce4ceff8fa53d7c268.png)


## warp ai agent的平替

[[Cards/aichat]]
[[Cards/aider]]

## warp使用截图

![](https://pub-pic.oldwinter.top/2025/04/42f9a57a30acdf6c9f9cb7c1609d1de6.png)


##
最近新出的[[Spaces/2-Area/计算机知识/ghostty]]，有空试试好使不

![Pasted image 20240713181946](https://pub-pic.oldwinter.top/2025/06/dc4788ce9c6dd1b53fc4b406154a6cc9.png)

##

设置同步:: 不需要  
作用:: AI赋能的iTerm终端

目前无法适配source <(kubectl completion zsh) 自动补全，这个时候只能换回普通terminal使用了。[[Spaces/3-Resource/软件梳理/linux常用命令/kubectl]]

主打AI智能提示的命令行终端工具。目前用起来感觉非常不错。

例如，输入 # 批量替换，就能给出sed完整命令。可以算是[[Spaces/3-Resource/软件梳理/安卓软件/ChatGPT]]的细分领域了。

![image.png](https://img.oldwinter.top/202302151815008.png)

在terminal中直接用中文搜索命令，简直是无缝的体验，amazing。

[New \*incredible\* mac OS terminal! (warp + starship + zsh) - YouTube](https://www.youtube.com/watch?v=NfggT5enF4o)

## 使用warp 的 launch configurations功能，一键快速开始vibe coding

配置文件：
/Users/oldwinter/.warp/launch_configurations/k8s.yaml

```yaml
# Warp Launch Configuration
#
#
# Use this to start a certain configuration of windows, tabs, and panes.
# Open the launch configuration palette to access and open any launch configuration.
#
# This file defines your launch configuration.
# More on how to do so here:
# https://docs.warp.dev/features/sessions/launch-configurations
#
# All launch configurations are stored under ~/.warp/launch_configurations.
# Edit them anytime!
#
# You can also add commands that run on-start for your launch configurations like so:
# ---
# name: Example with Command
# windows:
#  - tabs:
#      - layout:
#          cwd: /Users/warp-user/project
#          commands:
#            - exec: code .

---
name: Vibe-coding
active_window_index: 0
windows:
  - active_tab_index: 0
    tabs:
      - layout:
          split_direction: horizontal
          panes:
            - cwd: /Users/oldwinter/Code/gemini-space
              is_focused: true
              commands:
                - exec: gemini
            - cwd: /Users/oldwinter/Code/claude-code-space
              commands:
                - exec: claude
            - cwd: /Users/oldwinter/Code/kimi-2-space
              commands:
                - exec: ccr code
            - cwd: /Users/oldwinter/Code/glm-space
              commands:
                - exec: ccr code

```