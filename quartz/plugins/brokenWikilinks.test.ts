import assert from "node:assert"
import { readFile } from "node:fs/promises"
import test, { describe } from "node:test"

describe("disableBrokenWikilinks config", () => {
  test("honors the option on CrawlLinks, not ObsidianFlavoredMarkdown", async () => {
    const raw = await readFile(new URL("../../quartz.config.yaml", import.meta.url), "utf8")
    const ofmBlock = raw.match(
      /source: github:quartz-community\/obsidian-flavored-markdown\n[\s\S]*?(?=\n  - source:)/,
    )
    const crawlBlock = raw.match(
      /source: github:quartz-community\/crawl-links\n[\s\S]*?(?=\n  - source:)/,
    )

    assert.ok(ofmBlock, "missing ObsidianFlavoredMarkdown plugin block")
    assert.ok(crawlBlock, "missing CrawlLinks plugin block")
    assert.doesNotMatch(ofmBlock[0], /disableBrokenWikilinks/)
    assert.match(crawlBlock[0], /disableBrokenWikilinks:\s*true/)
    assert.match(crawlBlock[0], /markdownLinkResolution:\s*shortest/)
  })
})

describe("homepage and tour wikilink remaps", () => {
  test("maps publish and health entries to existing notes, leaves remaining dead links as wikilinks", async () => {
    const gardenRoot = new URL("../../", import.meta.url)
    const homepage = await readFile(new URL("content/AboutTheGarden.md", gardenRoot), "utf8")
    const tour = await readFile(new URL("content/🍀 花园导览/🍀 花园导览.md", gardenRoot), "utf8")

    assert.match(homepage, /\[\[∑ 运动健康\|🏋 如何保持健康\]\]/)
    assert.match(homepage, /\[\[🧰 本库使用指南\]\]/)
    assert.match(homepage, /\[\[🧀 个人知识管理\]\]/)
    assert.match(homepage, /\[\[🔧 如何用好AI工具\]\]/)
    assert.match(homepage, /\[\[🗜 效率工具使用\]\]/)
    assert.match(homepage, /\[\[卡片笔记\]\]/)
    assert.doesNotMatch(homepage, /\[\[🏋 如何保持健康\]\]/)

    assert.match(tour, /\[\[本库如何免费发布至web\|🌏 本库发布指南\]\]/)
    assert.match(tour, /\[\[∑ 运动健康\|🏋 如何保持健康\]\]/)
    assert.match(tour, /\[\[🏗 本库Roadmap\]\]/)
    assert.match(tour, /\[\[如何阅读由双链笔记组成的文章\]\]/)
    assert.match(tour, /\[\[🗜 效率工具使用\]\]/)
    assert.doesNotMatch(tour, /\[\[🌏 本库发布指南\]\]/)
  })
})

describe("broken internal link styles", () => {
  test("dead links are not pointer-interactive", async () => {
    const scss = await readFile(new URL("../styles/base.scss", import.meta.url), "utf8")
    const brokenBlock = scss.match(/&\.broken\s*\{[\s\S]*?\n    \}/)
    assert.ok(brokenBlock, "missing a.internal.broken rule")
    assert.match(brokenBlock[0], /pointer-events:\s*none/)
    assert.match(brokenBlock[0], /cursor:\s*default/)
    assert.doesNotMatch(brokenBlock[0], /&:hover/)
  })
})
