---
publish: true
分类:
- '[[Atlas/Categories/提示词prompts - fileclass]]'
- '[[Atlas/Categories/AI生成 - fileclass]]'
---

### Obsidian Canvas 稳定生成提示词（Advanced Canvas 1.0-1.0）

面向大模型的「一次成型、可直接导入」Canvas 生成规范与模板。严格遵循 [[Extras/Documents/Obsidian advanced canvas 规范]] 与本库规则，避免常见报错（如 `id` 出现短横杆 `-`、JSON 引号未转义、坐标与尺寸不为整数、文件路径不带后缀、非法字段、尾随逗号等）。

---

### 硬性规则（必须满足，否则视为不合格）

- **JSON 格式**：输出必须是「仅包含一个 JSON 对象」的代码块，可被 `JSON.parse` 直接解析；不得含注释、尾随逗号或多余文本。
- **顶层结构**：只允许键 `nodes`、`edges`（可选 `metadata`）。若含 `metadata`，必须包含 `{"version":"1.0-1.0"}`。
- **ID 规范**：
  - 字符集：`^[A-Za-z][A-Za-z0-9_]*$`，只允许字母数字与下划线；**禁止短横杆 `-`**。
  - 前缀：`n_`（普通节点）、`g_`（群组）、`e_`（边）。
  - 唯一性：全局唯一且不碰撞；建议由含义性别名的 `snake_case` 生成，如 `n_feature_store`、`g_models`、`e_hub_models`。
- **节点字段必备**：`id`、`type`、`x`、`y`、`width`、`height`；`x/y/width/height` 为整数。`type ∈ {"text","file","link","group"}`。
- **文本内容转义**：`text` 内部若含英文引号 `"` 必须写成 `\"`。如需强制换行，使用 `  \n`（两个空格加换行）以保证 Markdown 严格换行；代码块与公式请按 JSON 字符串正常转义换行。
- **文件引用（file 节点）**：`file` 必须为**相对路径且带正确后缀**（如 `.md`、`.canvas`、`.base`、`.excalidraw`、图片等）。禁止绝对路径。
- **链接（link 节点）**：必须包含 `url`；可选 `title`。
- **群组（group 节点）**：可选 `label`；`collapsed` 可选。尽量只用默认形状，**不要设置 `styleAttributes.shape`**（避免显示问题）。
- **颜色**：可用 `"1".."6"` 预设色或十六进制，如需要；不强制。
- **边（edges）**：`id`、`fromNode`、`fromSide`、`toNode`、`toSide` 必填；`fromSide/toSide ∈ {top,right,bottom,left}`；可选 `label`、`color`。不要使用非法取值。
- **安全白名单**：只使用规范字段；不要输出未在规范内的自定义字段。

---

### ID 生成与命名建议

- 节点：`n_<语义>`；群组：`g_<语义>`；边：`e_<起点语义>_<终点语义>`。
- 语义名用 `snake_case`，英文单词优先；如需多词，按下划线连接：`n_loss_landscape`、`g_training`、`e_model_loss`。
- 冲突处理：若名称冲突，追加结尾 `_v2`、`_v3`。

---

### 布局与尺寸基线（可按需调整）

- 网格步长：`x/y` 以 200–320 为步长，避免重叠；中心原点建议附近为核心节点。
- 常用尺寸：
  - 文本节点：`width: 480–720`，`height: 320–560`。
  - 群组：`width: 1200–2200`，`height: 700–1100`。
- 不使用 `dynamicHeight`，保持稳定渲染。

---

### 生成流程（让模型严格执行）

1. 列出节点与关系（含类型与简要内容）。
2. 依据命名规范生成去重的 `id` 集合（无 `-`）。
3. 规划坐标：按网格放置，避免重叠；群组先放，再放组内节点。
4. 填充字段：数值字段均为整数，缺省字段不输出。
5. 文本清洗：转义 `\"`，多行用 `\n`，需要硬换行处用 `  \n`。
6. 输出唯一 JSON 对象，不要附加解释。
7. 自检：
   - JSON 可被 `JSON.parse`。
   - 每个 `id` 均匹配 `^[A-Za-z][A-Za-z0-9_]*$`。
   - `type`、`fromSide/toSide` 取值合法。
   - 文件路径均为相对且含后缀。
   - 无尾随逗号与多余键。

