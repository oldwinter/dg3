import assert from "node:assert"
import test, { describe } from "node:test"
import enUs from "../../i18n/locales/en-US"
import zhCn from "../../i18n/locales/zh-CN"
import zhTw from "../../i18n/locales/zh-TW"
import {
  copyMarkdownNoteLink,
  formatMarkdownNoteLink,
  noteShareScript,
  shareNote,
  type NoteSharePlatform,
} from "./noteShare"

const note = { title: "A useful note", url: "https://garden.example/note" }

describe("shareNote", () => {
  test("uses native sharing when the browser supports it", async () => {
    // Given
    const shared: ShareData[] = []
    const copied: string[] = []
    const platform: NoteSharePlatform = {
      share: async (data) => {
        shared.push(data)
      },
      copy: async (text) => {
        copied.push(text)
      },
    }

    // When
    const outcome = await shareNote(platform, note)

    // Then
    assert.equal(outcome, "shared")
    assert.deepEqual(shared, [note])
    assert.deepEqual(copied, [])
  })

  test("does not copy when the native share sheet is cancelled", async () => {
    // Given
    const copied: string[] = []
    const platform: NoteSharePlatform = {
      share: async () => {
        throw new DOMException("Cancelled", "AbortError")
      },
      copy: async (text) => {
        copied.push(text)
      },
    }

    // When
    const outcome = await shareNote(platform, note)

    // Then
    assert.equal(outcome, "cancelled")
    assert.deepEqual(copied, [])
  })

  test("copies the note URL when native sharing is unavailable", async () => {
    // Given
    const copied: string[] = []
    const platform: NoteSharePlatform = {
      copy: async (text) => {
        copied.push(text)
      },
    }

    // When
    const outcome = await shareNote(platform, note)

    // Then
    assert.equal(outcome, "copied")
    assert.deepEqual(copied, [note.url])
  })

  test("falls back to copying when native sharing fails", async () => {
    // Given
    const copied: string[] = []
    const platform: NoteSharePlatform = {
      share: async () => {
        throw new DOMException("Blocked", "NotAllowedError")
      },
      copy: async (text) => {
        copied.push(text)
      },
    }

    // When
    const outcome = await shareNote(platform, note)

    // Then
    assert.equal(outcome, "copied")
    assert.deepEqual(copied, [note.url])
  })

  test("reports failure when the clipboard rejects the fallback", async () => {
    // Given
    const platform: NoteSharePlatform = {
      copy: async () => {
        throw new DOMException("Blocked", "NotAllowedError")
      },
    }

    // When
    const outcome = await shareNote(platform, note)

    // Then
    assert.equal(outcome, "failed")
  })
})

describe("formatMarkdownNoteLink", () => {
  test("formats a portable Markdown link", () => {
    assert.equal(formatMarkdownNoteLink(note), "[A useful note](<https://garden.example/note>)")
  })

  test("normalizes whitespace and escapes Markdown label characters", () => {
    assert.equal(
      formatMarkdownNoteLink({
        title: "  A [useful] \\ note\nfor everyone  ",
        url: "https://garden.example/a(b)",
      }),
      "[A \\[useful\\] \\\\ note for everyone](<https://garden.example/a(b)>)",
    )
  })
})

describe("copyMarkdownNoteLink", () => {
  test("copies the formatted note link", async () => {
    const copied: string[] = []

    const outcome = await copyMarkdownNoteLink(async (text) => {
      copied.push(text)
    }, note)

    assert.equal(outcome, "copied")
    assert.deepEqual(copied, ["[A useful note](<https://garden.example/note>)"])
  })

  test("reports clipboard failures", async () => {
    const outcome = await copyMarkdownNoteLink(async () => {
      throw new DOMException("Blocked", "NotAllowedError")
    }, note)

    assert.equal(outcome, "failed")
  })
})

test("note-share browser script compiles", () => {
  // Given
  const compile = () => new Function(noteShareScript)

  // When / Then
  assert.doesNotThrow(compile)
})

test("note-share browser script handles navigation and in-place renders", () => {
  assert.match(noteShareScript, /document\.addEventListener\("nav", initializeNoteShare\)/)
  assert.match(noteShareScript, /document\.addEventListener\("render", initializeNoteShare\)/)
  assert.match(noteShareScript, /window\.addCleanup\(cleanupNoteShare\)/)
  assert.match(noteShareScript, /button\.dataset\.action = action/)
  assert.match(noteShareScript, /copyMarkdownNoteLink/)
  assert.match(noteShareScript, /markdownButton\.focus\(\{ preventScroll: true \}\)/)
})

test("note-share labels use the central locale catalog", () => {
  assert.equal(enUs.components.noteShare.title, "Share this note")
  assert.equal(enUs.components.noteShare.copyMarkdown, "Copy as Markdown")
  assert.equal(zhCn.components.noteShare.copied, "笔记链接已复制")
  assert.equal(zhCn.components.noteShare.markdownCopied, "Markdown 链接已复制")
  assert.equal(zhTw.components.noteShare.shared, "筆記已分享")
  assert.equal(zhTw.components.noteShare.markdownFailed, "瀏覽器未能複製 Markdown 連結")
})
