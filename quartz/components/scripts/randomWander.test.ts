import assert from "node:assert"
import test, { describe } from "node:test"
import enUs from "../../i18n/locales/en-US"
import zhCn from "../../i18n/locales/zh-CN"
import zhTw from "../../i18n/locales/zh-TW"
import { pickRandomWanderSlug, randomWanderHref, randomWanderScript } from "./randomWander"

describe("random wander selection", () => {
  const index = {
    index: { content: "Homepage" },
    "404": { content: "Missing" },
    current: { content: "Current note" },
    empty: { content: "   " },
    alpha: { content: "First destination" },
    beta: { content: "Second destination" },
  }

  test("selects only another nonempty note", () => {
    // Given / When
    const first = pickRandomWanderSlug(index, "current", 0)
    const last = pickRandomWanderSlug(index, "current", 0.999)

    // Then
    assert.equal(first, "alpha")
    assert.equal(last, "beta")
  })

  test("returns undefined when no destination is eligible", () => {
    // Given
    const currentOnly = {
      current: { content: "Current note" },
      empty: { content: "" },
    }

    // When / Then
    assert.equal(pickRandomWanderSlug(currentOnly, "current", 0.5), undefined)
  })

  test("rejects slugs that can escape the site origin or base path", () => {
    // Given
    const unsafeIndex = {
      "\\evil.test": { content: "Cross-origin backslash" },
      "/evil.test": { content: "Protocol-relative path" },
      "folder/../outside": { content: "Escaped base path" },
      "%2e%2e/%2e%2e/evil": { content: "Encoded traversal" },
      "%2E./evil": { content: "Mixed encoded traversal" },
      ".%2e/evil": { content: "Mixed literal traversal" },
      "folder/%2foutside": { content: "Encoded slash" },
      "folder/%5Coutside": { content: "Encoded backslash" },
      safe: { content: "Safe destination" },
    }

    // When / Then
    assert.equal(pickRandomWanderSlug(unsafeIndex, "current", 0), "safe")
  })
})

test("random wander builds root and subpath links", () => {
  // Given / When / Then
  assert.equal(randomWanderHref("", "Cards/Delight"), "/Cards/Delight")
  assert.equal(randomWanderHref("/garden", "Cards/Delight"), "/garden/Cards/Delight")
  assert.equal(randomWanderHref("", "\\evil.test"), undefined)
  assert.equal(randomWanderHref("", "/evil.test"), undefined)
  assert.equal(randomWanderHref("/garden", "folder/../outside"), undefined)
  assert.equal(randomWanderHref("/garden", "%2e%2e/%2e%2e/evil"), undefined)
  assert.equal(randomWanderHref("/garden", "%2E./evil"), undefined)
  assert.equal(randomWanderHref("/garden", ".%2e/evil"), undefined)
  assert.equal(randomWanderHref("/garden", "folder/%2foutside"), undefined)
  assert.equal(randomWanderHref("/garden", "folder/%5Coutside"), undefined)
  assert.equal(randomWanderHref("/garden", "80%时间输入"), "/garden/80%时间输入")
})

test("random wander browser script compiles and follows the Quartz lifecycle", () => {
  // Given
  const compile = () => new Function(randomWanderScript)

  // When / Then
  assert.doesNotThrow(compile)
  assert.match(randomWanderScript, /document\.addEventListener\("nav", initializeRandomWander\)/)
  assert.match(randomWanderScript, /document\.addEventListener\("render", initializeRandomWander\)/)
  assert.match(randomWanderScript, /window\.addCleanup\(cleanupRandomWander\)/)
})

test("random wander labels use the central locale catalog", () => {
  // Given / When / Then
  assert.equal(enUs.components.randomWander.title, "Wander to another note")
  assert.equal(zhCn.components.randomWander.title, "随机漫游到另一篇笔记")
  assert.equal(zhTw.components.randomWander.title, "隨機漫遊到另一篇筆記")
})
