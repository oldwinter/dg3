---
publish: true
permalink: /🍀 花园导览/🧰 本库指南/Obsidian/obsidian相关笔记/obsidian插件中可能造成编辑卡顿的疑似插件.md
aliases:
  - obsidian插件中可能造成编辑卡顿的疑似插件
title: obsidian插件中可能造成编辑卡顿的疑似插件
created: 2024-05-14
modified: 2026-05-02
published: 2026-05-16T01:30:28.712+08:00
tags:
  - AI生成
---

[[obsidian卡顿问题定位方法]]

[[Settings profiles]]

[[Chronology]]

[[Various Complements]]

## 2026-04-27 实测更新

本次在 `oldwinter-notes` 上用 Obsidian CLI / DevTools 做了一轮只读定位。库规模约 `14.5k` 文件、`12.9k` markdown 文件。关闭 `Various Complements` 和 `Spaced Repetition` 后，两者已经不在 enabled / loaded 列表中；idle CPU 基本正常，但 renderer 内存仍偏高，JS heap 仍约 `637MB`，`search query="xyznotlikelytoexist123"` 仍约 `14.3s`。因此这两个插件是高优先级嫌疑，但不是唯一性能风险。

当前更值得继续 A/B 的插件：

- [[Various Complements]]：高置信。关闭前内存中有全库词条 `238388`、internal link 候选 `22562`、frontmatter 词条 `13210`；并且 1 个字符触发、自动补全开启、全库 / 内链 / frontmatter / 自定义词典同时开启。典型影响是输入、切换文件、metadata 变化时卡顿。
- [[Spaced Repetition]]：高置信。关闭前持有 incoming links `13790`、pageranks `11523`，并打开 review queue 视图。典型影响是启动、打开复习队列、metadata 刷新。
- [[TaskNotes]]：中高置信。当前仍启用，打开了 `tasknotes-release-notes` 视图；插件体积大，启用了 task link overlay、instant convert、NLP、Bases、任务卡片、关系展示、ICS 订阅等多个监听/视图能力。适合排查任务视图、日历、保存/编辑时卡顿。
- Notebook Navigator：中高置信。当前仍打开导航视图和 calendar 视图；会围绕全库文件、tag、property、active file reveal 建立导航状态。适合排查切换文件、展开目录、右侧日历/导航刷新卡顿。
- [[Excalidraw]]：中高置信，偏内存和渲染。插件主包约 `8MB`，data 约 `4.2MB`，库中 `libraryItems` 约 `249`；当前配置开启 SVG 导出、light/dark 双份导出、图片缓存、中文字体等。适合排查打开 Excalidraw、含大量 SVG/图片的笔记、导出图片时卡顿。
- [[Linter]]：中置信，偏保存/粘贴。当前 `lintOnSave=true`，启用规则较多，且 paste 相关规则开启；如果“保存时卡一下”明显，可以单独 A/B。
- [[Supercharged Links]]：中置信，偏渲染。当前 `selectors` 约 `58`，并对 editor、file list、backlinks、quick switcher、suggestor 等多处启用。适合排查打开多链接笔记、backlinks、文件列表渲染卡顿。
- CodeScript Toolkit / `fix-require-modules`：中置信，偏脚本执行。当前 modules cache 较多，脚本目录是 `Extras/Scripts/ts-scripts/obsidian-scripts`；如果卡顿发生在运行脚本、命令面板脚本、自动化命令之后，应优先 A/B。
- [[Image auto upload Plugin|Image auto upload]] / [[Weread]] / [[Douban]] / [[Cubox Obsidian 同步插件]]：中低置信，偏网络、剪藏、导入、粘贴图片或同步任务。不是当前 idle 卡顿主嫌，但会造成周期性或操作触发型卡顿。

建议排查顺序：

1. 保持 `Various Complements` / `Spaced Repetition` 关闭，重启 Obsidian 后重新测打字、切文件、搜索。
2. 若仍卡，优先临时关闭 `TaskNotes`，并关闭已经打开的 TaskNotes release notes / calendar / task views。
3. 再 A/B `Notebook Navigator`，尤其是导航视图和 calendar 视图。
4. 若卡顿集中在图片、白板、SVG、Excalidraw 文件，A/B `Excalidraw`，并避免同时打开大型图片/SVG笔记。
5. 若卡顿集中在保存/粘贴，A/B `Linter`。
6. 若卡顿集中在链接渲染、backlinks、文件列表，A/B `Supercharged Links`。

补充判断：当前 Obsidian 全库搜索本身仍然偏慢，说明库规模、搜索面和大文件也可能参与问题；插件排查应以具体触发场景分组，不要一次性关很多，否则难以定位根因。
