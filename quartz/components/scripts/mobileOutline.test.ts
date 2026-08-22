import assert from "node:assert"
import test, { describe } from "node:test"
import enUs from "../../i18n/locales/en-US"
import zhCn from "../../i18n/locales/zh-CN"
import zhTw from "../../i18n/locales/zh-TW"
import {
  findActiveMobileOutlineIndex,
  getMobileOutlineItems,
  mobileOutlineScript,
} from "./mobileOutline"

test("mobile-outline browser script compiles", () => {
  assert.doesNotThrow(() => new Function(mobileOutlineScript))
})

test("mobile-outline browser script handles navigation and in-place renders", () => {
  assert.match(mobileOutlineScript, /document\.addEventListener\("nav", initializeMobileOutline\)/)
  assert.match(
    mobileOutlineScript,
    /document\.addEventListener\("render", initializeMobileOutline\)/,
  )
  assert.match(mobileOutlineScript, /window\.addCleanup\(cleanupMobileOutline\)/)
  assert.match(mobileOutlineScript, /items\.length < 2/)
  assert.match(mobileOutlineScript, /heading\.closest\("\.transclude"\) === null/)
  assert.match(mobileOutlineScript, /closeButton\.removeEventListener\("click", closeFromButton\)/)
})

test("mobile-outline labels use the central locale catalog", () => {
  assert.equal(enUs.components.mobileOutline.open, "Open page outline")
  assert.equal(zhCn.components.mobileOutline.title, "本页大纲")
  assert.equal(zhTw.components.mobileOutline.close, "關閉本頁大綱")
})

describe("mobile-outline items", () => {
  test("keeps unique, labeled second- and third-level headings", () => {
    const items = getMobileOutlineItems([
      { id: "start", textContent: "  Start  ", tagName: "H2", sourceIndex: 0 },
      { id: "detail", textContent: "Long\n detail", tagName: "h3", sourceIndex: 1 },
      { id: "start", textContent: "Duplicate", tagName: "H2", sourceIndex: 2 },
      { id: "missing", textContent: "  ", tagName: "H2", sourceIndex: 3 },
    ])

    assert.deepEqual(items, [
      { id: "start", label: "Start", level: 2, sourceIndex: 0 },
      { id: "detail", label: "Long detail", level: 3, sourceIndex: 1 },
    ])
  })

  test("marks the last heading above the reading offset as current", () => {
    assert.equal(findActiveMobileOutlineIndex([40, 120, 300], 128), 1)
    assert.equal(findActiveMobileOutlineIndex([200, 400], 128), -1)
  })
})
