import assert from "node:assert"
import test, { describe } from "node:test"
import {
  stripCalloutTitleContinuation,
  stripCalloutTitleContinuationsInMarkdown,
} from "./calloutTitle"

describe("stripCalloutTitleContinuation", () => {
  test("drops a trailing continuation backslash", () => {
    assert.equal(stripCalloutTitleContinuation(" 提示\\"), " 提示")
    assert.equal(stripCalloutTitleContinuation("提示\\"), "提示")
    assert.equal(stripCalloutTitleContinuation("\\"), "")
  })

  test("leaves titles without a trailing backslash alone", () => {
    assert.equal(stripCalloutTitleContinuation(" 提示"), " 提示")
    assert.equal(stripCalloutTitleContinuation("C:\\Windows"), "C:\\Windows")
  })
})

describe("stripCalloutTitleContinuationsInMarkdown", () => {
  test("strips INFO title continuation and keeps the body line", () => {
    const src = "> [!INFO] 提示\\\n> 这里是正文\n"
    const out = stripCalloutTitleContinuationsInMarkdown(src)
    assert.equal(out, "> [!INFO] 提示\n> 这里是正文\n")
  })

  test("strips foldable and nested openers", () => {
    assert.equal(
      stripCalloutTitleContinuationsInMarkdown("> [!TIP]- 标题\\"),
      "> [!TIP]- 标题",
    )
    assert.equal(
      stripCalloutTitleContinuationsInMarkdown("> > [!NOTE] x\\"),
      "> > [!NOTE] x",
    )
  })

  test("does not touch ordinary quotes or mid-title backslashes", () => {
    assert.equal(
      stripCalloutTitleContinuationsInMarkdown("> quote\\"),
      "> quote\\",
    )
    assert.equal(
      stripCalloutTitleContinuationsInMarkdown("> [!NOTE] C:\\Windows"),
      "> [!NOTE] C:\\Windows",
    )
  })

  test("empty title leftover slash becomes default-title case", () => {
    assert.equal(stripCalloutTitleContinuationsInMarkdown("> [!INFO]\\"), "> [!INFO]")
  })
})
