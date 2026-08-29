import assert from "node:assert"
import test, { describe } from "node:test"
import enUs from "../../i18n/locales/en-US"
import zhCn from "../../i18n/locales/zh-CN"
import zhTw from "../../i18n/locales/zh-TW"
import {
  CODE_FOLDING_MIN_LINES,
  codeFoldingLabels,
  codeFoldingLineCount,
  codeFoldingScript,
  shouldFoldCodeBlock,
} from "./codeFolding"

describe("code folding eligibility", () => {
  test("counts plain and trailing-newline source accurately", () => {
    assert.equal(codeFoldingLineCount("one\ntwo\nthree"), 3)
    assert.equal(codeFoldingLineCount("one\ntwo\nthree\n"), 3)
    assert.equal(codeFoldingLineCount(""), 0)
  })

  test("prefers rendered syntax-highlighted lines", () => {
    assert.equal(codeFoldingLineCount("visually transformed", 31), 31)
  })

  test("folds only beyond the minimum line count", () => {
    const minimum = Array.from({ length: CODE_FOLDING_MIN_LINES }, (_, index) => `${index}`).join(
      "\n",
    )
    const long = `${minimum}\n${CODE_FOLDING_MIN_LINES}`

    assert.equal(shouldFoldCodeBlock(minimum), false)
    assert.equal(shouldFoldCodeBlock(long), true)
  })
})

describe("code folding labels", () => {
  test("reads complete rendered labels", () => {
    assert.deepEqual(
      codeFoldingLabels({
        codeFoldingExpand: "Expand code block",
        codeFoldingCollapse: "Collapse code block",
      } as DOMStringMap),
      { expand: "Expand code block", collapse: "Collapse code block" },
    )
  })

  test("does not initialize with an incomplete label set", () => {
    assert.equal(
      codeFoldingLabels({ codeFoldingExpand: "Expand code block" } as DOMStringMap),
      undefined,
    )
  })
})

test("code folding browser script compiles and follows Quartz lifecycle", () => {
  assert.doesNotThrow(() => new Function(codeFoldingScript))
  assert.doesNotMatch(codeFoldingScript, /\ninitializeCodeFolding\(\)\n/)
  assert.match(codeFoldingScript, /document\.addEventListener\("nav", initializeCodeFolding\)/)
  assert.match(codeFoldingScript, /document\.addEventListener\("render", initializeCodeFolding\)/)
  assert.match(codeFoldingScript, /window\.addCleanup\(cleanupCodeFolding\)/)
  assert.match(codeFoldingScript, /code:not\(\.mermaid\)/)
  assert.match(codeFoldingScript, /button\.removeEventListener\("click", toggle\)/)
})

test("code folding labels use the central locale catalog", () => {
  assert.equal(enUs.components.codeFolding.expand, "Expand code block")
  assert.equal(zhCn.components.codeFolding.collapse, "收起代码块")
  assert.equal(zhTw.components.codeFolding.expand, "展開程式碼區塊")
})
