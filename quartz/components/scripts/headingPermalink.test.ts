import assert from "node:assert"
import test, { describe } from "node:test"
import { headingPermalink, headingPermalinkLabels } from "./headingPermalink"

describe("headingPermalink", () => {
  test("reads labels rendered by Quartz i18n", () => {
    // Given
    const dataset = {
      headingPermalinkLabel: "Copy link to this section",
      headingPermalinkCopiedTitle: "Copied",
      headingPermalinkCopiedLabel: "Section link copied",
    } as DOMStringMap

    // When
    const labels = headingPermalinkLabels(dataset)

    // Then
    assert.deepEqual(labels, {
      defaultLabel: "Copy link to this section",
      copiedTitle: "Copied",
      copiedLabel: "Section link copied",
    })
  })

  test("does not bind when rendered labels are incomplete", () => {
    // Given
    const dataset = {
      headingPermalinkLabel: "Copy link to this section",
    } as DOMStringMap

    // When
    const labels = headingPermalinkLabels(dataset)

    // Then
    assert.strictEqual(labels, undefined)
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
