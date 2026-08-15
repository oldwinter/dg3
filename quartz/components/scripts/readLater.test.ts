import assert from "node:assert"
import test, { describe } from "node:test"
import { readLaterScript } from "./readLater"
import {
  READ_LATER_LIMIT,
  parseReadLaterEntries,
  toggleReadLaterEntry,
  type ReadLaterEntry,
} from "./readLaterStorage"

test("read-later browser script compiles", () => {
  // Given
  const compile = () => new Function(readLaterScript)

  // When / Then
  assert.doesNotThrow(compile)
})

test("read-later browser script handles navigation and in-place renders", () => {
  assert.match(readLaterScript, /document\.addEventListener\("nav", initializeReadLater\)/)
  assert.match(readLaterScript, /document\.addEventListener\("render", initializeReadLater\)/)
  assert.match(readLaterScript, /window\.addCleanup\(cleanupReadLater\)/)
  assert.match(readLaterScript, /event\.key !== null && event\.key !== READ_LATER_KEY/)
})

describe("read-later storage", () => {
  test("keeps only safe, unique entries with the newest save first", () => {
    // Given
    const stored = JSON.stringify([
      { path: "/older", title: " Older copy ", savedAt: 10 },
      { path: "javascript:alert(1)", title: "Unsafe", savedAt: 40 },
      { path: "/\n/evil.example", title: "Control character", savedAt: 40 },
      { path: "/newer", title: "Newer", savedAt: 30 },
      { path: "/older", title: "Latest copy", savedAt: 20 },
      { path: "/missing-title", title: "", savedAt: 50 },
    ])

    // When
    const entries = parseReadLaterEntries(stored)

    // Then
    assert.deepEqual(entries, [
      { path: "/newer", title: "Newer", savedAt: 30 },
      { path: "/older", title: "Latest copy", savedAt: 20 },
    ])
  })

  test("returns an empty list for malformed JSON", () => {
    // Given
    const malformed = "[{"

    // When
    const entries = parseReadLaterEntries(malformed)

    // Then
    assert.deepEqual(entries, [])
  })

  test("adds a new note to the front", () => {
    // Given
    const entries: readonly ReadLaterEntry[] = [
      { path: "/existing", title: "Existing", savedAt: 10 },
    ]
    const current = { path: "/current", title: "Current", savedAt: 20 }

    // When
    const updated = toggleReadLaterEntry(entries, current)

    // Then
    assert.deepEqual(updated, [current, ...entries])
  })

  test("removes a note that is already saved", () => {
    // Given
    const current = { path: "/current", title: "Current", savedAt: 20 }
    const entries: readonly ReadLaterEntry[] = [
      current,
      { path: "/existing", title: "Existing", savedAt: 10 },
    ]

    // When
    const updated = toggleReadLaterEntry(entries, current)

    // Then
    assert.deepEqual(updated, [{ path: "/existing", title: "Existing", savedAt: 10 }])
  })

  test("bounds the local list to the most recent entries", () => {
    // Given
    const entries: readonly ReadLaterEntry[] = Array.from(
      { length: READ_LATER_LIMIT },
      (_, index) => ({ path: `/note-${index}`, title: `Note ${index}`, savedAt: index }),
    )
    const current = { path: "/current", title: "Current", savedAt: 100 }

    // When
    const updated = toggleReadLaterEntry(entries, current)

    // Then
    assert.equal(updated.length, READ_LATER_LIMIT)
    assert.deepEqual(updated[0], current)
    assert.equal(
      updated.some((entry) => entry.path === "/note-19"),
      false,
    )
  })
})
