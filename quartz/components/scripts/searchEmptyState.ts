export type SearchEmptyStateLabels = Readonly<{
  noResults: string
  noResultsHint: string
  resultList: string
  resultShown: string
  resultsShown: string
}>

export function searchEmptyStateLabels(dataset: DOMStringMap): SearchEmptyStateLabels | undefined {
  const {
    searchNoResults: noResults,
    searchNoResultsHint: noResultsHint,
    searchResultList: resultList,
    searchResultShown: resultShown,
    searchResultsShown: resultsShown,
  } = dataset
  if (!noResults || !noResultsHint || !resultList || !resultShown || !resultsShown) return

  return { noResults, noResultsHint, resultList, resultShown, resultsShown }
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

type AttributeNode = {
  getAttribute(name: string): string | null
  setAttribute(name: string, value: string): void
  removeAttribute(name: string): void
}

type SearchResultContainer = AttributeNode & {
  querySelectorAll(selector: string): ArrayLike<unknown>
}

type SearchStatusNode = AttributeNode & {
  textContent: string | null
}

type SearchRoot = {
  querySelector(selector: string): SearchStatusNode | null
  appendChild(node: SearchStatusNode): void
  ownerDocument: {
    createElement(tagName: string): SearchStatusNode
  }
}

export function searchResultSummary(template: string, count: number): string {
  const safeCount = Number.isFinite(count) ? Math.max(0, Math.trunc(count)) : 0
  return template.replaceAll("{count}", String(safeCount))
}

export function ensureSearchResultStatus(search: SearchRoot): SearchStatusNode {
  const existing = search.querySelector(".search-result-status")
  if (existing) return existing

  const status = search.ownerDocument.createElement("p")
  status.setAttribute("class", "search-result-status")
  status.setAttribute("role", "status")
  status.setAttribute("aria-live", "polite")
  status.setAttribute("aria-atomic", "true")
  search.appendChild(status)
  return status
}

export function updateSearchResultFeedback(
  results: SearchResultContainer,
  status: SearchStatusNode,
  labels: SearchEmptyStateLabels,
  active: boolean,
): void {
  const count = results.querySelectorAll(".result-card:not(.no-match)").length
  const summary =
    count > 0
      ? searchResultSummary(count === 1 ? labels.resultShown : labels.resultsShown, count)
      : undefined
  const listLabel = !active ? labels.resultList : (summary ?? labels.noResults)
  const announcement = !active ? "" : (summary ?? labels.noResults)

  if (results.getAttribute("aria-label") !== listLabel) {
    results.setAttribute("aria-label", listLabel)
  }
  if (summary) {
    if (results.getAttribute("data-search-result-summary") !== summary) {
      results.setAttribute("data-search-result-summary", summary)
    }
  } else if (results.getAttribute("data-search-result-summary") !== null) {
    results.removeAttribute("data-search-result-summary")
  }
  if (status.textContent !== announcement) {
    status.textContent = announcement
  }
}

export const searchEmptyStateScript = `
const searchEmptyStateLabels = ${searchEmptyStateLabels.toString()}
const applySearchEmptyState = ${applySearchEmptyState.toString()}
const searchResultSummary = ${searchResultSummary.toString()}
const ensureSearchResultStatus = ${ensureSearchResultStatus.toString()}
const updateSearchResultFeedback = ${updateSearchResultFeedback.toString()}

let searchFeedbackObserver

function cleanupSearchFeedback() {
  searchFeedbackObserver?.disconnect()
  searchFeedbackObserver = undefined
}

function updateSearchFeedback() {
  const labels = searchEmptyStateLabels(document.body.dataset)
  if (!labels) return
  applySearchEmptyState(document, labels)

  for (const results of document.querySelectorAll(".results-container")) {
    const search = results.closest(".search")
    const layout = results.closest(".search-layout")
    if (!search || !layout) continue
    const status = ensureSearchResultStatus(search)
    updateSearchResultFeedback(results, status, labels, layout.classList.contains("display-results"))
  }
}

function bindSearchFeedback() {
  cleanupSearchFeedback()
  updateSearchFeedback()
  if (typeof MutationObserver === "undefined") return
  searchFeedbackObserver = new MutationObserver(() => updateSearchFeedback())
  const targets = document.querySelectorAll(".search-layout, .results-container")
  if (targets.length === 0) {
    searchFeedbackObserver.observe(document.body, { childList: true, subtree: true })
  } else {
    for (const target of targets) {
      searchFeedbackObserver.observe(target, { childList: true, subtree: true })
    }
  }
  window.addCleanup(cleanupSearchFeedback)
}

document.addEventListener("nav", bindSearchFeedback)
document.addEventListener("render", bindSearchFeedback)
`
