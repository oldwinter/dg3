export type MobileOutlineHeading = Readonly<{
  id: string
  textContent: string | null
  tagName: string
  sourceIndex: number
}>

export type MobileOutlineItem = Readonly<{
  id: string
  label: string
  level: 2 | 3
  sourceIndex: number
}>

export function getMobileOutlineItems(
  headings: readonly MobileOutlineHeading[],
): MobileOutlineItem[] {
  const seenIds = new Set<string>()
  const items: MobileOutlineItem[] = []

  for (const heading of headings) {
    const id = heading.id.trim()
    const label = heading.textContent?.replace(/\s+/g, " ").trim() ?? ""
    const level = heading.tagName.toUpperCase() === "H3" ? 3 : 2
    if (!id || !label || seenIds.has(id)) continue

    seenIds.add(id)
    items.push({ id, label, level, sourceIndex: heading.sourceIndex })
  }

  return items
}

export function findActiveMobileOutlineIndex(
  headingTops: readonly number[],
  offset: number,
): number {
  let activeIndex = -1
  for (let index = 0; index < headingTops.length; index++) {
    if (headingTops[index] > offset) break
    activeIndex = index
  }
  return activeIndex
}

export const mobileOutlineScript = `
const getMobileOutlineItems = ${getMobileOutlineItems.toString()}
const findActiveMobileOutlineIndex = ${findActiveMobileOutlineIndex.toString()}

let cleanupCurrentMobileOutline = () => {}
const cleanupMobileOutline = () => {
  const cleanup = cleanupCurrentMobileOutline
  cleanupCurrentMobileOutline = () => {}
  cleanup()
}

function initializeMobileOutline() {
  cleanupMobileOutline()

  const root = document.querySelector("[data-mobile-outline]")
  const trigger = root?.querySelector("[data-mobile-outline-trigger]")
  const dialog = root?.querySelector("[data-mobile-outline-dialog]")
  const closeButton = root?.querySelector("[data-mobile-outline-close]")
  const list = root?.querySelector("[data-mobile-outline-list]")
  const articleTitle = document.querySelector("h1.article-title")
  if (
    !(root instanceof HTMLElement) ||
    !(trigger instanceof HTMLButtonElement) ||
    !(dialog instanceof HTMLDialogElement) ||
    !(closeButton instanceof HTMLButtonElement) ||
    !(list instanceof HTMLOListElement) ||
    articleTitle === null ||
    typeof dialog.showModal !== "function"
  ) {
    return
  }

  const headingElements = Array.from(
    document.querySelectorAll(".center > article h2[id], .center > article h3[id]"),
  ).filter((heading) => heading.closest(".transclude") === null)
  const items = getMobileOutlineItems(
    headingElements.map((heading, sourceIndex) => ({
      id: heading.id,
      textContent: heading.textContent,
      tagName: heading.tagName,
      sourceIndex,
    })),
  )
  if (items.length < 2) return

  const activeHeadings = items.map((item) => headingElements[item.sourceIndex])
  const links = items.map((item) => {
    const listItem = document.createElement("li")
    const link = document.createElement("a")
    link.className = "mobile-outline__link"
    link.dataset.level = String(item.level)
    link.href = \`#\${encodeURIComponent(item.id)}\`
    link.textContent = item.label
    link.setAttribute("data-no-popover", "true")
    listItem.append(link)
    list.append(listItem)
    return link
  })
  root.hidden = false

  let restoreFocusOnClose = true
  const closeDialog = (restoreFocus) => {
    if (!dialog.open) return
    restoreFocusOnClose = restoreFocus
    dialog.close()
  }
  const updateCurrentSection = () => {
    const headingTops = activeHeadings.map((heading) => heading.getBoundingClientRect().top)
    const activeIndex = findActiveMobileOutlineIndex(
      headingTops,
      Math.min(128, window.innerHeight * 0.2),
    )
    links.forEach((link, index) => {
      if (index === activeIndex) link.setAttribute("aria-current", "location")
      else link.removeAttribute("aria-current")
    })
    return activeIndex
  }
  const openDialog = () => {
    if (dialog.open) return
    const activeIndex = updateCurrentSection()
    restoreFocusOnClose = true
    dialog.showModal()
    trigger.setAttribute("aria-expanded", "true")
    ;(links[activeIndex] ?? links[0]).focus()
  }
  const handleClose = () => {
    trigger.setAttribute("aria-expanded", "false")
    if (restoreFocusOnClose) trigger.focus()
    restoreFocusOnClose = true
  }
  const handleCancel = () => {
    restoreFocusOnClose = true
  }
  const closeFromButton = () => closeDialog(true)
  const dismissBackdrop = (event) => {
    if (event.target === dialog) closeDialog(true)
  }

  trigger.addEventListener("click", openDialog)
  closeButton.addEventListener("click", closeFromButton)
  dialog.addEventListener("close", handleClose)
  dialog.addEventListener("cancel", handleCancel)
  dialog.addEventListener("click", dismissBackdrop)
  links.forEach((link) => link.addEventListener("click", () => closeDialog(false)))

  cleanupCurrentMobileOutline = () => {
    trigger.removeEventListener("click", openDialog)
    closeButton.removeEventListener("click", closeFromButton)
    dialog.removeEventListener("close", handleClose)
    dialog.removeEventListener("cancel", handleCancel)
    dialog.removeEventListener("click", dismissBackdrop)
    if (dialog.open) dialog.close()
    trigger.setAttribute("aria-expanded", "false")
    list.replaceChildren()
    root.hidden = true
  }
  window.addCleanup(cleanupMobileOutline)
}

document.addEventListener("nav", initializeMobileOutline)
document.addEventListener("render", initializeMobileOutline)
`
