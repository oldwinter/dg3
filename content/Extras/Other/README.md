---
publish: true
date created: 2022-08-06
date modified: 2025-07-12
tags:
  - 本库教程
title: README
canvas-edges:
  - "[[Spaces/2-Area/知识管理/第二大脑]]"
---


# Extras/Other 工具脚本说明

本目录包含用于维护和处理本知识库的各种Python工具脚本。所有脚本都支持UTF-8编码，可以正确处理中文文件名和内容。

## 📋 脚本列表

### 1. Frontmatter 处理工具

#### `frontmatter_processor.py` - 单文件 Frontmatter 重排序
**功能**：将单个Markdown文件中的 `sr-due`、`sr-interval`、`sr-ease` 字段移动到frontmatter末尾。

**使用方法**：
```bash
# 预览模式（推荐先预览）
python frontmatter_processor.py "文件路径.md"

# 应用更改
python frontmatter_processor.py "文件路径.md" --apply
```

**示例**：
```bash
# 预览单个文件的处理结果
python frontmatter_processor.py "Sources/Articles/示例文章.md"

# 确认无误后应用更改
python frontmatter_processor.py "Sources/Articles/示例文章.md" --apply
```

#### `batch_frontmatter_processor.py` - 批量 Frontmatter 重排序
**功能**：批量处理整个目录树中所有包含sr-字段的Markdown文件。

**使用方法**：
```bash
# 预览模式（处理当前目录及子目录）
python batch_frontmatter_processor.py .

# 预览模式（处理指定目录）
python batch_frontmatter_processor.py "目标目录"

# 应用更改到当前目录
python batch_frontmatter_processor.py . --apply

# 显示详细处理信息
python batch_frontmatter_processor.py . --verbose

# 自定义排除目录
python batch_frontmatter_processor.py . --exclude .git .obsidian node_modules
```

**示例**：
```bash
# 预览整个知识库的处理结果
python batch_frontmatter_processor.py ../..

# 批量应用更改到整个知识库
python batch_frontmatter_processor.py ../.. --apply --verbose
```

**处理效果**：
```yaml
# 处理前
---
sr-due: 2024-06-12
sr-interval: 535
sr-ease: 310
date created: 2022-07-22
date modified: 2023-03-14
tags:
  - review
title: 示例标题
---

# 处理后
---
date created: 2022-07-22
date modified: 2023-03-14
tags:
- review
title: 示例标题
sr-due: 2024-06-12
sr-interval: 535
sr-ease: 310
---
```

#### `clean_frontmatter.py` - Frontmatter 清理工具
**功能**：移除frontmatter中的指定无用字段（如externalRoot、internalRoot等）。

**使用方法**：
```bash
# 处理单个文件
python clean_frontmatter.py "文件路径.md"

# 处理所有文件
python clean_frontmatter.py all
```

## 🔧 依赖要求

所有脚本都需要以下Python包：
```bash
pip install pyyaml
```

## ⚠️ 使用注意事项

1. **备份重要数据**：虽然脚本经过测试，但建议在大批量处理前备份重要文件。

2. **先预览后应用**：所有脚本都支持预览模式，建议先预览结果确认无误后再应用更改。

3. **编码支持**：所有脚本使用UTF-8编码，完全支持中文文件名和内容。

4. **自动排除目录**：批量处理脚本会自动排除`.git`、`.obsidian`、`.cursor`、`.vscode`等系统目录。

5. **错误处理**：如果遇到YAML解析错误的文件，脚本会显示错误信息并跳过，不会中断整个处理过程。

## 📊 处理统计

批量处理脚本会提供详细的统计信息：
- ✅ 已处理的文件数量
- ⏭️ 跳过的文件数量（无sr-字段或无frontmatter）
- ❌ 出错的文件数量
- 📁 总扫描的文件数量

## 🎯 使用场景

- **Spaced Repetition插件优化**：将间隔重复相关字段移到frontmatter末尾，让其他metadata更易读
- **知识库维护**：批量整理和规范化frontmatter格式
- **迁移和清理**：清理无用的元数据字段

## 🤝 贡献

如需改进脚本或添加新功能，请遵循以下原则：
- 保持向后兼容性
- 添加充分的错误处理
- 支持预览模式
- 保持UTF-8编码兼容性
- 添加详细的使用说明 

---

## 合并内容


