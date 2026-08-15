import {
  READ_LATER_LIMIT,
  parseReadLaterEntries,
  parseReadLaterEntry,
  toggleReadLaterEntry,
} from "./readLaterStorage"

export const readLaterScript = `
const READ_LATER_KEY = "dg3.readLater.v1"
const parseReadLaterEntry = ${parseReadLaterEntry.toString()}
const parseReadLaterEntries = ${parseReadLaterEntries.toString()}
const toggleReadLaterEntry = ${toggleReadLaterEntry.toString()}
const READ_LATER_LIMIT = ${READ_LATER_LIMIT}

function readStoredEntries() {
  try {
    return parseReadLaterEntries(localStorage.getItem(READ_LATER_KEY))
  } catch (error) {
    if (error instanceof DOMException) return []
    throw error
  }
}

function writeStoredEntries(entries) {
  try {
    localStorage.setItem(READ_LATER_KEY, JSON.stringify(entries))
    return true
  } catch (error) {
    if (error instanceof DOMException) return false
    throw error
  }
}

function createBookmarkIcon() {
  const namespace = "http://www.w3.org/2000/svg"
  const icon = document.createElementNS(namespace, "svg")
  icon.classList.add("read-later-icon")
  icon.setAttribute("viewBox", "0 0 24 24")
  icon.setAttribute("aria-hidden", "true")
  const path = document.createElementNS(namespace, "path")
  path.setAttribute("d", "M6 3h12a1 1 0 0 1 1 1v17l-7-5-7 5V4a1 1 0 0 1 1-1Z")
  icon.append(path)
  return icon
}

function getReadLaterLabels() {
  const {
    readLaterTitle: title,
    readLaterTrigger: serializedTriggers,
    readLaterSave: save,
    readLaterRemoveCurrent: removeCurrent,
    readLaterRemoveItem: removeItem,
    readLaterClose: close,
    readLaterEmpty: empty,
    readLaterSaved: saved,
    readLaterRemoved: removed,
    readLaterFailed: failed,
  } = document.body.dataset
  if (
    !title ||
    !serializedTriggers ||
    !save ||
    !removeCurrent ||
    !removeItem ||
    !close ||
    !empty ||
    !saved ||
    !removed ||
    !failed
  ) {
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
    triggers.length !== READ_LATER_LIMIT + 1 ||
    triggers.some((label) => typeof label !== "string" || label.length === 0)
  ) {
    return undefined
  }

  return {
    title,
    trigger: (count) => triggers[count],
    save,
    removeCurrent,
    removeItem: (name) => removeItem.replace("{title}", () => name),
    close,
    empty,
    saved,
    removed,
    failed,
  }
}

let cleanupCurrentReadLater = () => {}
const cleanupReadLater = () => {
  const cleanup = cleanupCurrentReadLater
  cleanupCurrentReadLater = () => {}
  cleanup()
}

function initializeReadLater() {
  cleanupReadLater()
  const titleElement = document.querySelector("h1.article-title")
  const anchor = document.querySelector(".content-meta") ?? titleElement
  const title = titleElement?.textContent?.trim()
  const labels = getReadLaterLabels()
  if (anchor === null || !title || labels === undefined) return

  const current = { path: location.pathname, title, savedAt: 0 }
  let entries = readStoredEntries()
  const root = document.createElement("div")
  root.className = "read-later"
  root.setAttribute("data-read-later-root", "")

  const trigger = document.createElement("button")
  trigger.type = "button"
  trigger.className = "read-later-trigger"
  trigger.setAttribute("aria-controls", "read-later-panel")
  trigger.setAttribute("aria-expanded", "false")
  trigger.append(createBookmarkIcon())
  const count = document.createElement("span")
  count.className = "read-later-count"
  count.setAttribute("aria-hidden", "true")
  trigger.append(count)

  const panel = document.createElement("section")
  panel.id = "read-later-panel"
  panel.className = "read-later-panel"
  panel.setAttribute("aria-label", labels.title)
  panel.hidden = true
  const header = document.createElement("header")
  header.className = "read-later-header"
  const heading = document.createElement("h2")
  heading.textContent = labels.title
  const closeButton = document.createElement("button")
  closeButton.type = "button"
  closeButton.className = "read-later-close"
  closeButton.textContent = "×"
  closeButton.title = labels.close
  closeButton.setAttribute("aria-label", labels.close)
  header.append(heading, closeButton)

  const currentButton = document.createElement("button")
  currentButton.type = "button"
  currentButton.className = "read-later-current"
  currentButton.append(createBookmarkIcon(), document.createElement("span"))
  const list = document.createElement("ul")
  list.className = "read-later-list"
  const status = document.createElement("p")
  status.className = "read-later-status"
  status.setAttribute("aria-live", "polite")
  panel.append(header, currentButton, list, status)
  root.append(trigger, panel)
  anchor.insertAdjacentElement("afterend", root)

  const closePanel = (restoreFocus) => {
    panel.hidden = true
    trigger.setAttribute("aria-expanded", "false")
    if (restoreFocus) trigger.focus()
  }
  const render = () => {
    const currentIsSaved = entries.some((entry) => entry.path === current.path)
    root.toggleAttribute("data-current-saved", currentIsSaved)
    currentButton.setAttribute("aria-pressed", String(currentIsSaved))
    currentButton.lastElementChild.textContent = currentIsSaved
      ? labels.removeCurrent
      : labels.save
    count.hidden = entries.length === 0
    count.textContent = String(entries.length)
    trigger.title = labels.trigger(entries.length)
    trigger.setAttribute("aria-label", labels.trigger(entries.length))
    list.replaceChildren()
    if (entries.length === 0) {
      const empty = document.createElement("li")
      empty.className = "read-later-empty"
      empty.textContent = labels.empty
      list.append(empty)
      return
    }
    for (const entry of entries) {
      const item = document.createElement("li")
      const link = document.createElement("a")
      link.className = "read-later-link internal"
      link.href = entry.path
      link.textContent = entry.title
      link.addEventListener("click", () => closePanel(false))
      const removeButton = document.createElement("button")
      removeButton.type = "button"
      removeButton.className = "read-later-remove"
      removeButton.textContent = "×"
      removeButton.title = labels.removeItem(entry.title)
      removeButton.setAttribute("aria-label", labels.removeItem(entry.title))
      removeButton.addEventListener("click", () => {
        const next = entries.filter((candidate) => candidate.path !== entry.path)
        if (!writeStoredEntries(next)) {
          status.textContent = labels.failed
          return
        }
        entries = next
        status.textContent = labels.removed
        render()
      })
      item.append(link, removeButton)
      list.append(item)
    }
  }

  trigger.addEventListener("click", () => {
    panel.hidden = !panel.hidden
    trigger.setAttribute("aria-expanded", String(!panel.hidden))
    if (!panel.hidden) currentButton.focus()
  })
  closeButton.addEventListener("click", () => closePanel(true))
  currentButton.addEventListener("click", () => {
    const wasSaved = entries.some((entry) => entry.path === current.path)
    const next = toggleReadLaterEntry(entries, { ...current, savedAt: Date.now() })
    if (!writeStoredEntries(next)) {
      status.textContent = labels.failed
      return
    }
    entries = next
    status.textContent = wasSaved ? labels.removed : labels.saved
    render()
  })
  const dismissOutside = (event) => {
    if (event.target instanceof Node && !root.contains(event.target)) closePanel(false)
  }
  const dismissWithKeyboard = (event) => {
    if (event.key === "Escape" && !panel.hidden) closePanel(true)
  }
  const syncStoredEntries = (event) => {
    if (event.key !== null && event.key !== READ_LATER_KEY) return
    entries = readStoredEntries()
    render()
  }
  document.addEventListener("pointerdown", dismissOutside)
  document.addEventListener("keydown", dismissWithKeyboard)
  window.addEventListener("storage", syncStoredEntries)
  cleanupCurrentReadLater = () => {
    document.removeEventListener("pointerdown", dismissOutside)
    document.removeEventListener("keydown", dismissWithKeyboard)
    window.removeEventListener("storage", syncStoredEntries)
    root.remove()
  }
  window.addCleanup(cleanupReadLater)
  render()
}

document.addEventListener("nav", initializeReadLater)
document.addEventListener("render", initializeReadLater)
`
