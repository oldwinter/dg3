import assert from "node:assert"
import test, { describe } from "node:test"
import enUs from "../../i18n/locales/en-US"
import zhCn from "../../i18n/locales/zh-CN"
import zhTw from "../../i18n/locales/zh-TW"
import {
  calculateResumeReadingProgress,
  calculateResumeReadingTarget,
  resumeReadingScript,
} from "./resumeReading"
import {
  RESUME_READING_LIMIT,
  RESUME_READING_MAX_AGE_MS,
  parseResumeReadingEntries,
  updateResumeReadingEntries,
  type ResumeReadingEntry,
} from "./resumeReadingStorage"

test("resume-reading browser script compiles", () => {
  assert.doesNotThrow(() => new Function(resumeReadingScript))
})

test("resume-reading browser script handles Quartz lifecycle events", () => {
  assert.match(resumeReadingScript, /document\.addEventListener\("nav", initializeResumeReading\)/)
  assert.match(
    resumeReadingScript,
    /document\.addEventListener\("render", initializeResumeReading\)/,
  )
  assert.match(resumeReadingScript, /window\.addCleanup\(cleanupResumeReading\)/)
  assert.match(resumeReadingScript, /location\.hash\.length === 0/)
  assert.match(resumeReadingScript, /window\.matchMedia\("\(prefers-reduced-motion: reduce\)"\)/)
  assert.match(resumeReadingScript, /if \(!hasUserScrollIntent\) return/)
  assert.match(resumeReadingScript, /window\.addEventListener\("wheel", markUserScrollIntent/)
  assert.match(resumeReadingScript, /window\.addEventListener\("touchmove", markUserScrollIntent/)
  assert.match(
    resumeReadingScript,
    /window\.addEventListener\("keydown", markKeyboardScrollIntent\)/,
  )
  assert.match(resumeReadingScript, /restoreTimer = window\.setTimeout/)
  assert.match(resumeReadingScript, /if \(hasUserScrollIntent\) return/)
  assert.match(resumeReadingScript, /if \(restorePass < 3\)/)
})

test("resume-reading labels use the central locale catalog", () => {
  assert.equal(enUs.components.resumeReading.continueFrom, "Continue from {percent}%")
  assert.equal(zhCn.components.resumeReading.continueFrom, "从 {percent}% 继续阅读")
  assert.equal(zhTw.components.resumeReading.continueFrom, "從 {percent}% 繼續閱讀")
})

describe("reading position", () => {
  test("calculates and clamps page progress", () => {
    assert.equal(calculateResumeReadingProgress(300, 1_000, 400), 0.5)
    assert.equal(calculateResumeReadingProgress(-20, 1_000, 400), 0)
    assert.equal(calculateResumeReadingProgress(900, 1_000, 400), 1)
    assert.equal(calculateResumeReadingProgress(0, 400, 400), 1)
  })

  test("maps stored progress onto the current page height", () => {
    assert.equal(calculateResumeReadingTarget(0.5, 1_000, 400), 300)
    assert.equal(calculateResumeReadingTarget(2, 1_000, 400), 600)
    assert.equal(calculateResumeReadingTarget(0.5, 300, 400), 0)
  })
})

describe("resume-reading storage", () => {
  const now = 1_800_000_000_000

  test("keeps safe, unfinished, fresh positions once per path", () => {
    const stored = JSON.stringify([
      { path: "/note", progress: 0.6, updatedAt: now - 10 },
      { path: "/note", progress: 0.4, updatedAt: now - 20 },
      { path: "//evil.example", progress: 0.5, updatedAt: now - 10 },
      { path: "/complete", progress: 0.95, updatedAt: now - 10 },
      { path: "/barely-started", progress: 0.05, updatedAt: now - 10 },
      { path: "/stale", progress: 0.5, updatedAt: now - RESUME_READING_MAX_AGE_MS - 1 },
      { path: "/future", progress: 0.5, updatedAt: now + 1 },
    ])

    assert.deepEqual(parseResumeReadingEntries(stored, now), [
      { path: "/note", progress: 0.6, updatedAt: now - 10 },
    ])
  })

  test("returns an empty list for malformed JSON", () => {
    assert.deepEqual(parseResumeReadingEntries("[{", now), [])
    assert.deepEqual(parseResumeReadingEntries("{}", now), [])
  })

  test("adds a mid-article position to the front", () => {
    const existing: readonly ResumeReadingEntry[] = [
      { path: "/older", progress: 0.4, updatedAt: now - 1 },
    ]
    const current = { path: "/current", progress: 0.55, updatedAt: now }

    assert.deepEqual(updateResumeReadingEntries(existing, current), [current, ...existing])
  })

  test("removes positions at the beginning or end of an article", () => {
    const existing: readonly ResumeReadingEntry[] = [
      { path: "/current", progress: 0.55, updatedAt: now - 1 },
      { path: "/other", progress: 0.4, updatedAt: now - 2 },
    ]

    assert.deepEqual(
      updateResumeReadingEntries(existing, { path: "/current", progress: 0.05, updatedAt: now }),
      [existing[1]],
    )
    assert.deepEqual(
      updateResumeReadingEntries(existing, { path: "/current", progress: 0.95, updatedAt: now }),
      [existing[1]],
    )
  })

  test("bounds the list to the most recent entries", () => {
    const existing: readonly ResumeReadingEntry[] = Array.from(
      { length: RESUME_READING_LIMIT },
      (_, index) => ({ path: `/note-${index}`, progress: 0.5, updatedAt: now - index }),
    )
    const current = { path: "/current", progress: 0.5, updatedAt: now }
    const updated = updateResumeReadingEntries(existing, current)

    assert.equal(updated.length, RESUME_READING_LIMIT)
    assert.deepEqual(updated[0], current)
    assert.equal(
      updated.some((entry) => entry.path === "/note-19"),
      false,
    )
  })
})
