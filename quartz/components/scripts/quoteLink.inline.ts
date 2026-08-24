import {
  normalizeQuoteSelection,
  quoteLinkLabels,
  quoteLinkMarkdown,
  quoteLinkPosition,
} from "./quoteLink"

const excludedSelectionSelector = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "option",
  "pre",
  "code",
  "svg",
  ".katex",
  ".MathJax",
  '[contenteditable]:not([contenteditable="false"])',
  "[data-no-quote-link]",
].join(",")

function createQuoteIcon() {
  const namespace = "http://www.w3.org/2000/svg"
  const icon = document.createElementNS(namespace, "svg")
  icon.classList.add("quote-link-icon")
  icon.setAttribute("viewBox", "0 0 24 24")
  icon.setAttribute("aria-hidden", "true")

  const quote = document.createElementNS(namespace, "path")
  quote.classList.add("quote-link-icon-quote")
  quote.setAttribute(
    "d",
    "M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4C2.75 3 2 3.75 2 5v6c0 1.25.75 2 2 2h4c0 4-1 5-5 6v2Zm11 0c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h4c0 4-1 5-5 6v2Z",
  )

  const check = document.createElementNS(namespace, "path")
  check.classList.add("quote-link-icon-check")
  check.setAttribute("d", "m4 12 5 5L20 6")
  icon.append(quote, check)
  return icon
}

function closestElement(node: Node | null): Element | null {
  if (node instanceof Element) return node
  return node?.parentElement ?? null
}

let cleanupCurrentQuoteLink = () => {}
const cleanupQuoteLink = () => {
  const cleanup = cleanupCurrentQuoteLink
  cleanupCurrentQuoteLink = () => {}
  cleanup()
}

function initializeQuoteLink() {
  cleanupQuoteLink()

  const article = document.querySelector(".center > article.popover-hint")
  const labels = quoteLinkLabels(document.body.dataset)
  if (
    article === null ||
    document.body.dataset.slug === "404" ||
    labels === undefined ||
    navigator.clipboard === undefined
  ) {
    return
  }

  const button = document.createElement("button")
  button.type = "button"
  button.className = "quote-link"
  button.hidden = true
  button.title = labels.title
  button.setAttribute("aria-label", labels.title)
  button.append(createQuoteIcon())

  const status = document.createElement("span")
  status.className = "quote-link-status"
  status.setAttribute("aria-live", "polite")
  document.body.append(button, status)

  let currentQuote: string | undefined
  let animationFrame: number | undefined
  let feedbackTimer: number | undefined

  const resetFeedback = () => {
    if (feedbackTimer !== undefined) window.clearTimeout(feedbackTimer)
    feedbackTimer = undefined
    delete button.dataset.copied
    delete button.dataset.failed
    button.title = labels.title
    button.setAttribute("aria-label", labels.title)
  }

  const hideButton = () => {
    currentQuote = undefined
    button.hidden = true
    status.textContent = ""
    resetFeedback()
  }

  const selectedQuote = () => {
    const selection = window.getSelection()
    if (selection === null || selection.isCollapsed || selection.rangeCount !== 1) return
    if (!article.contains(selection.anchorNode) || !article.contains(selection.focusNode)) return

    const range = selection.getRangeAt(0)
    const start = closestElement(range.startContainer)
    const end = closestElement(range.endContainer)
    if (
      start === null ||
      end === null ||
      start.closest(excludedSelectionSelector) !== null ||
      end.closest(excludedSelectionSelector) !== null ||
      range.cloneContents().querySelector(excludedSelectionSelector) !== null
    ) {
      return
    }

    const quote = normalizeQuoteSelection(selection.toString())
    if (quote === undefined) return

    const rects = range.getClientRects()
    const rect = rects.item(rects.length - 1) ?? range.getBoundingClientRect()
    if (
      rect.width <= 0 ||
      rect.height <= 0 ||
      rect.bottom <= 0 ||
      rect.top >= window.innerHeight ||
      rect.right <= 0 ||
      rect.left >= window.innerWidth
    ) {
      return
    }

    return { quote, rect }
  }

  const updateButton = () => {
    animationFrame = undefined
    const selected = selectedQuote()
    if (selected === undefined) {
      hideButton()
      return
    }

    if (selected.quote !== currentQuote) {
      resetFeedback()
      status.textContent = ""
    }
    currentQuote = selected.quote
    const position = quoteLinkPosition(selected.rect, window.innerWidth)
    button.style.left = `${position.left}px`
    button.style.top = `${position.top}px`
    button.dataset.placement = position.placement
    button.hidden = false
  }

  const scheduleUpdate = () => {
    if (animationFrame !== undefined) return
    animationFrame = window.requestAnimationFrame(updateButton)
  }

  const preserveSelection = (event: PointerEvent) => event.preventDefault()
  const copyQuote = async () => {
    const quote = currentQuote
    if (quote === undefined) return

    button.disabled = true
    try {
      const markdown = quoteLinkMarkdown(quote, new URL(window.location.href), labels.open)
      await navigator.clipboard.writeText(markdown)
      delete button.dataset.failed
      button.dataset.copied = ""
      button.title = labels.copied
      button.setAttribute("aria-label", labels.copied)
      status.textContent = labels.copied
      feedbackTimer = window.setTimeout(resetFeedback, 1800)
    } catch {
      delete button.dataset.copied
      button.dataset.failed = ""
      button.title = labels.failed
      button.setAttribute("aria-label", labels.failed)
      status.textContent = labels.failed
    } finally {
      button.disabled = false
    }
  }

  const dismissWithKeyboard = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || button.hidden) return
    window.getSelection()?.removeAllRanges()
    hideButton()
  }

  document.addEventListener("selectionchange", scheduleUpdate)
  document.addEventListener("keydown", dismissWithKeyboard)
  window.addEventListener("scroll", scheduleUpdate, { passive: true })
  window.addEventListener("resize", scheduleUpdate)
  button.addEventListener("pointerdown", preserveSelection)
  button.addEventListener("click", copyQuote)

  cleanupCurrentQuoteLink = () => {
    if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
    if (feedbackTimer !== undefined) window.clearTimeout(feedbackTimer)
    document.removeEventListener("selectionchange", scheduleUpdate)
    document.removeEventListener("keydown", dismissWithKeyboard)
    window.removeEventListener("scroll", scheduleUpdate)
    window.removeEventListener("resize", scheduleUpdate)
    button.removeEventListener("pointerdown", preserveSelection)
    button.removeEventListener("click", copyQuote)
    button.remove()
    status.remove()
  }
  if (typeof window.addCleanup === "function") window.addCleanup(cleanupQuoteLink)
}

document.addEventListener("nav", initializeQuoteLink)
document.addEventListener("render", initializeQuoteLink)
initializeQuoteLink()

export default ""
