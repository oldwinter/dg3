import { headingPermalink, headingPermalinkLabels } from "./headingPermalink"

function registerHeadingPermalinks() {
  const anchors = document.querySelectorAll<HTMLAnchorElement>(
    'article :is(h1, h2, h3, h4, h5, h6):not(.sr-only)[id] > a[href^="#"]',
  )
  const resetTimers = new Map<HTMLAnchorElement, number>()
  const { defaultLabel, copiedTitle, copiedLabel } = headingPermalinkLabels(
    document.documentElement.lang,
  )

  for (const anchor of anchors) {
    anchor.title = defaultLabel
    anchor.setAttribute("aria-label", defaultLabel)
    anchor.removeAttribute("aria-hidden")
    anchor.tabIndex = 0

    const copyPermalink = async () => {
      if (!navigator.clipboard) return

      const permalink = headingPermalink(new URL(window.location.href), anchor.hash)
      try {
        await navigator.clipboard.writeText(permalink.href)
      } catch (error) {
        if (error instanceof DOMException) return
        throw error
      }

      const previousTimer = resetTimers.get(anchor)
      if (previousTimer !== undefined) window.clearTimeout(previousTimer)

      anchor.dataset.copied = ""
      anchor.title = copiedTitle
      anchor.setAttribute("aria-label", copiedLabel)

      const resetTimer = window.setTimeout(() => {
        delete anchor.dataset.copied
        anchor.title = defaultLabel
        anchor.setAttribute("aria-label", defaultLabel)
        resetTimers.delete(anchor)
      }, 1600)
      resetTimers.set(anchor, resetTimer)
    }

    anchor.addEventListener("click", copyPermalink)
    window.addCleanup(() => {
      anchor.removeEventListener("click", copyPermalink)
      const resetTimer = resetTimers.get(anchor)
      if (resetTimer !== undefined) window.clearTimeout(resetTimer)
    })
  }
}

document.addEventListener("nav", registerHeadingPermalinks)

export default ""
