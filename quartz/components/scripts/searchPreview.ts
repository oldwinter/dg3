export function cardDescriptionText(text: string | null | undefined): string {
  return (text ?? "").replace(/\s+/g, " ").trim()
}

export function preferredSearchCardIndex(
  descriptions: readonly string[],
  focusedIndex: number,
): number {
  const safeFocused = focusedIndex >= 0 && focusedIndex < descriptions.length ? focusedIndex : 0
  if (cardDescriptionText(descriptions[safeFocused]).length > 0) return safeFocused
  const better = descriptions.findIndex(
    (description) => cardDescriptionText(description).length > 0,
  )
  return better === -1 ? safeFocused : better
}

type PreviewCard = {
  id?: string
  classList: { contains(name: string): boolean }
  querySelector(selector: string): { textContent: string | null } | null
  dispatchEvent(event: Event): void
}

type PreviewLayout = {
  dataset: { previewQuery?: string; userChose?: string }
  closest(selector: string): {
    querySelector(selector: string): { value: string } | null
  } | null
  querySelectorAll(selector: string): ArrayLike<PreviewCard>
}

export function preferSearchPreviewWithBody(layout: PreviewLayout): void {
  const query = layout.closest(".search")?.querySelector(".search-bar")?.value ?? ""
  if (!query.trim()) {
    delete layout.dataset.previewQuery
    delete layout.dataset.userChose
    return
  }
  if (layout.dataset.previewQuery !== query) {
    delete layout.dataset.userChose
    layout.dataset.previewQuery = query
  }
  if (layout.dataset.userChose === "1") return

  const cards = Array.from(layout.querySelectorAll(".result-card:not(.no-match)"))
  if (cards.length === 0) return

  const descriptions = cards.map((card) =>
    cardDescriptionText(card.querySelector(".card-description")?.textContent),
  )
  const focusedIndex = cards.findIndex((card) => card.classList.contains("focus"))
  const nextIndex = preferredSearchCardIndex(descriptions, focusedIndex)
  const next = cards[nextIndex]
  const event =
    typeof MouseEvent === "function"
      ? new MouseEvent("mouseover", { bubbles: true })
      : new Event("mouseover", { bubbles: true })
  next.dispatchEvent(event)
}

export const searchPreviewScript = `
const cardDescriptionText = ${cardDescriptionText.toString()}
const preferredSearchCardIndex = ${preferredSearchCardIndex.toString()}
const preferSearchPreviewWithBody = ${preferSearchPreviewWithBody.toString()}

let searchPreviewObserver
let searchPreviewTimer

function cleanupSearchPreview() {
  clearTimeout(searchPreviewTimer)
  searchPreviewObserver?.disconnect()
  searchPreviewObserver = undefined
}

function updateSearchPreview() {
  for (const layout of document.querySelectorAll(".search-layout")) {
    preferSearchPreviewWithBody(layout)
  }
}

function scheduleSearchPreview() {
  clearTimeout(searchPreviewTimer)
  searchPreviewTimer = setTimeout(updateSearchPreview, 250)
}

function noteSearchPreviewChoice(event) {
  if (!event.isTrusted) return
  const card = event.target?.closest?.(".result-card")
  if (!card || card.classList.contains("no-match")) return
  const layout = card.closest(".search-layout")
  if (layout) layout.dataset.userChose = "1"
}

function bindSearchPreview() {
  cleanupSearchPreview()
  scheduleSearchPreview()
  document.addEventListener("mouseover", noteSearchPreviewChoice, true)
  if (typeof MutationObserver === "undefined") return
  searchPreviewObserver = new MutationObserver(() => scheduleSearchPreview())
  const targets = document.querySelectorAll(".search-layout")
  if (targets.length === 0) {
    searchPreviewObserver.observe(document.body, { childList: true, subtree: true })
  } else {
    for (const target of targets) {
      searchPreviewObserver.observe(target, { childList: true, subtree: true })
    }
  }
  window.addCleanup(() => {
    document.removeEventListener("mouseover", noteSearchPreviewChoice, true)
    cleanupSearchPreview()
  })
}

document.addEventListener("nav", bindSearchPreview)
document.addEventListener("render", bindSearchPreview)
`
