import assert from "node:assert"
import test, { describe } from "node:test"
import enUs from "../../i18n/locales/en-US"
import zhCn from "../../i18n/locales/zh-CN"
import zhTw from "../../i18n/locales/zh-TW"
import { readingTrailScript } from "./readingTrail"
import {
  READING_TRAIL_LIMIT,
  parseReadingTrailEntries,
  recordReadingTrailEntry,
  type ReadingTrailEntry,
} from "./readingTrailStorage"

test("reading-trail browser script compiles", () => {
  assert.doesNotThrow(() => new Function(readingTrailScript))
})

test("reading-trail browser script follows the Quartz render lifecycle", () => {
  assert.match(readingTrailScript, /sessionStorage\.getItem\(READING_TRAIL_KEY\)/)
  assert.match(readingTrailScript, /document\.addEventListener\("nav", initializeReadingTrail\)/)
  assert.match(readingTrailScript, /document\.addEventListener\("render", initializeReadingTrail\)/)
  assert.match(readingTrailScript, /window\.addCleanup\(cleanupReadingTrail\)/)
  assert.match(readingTrailScript, /entry\.path !== current\.path/)
})

test("reading-trail labels use the central locale catalog", () => {
  assert.equal(enUs.components.readingTrail.trigger({ count: 1 }), "Reading trail, 1 previous note")
  assert.equal(
    enUs.components.readingTrail.trigger({ count: 2 }),
    "Reading trail, 2 previous notes",
  )
  assert.equal(zhCn.components.readingTrail.title, "阅读足迹")
  assert.equal(zhTw.components.readingTrail.clear, "清空閱讀足跡")
})

describe("reading-trail storage", () => {
  test("keeps only safe unique entries ordered by their newest visit", () => {
    const stored = JSON.stringify([
      { path: "/older", title: " Older ", visitedAt: 10 },
      { path: "javascript:alert(1)", title: "Unsafe", visitedAt: 50 },
      { path: "//evil.example", title: "Protocol relative", visitedAt: 50 },
      { path: "/line\nfeed", title: "Control", visitedAt: 50 },
      { path: "/newer", title: "Newer", visitedAt: 30 },
      { path: "/older", title: "Latest older", visitedAt: 20 },
      { path: "/missing-title", title: "", visitedAt: 60 },
    ])

    assert.deepEqual(parseReadingTrailEntries(stored), [
      { path: "/newer", title: "Newer", visitedAt: 30 },
      { path: "/older", title: "Latest older", visitedAt: 20 },
    ])
  })

  test("returns an empty list for malformed JSON", () => {
    assert.deepEqual(parseReadingTrailEntries("[{"), [])
  })

  test("moves a revisited note to the front without a duplicate", () => {
    const entries: readonly ReadingTrailEntry[] = [
      { path: "/second", title: "Second", visitedAt: 20 },
      { path: "/first", title: "First", visitedAt: 10 },
    ]
    const current = { path: "/first", title: "First again", visitedAt: 30 }

    assert.deepEqual(recordReadingTrailEntry(entries, current), [current, entries[0]])
  })

  test("bounds the trail to the current note and seven prior notes", () => {
    const entries: readonly ReadingTrailEntry[] = Array.from(
      { length: READING_TRAIL_LIMIT },
      (_, index) => ({ path: `/note-${index}`, title: `Note ${index}`, visitedAt: index }),
    )
    const current = { path: "/current", title: "Current", visitedAt: 100 }
    const updated = recordReadingTrailEntry(entries, current)

    assert.equal(updated.length, READING_TRAIL_LIMIT)
    assert.deepEqual(updated[0], current)
    assert.equal(
      updated.some((entry) => entry.path === "/note-7"),
      false,
    )
  })
})
