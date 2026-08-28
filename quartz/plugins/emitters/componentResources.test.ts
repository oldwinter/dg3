import assert from "node:assert"
import { readFile } from "node:fs/promises"
import test, { describe } from "node:test"

describe("componentResources", () => {
  test("includes reader controls before SPA navigation is initialized", () => {
    // Given
    const emitterPath = new URL("./componentResources.ts", import.meta.url)

    // When
    const source = readFile(emitterPath, "utf8")

    // Then
    return source.then((contents) => {
      const progressIndex = contents.indexOf(
        "componentResources.afterDOMLoaded.push(readingProgressScript)",
      )
      const backToTopIndex = contents.indexOf(
        "componentResources.afterDOMLoaded.push(backToTopScript)",
      )
      const headingPermalinksIndex = contents.indexOf(
        "componentResources.afterDOMLoaded.push(headingPermalinksScript)",
      )
      const quoteLinkIndex = contents.indexOf(
        "componentResources.afterDOMLoaded.push(quoteLinkScript)",
      )
      const quoteLinkStyleIndex = contents.indexOf("componentResources.css.push(quoteLinkStyle)")
      const spaBranchIndex = contents.indexOf("if (cfg.enableSPA)")

      assert.notEqual(progressIndex, -1)
      assert.notEqual(backToTopIndex, -1)
      assert.notEqual(headingPermalinksIndex, -1)
      assert.notEqual(quoteLinkIndex, -1)
      assert.notEqual(quoteLinkStyleIndex, -1)
      assert.ok(progressIndex < spaBranchIndex)
      assert.ok(backToTopIndex < spaBranchIndex)
      assert.ok(headingPermalinksIndex < spaBranchIndex)
      assert.ok(quoteLinkIndex < spaBranchIndex)
      assert.ok(quoteLinkStyleIndex < spaBranchIndex)
    })
  })

  test("includes read later when SPA navigation is disabled", () => {
    // Given
    const emitterPath = new URL("./componentResources.ts", import.meta.url)

    // When
    const source = readFile(emitterPath, "utf8")

    // Then
    return source.then((contents) => {
      const readLaterIndex = contents.indexOf(
        "componentResources.afterDOMLoaded.push(readLaterScript)",
      )
      const readLaterStyleIndex = contents.indexOf("componentResources.css.push(readLaterStyle)")
      const spaBranchIndex = contents.indexOf("if (cfg.enableSPA)")

      assert.notEqual(readLaterIndex, -1)
      assert.notEqual(readLaterStyleIndex, -1)
      assert.ok(readLaterIndex < spaBranchIndex)
      assert.ok(readLaterStyleIndex < spaBranchIndex)
    })
  })

  test("includes resume reading when SPA navigation is disabled", () => {
    // Given
    const emitterPath = new URL("./componentResources.ts", import.meta.url)

    // When
    const source = readFile(emitterPath, "utf8")

    // Then
    return source.then((contents) => {
      const resumeIndex = contents.indexOf(
        "componentResources.afterDOMLoaded.push(resumeReadingScript)",
      )
      const resumeStyleIndex = contents.indexOf("componentResources.css.push(resumeReadingStyle)")
      const spaBranchIndex = contents.indexOf("if (cfg.enableSPA)")

      assert.notEqual(resumeIndex, -1)
      assert.notEqual(resumeStyleIndex, -1)
      assert.ok(resumeIndex < spaBranchIndex)
      assert.ok(resumeStyleIndex < spaBranchIndex)
    })
  })

  test("includes the mobile outline when SPA navigation is disabled", () => {
    const emitterPath = new URL("./componentResources.ts", import.meta.url)
    const source = readFile(emitterPath, "utf8")

    return source.then((contents) => {
      const scriptIndex = contents.indexOf(
        "componentResources.afterDOMLoaded.push(mobileOutlineScript)",
      )
      const styleIndex = contents.indexOf("componentResources.css.push(mobileOutlineStyle)")
      const spaBranchIndex = contents.indexOf("if (cfg.enableSPA)")

      assert.notEqual(scriptIndex, -1)
      assert.notEqual(styleIndex, -1)
      assert.ok(scriptIndex < spaBranchIndex)
      assert.ok(styleIndex < spaBranchIndex)
    })
  })

  test("includes random wander when SPA navigation is disabled", () => {
    // Given
    const emitterPath = new URL("./componentResources.ts", import.meta.url)

    // When
    const source = readFile(emitterPath, "utf8")

    // Then
    return source.then((contents) => {
      const randomWanderIndex = contents.indexOf(
        "componentResources.afterDOMLoaded.push(randomWanderScript)",
      )
      const randomWanderStyleIndex = contents.indexOf(
        "componentResources.css.push(randomWanderStyle)",
      )
      const spaBranchIndex = contents.indexOf("if (cfg.enableSPA)")

      assert.notEqual(randomWanderIndex, -1)
      assert.notEqual(randomWanderStyleIndex, -1)
      assert.ok(randomWanderIndex < spaBranchIndex)
      assert.ok(randomWanderStyleIndex < spaBranchIndex)
    })
  })

  test("includes note sharing when SPA navigation is disabled", () => {
    const emitterPath = new URL("./componentResources.ts", import.meta.url)
    const source = readFile(emitterPath, "utf8")

    return source.then((contents) => {
      const noteShareIndex = contents.indexOf(
        "componentResources.afterDOMLoaded.push(noteShareScript)",
      )
      const noteShareStyleIndex = contents.indexOf("componentResources.css.push(noteShareStyle)")
      const spaBranchIndex = contents.indexOf("if (cfg.enableSPA)")

      assert.notEqual(noteShareIndex, -1)
      assert.notEqual(noteShareStyleIndex, -1)
      assert.ok(noteShareIndex < spaBranchIndex)
      assert.ok(noteShareStyleIndex < spaBranchIndex)
    })
  })

  test("includes wide-content scroll cues when SPA navigation is disabled", () => {
    const emitterPath = new URL("./componentResources.ts", import.meta.url)
    const source = readFile(emitterPath, "utf8")

    return source.then((contents) => {
      const scriptIndex = contents.indexOf(
        "componentResources.afterDOMLoaded.push(wideContentScrollScript)",
      )
      const styleIndex = contents.indexOf("componentResources.css.push(wideContentScrollStyle)")
      const spaBranchIndex = contents.indexOf("if (cfg.enableSPA)")

      assert.notEqual(scriptIndex, -1)
      assert.notEqual(styleIndex, -1)
      assert.ok(scriptIndex < spaBranchIndex)
      assert.ok(styleIndex < spaBranchIndex)
    })
  })
})
