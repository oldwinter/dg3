import assert from "node:assert"
import test, { describe } from "node:test"
import enUs from "../../i18n/locales/en-US"
import zhCn from "../../i18n/locales/zh-CN"
import zhTw from "../../i18n/locales/zh-TW"
import {
  isPublishedLocalLinkWanderSlug,
  localLinkWanderScript,
  normalizeLocalLinkWanderHref,
  pickLocalLinkWanderHref,
} from "./localLinkWander"

describe("local-link wander destinations", () => {
  const current = "https://garden.example/garden/current?mode=read#section"

  test("normalizes safe links within the configured site path", () => {
    assert.equal(
      normalizeLocalLinkWanderHref("./Cards/Delight#idea", current, "/garden"),
      "/garden/Cards/Delight#idea",
    )
    assert.equal(
      normalizeLocalLinkWanderHref(
        "https://garden.example/garden/80%25%E6%97%B6%E9%97%B4%E8%BE%93%E5%85%A5?q=1",
        current,
        "/garden",
      ),
      "/garden/80%25%E6%97%B6%E9%97%B4%E8%BE%93%E5%85%A5?q=1",
    )
  })

  test("rejects self-links, cross-origin URLs, and path escapes", () => {
    for (const href of [
      "#section-two",
      "/garden/current#other",
      "https://evil.example/garden/note",
      "//evil.example/note",
      "\\evil.example\\note",
      "/outside",
      "/garden/folder/%2foutside",
      "https://user@garden.example/garden/note",
      "javascript:alert(1)",
    ]) {
      assert.equal(normalizeLocalLinkWanderHref(href, current, "/garden"), undefined)
    }
  })

  test("deduplicates destinations and chooses by document order", () => {
    const hrefs = ["/garden/alpha", "/garden/alpha#section", "/garden/alpha", "/garden/beta"]

    assert.equal(pickLocalLinkWanderHref(hrefs, current, "/garden", 0), "/garden/alpha")
    assert.equal(pickLocalLinkWanderHref(hrefs, current, "/garden", 0.999), "/garden/beta")
  })

  test("returns no destination when every link is ineligible", () => {
    assert.equal(pickLocalLinkWanderHref(["#same", "/outside"], current, "/garden", 0.5), undefined)
    assert.equal(pickLocalLinkWanderHref(["/garden/next"], current, "/garden", NaN), undefined)
  })

  test("accepts only own slugs from the published content index", () => {
    const index = Object.assign(Object.create({ inherited: {} }), { published: {} })

    assert.equal(isPublishedLocalLinkWanderSlug(index, "published"), true)
    assert.equal(isPublishedLocalLinkWanderSlug(index, "missing"), false)
    assert.equal(isPublishedLocalLinkWanderSlug(index, "inherited"), false)
    assert.equal(isPublishedLocalLinkWanderSlug(index, undefined), false)
  })
})

test("local-link wander browser script compiles and follows the Quartz lifecycle", () => {
  assert.doesNotThrow(() => new Function(localLinkWanderScript))
  assert.match(
    localLinkWanderScript,
    /document\.addEventListener\("nav", initializeLocalLinkWander\)/,
  )
  assert.match(
    localLinkWanderScript,
    /document\.addEventListener\("render", initializeLocalLinkWander\)/,
  )
  assert.match(localLinkWanderScript, /window\.addCleanup\(cleanupLocalLinkWander\)/)
  assert.match(localLinkWanderScript, /\.transclude, \[data-footnote-ref\]/)
  assert.match(localLinkWanderScript, /fetchData\.then/)
})

test("local-link wander labels use the central locale catalog", () => {
  assert.equal(enUs.components.localLinkWander.title, "Follow a link from this note")
  assert.equal(zhCn.components.localLinkWander.title, "顺着当前笔记漫游")
  assert.equal(zhTw.components.localLinkWander.title, "順著目前筆記漫遊")
})
