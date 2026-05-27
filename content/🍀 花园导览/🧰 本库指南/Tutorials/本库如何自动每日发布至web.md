---
publish: true
permalink: /🍀 花园导览/🧰 本库指南/Tutorials/本库如何自动每日发布至web.md
title: 本库如何自动每日发布至web
created: 2022-08-25
modified: 2023-03-14
published: 2026-05-16T01:30:28.695+08:00
---

将obsidian的笔记库以类似博客的方式发布至网络，目前本库采用了2个第三方免费方案，详见[[obsidian 目前最完美的免费发布方案 - 渐进式教程]]。

在执行完[[本库如何自动每日同步至github]]的笔记库同步命令后，接着执行从笔记库拉取最新笔记，并自动同步至git仓库的命令，注意这边我的2个方案的仓库，均采用了[[git submodule]]的方式：

- [GitHub - oldwinter/dg: 数字花园的最完美免费方案](https://github.com/oldwinter/dg)
- [GitHub - oldwinter/dg3: 🌱 host your own second brain and digital garden for free](https://github.com/oldwinter/dg3)

在自己电脑上第一次git clone 后，还需要执行`git submodule update --init --recursive`，以初始化submodule，后续才能顺利执行以下命令。

命令如下：

```zsh
# dg jekyll方案
cd <your-workspace>/dg/_notes/
git checkout -q main
git pull 
cd <your-workspace>/dg
git add .
git commit -m "auto publish1 by keyboard"
git push

# dg3 quartz方案
cd <your-workspace>/dg3/content/
git checkout -q main
git pull
cd <your-workspace>/dg3
git add .
git commit -m "auto publish3 by keyboard"
git push
```

当push至github后，将会自动触发后续的构建和发布流程。目前我的dg方案托管在，我的dg3方案托管在[[Vercel]]。
