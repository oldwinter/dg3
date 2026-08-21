import assert from "node:assert"
import { readFile } from "node:fs/promises"
import test, { describe } from "node:test"
import enUs from "../../i18n/locales/en-US"
import zhCn from "../../i18n/locales/zh-CN"
import zhTw from "../../i18n/locales/zh-TW"
import {
  QUOTE_LINK_MAX_CHARS,
  normalizeQuoteSelection,
  quoteLinkLabels,
  quoteLinkMarkdown,
  quoteLinkPosition,
  quoteLinkUrl,
} from "./quoteLink"

describe("quote link", () => {
  test("self-starts while retaining idempotent Quartz lifecycle bindings", async () => {
    const inlinePath = new URL("./quoteLink.inline.ts", import.meta.url)
    const source = await readFile(inlinePath, "utf8")

    assert.match(source, /document\.addEventListener\("nav", initializeQuoteLink\)/)
    assert.match(source, /document\.addEventListener\("render", initializeQuoteLink\)/)
    assert.match(source, /typeof window\.addCleanup === "function"/)
    assert.match(source, /initializeQuoteLink\(\)\s*\n\s*export default/)
  })

  test("reads complete labels rendered by Quartz i18n", () => {
    const labels = quoteLinkLabels({
      quoteLinkTitle: "Copy quote link",
      quoteLinkCopied: "Quote link copied",
      quoteLinkFailed: "Could not copy quote",
      quoteLinkOpen: "Open this passage",
    } as DOMStringMap)

    assert.deepEqual(labels, {
      title: "Copy quote link",
      copied: "Quote link copied",
      failed: "Could not copy quote",
      open: "Open this passage",
    })
    assert.equal(quoteLinkLabels({ quoteLinkTitle: "Incomplete" } as DOMStringMap), undefined)
  })

  test("normalizes prose while enforcing a bounded text fragment", () => {
    assert.equal(normalizeQuoteSelection("  calm\n\n digital   garden  "), "calm digital garden")
    assert.equal(normalizeQuoteSelection("短"), undefined)
    assert.equal(normalizeQuoteSelection("x".repeat(QUOTE_LINK_MAX_CHARS + 1)), undefined)
    assert.equal(normalizeQuoteSelection("🌱花园"), "🌱花园")
  })

  test("replaces a stale fragment and preserves the page query", () => {
    const pageUrl = new URL("https://garden.example/note?view=reader#old-section")
    const url = quoteLinkUrl(pageUrl, "quiet reading")

    assert.equal(url.href, "https://garden.example/note?view=reader#:~:text=quiet%20reading")
    assert.equal(pageUrl.hash, "#old-section")
  })

  test("encodes Chinese and percent signs without changing the origin", () => {
    const url = quoteLinkUrl(new URL("https://garden.example/笔记"), "80% 时间输入")

    assert.equal(url.origin, "https://garden.example")
    assert.equal(url.hash, "#:~:text=80%25%20%E6%97%B6%E9%97%B4%E8%BE%93%E5%85%A5")
  })

  test("builds a portable Markdown quote and escapes its controlled label", () => {
    const markdown = quoteLinkMarkdown(
      "A useful passage",
      new URL("https://garden.example/note"),
      "Open [passage]",
    )

    assert.equal(
      markdown,
      "> A useful passage\n\n[Open \\[passage\\]](https://garden.example/note#:~:text=A%20useful%20passage)",
    )
  })

  test("keeps the action inside the viewport and moves below top-edge selections", () => {
    assert.deepEqual(quoteLinkPosition({ left: -20, top: 12, bottom: 34, width: 20 }, 375), {
      left: 28,
      top: 42,
      placement: "below",
    })
    assert.deepEqual(quoteLinkPosition({ left: 360, top: 100, bottom: 122, width: 30 }, 375), {
      left: 347,
      top: 92,
      placement: "above",
    })
  })

  test("uses the central English and Chinese locale catalog", () => {
    assert.equal(enUs.components.quoteLink.title, "Copy quote link")
    assert.equal(zhCn.components.quoteLink.copied, "引用链接已复制")
    assert.equal(zhTw.components.quoteLink.open, "開啟這段原文")
  })
})
