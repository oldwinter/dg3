export function calculateReadingProgress(
  scrollY: number,
  scrollHeight: number,
  viewportHeight: number,
): number {
  const scrollableHeight = scrollHeight - viewportHeight
  if (scrollableHeight <= 0) return 100

  return Math.min(100, Math.max(0, (scrollY / scrollableHeight) * 100))
}

export const readingProgressScript = `
const calculateReadingProgress = ${calculateReadingProgress.toString()}

document.addEventListener("nav", () => {
  const progress = document.querySelector(".reading-progress")
  if (progress === null) return

  let animationFrame
  const updateProgress = () => {
    animationFrame = undefined
    const scrollHeight = document.documentElement.scrollHeight
    progress.hidden = scrollHeight <= window.innerHeight
    progress.value = calculateReadingProgress(window.scrollY, scrollHeight, window.innerHeight)
  }
  const scheduleUpdate = () => {
    if (animationFrame !== undefined) return
    animationFrame = window.requestAnimationFrame(updateProgress)
  }

  updateProgress()
  const resizeObserver = new ResizeObserver(scheduleUpdate)
  resizeObserver.observe(document.body)
  window.addEventListener("scroll", scheduleUpdate, { passive: true })
  window.addEventListener("resize", scheduleUpdate)
  window.addCleanup(() => {
    if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
    resizeObserver.disconnect()
    window.removeEventListener("scroll", scheduleUpdate)
    window.removeEventListener("resize", scheduleUpdate)
  })
})
`
