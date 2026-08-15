export const backToTopScript = `
let cleanupCurrentButton = () => {}

function bindBackToTop() {
  cleanupCurrentButton()

  const button = document.querySelector("[data-back-to-top]")
  if (button === null) return

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
  window.addEventListener("resize", updateVisibility)
  button.addEventListener("click", returnToTop)
  updateVisibility()

  cleanupCurrentButton = () => {
    window.removeEventListener("scroll", updateVisibility)
    window.removeEventListener("resize", updateVisibility)
    button.removeEventListener("click", returnToTop)
  }
}

document.addEventListener("nav", bindBackToTop)
`
