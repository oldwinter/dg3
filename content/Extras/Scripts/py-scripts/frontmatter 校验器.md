---
title: frontmatter 校验器使用说明
date created: 2025-08-07
date modified: 2025-08-07
publish: true
---

本工具用于一次性检查全库 Markdown 的 YAML frontmatter 是否符合推荐规范（字段齐全、日期格式正确、布尔/状态合法）。

## 推荐字段（顺序建议保持一致）

```
---
title: 
tags: []
type: card|moc|source|canvas|project|area|resource|archive|guide
created: YYYY-MM-DD
modified: YYYY-MM-DD
publish: true|false
status: draft|review|done|archived
aliases: []
up: []
---
```

## 使用方法

- Windows PowerShell：

```
python Extras/Scripts/frontmatter_validator.py .
```

- macOS/Linux：

```
python3 Extras/Scripts/frontmatter_validator.py .
```

执行完成后，控制台会输出存在问题的文件与问题明细；不做任何修改，便于批量修复前的确认（dry-run）。

## 说明

- 该脚本为零依赖实现，仅解析顶层 `key: value` 行，复杂嵌套将被忽略但不影响检查；
- 可按需扩展校验规则（如私密信息扫描）；
- 建议定期运行，保持元数据健康，提升 Bases/发布流效果。






