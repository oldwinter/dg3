export type WideContentScrollState = {
  readonly overflowing: boolean
  readonly before: boolean
  readonly after: boolean
}

export function wideContentScrollState(
  scrollLeft: number,
  clientWidth: number,
  scrollWidth: number,
  direction: "ltr" | "rtl" = "ltr",
): WideContentScrollState {
  const maximum = Math.max(0, scrollWidth - clientWidth)
  const travelled = Math.min(
    maximum,
    Math.max(0, direction === "rtl" ? Math.abs(scrollLeft) : scrollLeft),
  )
  const overflowing = maximum > 1

  return {
    overflowing,
    before: overflowing && travelled > 1,
    after: overflowing && travelled < maximum - 1,
  }
}

export type WideContentLabels = {
  readonly table: string
  readonly code: string
}

export function wideContentLabels(dataset: DOMStringMap): WideContentLabels | undefined {
  const { wideContentTable: table, wideContentCode: code } = dataset
  if (!table || !code) return undefined
  return { table, code }
}

export const wideContentScrollScript = `
const wideContentScrollState = ${wideContentScrollState.toString()}
const wideContentLabels = ${wideContentLabels.toString()}

let cleanupCurrentWideContentScroll = () => {}
const cleanupWideContentScroll = () => {
  const cleanup = cleanupCurrentWideContentScroll
  cleanupCurrentWideContentScroll = () => {}
  cleanup()
}

function initializeWideContentScroll() {
  cleanupWideContentScroll()
  const labels = wideContentLabels(document.body.dataset)
  if (labels === undefined) return

  const targets = Array.from(
    document.querySelectorAll(".table-container, article pre > code:not(.mermaid)"),
  ).filter((target) => target instanceof HTMLElement)
  if (targets.length === 0) return

  const cleanups = []
  const updates = []
  const resizeObserver =
    typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(() => updateAll())

  const updateAll = () => {
    for (const update of updates) update()
  }

  for (const target of targets) {
    const originalTabIndex = target.getAttribute("tabindex")
    const originalLabel = target.getAttribute("aria-label")
    const hadClass = target.classList.contains("wide-content-scroll")
    const label = target.matches(".table-container")
      ? labels.table
      : labels.code

    const restoreAccessibility = () => {
      if (originalTabIndex === null) target.removeAttribute("tabindex")
      else target.setAttribute("tabindex", originalTabIndex)
      if (originalLabel === null) target.removeAttribute("aria-label")
      else target.setAttribute("aria-label", originalLabel)
    }
    const update = () => {
      const direction = getComputedStyle(target).direction === "rtl" ? "rtl" : "ltr"
      const state = wideContentScrollState(
        target.scrollLeft,
        target.clientWidth,
        target.scrollWidth,
        direction,
      )

      target.classList.toggle("wide-content-scroll", state.overflowing || hadClass)
      target.toggleAttribute("data-scroll-before", state.before)
      target.toggleAttribute("data-scroll-after", state.after)
      if (state.overflowing) {
        if (originalTabIndex === null) target.tabIndex = 0
        if (originalLabel === null) target.setAttribute("aria-label", label)
      } else {
        restoreAccessibility()
      }
    }

    updates.push(update)
    target.addEventListener("scroll", update, { passive: true })
    resizeObserver?.observe(target)
    if (target.firstElementChild) resizeObserver?.observe(target.firstElementChild)
    update()

    cleanups.push(() => {
      target.removeEventListener("scroll", update)
      target.removeAttribute("data-scroll-before")
      target.removeAttribute("data-scroll-after")
      if (!hadClass) target.classList.remove("wide-content-scroll")
      restoreAccessibility()
    })
  }

  window.addEventListener("resize", updateAll)
  cleanupCurrentWideContentScroll = () => {
    resizeObserver?.disconnect()
    window.removeEventListener("resize", updateAll)
    for (const cleanup of cleanups) cleanup()
  }
  window.addCleanup(cleanupWideContentScroll)
}

document.addEventListener("nav", initializeWideContentScroll)
document.addEventListener("render", initializeWideContentScroll)
`
