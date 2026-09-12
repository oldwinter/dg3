import { describe, it } from "node:test"
import assert from "node:assert/strict"
import { searchShortcutScript, shouldHandleSearchShortcut } from "./searchShortcut"

describe("search shortcut", () => {
  it("handles slash without modifiers outside editable elements", () => {
    assert.equal(
      shouldHandleSearchShortcut({
        key: "/",
        target: { tagName: "DIV", isContentEditable: false },
      }),
      true,
    )
    assert.equal(
      shouldHandleSearchShortcut({
        key: "/",
        target: { tagName: "INPUT", isContentEditable: false },
      }),
      false,
    )
  })

  it("ignores modifiers and non-slash keys", () => {
    assert.equal(shouldHandleSearchShortcut({ key: "/", ctrlKey: true }), false)
    assert.equal(shouldHandleSearchShortcut({ key: "Escape" }), false)
  })

  it("ships nav lifecycle and escape blur behavior", () => {
    assert.match(searchShortcutScript, /searchInput\.focus\(\)/)
    assert.match(searchShortcutScript, /searchInput\.blur\(\)/)
    assert.match(searchShortcutScript, /document\.addEventListener\("nav", bindSearchShortcut\)/)
  })
})
