import assert from "node:assert"
import test, { describe } from "node:test"
import { h } from "preact"
import { render } from "preact-render-to-string"
import { QuartzComponentProps } from "./types"
import Body from "./Body"

describe("Body", () => {
  const renderBody = (locale: "en-US" | "fr-FR" | "zh-CN" | "zh-TW") => {
    const Component = Body()
    const props = {
      cfg: { locale },
      children: [],
    } as unknown as QuartzComponentProps

    return render(h(Component, props))
  }

  test("localizes the reader controls in English", () => {
    // Given
    const locale = "en-US"

    // When
    const html = renderBody(locale)

    // Then
    assert.match(html, /aria-label="Reading progress"/)
    assert.match(html, /aria-label="Back to top"/)
    assert.match(html, /aria-label="Open page outline"/)
    assert.match(html, />On this page</)
  })

  test("localizes the back-to-top label in Simplified Chinese", () => {
    // Given
    const locale = "zh-CN"

    // When
    const html = renderBody(locale)

    // Then
    assert.match(html, /aria-label="返回顶部"/)
    assert.match(html, /aria-label="打开本页大纲"/)
  })

  test("localizes the back-to-top label in Traditional Chinese", () => {
    // Given
    const locale = "zh-TW"

    // When
    const html = renderBody(locale)

    // Then
    assert.match(html, /aria-label="返回頂部"/)
    assert.match(html, /aria-label="開啟本頁大綱"/)
  })

  test("falls back to English when a locale has no back-to-top label", () => {
    // Given
    const locale = "fr-FR"

    // When
    const html = renderBody(locale)

    // Then
    assert.match(html, /aria-label="Back to top"/)
    assert.match(html, /aria-label="Open page outline"/)
  })
})
