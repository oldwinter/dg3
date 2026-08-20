export type NoteShareOutcome = "shared" | "copied" | "cancelled" | "failed"

export type NoteSharePlatform = {
  readonly share?: (data: ShareData) => Promise<void>
  readonly copy: (text: string) => Promise<void>
}

export type NoteShareData = {
  readonly title: string
  readonly url: string
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
  } = document.body.dataset
  if (!title || !shared || !copied || !failed) return undefined
  return { title, shared, copied, failed }
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

  const button = document.createElement("button")
  button.type = "button"
  button.className = "note-share-trigger"
  button.title = labels.title
  button.setAttribute("aria-label", labels.title)
  button.append(
    createNoteShareIcon(
      "M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 16V3m0 0L7.5 7.5M12 3l4.5 4.5",
      "note-share-icon-default",
    ),
    createNoteShareIcon("m5 12 4 4L19 6", "note-share-icon-success"),
  )
  const status = document.createElement("span")
  status.className = "note-share-status"
  status.setAttribute("aria-live", "polite")
  root.prepend(button)
  root.append(status)

  let resetTimer = 0
  const resetButton = () => {
    delete button.dataset.state
    button.title = labels.title
    button.setAttribute("aria-label", labels.title)
    status.textContent = ""
  }
  const showSuccess = (message) => {
    window.clearTimeout(resetTimer)
    button.dataset.state = "success"
    button.title = message
    button.setAttribute("aria-label", message)
    status.textContent = message
    resetTimer = window.setTimeout(resetButton, 1800)
  }
  const executeShare = async () => {
    button.disabled = true
    const copy = (text) => navigator.clipboard.writeText(text)
    const platform =
      typeof navigator.share === "function"
        ? { share: (data) => navigator.share(data), copy }
        : { copy }
    const url = new URL(location.href)
    url.hash = ""
    let outcome
    try {
      outcome = await shareNote(platform, { title, url: url.href })
    } catch (error) {
      if (!(error instanceof Error)) throw error
      outcome = "failed"
    } finally {
      button.disabled = false
    }

    switch (outcome) {
      case "shared":
        showSuccess(labels.shared)
        break
      case "copied":
        showSuccess(labels.copied)
        break
      case "cancelled":
        resetButton()
        break
      case "failed":
        resetButton()
        status.textContent = labels.failed
        break
    }
  }
  const handleClick = () => {
    void executeShare()
  }
  button.addEventListener("click", handleClick)
  cleanupCurrentNoteShare = () => {
    window.clearTimeout(resetTimer)
    button.removeEventListener("click", handleClick)
    button.remove()
    status.remove()
    if (ownsRoot) root.remove()
    else root.classList.remove("reader-actions")
  }
  window.addCleanup(cleanupNoteShare)
}

document.addEventListener("nav", initializeNoteShare)
document.addEventListener("render", initializeNoteShare)
`
