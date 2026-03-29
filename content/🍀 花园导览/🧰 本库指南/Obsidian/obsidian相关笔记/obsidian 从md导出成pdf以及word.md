---
publish: true
---

新发现，用[[飞书文档]]做中转：[[obsidian md文档导入到其他docx企业微信文档等地方的方法]]

## pandoc工具

pandoc插件安装后，导出成word，图片会没有成功导出，原因是因为pandoc只支持标准的Markdown图片的引用格式，而Obsidian引用图片的格式也是`[[]]`。

所以pandoc用来导出word，只适合没有图片的md文件。

## 自带pdf导出

用obsidian 自带的export to pdf导出后，会成功带上图片，并且把css样式也保留了，可以说是所见即所得。
代码块，在导出成pdf后，变成了一个普通块儿，

## 基于pdf转word

这类工具很多，转完后图片也还在，是目前相对完美的效果了。
