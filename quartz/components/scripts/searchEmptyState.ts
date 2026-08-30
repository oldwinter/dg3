export type SearchEmptyStateLabels = Readonly<{
  noResults: string
  noResultsHint: string
}>

export function searchEmptyStateLabels(dataset: DOMStringMap): SearchEmptyStateLabels | undefined {
  const { searchNoResults: noResults, searchNoResultsHint: noResultsHint } = dataset
  if (!noResults || !noResultsHint) return

  return { noResults, noResultsHint }
}

type EmptyStateNode = {
  querySelector(selector: string): { textContent: string } | null
}

type EmptyStateRoot = {
  querySelectorAll(selector: string): ArrayLike<EmptyStateNode>
}

export function applySearchEmptyState(root: EmptyStateRoot, labels: SearchEmptyStateLabels): void {
  const cards = root.querySelectorAll(".result-card.no-match")
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]
    if (!card) continue
    const title = card.querySelector("h3")
    const hint = card.querySelector("p")
    if (title && title.textContent !== labels.noResults) {
      title.textContent = labels.noResults
    }
    if (hint && hint.textContent !== labels.noResultsHint) {
      hint.textContent = labels.noResultsHint
    }
  }
}

export const searchEmptyStateScript = `
const searchEmptyStateLabels = ${searchEmptyStateLabels.toString()}
const applySearchEmptyState = ${applySearchEmptyState.toString()}

let searchEmptyStateObserver

function localizeSearchEmptyState() {
  const labels = searchEmptyStateLabels(document.body.dataset)
  if (!labels) return
  applySearchEmptyState(document, labels)
}

function bindSearchEmptyState() {
  localizeSearchEmptyState()
  if (typeof MutationObserver === "undefined") return
  if (searchEmptyStateObserver) searchEmptyStateObserver.disconnect()
  searchEmptyStateObserver = new MutationObserver(() => localizeSearchEmptyState())
  const targets = document.querySelectorAll(".search-layout, .results-container")
  if (targets.length === 0) {
    searchEmptyStateObserver.observe(document.body, { childList: true, subtree: true })
    return
  }
  for (const target of targets) {
    searchEmptyStateObserver.observe(target, { childList: true, subtree: true })
  }
}

document.addEventListener("nav", bindSearchEmptyState)
document.addEventListener("render", bindSearchEmptyState)
`
