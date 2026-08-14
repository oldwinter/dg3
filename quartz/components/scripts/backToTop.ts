export const backToTopScript = `
let cleanupCurrentButton = () => {}

function getBackToTopButton() {
  const existingButton = document.querySelector("[data-back-to-top]")
  if (existingButton) return existingButton

  const label = document.documentElement.lang.toLowerCase().startsWith("zh")
    ? "返回顶部"
    : "Back to top"
  const button = document.createElement("button")
  button.className = "back-to-top"
  button.type = "button"
  button.disabled = true
  button.title = label
  button.setAttribute("aria-label", label)
  button.setAttribute("aria-hidden", "true")
  button.setAttribute("data-back-to-top", "")

  const arrow = document.createElement("span")
  arrow.textContent = "↑"
  arrow.setAttribute("aria-hidden", "true")
  button.append(arrow)
  document.body.append(button)

  return button
}

function bindBackToTop() {
  cleanupCurrentButton()

  const button = getBackToTopButton()

  const updateVisibility = () => {
    const isVisible = window.scrollY > window.innerHeight * 0.75
    button.toggleAttribute("data-visible", isVisible)
    button.disabled = !isVisible
    button.setAttribute("aria-hidden", String(!isVisible))
  }

  const returnToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })
  }

  window.addEventListener("scroll", updateVisibility, { passive: true })
  button.addEventListener("click", returnToTop)
  updateVisibility()

  cleanupCurrentButton = () => {
    window.removeEventListener("scroll", updateVisibility)
    button.removeEventListener("click", returnToTop)
  }
}

document.addEventListener("nav", bindBackToTop)
`
