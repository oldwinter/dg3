import assert from "node:assert"
import { access, readFile } from "node:fs/promises"
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
  test("keeps public navigation on published canonical notes", async () => {
    const gardenRoot = new URL("../../", import.meta.url)
    const navigation = [
      {
        source: "content/AboutTheGarden.md",
        links: [
          ["Spaces/2-Area/数字花园建设与维护/数字花园", "数字花园"],
          ["Atlas/MOCs/∑ 笔记方法论与工作流", "卡片笔记"],
          ["🍀 花园导览/🧰 本库指南/🧰 本库使用指南", "🧰 本库使用指南"],
          ["Spaces/2-Area/运动健康/∑ 运动健康", "🏋 如何保持健康"],
          ["🍀 花园导览/🧀 个人知识管理", "🧀 个人知识管理"],
          ["🍀 花园导览/🔧 如何用好AI工具", "🔧 如何用好AI工具"],
          ["Atlas/MOCs/∑ 效率工具生态", "🗜 效率工具使用"],
          ["🍀 花园导览/🍀 花园导览", "🍀 花园导览"],
          ["Spaces/2-Area/数字花园建设与维护/数字花园", "思考的过程容器"],
          ["Cards/上下文", "上下文"],
          ["Cards/反向链接", "反向链接"],
          ["🍀 花园导览/🧰 本库指南/Obsidian/obsidian相关笔记/obsidian入门", "Obsidian"],
          ["README", "README"],
        ],
      },
      {
        source: "content/🍀 花园导览/🍀 花园导览.md",
        links: [
          ["🍀 花园导览/🧰 本库指南/🧰 本库使用指南", "🧰 本库使用指南"],
          ["🍀 花园导览/🧰 本库指南/AI + 知识管理核心工作流", "AI + 知识管理核心工作流"],
          ["Cards/本库如何免费发布至web", "🌏 本库发布指南"],
          ["🍀 花园导览/🔧 如何用好AI工具", "🔧 如何用好AI工具"],
          ["Spaces/2-Area/运动健康/∑ 运动健康", "🏋 如何保持健康"],
          ["🍀 花园导览/🧀 个人知识管理", "🧀 个人知识管理"],
          ["Atlas/MOCs/∑ 效率工具生态", "🗜 效率工具使用"],
        ],
      },
      {
        source: "content/🍀 花园导览/🔧 如何用好AI工具.md",
        links: [
          ["Spaces/2-Area/运动健康/∑ 运动健康", "🏋 如何保持健康"],
          ["🍀 花园导览/🧀 个人知识管理", "🧀 个人知识管理"],
          ["Atlas/MOCs/∑ 效率工具生态", "🗜 效率工具使用"],
        ],
      },
      {
        source: "content/🍀 花园导览/🧀 个人知识管理.md",
        links: [
          ["🍀 花园导览/🔧 如何用好AI工具", "🔧 如何用好AI工具"],
          ["Spaces/2-Area/运动健康/∑ 运动健康", "🏋 如何保持健康"],
          ["Atlas/MOCs/∑ 效率工具生态", "🗜 效率工具使用"],
        ],
      },
      {
        source: "content/🍀 花园导览/🧰 本库指南/🧰 本库使用指南.md",
        links: [["Cards/本库如何免费发布至web", "🌏 本库发布指南"]],
      },
    ] as const

    for (const entry of navigation) {
      const source = await readFile(new URL(entry.source, gardenRoot), "utf8")
      for (const [target, label] of entry.links) {
        assert.ok(source.includes(`[[${target}|${label}]]`), `${entry.source} should use ${target}`)
        await access(new URL(`content/${target}.md`, gardenRoot))
      }
    }

    const orphanLabels = [
      "🏋 如何保持健康",
      "🗜 效率工具使用",
      "🏗 本库Roadmap",
      "如何阅读由双链笔记组成的文章",
      "🍫 本库方法论指南",
      "🌏 本库发布指南",
    ]
    const publishedNavigation = await Promise.all(
      navigation.map((entry) => readFile(new URL(entry.source, gardenRoot), "utf8")),
    )
    for (const source of publishedNavigation) {
      for (const label of orphanLabels) {
        assert.ok(!source.includes(`[[${label}]]`), `dead ${label} wikilink should not remain`)
      }
    }
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
