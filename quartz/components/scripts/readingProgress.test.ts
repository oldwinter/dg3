import assert from "node:assert"
import test, { describe } from "node:test"
import { calculateReadingProgress } from "./readingProgress"

describe("calculateReadingProgress", () => {
  test("returns the percentage of the scrollable page already read", () => {
    // Given
    const scrollY = 300
    const scrollHeight = 1_000
    const viewportHeight = 400

    // When
    const progress = calculateReadingProgress(scrollY, scrollHeight, viewportHeight)

    // Then
    assert.equal(progress, 50)
  })

  test("clamps progress before the start of the page", () => {
    // Given
    const scrollHeight = 1_000
    const viewportHeight = 400

    // When
    const progress = calculateReadingProgress(-20, scrollHeight, viewportHeight)

    // Then
    assert.equal(progress, 0)
  })

  test("clamps progress after the end of the page", () => {
    // Given
    const scrollHeight = 1_000
    const viewportHeight = 400

    // When
    const progress = calculateReadingProgress(900, scrollHeight, viewportHeight)

    // Then
    assert.equal(progress, 100)
  })

  test("treats a page without scrollable content as complete", () => {
    // Given
    const scrollY = 0
    const scrollHeight = 400
    const viewportHeight = 400

    // When
    const progress = calculateReadingProgress(scrollY, scrollHeight, viewportHeight)

    // Then
    assert.equal(progress, 100)
  })
})
