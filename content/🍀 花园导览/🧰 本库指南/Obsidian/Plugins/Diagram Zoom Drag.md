---
date created: 2025-06-06
date modified: 2025-07-10
rating: 5
status: null
publish: true
分类: "[[obsidian插件 - fileclass]]"
---

给自带的[[mermaid]]加上方便查看的按钮，以及给其他几个常用图形工具也加上查看按钮。

让ai频繁地生成mermaid的话，还是非常有用的。比如[[让cursor把各种流程用mermaid画一遍]]中花的各种流程图，用原生ob自带的，压根儿看不了。

##

自带mermaid支持

```mermaid
graph TD
    A[高级插件生态系统] --> B[自动化工作流]
    B --> C[高级查询与数据处理]
    C --> D[知识图谱优化]
    D --> E[发布与分享系统]
    E --> F[社区贡献与创新]
```

##

需要插件[[PlantUML]]

```plantuml
@startuml
actor User
participant "Obsidian App" as App
participant "PlantUML Plugin" as Plugin

User -> App : 编写 PlantUML 代码块
App -> Plugin : 调用渲染器
Plugin -> App : 返回图像
App -> User : 显示 UML 图
@enduml
```

##

需要安装[[Graphviz]]插件，并安装dot命令行，配置`C:\Program Files\Graphviz\bin\dot.exe`

```dot
digraph G {
    rankdir=LR;
    node [shape=rectangle, style=filled, fillcolor=lightblue];

    Obsidian -> "Graphviz Plugin" [label="调用"]
    "Graphviz Plugin" -> "dot 渲染引擎" [label="解析"]
    "dot 渲染引擎" -> "渲染图像"
    "渲染图像" -> Obsidian [label="展示"]
}
```

##

需要 [[Mehrmaid]]插件，让mermaid支持内嵌markdown。
