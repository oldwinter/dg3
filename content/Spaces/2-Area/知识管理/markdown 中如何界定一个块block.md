---
date created: 2024-05-17
date modified: 2024-05-17
publish: true
---

用 [[🍀 花园导览/🧰 本库指南/Obsidian/Plugins/Linter\|Linter]] 格式化以后，一个内容块儿，前后有空格，则这个内容块整体是一个 block

## 标题块 ^e15e02

- 列表块 1 ^1f0124
- 列表块 2

^ee158f

---

如果上面^ee158f 后面紧接着 header 标题，则会有块引用 bug。

标题块 + 列表块  
标题块 + 列表块 1

- 这个被识别为 block 的起点，上面 2 行不会显示  
fds

^015269

---

## 显示效果

## 标题块 

- 列表块 1 

- 列表块 1 ^1f0124
- 列表块 2

- 这个被识别为 block 的起点，上面 2 行不会显示  
fds