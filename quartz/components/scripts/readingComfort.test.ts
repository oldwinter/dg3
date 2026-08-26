import assert from "node:assert"
import test, { describe } from "node:test"
import enUs from "../../i18n/locales/en-US"
import zhCn from "../../i18n/locales/zh-CN"
import zhTw from "../../i18n/locales/zh-TW"
import {
  READING_COMFORT_DEFAULT,
  parseReadingComfortLevel,
  readingComfortBootstrapScript,
  readingComfortScript,
  stepReadingComfortLevel,
} from "./readingComfort"

describe("reading comfort levels", () => {
  test("accepts only supported stored levels", () => {
    assert.equal(parseReadingComfortLevel("90"), 90)
    assert.equal(parseReadingComfortLevel("120"), 120)
    assert.equal(parseReadingComfortLevel(null), READING_COMFORT_DEFAULT)
    assert.equal(parseReadingComfortLevel("110.5"), READING_COMFORT_DEFAULT)
    assert.equal(parseReadingComfortLevel("Infinity"), READING_COMFORT_DEFAULT)
    assert.equal(parseReadingComfortLevel("not-a-level"), READING_COMFORT_DEFAULT)
  })

  test("steps between levels and clamps at both ends", () => {
    assert.equal(stepReadingComfortLevel(100, -1), 90)
    assert.equal(stepReadingComfortLevel(100, 1), 110)
    assert.equal(stepReadingComfortLevel(90, -1), 90)
    assert.equal(stepReadingComfortLevel(120, 1), 120)
    assert.equal(stepReadingComfortLevel(999, 1), 110)
  })
})

test("reading-comfort scripts compile and follow the Quartz lifecycle", () => {
  assert.doesNotThrow(() => new Function(readingComfortBootstrapScript))
  assert.doesNotThrow(() => new Function(readingComfortScript))
  assert.match(
    readingComfortScript,
    /document\.addEventListener\("nav", initializeReadingComfort\)/,
  )
  assert.match(
    readingComfortScript,
    /document\.addEventListener\("render", initializeReadingComfort\)/,
  )
  assert.match(readingComfortScript, /window\.addCleanup\(cleanupReadingComfort\)/)
  assert.match(readingComfortScript, /window\.addEventListener\("storage", syncStoredLevel\)/)
  assert.match(readingComfortScript, /event\.key === "Escape"/)
})

test("reading-comfort labels use the central locale catalog", () => {
  assert.equal(enUs.components.readingComfort?.title, "Reading size")
  assert.equal(zhCn.components.readingComfort?.larger, "放大正文")
  assert.equal(zhTw.components.readingComfort?.failed, "已套用，但瀏覽器未能儲存偏好")
})
