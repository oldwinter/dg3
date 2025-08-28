---
publish: true
date created: 2022-08-06
date modified: 2025-07-12
title: README
分类:
- '[[Atlas/Categories/本库教程 - fileclass]]'
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
