export const READING_COMFORT_LEVELS = [90, 100, 110, 120] as const
export const READING_COMFORT_DEFAULT = 100

export function parseReadingComfortLevel(raw: string | null): number {
  if (raw === null || raw.trim().length === 0) return READING_COMFORT_DEFAULT

  const level = Number(raw)
  return READING_COMFORT_LEVELS.includes(level as (typeof READING_COMFORT_LEVELS)[number])
    ? level
    : READING_COMFORT_DEFAULT
}

export function stepReadingComfortLevel(current: number, direction: -1 | 1): number {
  const normalized = parseReadingComfortLevel(String(current))
  const currentIndex = READING_COMFORT_LEVELS.indexOf(
    normalized as (typeof READING_COMFORT_LEVELS)[number],
  )
  const nextIndex = Math.max(
    0,
    Math.min(READING_COMFORT_LEVELS.length - 1, currentIndex + direction),
  )
  return READING_COMFORT_LEVELS[nextIndex]
}

export const readingComfortBootstrapScript = `
const READING_COMFORT_LEVELS = ${JSON.stringify(READING_COMFORT_LEVELS)}
const READING_COMFORT_DEFAULT = ${READING_COMFORT_DEFAULT}
const parseReadingComfortLevel = ${parseReadingComfortLevel.toString()}
try {
  const level = parseReadingComfortLevel(localStorage.getItem("reading-comfort"))
  document.documentElement.dataset.readingComfort = String(level)
} catch {
  document.documentElement.dataset.readingComfort = String(READING_COMFORT_DEFAULT)
}
`

