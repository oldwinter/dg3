import assert from "node:assert"
import test, { describe } from "node:test"
import enUs from "../../i18n/locales/en-US"
import zhCn from "../../i18n/locales/zh-CN"
import zhTw from "../../i18n/locales/zh-TW"
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
  assert.match(readLaterScript, /const current = parseReadLaterEntry\(/)
})

test("read-later labels use the central locale catalog", () => {
  assert.equal(enUs.components.readLater.trigger({ count: 2 }), "Read later, 2 saved")
  assert.equal(zhCn.components.readLater.trigger({ count: 2 }), "稍后读，已保存 2 篇")
  assert.equal(zhTw.components.readLater.trigger({ count: 2 }), "稍後讀，已儲存 2 篇")
  assert.equal(enUs.components.readLater.removeItem({ title: "Note" }), "Remove Note")
})

describe("read-later storage", () => {
  test("keeps only safe, unique entries with the newest save first", () => {
    // Given
    const stored = JSON.stringify([
      { path: "/older", title: " Older copy ", savedAt: 10 },
      { path: "javascript:alert(1)", title: "Unsafe", savedAt: 40 },
      { path: "/\n/evil.example", title: "Line feed", savedAt: 40 },
      { path: "/\r/evil.example", title: "Carriage return", savedAt: 40 },
      { path: "/\t/evil.example", title: "Tab", savedAt: 40 },
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

  test("rejects a protocol-relative current page before it can be saved", () => {
    const entries = toggleReadLaterEntry([], {
      path: "//evil.example/note",
      title: "Unsafe current page",
      savedAt: 20,
    })

    assert.deepEqual(parseReadLaterEntries(JSON.stringify(entries)), [])
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
