import assert from "node:assert"
import test, { describe } from "node:test"
import enUs from "../../i18n/locales/en-US"
import zhCn from "../../i18n/locales/zh-CN"
import zhTw from "../../i18n/locales/zh-TW"
import {
  wideContentLabels,
  wideContentScrollScript,
  wideContentScrollState,
} from "./wideContentScroll"

describe("wide-content scroll state", () => {
  test("keeps a fitting container inactive", () => {
    assert.deepEqual(wideContentScrollState(0, 320, 320), {
      overflowing: false,
      before: false,
      after: false,
    })
  })

  test("tracks the start, middle, and end of left-to-right content", () => {
    assert.deepEqual(wideContentScrollState(0, 320, 640), {
      overflowing: true,
      before: false,
      after: true,
    })
    assert.deepEqual(wideContentScrollState(160, 320, 640), {
      overflowing: true,
      before: true,
      after: true,
    })
    assert.deepEqual(wideContentScrollState(320, 320, 640), {
      overflowing: true,
      before: true,
      after: false,
    })
  })

  test("normalizes negative right-to-left scroll offsets", () => {
    assert.deepEqual(wideContentScrollState(-320, 320, 640, "rtl"), {
      overflowing: true,
      before: true,
      after: false,
    })
  })
})

describe("wide-content labels", () => {
  test("reads complete labels rendered by Quartz i18n", () => {
    const labels = wideContentLabels({
      wideContentTable: "Scrollable table",
      wideContentCode: "Scrollable code block",
    } as DOMStringMap)

    assert.deepEqual(labels, {
      table: "Scrollable table",
      code: "Scrollable code block",
    })
  })

  test("does not initialize with incomplete labels", () => {
    assert.equal(
      wideContentLabels({ wideContentTable: "Scrollable table" } as DOMStringMap),
      undefined,
    )
  })
})

test("wide-content browser script compiles", () => {
  assert.doesNotThrow(() => new Function(wideContentScrollScript))
})

test("wide-content browser script handles Quartz lifecycle cleanup", () => {
  assert.doesNotMatch(wideContentScrollScript, /\ninitializeWideContentScroll\(\)\n/)
  assert.match(
    wideContentScrollScript,
    /document\.addEventListener\("nav", initializeWideContentScroll\)/,
  )
  assert.match(
    wideContentScrollScript,
    /document\.addEventListener\("render", initializeWideContentScroll\)/,
  )
  assert.match(wideContentScrollScript, /window\.addCleanup\(cleanupWideContentScroll\)/)
  assert.match(wideContentScrollScript, /resizeObserver\?\.disconnect\(\)/)
  assert.match(wideContentScrollScript, /pre > code:not\(\.mermaid\)/)
})

test("wide-content labels use the central locale catalog", () => {
  assert.equal(enUs.components.wideContentScroll.table, "Scrollable table")
  assert.equal(zhCn.components.wideContentScroll.code, "可横向滚动的代码块")
  assert.equal(zhTw.components.wideContentScroll.table, "可橫向捲動的表格")
})
