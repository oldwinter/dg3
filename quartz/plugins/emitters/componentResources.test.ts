import assert from "node:assert"
import { readFile } from "node:fs/promises"
import test, { describe } from "node:test"

describe("componentResources", () => {
  test("includes reader controls before SPA navigation is initialized", () => {
    // Given
    const emitterPath = new URL("./componentResources.ts", import.meta.url)

    // When
    const source = readFile(emitterPath, "utf8")

    // Then
    return source.then((contents) => {
      const progressIndex = contents.indexOf(
        "componentResources.afterDOMLoaded.push(readingProgressScript)",
      )
      const backToTopIndex = contents.indexOf(
        "componentResources.afterDOMLoaded.push(backToTopScript)",
      )
      const headingPermalinksIndex = contents.indexOf(
        "componentResources.afterDOMLoaded.push(headingPermalinksScript)",
      )
      const spaBranchIndex = contents.indexOf("if (cfg.enableSPA)")

      assert.notEqual(progressIndex, -1)
      assert.notEqual(backToTopIndex, -1)
      assert.notEqual(headingPermalinksIndex, -1)
      assert.ok(progressIndex < spaBranchIndex)
      assert.ok(backToTopIndex < spaBranchIndex)
      assert.ok(headingPermalinksIndex < spaBranchIndex)
    })
  })
})
