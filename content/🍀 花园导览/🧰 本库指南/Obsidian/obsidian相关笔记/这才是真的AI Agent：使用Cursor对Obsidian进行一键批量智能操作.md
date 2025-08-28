---
{"publish":true,"permalink":"/🍀 花园导览/🧰 本库指南/Obsidian/obsidian相关笔记/这才是真的AI Agent：使用Cursor对Obsidian进行一键批量智能操作.md","created":"2025-06-27","modified":"2025-06-27","cssclasses":""}
---


## 本次目标

我有一个macos优秀软件列表，但缺少icon，希望它能在Obsidian新出的数据库Base中，批量显示。

也就是从表格展示，变成使用卡片画廊视图展示。如果使用人工整理，一个个下载icon，一个个改md文件的配置，显然不是AI时代的做事方式。

![CleanShot 2025-06-27-mjsy8w.png](https://pub-pic.oldwinter.top/2025/06/2aee023b080ea4bc29105f1692de5288.png)

![CleanShot 2025-06-27-05c219.png](https://pub-pic.oldwinter.top/2025/06/58e4186eb494af75d8a39a5860bee62e.png)

## 前置条件

1. Obsidian版本号 >= 1.9.3；
2. 使用Cursor等AI工具，打开Obsidian对应的Vault。

## 一张图演示

在cursor中，打开Obsidian的vault以后，使用如下提示词：

![CleanShot 2025-06-27-7n5fzk.png](https://pub-pic.oldwinter.top/2025/06/7cd1fd73e8df1558da81ac903070064a.png)

### 上述过程如果暂停，一直要求其继续完成既可。待完成后

直接base中创建一个新视图，将icon字段做为Image property：

![CleanShot 2025-06-27-x71t71.png](https://pub-pic.oldwinter.top/2025/06/6f843d2409c9f2eadd82e5df0dd30175.png)

最终既可获得如下视图效果，前后耗时1分钟编写提示词，其他工作全部都是Cursor完成：

![CleanShot 2025-06-27-o7v21f.png](https://pub-pic.oldwinter.top/2025/06/58e4186eb494af75d8a39a5860bee62e.png)

### 另一种更可靠的方式

- 先用manus批量下载icon。
- 然后让cursor批量根据这些已有icon，进行md源文件修改。
![PixPin_2025-06-28_00-31-16.png](https://pub-pic.oldwinter.top/2025/06/1335a647e695c1718abc191de061c2a2.png)

![PixPin_2025-06-28_00-29-36.png](https://pub-pic.oldwinter.top/2025/06/ad706ff3e37547ba64d488a2fa6b3903.png)


## 实现细节详细拆分讲解

> 由于现在缺少真正的能获取以及修改Obsidian的tag、properties等数据的mcp，所以使用cursor直接打开Obsidian vault，让其完整获取目录及文件，是赋予AI上下文最有效的方式了。
> 同时，由于ai针对某个文件内的文件进行批量操作，是非常稳定可靠的，所以这里考虑新建一个文件夹，把相关笔记挪进来。[[Cards/使用File Cooker插件批量高效、不丢失双链地移动Obsidian笔记]]，可以一键将符合特定特征的笔记挪到指定文件夹中。

### 0. 任何批量操作之前，先备份

我自己是使用git commit一下，出错的时候，批量回滚。

### 1. 现在假设当前文件夹已经有如下笔记：

![CleanShot 2025-06-27-l101v0.png](https://pub-pic.oldwinter.top/2025/06/9c9265c556873b82aea35bc6dc42e79b.png)

### 2. 先使用base的table视图，将其列出来。可以看到，之前我已经执行过一次，不少软件，已经有了icon。

![CleanShot 2025-06-27-t5wggp.png](https://pub-pic.oldwinter.top/2025/06/2aee023b080ea4bc29105f1692de5288.png)

### 3. 所以这里演示，让cursor去下载补齐剩余icon。

![CleanShot 2025-06-27-g08z5o.png](https://pub-pic.oldwinter.top/2025/06/606bc5c80614e1959e164c33ad2a92b5.png)

#### 3.1提示词详细拆解

```
@/macos软件 分析当前文件夹的全部文件，有些文件的frontmatter yaml区缺少icon，你帮我去下载这些icon到该文件夹，并命名为`icon-cc-image-软件名`。类似 @Arc浏览器.md 中的 `icon: "[[icon-cc-image-Arc浏览器.png]]"`这种字段的方式，引用。请新建一个md todo list维护你的任务完成情况，直到全部文件配套的软件名，都配好了icon。如果没找到合适的，你就用一个默认的接近的icon。
```

- @/macos软件 分析当前文件夹的全部文件，有些文件的frontmatter yaml区缺少icon，你帮我去下载这些icon到该文件夹，并命名为`icon-cc-image-软件名`。
	- // 这一句清晰地表达了任务目标，要求指定操作某个文件夹。
- 类似 @Arc浏览器.md 中的 `icon: "[[icon-cc-image-Arc浏览器.png]]"`这种字段的方式，引用。
	- // 这一句是使用few prompts的方式，让ai完全理解我上一句话表达的意思。当然如果前面表达清晰，很可能就不需要补充这个示例了。
- 请新建一个md todo list维护你的任务完成情况，直到全部文件配套的软件名，都配好了icon。
	- // 维护一个todo list，是让ai agent执行一个耗时分钟级别的批量任务的时候的最佳实践，这在manus和Genspark中均有体现。
- 如果没找到合适的，你就用一个默认的接近的icon。
	- // 预料到有些应用软件偏冷门，ai如果没搜到，可能会停下来问用户，导致全自动化流程中断，所以我这里提前跟它说，我接受不完美，你全自动化搞好，直接给我看结果就行了。

#### 3.2 不出意外的话，要出意外了

可以看到，这次任务，gemini没有太多信心，它执行几分钟，就提问我，要不要先review一下它做的对不对。//这里就有抽卡的味道了，我第一次让它补全icon的时候，它完成地很顺利，全程没有让我干预。

这里我们手动检查，并反馈。

![CleanShot 2025-06-27-j81a7a.png](https://pub-pic.oldwinter.top/2025/06/3b629dd0f71d4cc7993843f39c9ce70e.png)

但仔细观察，会发现使用curl命令下载的很多图片，都是无法正常打开的。这证明了触发了网站的反爬虫策略（试想一下如果随便几个curl命令就能批量下载网站的图片等资源，那网站的cdn费用不是爆炸）。所以这里我们需要转换思路，使用带有图片搜索和下载功能的mcp，让cursor间接地通过mcp来干活。同时可以顺便问一下，cursor有哪些内置的tools，以便让我们更了解能力边界，不会提出过份的要求，比如让它生成一个视频之类的。（我这里启用了一个 使用浏览器的 playwright mcp）：之前的备忘录[[Spaces/1-Project/Cursor/cursor 1.0 有的全部tools]]

![CleanShot 2025-06-27-w9932m.png](https://pub-pic.oldwinter.top/2025/06/105907c72fdec24b76962f5696503e57.png)

可以试用一下，让它使用playwright下载icon，会发现也失败了。所以开启寻找『具备图片尤其是软件icon的图片的mcp』发现之旅。找了一圈发现还没有太成熟的，倒是意外发现manus的图片下载能力还不错，但是它不提供mcp，无法为cursor所用：

![CleanShot 2025-06-27-v9d63c.png](https://pub-pic.oldwinter.top/2025/06/f7575e8359171e6cf7008fff6af3b80b.png)

最终发现，其实让ai写脚本，从本机已安装应用中提取图标既可。（回头用windows也试一下 #todo/今天 ）

推倒重来，新建对话。

最终提示词变成了：

```
@/macos软件 分析当前文件夹的全部文件，有些文件的frontmatter yaml区缺少icon，你帮我去本机已安装的应用中，提取这些icon到该文件夹，并命名为`icon-cc-image-软件名.png`。类似 @Arc浏览器.md 中的 `icon: "[[icon-cc-image-Arc浏览器.png]]"`这种字段的方式，引用。请新建一个md todo list维护你的任务完成情况，直到全部文件配套的软件名，都配好了icon。如果没找到合适的，你就用一个默认的接近的icon。
```

### 4. 剩下的就是等它一直for循环干活了

为了避免有时候它中断了我们不自知，建议开启cursor的对话完成的音效通知功能。

![CleanShot 2025-06-27-o9yev2.png](https://pub-pic.oldwinter.top/2025/06/876c9e979571a7d3bf98c33ac8d00d2d.png)

## 其他相关笔记

- [[🍀 花园导览/🧰 本库指南/Obsidian/obsidian相关笔记/obsidian 笔记文件批量重命名 - 千万别在外部用脚本实施]]
- Cursor还可用于批量生成canvas或修改canvas：
	- 教程：[[🍀 花园导览/🧰 本库指南/Obsidian/obsidian相关笔记/Obsidian canvas 使用 cursor生成]]
	- 自动一键生成的canvas：
		- [[甄嬛传人物关系与时间线.canvas|甄嬛传人物关系与时间线]]
		- ![甄嬛传人物关系与时间线.png](https://pub-pic.oldwinter.top/2025/06/546bafe08ca13f470b6eda7878dde4ff.png)
		- [[三体全书核心人物与事件.canvas|三体全书核心人物与事件]]
		- [[权力的游戏-人物关系图和事件时间线.canvas|权力的游戏-人物关系图和事件时间线]]
