import assert from "node:assert"
import test, { describe } from "node:test"
import {
  cardDescriptionText,
  preferSearchPreviewWithBody,
  preferredSearchCardIndex,
} from "./searchPreview"

describe("preferredSearchCardIndex", () => {
  test("keeps a focused card that already has body text", () => {
    assert.equal(preferredSearchCardIndex(["", "花园导览正文"], 1), 1)
  })

  test("moves off a title-only hit onto the first note with an excerpt", () => {
    assert.equal(preferredSearchCardIndex(["", "花园中我挖了很多坑"], 0), 1)
  })

  test("stays put when every result is title-only", () => {
    assert.equal(preferredSearchCardIndex(["", "  "], 0), 0)
  })
})

describe("cardDescriptionText", () => {
  test("collapses the indexed excerpt whitespace", () => {
    assert.equal(cardDescriptionText("  提示  花园中  "), "提示 花园中")
  })
})

describe("preferSearchPreviewWithBody", () => {
  test("asks the first excerpt result to take the preview", () => {
    const events: string[] = []
    const cards = [
      {
        classList: { contains: (name: string) => name === "focus" },
        querySelector: () => ({ textContent: "   " }),
        dispatchEvent: () => events.push("empty"),
      },
      {
        classList: { contains: () => false },
        querySelector: () => ({ textContent: "花园中我挖了很多坑" }),
        dispatchEvent: (event: Event) => events.push(event.type),
      },
    ]
    const layout = {
      dataset: {} as { previewQuery?: string },
      closest: () => ({ querySelector: () => ({ value: "花园" }) }),
      querySelectorAll: () => cards,
    }

    preferSearchPreviewWithBody(layout)
    layout.dataset.userChose = "1"
    preferSearchPreviewWithBody(layout)

    assert.deepEqual(events, ["mouseover"])
    assert.equal(layout.dataset.previewQuery, "花园")
  })
})
