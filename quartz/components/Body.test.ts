import assert from "node:assert"
import test, { describe } from "node:test"
import { h } from "preact"
import { render } from "preact-render-to-string"
import { QuartzComponentProps } from "./types"
import Body from "./Body"

describe("Body", () => {
  test("localizes the reading progress label", () => {
    // Given
    const Component = Body()
    const props = {
      cfg: { locale: "en-US" },
      children: [],
    } as unknown as QuartzComponentProps

    // When
    const html = render(h(Component, props))

    // Then
    assert.match(html, /aria-label="Reading progress"/)
  })
})
