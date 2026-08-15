import assert from "node:assert"
import test, { describe } from "node:test"
import { syncDocumentRoot } from "./spaRoot"

describe("syncDocumentRoot", () => {
  test("updates language and direction after SPA navigation", () => {
    // Given
    const current = { lang: "zh-CN", dir: "ltr" }
    const next = { lang: "ar-SA", dir: "rtl" }

    // When
    syncDocumentRoot(current, next)

    // Then
    assert.deepEqual(current, next)
  })
})
