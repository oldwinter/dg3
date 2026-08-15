import assert from "node:assert"
import { readFile } from "node:fs/promises"
import test, { describe } from "node:test"

describe("componentResources", () => {
  test("includes reading progress when SPA navigation is disabled", () => {
    // Given
    const emitterPath = new URL("./componentResources.ts", import.meta.url)

    // When
    const source = readFile(emitterPath, "utf8")

    // Then
    return source.then((contents) => {
      const progressIndex = contents.indexOf(
        "componentResources.afterDOMLoaded.push(readingProgressScript)",
      )
      const spaBranchIndex = contents.indexOf("if (cfg.enableSPA)")

      assert.notEqual(progressIndex, -1)
      assert.ok(progressIndex < spaBranchIndex)
    })
  })
})
