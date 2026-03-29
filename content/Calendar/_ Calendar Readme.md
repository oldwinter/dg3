---
publish: true
permalink: /Calendar/_ Calendar Readme.md
created: 2025-04-26
modified: 2025-07-11
---

# 📅 日历管理 (Calendar) 说明

本文件夹主要用于存放时间相关的笔记和计划。

> [!warning] 隐私内容提醒
> 这个文件夹下面隐私内容较多，无法快速隔离出来并且发布，只能上传部分样例。

## 主要子文件夹说明

- **`Daily notes/`**: 存放[[daily note]]日常笔记，记录每日的思考、事件和感想
- **`Plan & Review/`**: 存放[[计划与回顾]]笔记，包括周、月、季、年度计划和总结
- **`Tasks/`**: 存放任务管理相关的笔记和清单

## 使用方式

存放[[daily note]]，以及[[计划与回顾]]笔记。

实际的任务管理、日程管理，我依然习惯通过[[滴答清单|滴答清单]]和[[谷歌日历]]。obsidian中，只使用`#todo`标签，做个简单备忘提醒，笔记写完的时候，将标签删除。

## base左上角，可以按照年份筛选

```base
filters:
  and:
    - file.folder.contains(this.file.folder)
views:
  - type: table
    name: "2025"
    filters:
      and:
        - file.name.startsWith("2025")
    limit: 30
    columnSize:
      file.name: 128
  - type: table
    name: "2024"
    filters:
      and:
        - file.name.startsWith("2024")
    columnSize:
      file.name: 122
  - type: table
    name: "2023"
    filters:
      and:
        - file.name.startsWith("2023")
  - type: table
    name: "2022"
    filters:
      and:
        - file.name.startsWith("2022")
    order:
      - file.name

```
