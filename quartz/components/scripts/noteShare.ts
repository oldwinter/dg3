export type NoteShareOutcome = "shared" | "copied" | "cancelled" | "failed"

export type NoteSharePlatform = {
  readonly share?: (data: ShareData) => Promise<void>
  readonly copy: (text: string) => Promise<void>
}

export type NoteShareData = {
  readonly title: string
  readonly url: string
}

export type MarkdownLinkCopyOutcome = "copied" | "failed"

export function formatMarkdownNoteLink(data: NoteShareData): string {
  const title = data.title
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\\/g, "\\\\")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
  const url = data.url.replace(/\\/g, "%5C").replace(/>/g, "%3E")
  return `[${title}](<${url}>)`
}

export async function copyMarkdownNoteLink(
  copy: (text: string) => Promise<void>,
  data: NoteShareData,
): Promise<MarkdownLinkCopyOutcome> {
  try {
    await copy(formatMarkdownNoteLink(data))
    return "copied"
  } catch (error) {
    if (error instanceof DOMException || error instanceof TypeError) return "failed"
    throw error
  }
}

export async function shareNote(
  platform: NoteSharePlatform,
  data: NoteShareData,
): Promise<NoteShareOutcome> {
  if (platform.share) {
    try {
      await platform.share(data)
      return "shared"
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return "cancelled"
      if (!(error instanceof DOMException || error instanceof TypeError)) throw error
    }
  }

  try {
    await platform.copy(data.url)
    return "copied"
  } catch (error) {
    if (error instanceof DOMException || error instanceof TypeError) return "failed"
    throw error
  }
}

