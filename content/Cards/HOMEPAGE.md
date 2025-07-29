---
uid: fd5274ed-e3c2-4370-8849-a0855642e312
date created: 2023-01-23
date modified: 2023-03-14
title: Homepage
publish: true
---
## 最近编辑的笔记

```dataview
table WITHOUT ID file.link AS "标题",file.mtime as "时间"
from ""
sort file.mtime desc
limit 10
```

## 七天内创建的笔记

```dataview
table file.ctime as 创建时间
from ""
where date(today) - file.ctime <=dur(7 days)
sort file.ctime desc
limit 10
```


up:: [[Spaces/2-Area/知识管理/ACCESS 笔记组织法]]  
x:: [[🍀 花园导览/🧰 本库指南/Tutorials/∑ 本库 ACCESS 工作流汇总]] , [[🍀 花园导览/🧰 本库指南/Tutorials/本库ACCESS文件夹结构与混合笔记法]]  

>[!INFO] 使用原则  
> 应能通过下面的链接，点击进入某文件，直接在该文件下进行相关新的资源文件的创建，这样可以最大程度确保不创建出孤立的文件，使得笔记间产生至少1次链接。

## Atlas

- [[∑ canvas创建入口]]
- [[Spaces/4-Archive/Dataviews/∑ 本库Dataview汇总]]
- [[∑ excalidraw 白板创建入口]]
- [[Atlas/MOCs/_ MOCs Readme]]
- [[Spaces/2-Area/数字花园建设与维护/§ TOCs]]

## Calendar

