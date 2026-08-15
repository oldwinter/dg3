import assert from "node:assert"
import test, { describe } from "node:test"
import { h } from "preact"
import { render } from "preact-render-to-string"
import { QuartzComponentProps } from "./types"
import Body from "./Body"

describe("Body", () => {
  const renderBody = (locale: "en-US" | "zh-CN" | "zh-TW") => {
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
  })

  test("localizes the back-to-top label in Simplified Chinese", () => {
    // Given
    const locale = "zh-CN"

    // When
    const html = renderBody(locale)

    // Then
    assert.match(html, /aria-label="返回顶部"/)
  })

  test("localizes the back-to-top label in Traditional Chinese", () => {
    // Given
    const locale = "zh-TW"

    // When
    const html = renderBody(locale)

    // Then
    assert.match(html, /aria-label="返回頂部"/)
  })
})