export const noteShareScript = `
const shareNote = ${shareNote.toString()}
const formatMarkdownNoteLink = ${formatMarkdownNoteLink.toString()}
const copyMarkdownNoteLink = ${copyMarkdownNoteLink.toString()}

function createNoteShareIcon(pathData, className) {
  const namespace = "http://www.w3.org/2000/svg"
  const icon = document.createElementNS(namespace, "svg")
  icon.classList.add("note-share-icon", className)
  icon.setAttribute("viewBox", "0 0 24 24")
  icon.setAttribute("aria-hidden", "true")
  const path = document.createElementNS(namespace, "path")
  path.setAttribute("d", pathData)
  icon.append(path)
  return icon
}

function getNoteShareLabels() {
  const {
    noteShareTitle: title,
    noteShareShared: shared,
    noteShareCopied: copied,
    noteShareFailed: failed,
    noteShareCopyMarkdown: copyMarkdown,
    noteShareMarkdownCopied: markdownCopied,
    noteShareMarkdownFailed: markdownFailed,
  } = document.body.dataset
  if (
    !title ||
    !shared ||
    !copied ||
    !failed ||
    !copyMarkdown ||
    !markdownCopied ||
    !markdownFailed
  ) {
    return undefined
  }
  return { title, shared, copied, failed, copyMarkdown, markdownCopied, markdownFailed }
}

function createNoteShareButton(label, action, iconPath) {
  const button = document.createElement("button")
  button.type = "button"
  button.className = "note-share-trigger"
  button.dataset.action = action
  button.title = label
  button.setAttribute("aria-label", label)
  button.append(
    createNoteShareIcon(iconPath, "note-share-icon-default"),
    createNoteShareIcon("m5 12 4 4L19 6", "note-share-icon-success"),
  )
  return button
}

function createNoteShareFeedback(button, status, defaultLabel) {
  let resetTimer = 0
  const reset = () => {
    window.clearTimeout(resetTimer)
    delete button.dataset.state
    button.title = defaultLabel
    button.setAttribute("aria-label", defaultLabel)
    status.textContent = ""
  }
  const showSuccess = (message) => {
    reset()
    button.dataset.state = "success"
    button.title = message
    button.setAttribute("aria-label", message)
    status.textContent = message
    resetTimer = window.setTimeout(reset, 1800)
  }
  const showFailure = (message) => {
    reset()
    status.textContent = message
  }
  const cleanup = () => window.clearTimeout(resetTimer)
  return { reset, showSuccess, showFailure, cleanup }
}

let cleanupCurrentNoteShare = () => {}
const cleanupNoteShare = () => {
  const cleanup = cleanupCurrentNoteShare
  cleanupCurrentNoteShare = () => {}
  cleanup()
}

function initializeNoteShare() {
  cleanupNoteShare()
  const titleElement = document.querySelector("h1.article-title")
  const anchor = document.querySelector(".content-meta") ?? titleElement
  const title = titleElement?.textContent?.trim()
  const labels = getNoteShareLabels()
  if (anchor === null || !title || labels === undefined) return

  const existingRoot = document.querySelector("[data-read-later-root]")
  const root = existingRoot ?? document.createElement("div")
  const ownsRoot = existingRoot === null
  root.classList.add("reader-actions")
  if (ownsRoot) {
    root.classList.add("note-share-only")
    anchor.insertAdjacentElement("afterend", root)
  }

  const shareButton = createNoteShareButton(
    labels.title,
    "share",
    "M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 16V3m0 0L7.5 7.5M12 3l4.5 4.5",
  )
  const markdownButton = createNoteShareButton(
    labels.copyMarkdown,
    "markdown",
    "M8 8h11v11H8zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1",
  )
  const createStatus = () => {
    const status = document.createElement("span")
    status.className = "note-share-status"
    status.setAttribute("aria-live", "polite")
    return status
  }
  const shareStatus = createStatus()
  const markdownStatus = createStatus()
  const shareFeedback = createNoteShareFeedback(shareButton, shareStatus, labels.title)
  const markdownFeedback = createNoteShareFeedback(
    markdownButton,
    markdownStatus,
    labels.copyMarkdown,
  )
  const url = new URL(location.href)
  url.hash = ""
  const note = { title, url: url.href }
  root.prepend(shareButton, markdownButton)
  root.append(shareStatus, markdownStatus)

  const executeShare = async () => {
    shareFeedback.reset()
    shareButton.disabled = true
    const copy = (text) => navigator.clipboard.writeText(text)
    const platform =
      typeof navigator.share === "function"
        ? { share: (data) => navigator.share(data), copy }
        : { copy }
    let outcome
    try {
      outcome = await shareNote(platform, note)
    } catch (error) {
      if (!(error instanceof Error)) throw error
      outcome = "failed"
    } finally {
      shareButton.disabled = false
    }

    switch (outcome) {
      case "shared":
        shareFeedback.showSuccess(labels.shared)
        break
      case "copied":
        shareFeedback.showSuccess(labels.copied)
        break
      case "cancelled":
        shareFeedback.reset()
        break
      case "failed":
        shareFeedback.showFailure(labels.failed)
        break
    }
  }
  const executeMarkdownCopy = async () => {
    markdownFeedback.reset()
    const shouldRestoreFocus = document.activeElement === markdownButton
    markdownButton.disabled = true
    let outcome
    try {
      outcome = await copyMarkdownNoteLink((text) => navigator.clipboard.writeText(text), note)
    } catch (error) {
      if (!(error instanceof Error)) throw error
      outcome = "failed"
    } finally {
      markdownButton.disabled = false
      if (shouldRestoreFocus && markdownButton.isConnected) {
        markdownButton.focus({ preventScroll: true })
      }
    }

    if (outcome === "copied") markdownFeedback.showSuccess(labels.markdownCopied)
    else markdownFeedback.showFailure(labels.markdownFailed)
  }
  const handleShareClick = () => {
    void executeShare()
  }
  const handleMarkdownClick = () => {
    void executeMarkdownCopy()
  }
  shareButton.addEventListener("click", handleShareClick)
  markdownButton.addEventListener("click", handleMarkdownClick)
  cleanupCurrentNoteShare = () => {
    shareFeedback.cleanup()
    markdownFeedback.cleanup()
    shareButton.removeEventListener("click", handleShareClick)
    markdownButton.removeEventListener("click", handleMarkdownClick)
    shareButton.remove()
    markdownButton.remove()
    shareStatus.remove()
    markdownStatus.remove()
    if (ownsRoot) root.remove()
    else root.classList.remove("reader-actions")
  }
  window.addCleanup(cleanupNoteShare)
}

document.addEventListener("nav", initializeNoteShare)
document.addEventListener("render", initializeNoteShare)
`
