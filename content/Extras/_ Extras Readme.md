---
publish: true
permalink: /Extras/_ Extras Readme.md
created: 2025-04-14
modified: 2026-05-04
published: 2026-05-16T01:30:29.123+08:00
---

# ⚙️ 附加资源 (Extras) 说明

这个文件夹用于存放支持 Obsidian 知识库运行的各种附加资源。

**主要子文件夹说明：**

- **`Attachments/`**: 存放插入到笔记中的图片、PDF、配置导出和导入附件；根层只保留说明，散落文件归入 `Images/`、`Configs/`、`Imports/`
- **`Documents/`**: 存放标准化文档，如Obsidian Base语法、Canvas JSON语法等参考文档
- **`Excalidraw/`**: 存放 Excalidraw 插件字体和库文件等支撑资产
- **`PluginAssets/`**: 存放插件补全、词典和命令清单等支撑资产
- **`Prompts/`**: 存放与AI相关的提示词(Prompts)，可在Cursor中快速@引用
- **`Scripts/`**: 存放各种脚本文件，包括Python、JavaScript等自动化脚本
- **`Templates/`**: 存放笔记模板，用于快速创建标准格式的笔记

**管理建议：**

- 保持这个文件夹的结构清晰，方便查找和管理。
- 定期清理不再使用的模板或附件。
- 配置 Obsidian 的附件管理设置，默认附件根仍是 `Extras/Attachments`；后续手工整理时再按子目录分流。
- `Extras/Other/` 已退役，无法归类的文件先写清用途，再选择合适的支撑资产目录或 ignored `.tmp/`。

目前资源附件混在一起倒也没事儿，最头疼的是需要单独交付几百个md笔记给别人的时候，无法快速将这些md引用的资源文件筛出来。好在这个场景发生的也不多，先不考虑了。
