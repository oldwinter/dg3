---
{"publish":true,"permalink":"/Spaces/2-Area/知识管理/obsidian的markdown语法.md","title":"obsidian的markdown语法","created":"2022-08-08","modified":"2025-08-23","cssclasses":""}
---


[Obsidian Flavored Markdown - Obsidian Help](https://help.obsidian.md/obsidian-flavored-markdown)

总的来说，我们在努力让 Obsidian 的语法不偏离正统的 Markdown 语法太多。总的来看，Obsidian 的语法大多还是基于 CommonMark，包括了一些 GitHub Flavored Markdown（GFM）和 LaTeX，以及我们特有的嵌入文件语法。

[[Spaces/2-Area/知识管理/预览obsidian主题的markdown语法效果]]

## callout语法

为了兼容github的语法，最好只使用以下格式

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

且里面的字段，只支持以下5种：

来源：[\[Markdown\] An option to highlight a "Note" and "Warning" using blockquote (Beta) · community · Discussion #16925 · GitHub](https://github.com/orgs/community/discussions/16925)

![[Spaces/2-Area/知识管理/GFM - GitHub Flavored Markdown#callout]]

其他格式，github都不能正常渲染：

> [!WARNING]-
> Critical content demanding immediate user attention due to potential risks.

> [!WARNING]+
> Critical content demanding immediate user attention due to potential risks.

> [!WARNING] 标题
> Critical content demanding immediate user attention due to potential risks.
