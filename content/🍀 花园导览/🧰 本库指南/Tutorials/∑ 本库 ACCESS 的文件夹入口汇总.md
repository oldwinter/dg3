---
{"publish":true,"permalink":"/🍀 花园导览/🧰 本库指南/Tutorials/∑ 本库 ACCESS 的文件夹入口汇总.md","title":"∑ 本库 ACCESS 的文件夹入口汇总","created":"2022-08-04","modified":"2023-03-14","tags":["todo/持续迭代","todo/now","todo/本周"],"cssclasses":""}
---

up:: [[Spaces/2-Area/知识管理/ACCESS 笔记组织法]]  
x:: [[🍀 花园导览/🧰 本库指南/Tutorials/∑ 本库 ACCESS 工作流汇总]] , [[🍀 花园导览/🧰 本库指南/Tutorials/本库ACCESS文件夹结构与混合笔记法]]  

>[!INFO] 使用原则  
> 应能通过下面的链接，点击进入某文件，直接在该文件下进行相关新的资源文件的创建，这样可以最大程度确保不创建出孤立的文件，使得笔记间产生至少1次链接。

## Atlas

- [[∑ canvas创建入口]]
- [[Spaces/4-Archive/黑洞/Dataviews/∑ 本库Dataview汇总]]
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
	- [[Spaces/3-Resource/chrome插件/∑ chrome插件]]
	- [[🍀 花园导览/🧰 本库指南/Obsidian/Plugins/∑ obsidian插件]]
	- [[Spaces/3-Resource/VSCode插件/∑ VSCode插件]]
- Area
	- [[Atlas/MOCs/∑ 个人外型管理]]
	- [[Atlas/MOCs/∑ 个人职业生涯]]
	- [[Atlas/MOCs/∑ Fronted roadmap 前端路线图]]
	- [[Spaces/2-Area/云服务和部署/∑ 云计算与云原生]]
	- [[Spaces/2-Area/运动健康/∑ 运动健康]]
	- [[Spaces/2-Area/云服务和部署/∑ DevOps roadmap 运维路线图]]
	- [[Spaces/2-Area/知识管理/∑ 知识管理]]
- Resource
	- [[Spaces/4-Archive/golang与后端/∑ 计算机科学]]
	- [[Spaces/4-Archive/王者荣耀/§ 王者荣耀]]
	- [[Atlas/MOCs/∑ 小知识点]]
	- [[Spaces/4-Archive/golang与后端/∑ golang]]

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