---

### 指令模板（直接复制使用）

将下面整段作为你的提示词前缀，后面只需要补充主题与要素清单即可：

```markdown
你是一位 Obsidian 高级画布（Advanced Canvas 1.0-1.0）制作者。请输出「仅包含一个 JSON 对象」的代码块，严格遵守：
1) 只包含 `nodes`、`edges`（可选 `metadata.version = "1.0-1.0"`）；
2) 所有 `id` 符合 `^[A-Za-z][A-Za-z0-9_]*$`，不得含 `-`；
3) 节点含 `id,type,x,y,width,height` 且为整数；`type ∈ {text,file,link,group}`；
4) 文本内英文引号写成 `\"`；换行用 `\n`，需要硬换行用 `  \n`；
5) file 节点 `file` 为相对路径且带后缀（.md/.canvas/.base/.excalidraw/图片等）；
6) link 节点含 `url`（可选 `title`）；
7) edges 含 `id,fromNode,fromSide,toNode,toSide`，side 必须在 {top,right,bottom,left}；
8) 仅用规范字段，无注释、无尾逗号、可被 JSON.parse；
9) 不使用 `styleAttributes.shape`（保持默认形状）。

约束下的布局建议：按 200–320 像素网格布局，避免重叠；群组先放，再放子节点；常用尺寸：文本 480–720×320–560，群组 1200–2200×700–1100。

输出要求：只输出一个 JSON 代码块，不要解释或补充文本。

主题与要素清单：
- 主题/目标：<一句话目标>
- 节点：列出需要的节点（类型 text/file/link/group）与简要内容或文件相对路径
- 关系：列出关键连线（起点 → 终点 + 标签/颜色建议）
- 颜色与分区（可选）：若需颜色编号 1–6 的风格映射
```

---

### 最小可用输出模板（占位示例）

将下方示例改写为你的实际内容；保留结构与字段规范即可。

```json
{
  "nodes": [
    { "id": "g_area", "type": "group", "x": -800, "y": -600, "width": 1600, "height": 1000, "label": "Area" },
    { "id": "n_center", "type": "text", "x": -80, "y": -80, "width": 560, "height": 400, "text": "# Center\n概览内容  \n使用说明" },
    { "id": "n_doc", "type": "file", "x": -640, "y": -400, "width": 520, "height": 320, "file": "Cards/示例.md" },
    { "id": "n_link", "type": "link", "x": 600, "y": -400, "width": 300, "height": 80, "url": "https://example.com", "title": "External" }
  ],
  "edges": [
    { "id": "e_center_doc", "fromNode": "n_center", "fromSide": "left", "toNode": "n_doc", "toSide": "right", "label": "reference" },
    { "id": "e_center_link", "fromNode": "n_center", "fromSide": "right", "toNode": "n_link", "toSide": "left" }
  ]
}
```

---

### 常见错误与快速自检

- **id 包含 `-`**：一律替换为下划线 `_`，并确保 `^[A-Za-z][A-Za-z0-9_]*$`。
- **未转义引号**：`"text": "He said: \"ok\""`。
- **数值为字符串/小数**：`x/y/width/height` 必为整数。
- **尾随逗号/注释**：严格 JSON，无注释、无多余键。
- **非法 side/shape**：side 仅 `{top,right,bottom,left}`；不要设置形状。
- **文件路径不带后缀/绝对路径**：改为相对路径并补后缀。

---

### 进阶提示（可选）

- 若需 `metadata`：
```json
{ "metadata": { "version": "1.0-1.0", "frontmatter": { "title": "Canvas Title" } }, "nodes": [], "edges": [] }
```
- 颜色风格：使用 `"1".."6"` 进行区域配色，与本库既有画布风格一致。
- 与笔记互链：在 `text` 中自由使用 `[[双链]]`，渲染时按 Obsidian 规则显示。


