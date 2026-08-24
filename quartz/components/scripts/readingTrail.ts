import {
  READING_TRAIL_LIMIT,
  parseReadingTrailEntries,
  parseReadingTrailEntry,
  recordReadingTrailEntry,
} from "./readingTrailStorage"

export const readingTrailScript = `
const READING_TRAIL_KEY = "dg3.readingTrail.v1"
const READING_TRAIL_LIMIT = ${READING_TRAIL_LIMIT}
const parseReadingTrailEntry = ${parseReadingTrailEntry.toString()}
const parseReadingTrailEntries = ${parseReadingTrailEntries.toString()}
const recordReadingTrailEntry = ${recordReadingTrailEntry.toString()}
let fallbackReadingTrailEntries = []

function readReadingTrailEntries() {
  try {
    const entries = parseReadingTrailEntries(sessionStorage.getItem(READING_TRAIL_KEY))
    fallbackReadingTrailEntries = entries
    return entries
  } catch (error) {
    if (error instanceof DOMException) return fallbackReadingTrailEntries
    throw error
  }
}

function writeReadingTrailEntries(entries) {
  fallbackReadingTrailEntries = entries
  try {
    sessionStorage.setItem(READING_TRAIL_KEY, JSON.stringify(entries))
    return true
  } catch (error) {
    if (error instanceof DOMException) return false
    throw error
  }
}

function createReadingTrailIcon(pathData, className) {
  const namespace = "http://www.w3.org/2000/svg"
  const icon = document.createElementNS(namespace, "svg")
  icon.classList.add(className)
  icon.setAttribute("viewBox", "0 0 24 24")
  icon.setAttribute("fill", "none")
  icon.setAttribute("stroke", "currentColor")
  icon.setAttribute("aria-hidden", "true")
  for (const data of pathData) {
    const path = document.createElementNS(namespace, "path")
    path.setAttribute("d", data)
    icon.append(path)
  }
  return icon
}

function getReadingTrailLabels() {
  const {
    readingTrailTitle: title,
    readingTrailTrigger: serializedTriggers,
    readingTrailClose: close,
    readingTrailClear: clear,
    readingTrailEmpty: empty,
    readingTrailCleared: cleared,
    readingTrailFailed: failed,
  } = document.body.dataset
  if (!title || !serializedTriggers || !close || !clear || !empty || !cleared || !failed) {
    return undefined
  }

  let triggers
  try {
    triggers = JSON.parse(serializedTriggers)
  } catch {
    return undefined
  }
  if (
    !Array.isArray(triggers) ||
    triggers.length !== READING_TRAIL_LIMIT + 1 ||
    triggers.some((label) => typeof label !== "string" || label.length === 0)
  ) {
    return undefined
  }
  return { title, trigger: (count) => triggers[count], close, clear, empty, cleared, failed }
}

let cleanupCurrentReadingTrail = () => {}
const cleanupReadingTrail = () => {
  const cleanup = cleanupCurrentReadingTrail
  cleanupCurrentReadingTrail = () => {}
  cleanup()
}

function initializeReadingTrail() {
  cleanupReadingTrail()
  const titleElement = document.querySelector("h1.article-title")
  const anchor = document.querySelector(".content-meta") ?? titleElement
  const title = titleElement?.textContent?.trim()
  const labels = getReadingTrailLabels()
  if (anchor === null || !title || labels === undefined) return

  const current = parseReadingTrailEntry({
    path: location.pathname,
    title,
    visitedAt: Date.now(),
  })
  if (current === undefined) return

  let entries = recordReadingTrailEntry(readReadingTrailEntries(), current)
  let storageFailed = !writeReadingTrailEntries(entries)
  const existingRoot =
    document.querySelector("[data-read-later-root]") ?? document.querySelector(".note-share-only")
  const root = existingRoot ?? document.createElement("div")
  const ownsRoot = existingRoot === null
  root.classList.add("reader-actions")
  if (ownsRoot) {
    root.classList.add("reading-trail-only")
    anchor.insertAdjacentElement("afterend", root)
  }

  const trigger = document.createElement("button")
  trigger.type = "button"
  trigger.className = "reading-trail-trigger"
  trigger.setAttribute("aria-controls", "reading-trail-panel")
  trigger.setAttribute("aria-expanded", "false")
  trigger.append(
    createReadingTrailIcon(
      ["M3 12a9 9 0 1 0 3-6.7L3 8", "M3 3v5h5", "M12 7v5l4 2"],
      "reading-trail-icon",
    ),
  )
  const count = document.createElement("span")
  count.className = "reading-trail-count"
  count.setAttribute("aria-hidden", "true")
  trigger.append(count)

  const panel = document.createElement("section")
  panel.id = "reading-trail-panel"
  panel.className = "reading-trail-panel"
  panel.setAttribute("aria-label", labels.title)
  panel.hidden = true
  const header = document.createElement("header")
  header.className = "reading-trail-header"
  const heading = document.createElement("h2")
  heading.textContent = labels.title
  const headerActions = document.createElement("div")
  headerActions.className = "reading-trail-header-actions"
  const clearButton = document.createElement("button")
  clearButton.type = "button"
  clearButton.className = "reading-trail-clear"
  clearButton.title = labels.clear
  clearButton.setAttribute("aria-label", labels.clear)
  clearButton.append(
    createReadingTrailIcon(
      ["M3 6h18", "M8 6V4h8v2", "m19 6-1 14H6L5 6", "M10 11v5", "M14 11v5"],
      "reading-trail-action-icon",
    ),
  )
  const closeButton = document.createElement("button")
  closeButton.type = "button"
  closeButton.className = "reading-trail-close"
  closeButton.textContent = "×"
  closeButton.title = labels.close
  closeButton.setAttribute("aria-label", labels.close)
  headerActions.append(clearButton, closeButton)
  header.append(heading, headerActions)
  const list = document.createElement("ol")
  list.className = "reading-trail-list"
  const status = document.createElement("p")
  status.className = "reading-trail-status"
  status.setAttribute("aria-live", "polite")
  panel.append(header, list, status)
  root.prepend(trigger)
  root.append(panel)

  const closePanel = (restoreFocus) => {
    panel.hidden = true
    trigger.setAttribute("aria-expanded", "false")
    if (restoreFocus) trigger.focus()
  }
  const previousEntries = () => entries.filter((entry) => entry.path !== current.path)
  const render = () => {
    const previous = previousEntries()
    count.hidden = previous.length === 0
    count.textContent = String(previous.length)
    trigger.title = labels.trigger(previous.length)
    trigger.setAttribute("aria-label", labels.trigger(previous.length))
    clearButton.disabled = previous.length === 0
    list.replaceChildren()
    if (previous.length === 0) {
      const empty = document.createElement("li")
      empty.className = "reading-trail-empty"
      empty.textContent = labels.empty
      list.append(empty)
      return
    }

    for (const entry of previous) {
      const item = document.createElement("li")
      const link = document.createElement("a")
      link.className = "reading-trail-link internal"
      link.href = entry.path
      link.dataset.noPopover = ""
      const entryTitle = document.createElement("span")
      entryTitle.className = "reading-trail-entry-title"
      entryTitle.textContent = entry.title
      const entryPath = document.createElement("span")
      entryPath.className = "reading-trail-entry-path"
      entryPath.textContent = entry.path
      link.append(entryTitle, entryPath)
      link.addEventListener("click", () => closePanel(false))
      item.append(link)
      list.append(item)
    }
  }

  trigger.addEventListener("click", () => {
    panel.hidden = !panel.hidden
    trigger.setAttribute("aria-expanded", String(!panel.hidden))
    if (!panel.hidden) {
      const readLaterPanel = root.querySelector(".read-later-panel")
      const readLaterTrigger = root.querySelector(".read-later-trigger")
      if (readLaterPanel instanceof HTMLElement) readLaterPanel.hidden = true
      readLaterTrigger?.setAttribute("aria-expanded", "false")
      if (storageFailed) status.textContent = labels.failed
      const firstLink = list.querySelector("a")
      if (firstLink instanceof HTMLElement) firstLink.focus()
      else closeButton.focus()
    }
  })
  closeButton.addEventListener("click", () => closePanel(true))
  clearButton.addEventListener("click", () => {
    entries = []
    storageFailed = !writeReadingTrailEntries(entries)
    status.textContent = storageFailed ? labels.failed : labels.cleared
    render()
    closeButton.focus()
  })
  const dismissOutside = (event) => {
    if (
      event.target instanceof Node &&
      !panel.contains(event.target) &&
      !trigger.contains(event.target)
    ) {
      closePanel(false)
    }
  }
  const dismissWithKeyboard = (event) => {
    if (event.key === "Escape" && !panel.hidden) closePanel(true)
  }
  document.addEventListener("pointerdown", dismissOutside)
  document.addEventListener("keydown", dismissWithKeyboard)
  cleanupCurrentReadingTrail = () => {
    document.removeEventListener("pointerdown", dismissOutside)
    document.removeEventListener("keydown", dismissWithKeyboard)
    trigger.remove()
    panel.remove()
    if (ownsRoot) root.remove()
  }
  window.addCleanup(cleanupReadingTrail)
  render()
}

document.addEventListener("nav", initializeReadingTrail)
document.addEventListener("render", initializeReadingTrail)
`
