import assert from "node:assert"
import test, { describe } from "node:test"
import { headingPermalink } from "./headingPermalink"

describe("headingPermalink", () => {
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
