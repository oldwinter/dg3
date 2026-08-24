import {
  RESUME_READING_LIMIT,
  RESUME_READING_MAX_AGE_MS,
  RESUME_READING_MAX_PROGRESS,
  RESUME_READING_MIN_PROGRESS,
  parseResumeReadingEntries,
  parseResumeReadingEntry,
  updateResumeReadingEntries,
} from "./resumeReadingStorage"

export function calculateResumeReadingProgress(
  scrollY: number,
  scrollHeight: number,
  viewportHeight: number,
): number {
  const scrollableHeight = scrollHeight - viewportHeight
  if (scrollableHeight <= 0) return 1

  return Math.min(1, Math.max(0, scrollY / scrollableHeight))
}

export function calculateResumeReadingTarget(
  progress: number,
  scrollHeight: number,
  viewportHeight: number,
): number {
  return Math.max(0, scrollHeight - viewportHeight) * Math.min(1, Math.max(0, progress))
}

export const resumeReadingScript = `
const RESUME_READING_KEY = "dg3.resumeReading.v1"
const RESUME_READING_LIMIT = ${RESUME_READING_LIMIT}
const RESUME_READING_MIN_PROGRESS = ${RESUME_READING_MIN_PROGRESS}
const RESUME_READING_MAX_PROGRESS = ${RESUME_READING_MAX_PROGRESS}
const RESUME_READING_MAX_AGE_MS = ${RESUME_READING_MAX_AGE_MS}
const parseResumeReadingEntry = ${parseResumeReadingEntry.toString()}
const parseResumeReadingEntries = ${parseResumeReadingEntries.toString()}
const updateResumeReadingEntries = ${updateResumeReadingEntries.toString()}
const calculateResumeReadingProgress = ${calculateResumeReadingProgress.toString()}
const calculateResumeReadingTarget = ${calculateResumeReadingTarget.toString()}

function readResumeReadingEntries() {
  try {
    return parseResumeReadingEntries(localStorage.getItem(RESUME_READING_KEY), Date.now())
  } catch (error) {
    if (error instanceof DOMException) return []
    throw error
  }
}

function writeResumeReadingEntries(entries) {
  try {
    if (entries.length === 0) {
      localStorage.removeItem(RESUME_READING_KEY)
    } else {
      localStorage.setItem(RESUME_READING_KEY, JSON.stringify(entries))
    }
    return true
  } catch (error) {
    if (error instanceof DOMException) return false
    throw error
  }
}

function getResumeReadingLabels() {
  const {
    resumeReadingContinue: continueFrom,
    resumeReadingDismiss: dismiss,
    resumeReadingRegion: region,
  } = document.body.dataset
  if (!continueFrom || !dismiss || !region || !continueFrom.includes("{percent}")) {
    return undefined
  }

  return { continueFrom, dismiss, region }
}

function focusWithoutScrolling(element) {
  const hadTabIndex = element.hasAttribute("tabindex")
  if (!hadTabIndex) element.setAttribute("tabindex", "-1")
  element.focus({ preventScroll: true })
  if (!hadTabIndex) {
    element.addEventListener("blur", () => element.removeAttribute("tabindex"), { once: true })
  }
}

let cleanupCurrentResumeReading = () => {}
const cleanupResumeReading = () => {
  const cleanup = cleanupCurrentResumeReading
  cleanupCurrentResumeReading = () => {}
  cleanup()
}

function initializeResumeReading() {
  cleanupResumeReading()

  const article = document.querySelector("article.popover-hint")
  const title = document.querySelector("h1.article-title")
  const anchor = document.querySelector("[data-read-later-root]") ?? document.querySelector(".content-meta")
  const labels = getResumeReadingLabels()
  const now = Date.now()
  const current = parseResumeReadingEntry({
    path: location.pathname,
    progress: RESUME_READING_MIN_PROGRESS,
    updatedAt: now,
  })
  if (article === null || title === null || anchor === null || labels === undefined || current === undefined) {
    return
  }

  const path = current.path
  let entries = readResumeReadingEntries()
  const stored = entries.find((entry) => entry.path === path)
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  const isLongPage = scrollableHeight >= window.innerHeight * 1.25
  const startsNearTop = window.scrollY < window.innerHeight * 0.25
  let prompt
  let saveTimer
  let restoreTimer
  let hasScrolled = false
  let hasUserScrollIntent = false
  let initialScrollY = window.scrollY

  const removePrompt = () => {
    prompt?.remove()
    prompt = undefined
  }

  const persistCurrentPosition = () => {
    saveTimer = undefined
    if (!hasScrolled) return

    const progress = calculateResumeReadingProgress(
      window.scrollY,
      document.documentElement.scrollHeight,
      window.innerHeight,
    )
    entries = updateResumeReadingEntries(entries, { path, progress, updatedAt: Date.now() })
    writeResumeReadingEntries(entries)
  }

  const scheduleSave = () => {
    if (!hasUserScrollIntent) return
    if (Math.abs(window.scrollY - initialScrollY) > 4) hasScrolled = true
    if (prompt !== undefined && window.scrollY >= window.innerHeight * 0.25) removePrompt()
    if (saveTimer !== undefined) window.clearTimeout(saveTimer)
    saveTimer = window.setTimeout(persistCurrentPosition, 600)
  }

  const markUserScrollIntent = () => {
    hasUserScrollIntent = true
  }
  const markKeyboardScrollIntent = (event) => {
    if (
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey &&
      ["ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "].includes(event.key)
    ) {
      markUserScrollIntent()
    }
  }
  const markScrollbarScrollIntent = (event) => {
    if (event.button === 0 && event.clientX >= document.documentElement.clientWidth) {
      markUserScrollIntent()
    }
  }

  const dismissPrompt = () => {
    entries = updateResumeReadingEntries(entries, { path, progress: 0, updatedAt: Date.now() })
    writeResumeReadingEntries(entries)
    focusWithoutScrolling(title)
    removePrompt()
  }

  if (stored !== undefined && isLongPage && startsNearTop && location.hash.length === 0) {
    const root = document.createElement("aside")
    root.className = "resume-reading"
    root.setAttribute("aria-label", labels.region)
    root.setAttribute("data-resume-reading-root", "")

    const continueButton = document.createElement("button")
    continueButton.type = "button"
    continueButton.className = "resume-reading-continue"
    continueButton.textContent = labels.continueFrom.replace(
      "{percent}",
      String(Math.round(stored.progress * 100)),
    )

    const dismissButton = document.createElement("button")
    dismissButton.type = "button"
    dismissButton.className = "resume-reading-dismiss"
    dismissButton.textContent = "\u00d7"
    dismissButton.title = labels.dismiss
    dismissButton.setAttribute("aria-label", labels.dismiss)

    continueButton.addEventListener("click", () => {
      focusWithoutScrolling(article)
      removePrompt()
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      hasUserScrollIntent = false
      hasScrolled = false
      initialScrollY = window.scrollY
      let restorePass = 0
      const restorePosition = () => {
        restoreTimer = undefined
        if (hasUserScrollIntent) return

        const target = calculateResumeReadingTarget(
          stored.progress,
          document.documentElement.scrollHeight,
          window.innerHeight,
        )
        const behavior = !reducedMotion && restorePass === 0 ? "smooth" : "auto"
        window.scrollTo({ top: target, behavior })
        restorePass += 1
        if (restorePass < 3) {
          restoreTimer = window.setTimeout(restorePosition, restorePass === 1 ? 240 : 600)
        }
      }
      restoreTimer = window.setTimeout(restorePosition, 120)
    })
    dismissButton.addEventListener("click", dismissPrompt)
    root.append(continueButton, dismissButton)
    anchor.insertAdjacentElement("afterend", root)
    prompt = root
  }

  const saveWhenHidden = () => {
    if (document.visibilityState === "hidden") persistCurrentPosition()
  }
  const cleanup = () => {
    window.removeEventListener("scroll", scheduleSave)
    window.removeEventListener("wheel", markUserScrollIntent)
    window.removeEventListener("touchmove", markUserScrollIntent)
    window.removeEventListener("keydown", markKeyboardScrollIntent)
    window.removeEventListener("pointerdown", markScrollbarScrollIntent)
    window.removeEventListener("pagehide", persistCurrentPosition)
    document.removeEventListener("visibilitychange", saveWhenHidden)
    if (saveTimer !== undefined) window.clearTimeout(saveTimer)
    if (restoreTimer !== undefined) window.clearTimeout(restoreTimer)
    persistCurrentPosition()
    removePrompt()
  }

  window.addEventListener("scroll", scheduleSave, { passive: true })
  window.addEventListener("wheel", markUserScrollIntent, { passive: true })
  window.addEventListener("touchmove", markUserScrollIntent, { passive: true })
  window.addEventListener("keydown", markKeyboardScrollIntent)
  window.addEventListener("pointerdown", markScrollbarScrollIntent)
  window.addEventListener("pagehide", persistCurrentPosition)
  document.addEventListener("visibilitychange", saveWhenHidden)
  cleanupCurrentResumeReading = cleanup
  window.addCleanup(cleanupResumeReading)
}

document.addEventListener("nav", initializeResumeReading)
document.addEventListener("render", initializeResumeReading)
`
