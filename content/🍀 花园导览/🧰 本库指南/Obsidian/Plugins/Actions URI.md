---
{"publish":true,"permalink":"/🍀 花园导览/🧰 本库指南/Obsidian/Plugins/Actions URI.md","created":"2024-05-11","modified":"2025-06-06","tags":["obsidian插件"],"cssclasses":""}
---


> 现在还没用上，更倾向于all in ob以后，需要和obsidian软件外联动的不多，没用起来。[[🍀 花园导览/🧰 本库指南/Obsidian/Plugins/Advanced URI]]用用足够了对我来说。

[New Routes | Actions URI](https://zottmann.dev/obsidian-actions-uri/routes/)

## 格式化编辑

成功就会回调 x-sucess后面的url  
失败就会回调 x-error后面的url

```
obsidian://actions-uri/note/get
  ?vault=oldwinter-notes
  &file=README.md
  &x-success=raycast%3A%2F%2Fextensions%2Fraycast%2Fraycast%2Fstore
  &x-error=raycast%3A%2F%2Fextensions%2Fthe-browser-company%2Farc%2Fsearch-spaces
```

## 将上面的格式，压缩后才能使用

```
obsidian://actions-uri/note/get?vault=oldwinter-notes&file=README.md&x-success=raycast%3A%2F%2Fextensions%2Fraycast%2Fraycast%2Fstore&x-error=raycast%3A%2F%2Fextensions%2Fthe-browser-company%2Farc%2Fsearch-spaces
```
