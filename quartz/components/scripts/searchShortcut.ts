/** Returns true when a keyboard event should trigger the search shortcut. */
export function shouldHandleSearchShortcut(event: {
  key: string
  metaKey?: boolean
  ctrlKey?: boolean
  altKey?: boolean
  shiftKey?: boolean
  target?: unknown
}): boolean {
  if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return false
  if (event.key !== "/") return false
  const target = event.target as HTMLElement | null
  if (!target) return true
  const tag = target.tagName?.toLowerCase()
  return tag !== "input" && tag !== "textarea" && tag !== "select" && !target.isContentEditable
}

export const searchShortcutScript = `
function isEditableSearchShortcutTarget(target) {
  if (!target) return false
  const element = target instanceof HTMLElement ? target : null
  if (!element) return false
  const tag = element.tagName.toLowerCase()
  return tag === "input" || tag === "textarea" || tag === "select" || element.isContentEditable
}

let cleanupSearchShortcut = () => {}

function bindSearchShortcut() {
  cleanupSearchShortcut()
  const handleKeydown = (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
    const searchInput = document.querySelector('.search input, input[type="search"]')
    if (!searchInput) return

    if (event.key === "/" && !isEditableSearchShortcutTarget(event.target)) {
      event.preventDefault()
      searchInput.focus()
    } else if (event.key === "Escape" && document.activeElement === searchInput) {
      searchInput.blur()
    }
  }

  document.addEventListener("keydown", handleKeydown)
  cleanupSearchShortcut = () => document.removeEventListener("keydown", handleKeydown)
  window.addCleanup?.(() => cleanupSearchShortcut())
}

document.addEventListener("nav", bindSearchShortcut)
bindSearchShortcut()
`
