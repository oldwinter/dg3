import assert from "node:assert"
import test, { describe } from "node:test"
import { headingPermalink, headingPermalinkLabels } from "./headingPermalink"

describe("headingPermalink", () => {
  test("provides English labels for the default Quartz locale", () => {
    // Given
    const language = "en-US"

    // When
    const labels = headingPermalinkLabels(language)

    // Then
    assert.deepEqual(labels, {
      defaultLabel: "Copy link to this section",
      copiedTitle: "Copied",
      copiedLabel: "Section link copied",
    })
  })

  test("provides Chinese labels for the garden locale", () => {
    // Given
    const language = "zh-CN"

    // When
    const labels = headingPermalinkLabels(language)

    // Then
    assert.deepEqual(labels, {
      defaultLabel: "复制本节链接",
      copiedTitle: "已复制",
      copiedLabel: "本节链接已复制",
    })
  })

  test("replaces the current fragment while preserving the page query", () => {
    // Given
    const pageUrl = new URL("https://garden.example/note?view=reader#old-section")

    // When
    const permalink = headingPermalink(pageUrl, "#new-section")

    // Then
    assert.strictEqual(permalink.href, "https://garden.example/note?view=reader#new-section")
  })

  test("encodes a Chinese heading fragment for sharing", () => {
    // Given
    const pageUrl = new URL("https://garden.example/note")

    // When
    const permalink = headingPermalink(pageUrl, "#快速开始")

    // Then
    assert.strictEqual(
      permalink.href,
      "https://garden.example/note#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B",
    )
  })
})