- [obsidian 每日笔记](obsidian://advanced-uri?daily=true&mode=append)
- #todo/now #todo/本周
- [Anki 回顾笔记](obsidian://advanced-uri?vault=knowledge-garden&commandid=obsidian-spaced-repetition%253Asrs-note-review-open-note)
- [[Spaces/Published/文章草稿/∑ 文章草稿]]
- [[∑ 已发布文章.canvas]]

## Cards

- 在回顾[[Cards/daily note]]的过程中，将卡片批量拖动进来即可，或用cmd + shift + m快捷键。
- [[🍀 花园导览/🧰 本库指南/Tutorials/» 本库笔记的emoji符号记录]]

## Extras

- 将外部引用的pdf等源文件放到obsidian库里面，的确也可以实现双向链接的效果，但是会让库的体积急剧膨胀，不利于打包发给别人。不过还是先尝试放进来看看，后期再考虑调整。[[2022-10-01]]更新，图片还是直接放图床里面比较方便。
- [[Extras/Templates/∑ 模板文件创建入口]]
- [billfish图片和视频管理](billfish://)

## Sources



- [[Sources/Articles/∑ 文章笔记]]
- [[Sources/Books/读书笔记/∑ 读书笔记]]
- [[Sources/Courses/∑ 课程笔记]]
- [[Spaces/3-Resource/电影笔记/∑ 电影笔记]]
- [[Spaces/3-Resource/电视剧笔记/∑ 电视剧笔记]]
- [[Sources/Newsletter + RSS/∑ 订阅型期刊笔记]]
- [[∑ 论文笔记]]
- [[Atlas/MOCs/∑ 视频笔记]]

## Spaces

Spaces下全部PARA内的MOC文件



- Project
	- [[Spaces/2-Area/数字花园建设与维护/∑ Building a Second Brain 翻译和读书笔记]]
	- [[Atlas/MOCs/∑ 人与科技融合]]
	- [[Spaces/3-Resource/chrome插件/∑ Chrome插件]]
	- [[🍀 花园导览/🧰 本库指南/Obsidian/Plugins/∑ obsidian插件]]
	- [[Spaces/3-Resource/VSCode插件/∑ VSCode插件]]
- Area
	- [[Atlas/MOCs/∑ 个人外型管理]]
	- [[Atlas/MOCs/∑ 个人职业生涯]]
	- [[Atlas/MOCs/∑ Fronted roadmap 前端路线图]]
	- [[Spaces/2-Area/云服务和部署/∑ 云计算与云原生]]
	- [[Spaces/2-Area/运动健康/∑ 运动与健康]]
	- [[Spaces/2-Area/云服务和部署/∑ DevOps roadmap 运维路线图]]
	- [[∑ 知识管理]]
- Resource
	- [[Spaces/1-Project/golang与后端/∑ 计算机科学]]
	- [[Spaces/4-Archive/王者荣耀/§ 王者荣耀]]
	- [[Atlas/MOCs/∑ 小知识点]]
	- [[Spaces/1-Project/golang与后端/∑ golang]]

## Miscellaneous

```dataviewjs
// 获取指定文件夹下的指定标签的文件
const filter = '"Spaces" and #MOC'
// 通过文件夹分组，检索文件夹下全部文件的标签、修改时间等相关信息
const groups =  dv.pages(`${filter}`).groupBy(p => p.file.folder)
for (let group of groups) {
	dv.header(4, group.key);
	dv.table(["Name", "创建日期", "修改日期"],
		group.rows
			.sort(k => k.file.name, 'asc')
			.map(k => [k.file.link, k.file.cday, k.file.mday]))
}
```

- [[🍀 花园导览/🧰 本库指南/Tutorials/§ 本库obsidian使用说明书]]


>[!INFO] 提示  
>  这里的URL，有些可能只在MacOS系统中生效。  
>  其他效率类联动app的启用，优先是直接使用alfred等启动台工具快速唤醒。这里更多的是记录和整理的目的，或者是大脑空白时，来这看看寻找下一步行动。

## 信息输入

- [打开reeder RSS阅读](reeder://)
- [打开简悦稍后读](obsidian://shell-commands/?vault=knowledge-garden&execute=0)
- [打开Cubox剪藏](cubox://)
- [打开微信读书](obsidian://shell-commands/?vault=knowledge-garden&execute=2)

## 任务管理

- [打开滴答清单 - 今天](ticktick://v1/show?smartlist=today)
- [打开Gmail邮件](obsidian://shell-commands/?vault=knowledge-garden&execute=1)

## 发布分享

- [打开notion](notion://)

---
date created: 2022-06-26
date modified: 2023-03-14
tags:
- dataview
title: 本库的宏观统计数据
---
```dataviewjs
let allFiles = dv.pages()

let ftMd = allFiles.file.sort(t => t.cday)[0]
let total = parseInt([new Date() - ftMd.ctime] / (60*60*24*1000))
dv.paragraph(`==已使用obsidian== **${total}** 天`)

dv.paragraph(`==文件总数== **${allFiles.length}** 个`)

dv.span(`==标签== **${allFiles.file.tags.distinct().length}** 个`)
dv.span("; ")
dv.span(`==文件夹数== **${allFiles.file.folder.distinct().length}** 个`)
dv.span("; ")
dv.span(`==文件别名== **${allFiles.file.aliases.distinct().length}** 个`)


// 统计未创建链接文件的正向链接总数，即broken links counts
const unresolvedLinks  = Object.values(app.metadataCache.unresolvedLinks)
.filter(unresolved => Object.keys(unresolved).length > 0 )
.flatMap(unresolved => Object.keys(unresolved))
.map(f => "[[" + f + "]]");
//console.log(unresolvedLinks)

// 统计入链数为0的文件数，即未被其他页面引用的文件数，即orphaned files counts
const orphanedFiles = allFiles.filter(f => f.file.inlinks.length==0)
//console.log(orphanedFiles)


dv.paragraph("\n")
dv.span(`==正向链接== **${allFiles.file.outlinks.length}** 个`)
dv.span("; ")
dv.span(`==未创建== **${unresolvedLinks.length}** 个`)

dv.paragraph("\n")
dv.span(`==反向链接== **${allFiles.file.inlinks.length}** 个`)
dv.span("; ")
dv.span(`==孤立文件== **${orphanedFiles.length}** 个`)


let mocFiles = dv.pages("#索引笔记")
let tocFiles = dv.pages("#目录笔记")

dv.paragraph(`==MOC文件== **${mocFiles.length}** 个，==TOC文件== **${tocFiles.length}** 个`)

let ankiFiles = dv.pages("#复习回顾")
let todoFiles = dv.pages("#待办")

dv.paragraph(`==anki卡片== **${ankiFiles.length}** 个，==待办文件== **${todoFiles.length}** 个`)





```

>[!INFO]  
>  主页其实也是一种 [[Spaces/2-Area/思维工具与模块/模板与套路]]，当我大脑放空，不知道接下来需要做什么的时候，不妨打开这里，找寻一点思路。主页同时也是[[Spaces/2-Area/数字花园建设与维护/LYT 笔记框架\|lyt kit]]认为的不可或缺的组成部分，和[[Atlas/MOCs/∑ MOCs]]组成一个导览整体。