export const readingComfortScript = `
const READING_COMFORT_KEY = "reading-comfort"
const READING_COMFORT_LEVELS = ${JSON.stringify(READING_COMFORT_LEVELS)}
const READING_COMFORT_DEFAULT = ${READING_COMFORT_DEFAULT}
const parseReadingComfortLevel = ${parseReadingComfortLevel.toString()}
const stepReadingComfortLevel = ${stepReadingComfortLevel.toString()}

function getReadingComfortLabels() {
  const {
    readingComfortTitle: title,
    readingComfortSmaller: smaller,
    readingComfortReset: reset,
    readingComfortLarger: larger,
    readingComfortValue: value,
    readingComfortFailed: failed,
  } = document.body.dataset
  if (!title || !smaller || !reset || !larger || !value || !failed) return undefined
  return { title, smaller, reset, larger, value, failed }
}

function createReadingComfortButton(className, text, label) {
  const button = document.createElement("button")
  button.type = "button"
  button.className = className
  button.textContent = text
  button.title = label
  button.setAttribute("aria-label", label)
  return button
}

let cleanupCurrentReadingComfort = () => {}
const cleanupReadingComfort = () => {
  const cleanup = cleanupCurrentReadingComfort
  cleanupCurrentReadingComfort = () => {}
  cleanup()
}

function initializeReadingComfort() {
  cleanupReadingComfort()
  const titleElement = document.querySelector("h1.article-title")
  const anchor = document.querySelector(".content-meta") ?? titleElement
  const labels = getReadingComfortLabels()
  if (anchor === null || titleElement === null || labels === undefined) return

  const existingRoot = document.querySelector("[data-read-later-root]")
  const root = existingRoot ?? document.createElement("div")
  const ownsRoot = existingRoot === null
  if (ownsRoot) {
    root.className = "reading-comfort"
    anchor.insertAdjacentElement("afterend", root)
  }
  root.classList.add("reading-comfort-host")

  const trigger = createReadingComfortButton("reading-comfort-trigger", "Aa", labels.title)
  trigger.setAttribute("aria-controls", "reading-comfort-panel")
  trigger.setAttribute("aria-expanded", "false")

  const panel = document.createElement("section")
  panel.id = "reading-comfort-panel"
  panel.className = "reading-comfort-panel"
  panel.setAttribute("aria-label", labels.title)
  panel.hidden = true

  const value = document.createElement("span")
  value.className = "reading-comfort-value"
  value.setAttribute("aria-live", "polite")
  const controls = document.createElement("div")
  controls.className = "reading-comfort-controls"
  const smaller = createReadingComfortButton("reading-comfort-smaller", "A-", labels.smaller)
  const reset = createReadingComfortButton("reading-comfort-reset", "100%", labels.reset)
  const larger = createReadingComfortButton("reading-comfort-larger", "A+", labels.larger)
  controls.append(smaller, reset, larger)
  const status = document.createElement("span")
  status.className = "reading-comfort-status"
  status.setAttribute("aria-live", "polite")
  panel.append(value, controls, status)
  root.prepend(trigger)
  root.append(panel)

  let current = parseReadingComfortLevel(document.documentElement.dataset.readingComfort ?? null)
  const closePanel = (restoreFocus) => {
    panel.hidden = true
    trigger.setAttribute("aria-expanded", "false")
    if (restoreFocus) trigger.focus()
  }
  const closeReadLaterPanel = () => {
    const siblingPanel = root.querySelector(".read-later-panel")
    const siblingTrigger = root.querySelector(".read-later-trigger")
    if (siblingPanel instanceof HTMLElement) siblingPanel.hidden = true
    if (siblingTrigger instanceof HTMLElement) siblingTrigger.setAttribute("aria-expanded", "false")
  }
  const render = () => {
    document.documentElement.dataset.readingComfort = String(current)
    value.textContent = labels.value.replace("{percent}", String(current))
    trigger.dataset.level = String(current)
    trigger.title = value.textContent
    trigger.setAttribute("aria-label", value.textContent)
    smaller.disabled = current === READING_COMFORT_LEVELS[0]
    larger.disabled = current === READING_COMFORT_LEVELS[READING_COMFORT_LEVELS.length - 1]
    reset.disabled = current === READING_COMFORT_DEFAULT
  }
  const persist = () => {
    status.textContent = ""
    try {
      localStorage.setItem(READING_COMFORT_KEY, String(current))
    } catch {
      status.textContent = labels.failed
    }
    render()
  }
  const adjust = (direction) => {
    current = stepReadingComfortLevel(current, direction)
    persist()
  }

  trigger.addEventListener("click", () => {
    const opening = panel.hidden
    if (opening) closeReadLaterPanel()
    panel.hidden = !opening
    trigger.setAttribute("aria-expanded", String(opening))
    if (opening) (smaller.disabled ? larger : smaller).focus()
  })
  smaller.addEventListener("click", () => adjust(-1))
  reset.addEventListener("click", () => {
    current = READING_COMFORT_DEFAULT
    persist()
  })
  larger.addEventListener("click", () => adjust(1))
  const dismissOutside = (event) => {
    if (event.target instanceof Node && !panel.contains(event.target) && event.target !== trigger) {
      closePanel(false)
    }
  }
  const dismissWithKeyboard = (event) => {
    if (event.key === "Escape" && !panel.hidden) closePanel(true)
  }
  const dismissForSibling = (event) => {
    if (event.target instanceof Node && event.target.closest?.(".read-later-trigger")) {
      closePanel(false)
    }
  }
  const syncStoredLevel = (event) => {
    if (event.key !== null && event.key !== READING_COMFORT_KEY) return
    current = parseReadingComfortLevel(event.newValue)
    status.textContent = ""
    render()
  }
  document.addEventListener("pointerdown", dismissOutside)
  document.addEventListener("keydown", dismissWithKeyboard)
  document.addEventListener("click", dismissForSibling)
  window.addEventListener("storage", syncStoredLevel)
  render()

  cleanupCurrentReadingComfort = () => {
    document.removeEventListener("pointerdown", dismissOutside)
    document.removeEventListener("keydown", dismissWithKeyboard)
    document.removeEventListener("click", dismissForSibling)
    window.removeEventListener("storage", syncStoredLevel)
    trigger.remove()
    panel.remove()
    root.classList.remove("reading-comfort-host")
    if (ownsRoot) root.remove()
  }
  window.addCleanup(cleanupReadingComfort)
}

document.addEventListener("nav", initializeReadingComfort)
document.addEventListener("render", initializeReadingComfort)
`