<h1 align="center">oldwinterの数字花园</h1>
<img src="https://pub-pic.oldwinter.top/2025/07/7b98f18cfd7da449094dc1496f60d26b.svg">
<p align="center">
	<a href="https://garden.oldwinter.top/README">主发布站</a> |
	<a href="https://github.com/oldwinter/knowledge-garden">源代码仓</a> | 
	<a href="https://www.xiaohongshu.com/user/profile/5787bec15e87e715d4750faf">我的小红书</a> 
</p>

> [!TIP] 重大更新💡  
> 迎接AI时代，本库发布 v2.0 版本，包含了大量使用[[Spaces/3-Resource/软件梳理/安卓软件/ChatGPT\|ChatGPT]]、[[Spaces/3-Resource/软件梳理/安卓软件/Gemini App\|Gemini]]、[[Spaces/1-Project/入门到精通 ChatGPT和LLM 应用及原理/DeepSeek]]等应用的笔记，请到 release 中下载。

## 这是什么

- 双链笔记的 [[Cards/最佳实践]]。完整快照了我每天使用 [[Spaces/3-Resource/软件梳理/安卓软件/Obsidian\|Obsidian]] 写的笔记、用的插件和工作流。我将把 obsidian 从入门到精通的过程经验，渐进式地总结记录，也许你能跟我一起，从这个神器中发现更大的世界。
- 真实袒露的 [[Spaces/2-Area/知识管理/第二大脑]]。是个人每日 [[Cards/阅读、笔记与写作]] 的完整实时的过程与结果的全盘分享。90% 的笔记是写给自己的，是希望能为自己将来所用的 [[Sources/Articles/常青笔记阅读笔记/常青笔记]]。
- 未经美化的 [[Spaces/2-Area/数字花园建设与维护/数字花园]]。避免为了正式发表而过度修葺美化文章，保留了最真实完备的细节。10% 的笔记是写给观众的，但愿能使得你有序漫步，避免陷入云深不知处。

## 快速开始

- 在线逛一逛。访问本库的 [主发布站](https://garden.oldwinter.top/README#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)，借助页面底部或右侧的 [[Cards/反向链接]] 面板随意漫游，感受 [[Cards/双链笔记]] 和 [[Spaces/2-Area/知识管理/卡片笔记]] 的魅力。这里是地图：[[🍀 花园导览/🍀 花园导览]]。
- 下来用一用。`Use this template` 或 `Code -> Download ZIP` 本 [源代码仓](https://github.com/oldwinter/knowledge-garden)，并用 [[Spaces/3-Resource/软件梳理/安卓软件/Obsidian]]或 [[Spaces/3-Resource/软件梳理/macos软件/VSCode]][^3] 任意一款 app 打开本库后进行编辑和进一步探索。如果你也使用 obsidian，想鉴借本库的一些配置、插件以及使用理念，这里是传送门：[[🍀 花园导览/🧰 本库指南/🧰 本库使用指南]]。
- 自己试一试。你看到的全部内容，包括文字、图片、网站，都是完全开源的，如果你想知道这一套发布到 web 的流程是怎么运作的：[[🍀 花园导览/🧰 本库指南/🌏 本库发布指南]]。或许你会想知道我 [[🍀 花园导览/🧰 本库指南/Tutorials/为什么要开源笔记]]。

## 目录结构和本开箱即用库截图

- [[Spaces/2-Area/知识管理/ACCESS 笔记组织法]]

![](https://pub-pic.oldwinter.top/2025/07/a3d73e67f8555a7ada5912b953fd4f33.png)

![](https://pub-pic.oldwinter.top/2025/07/144bd1681e7a1dcead3823771493be8d.png)

## 贡献与交流

- 如果您想参与贡献，非常抱歉目前这是我的个人笔记库，可能暂时没法儿接受其他人的笔记合入。
- 如果您有相关问题，或希望我加速填坑，请移步 [Github Discussions](https://github.com/oldwinter/knowledge-garden/discussions) 留言和讨论。我看到会尽快回复。

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=oldwinter/knowledge-garden&type=Date)](https://star-history.com/#oldwinter/knowledge-garden&Date)

## 赞助

[![Powered by DartNode](https://dartnode.com/branding/DN-Open-Source-sm.png)](https://dartnode.com "Powered by DartNode - Free VPS for Open Source")

---

[^3]: VS Code 需额外安装 foam 插件后，便支持 [[Cards/双链笔记]] 的 [[Cards/wikilink]] 语法。


---

## 合并内容

---
---

描述

- obs配置
  - characters_only 直播配置
  - characters_only 录屏配置

- popclip
  - extentions 插件目录