---
publish: true
permalink: /🍀 花园导览/🧰 本库指南/Obsidian/obsidian相关笔记/base 使用技巧.md
created: 2025-06-27
modified: 2025-08-28
---

##

目前的bug：

如果在设置里排除了某个文件夹，则base过滤的时候，也会排除。。这不知道是不是符合预期。毕竟这些被排除的文件夹，通过cmd o命令又是能搜索到的。

## 使用formula

from [[Moy]]

![b1eadc6ce11c1c9ed2367df4949ef880.png](https://pub-pic.oldwinter.top/2025/06/423370140ae432c8b1b8e2f0fb08f1cc.png)

【距死线】（天数）

number((date(deadline)-today()).days)

deadline 是 DDL 属性，先用日期相减算出“相对日期”

用 .days 转换成天数，然后用 number() 转成数字类型

【死线状态】

if(formula\["距死线"].isEmpty(),"❔ 无", if(formula\["距死线"]>= 15, "🟠 长期", if(formula\["距死线"] < 1 && formula\["距死线"] >= 0, "🚨 今天截止", (if(formula\["距死线"]< 0, "🔴 逾期 ",if(formula\["距死线"]<= 5, "🟡 只剩 ", "🟢 尚有 "))) + (date(deadline)-today()))))

这个比较复杂……但可以拆解出来，主要是用 if(条件, 真值结果, 否则显示) 这个三元判断做了一大堆日期条件分支，然后显示不同的结果

【进度条】

if(formula.prog\_percent \* 10 > 0, "▰▰▰▰▰▰▰▰▰▰".slice( 0, (formula.prog\_percent \* 10).floor()), "").toString() + if((formula.prog\_percent \* 10).floor() < 10, "▱▱▱▱▱▱▱▱▱▱".slice( 0, 10 - (formula.prog\_percent \* 10).floor()), "").toString()

也类似，先计算出 progress 属性的百分比，然后用这个比值去截取两个代表“完成”和“未完成”的字符串

##

使用 `file.embeds[0]` 获取笔记中的第一个嵌入文件——在公式中使用它来为卡片视图创建封面图片。

## formula里面加yaml用的|符号，能方便更清晰地看清楚和编辑公式

![CleanShot 2025-08-19 at 23.52.15@2x.png](https://pub-pic.oldwinter.top/2025/08/e67e0e27949b7c6562e3c8b0e41693c7.png)

## 将糊成一团的backlink，拆成更细的维度展示，从而更有用

中间是原始backlink面板，右边拆成了多个base中展示的backlink，具备更多上下文和限定条件

![PixPin\_2025-08-23\_15-23-30.png](https://pub-pic.oldwinter.top/2025/08/b917fd9f1e025a39c7477401bb479b4d.png)

## 利用当前文件的某个属性值，进行搜索过滤

filter title

![[使用filter tilte字段搜索过滤.base]]

## kepano分享出来的

- 打开“Properties（属性）”菜单后，可用方向键在属性列表中导航；按住 Opt 键（Windows 上为 Alt）可将属性在列表中上移或下移。
- 双击列分隔线可重置该列的宽度。
- 你可以将 base 文件放入侧边栏以创建自定义视图，例如“最近文件”视图或“附件”视图。
- 当嵌入到笔记中时，⁠this.file 指向当前笔记；在侧边栏中，⁠this.file 指向当前激活的笔记。
