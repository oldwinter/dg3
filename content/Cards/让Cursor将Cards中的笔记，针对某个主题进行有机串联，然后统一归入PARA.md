---
{"publish":true,"permalink":"/Cards/让Cursor将Cards中的笔记，针对某个主题进行有机串联，然后统一归入PARA.md","created":"2025-07-09","modified":"2025-07-09","published":"2025-07-12T11:44:31.052+08:00","tags":["obsidian与AI"],"cssclasses":""}
---


## 第一步：让cursor针对cards目录搜索，并基于某个主题创作moc

比如这个笔记就是让cursor一键生成的：[[🍀 花园导览/🧰 本库指南/Obsidian/obsidian相关笔记/∑ Obsidian 从入门到精通]]

提示词大致如下：
```
基于文件夹 @cards，搜索主题相关文件：obsidian如何入门到精通。并基于这些文件，使用[[]]双链语法进行引用，最终有机地串联成一篇MOC综述水平的文章。
```

## 第二步，当主题笔记够多，就在para中创建一个文件夹承载

其实使用tag或者文件夹的形式，实践[[Spaces/2-Area/知识管理/P.A.R.A\|PARA]]都可以。但随着我cards单文件下面文件数量突破2k以后，经常会时不时卡一下，所以目前我是使用文件夹的方式意思一下。

只要基于某个moc文件，然后使用[[🍀 花园导览/🧰 本库指南/Obsidian/Plugins/File Cooker]]的`File Cooker: Move links in current file to …`命令，既可批量移动文件，且保证双链不丢失。
