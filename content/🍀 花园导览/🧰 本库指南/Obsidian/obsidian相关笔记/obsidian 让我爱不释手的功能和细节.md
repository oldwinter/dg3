---
date created: 2022-08-01
date modified: 2023-03-14
title: obsidian 让我爱不释手的功能和细节
publish: true
---

- **真·本地化**。和任何其他笔记软件不同，obsidian的库中，所有的md格式笔记和配置，都可以打包带走，并在别人那重新开启后，重现一个完全一模一样的界面和笔记，简直amazing😱，就像docker的镜像一样。这是我目前遇到的任何其他笔记软件都没做到的事情。
- **真·个人完全免费**。体现在2个方面：
	- 1、完全弱化账号体系，甚至我在使用obsidian的前1个月，压根儿没有注册过账号。不像其他很多软件，千方百计引导你去注册账号、登陆、买云服务。
	- 2、完全格式开放，以至于其对个人用户只有永久免费一条路可走。只对markdown语法进行了最最少量的定制和污染，用户切换至其他软件的迁移成本，低到史无前例。其他软件，或多或少有深度定制的污染性的格式，并且导出为md格式后有信息损失，举个例子：obsidian笔记库若要全量迁移至vscode，只需要1秒，直接用vscode+foam插件打开即可。notion导出成md后，几乎所有md不支持的排版信息都丢失了。
- **真·社区驱动**。为什么obsidian的第三方插件这么多？其他开放甚至开源的笔记软件的插件开发者远少于它？有个很简单的原因：它的插件开发最简单，最容易看到成果。举个例子：[[auto-link-title]]插件就只有一个很简单却很有用的功能：自动获取网址的标题并填充成markdown格式的`(title)[link]`链接，核心代码100多行。其他软件由于对md格式定制改动非常多，导致插件开发也更困难，同样的小功能，要多写几百行代码。开发简单从而使得贡献者众多，形成了有效的正向反馈和正向循环。我有过好多次这样的体验：感觉某个自己的诉求，需要费点功夫，结果插件社区一搜索，往往已经有人造了轮子供我立刻使用，节约下大量时间。