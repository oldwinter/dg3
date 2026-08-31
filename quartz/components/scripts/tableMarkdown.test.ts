import assert from "node:assert"
import { readFile } from "node:fs/promises"
import test, { describe } from "node:test"
import enUs from "../../i18n/locales/en-US"
import zhCn from "../../i18n/locales/zh-CN"
import zhTw from "../../i18n/locales/zh-TW"
import {
  normalizeMarkdownTableCell,
  tableMarkdownScript,
  tableRowsToMarkdown,
} from "./tableMarkdown"

describe("table Markdown", () => {
  test("normalizes whitespace and escapes Markdown table delimiters", () => {
    assert.equal(normalizeMarkdownTableCell("  Quartz\n  |  Obsidian "), "Quartz \\| Obsidian")
    assert.equal(normalizeMarkdownTableCell("C:\\\\notes"), "C:\\\\\\\\notes")
    assert.equal(normalizeMarkdownTableCell("中文\u00a0 表格"), "中文 表格")
  })

  test("builds a portable table and pads short rows", () => {
    assert.equal(
      tableRowsToMarkdown([
        ["Tool", "Use", "Owner"],
        ["Quartz", "Publish notes"],
        ["Obsidian", "Write | link", "oldwinter"],
      ]),
      [
        "| Tool | Use | Owner |",
        "| --- | --- | --- |",
        "| Quartz | Publish notes |  |",
        "| Obsidian | Write \\| link | oldwinter |",
      ].join("\n"),
    )
  })

  test("uses the widest row without mutating the input", () => {
    const rows = [["A"], ["1", "2"]] as const

    assert.equal(tableRowsToMarkdown(rows), "| A |  |\n| --- | --- |\n| 1 | 2 |")
    assert.deepEqual(rows, [["A"], ["1", "2"]])
  })

  test("rejects incomplete tables", () => {
    assert.equal(tableRowsToMarkdown([]), undefined)
    assert.equal(tableRowsToMarkdown([["Heading"]]), undefined)
    assert.equal(tableRowsToMarkdown([[], []]), undefined)
  })

  test("registers localized, idempotent Quartz lifecycle behavior", async () => {
    const source = await readFile(new URL("./tableMarkdown.ts", import.meta.url), "utf8")

    assert.match(source, /document\.addEventListener\("nav", initializeTableMarkdown\)/)
    assert.match(source, /document\.addEventListener\("render", initializeTableMarkdown\)/)
    assert.match(source, /window\.addCleanup\(cleanupTableMarkdown\)/)
    assert.match(source, /navigator\.clipboard\.writeText\(markdown\)/)
    assert.match(source, /blockquote\.transclude/)
    assert.doesNotMatch(tableMarkdownScript, /__name/)
  })

  test("uses the central English and Chinese locale catalog", () => {
    assert.equal(enUs.components.tableMarkdown?.title, "Copy table as Markdown")
    assert.equal(zhCn.components.tableMarkdown?.copied, "表格 Markdown 已复制")
    assert.equal(zhTw.components.tableMarkdown?.failed, "瀏覽器未能複製表格")
  })
})
