type WanderIndex = Readonly<Record<string, Readonly<{ content: string }>>>

export function isSafeRandomWanderSlug(slug: string): boolean {
  if (slug.length === 0 || slug.startsWith("/") || slug.includes("\\")) return false
  return slug.split("/").every((segment) => segment !== "." && segment !== "..")
}

export function pickRandomWanderSlug(
  index: WanderIndex,
  currentSlug: string,
  random: number,
): string | undefined {
  const eligibleSlugs = Object.entries(index)
    .filter(
      ([slug, item]) =>
        slug !== "404" &&
        slug !== "index" &&
        slug !== currentSlug &&
        isSafeRandomWanderSlug(slug) &&
        item.content.trim().length > 0,
    )
    .map(([slug]) => slug)

  return eligibleSlugs[Math.floor(random * eligibleSlugs.length)]
}

export function randomWanderHref(basePath: string, slug: string): string | undefined {
  if (!isSafeRandomWanderSlug(slug)) return undefined
  return `${basePath}/${slug}`
}

export const randomWanderScript = `
const isSafeRandomWanderSlug = ${isSafeRandomWanderSlug.toString()}
const pickRandomWanderSlug = ${pickRandomWanderSlug.toString()}
const randomWanderHref = ${randomWanderHref.toString()}

function createRandomWanderIcon() {
  const namespace = "http://www.w3.org/2000/svg"
  const icon = document.createElementNS(namespace, "svg")
  icon.classList.add("random-wander-icon")
  icon.setAttribute("viewBox", "0 0 24 24")
  icon.setAttribute("aria-hidden", "true")
  for (const d of [
    "m18 14 4 4-4 4",
    "m18 2 4 4-4 4",
    "M2 18h1.4c1.2 0 2.3-.6 3-1.6L9.6 11c.7-1 1.8-1.6 3-1.6H22",
    "M2 6h1.9c1 0 2 .4 2.7 1.2l9.6 10.3c.7.8 1.7 1.2 2.7 1.2H22",
  ]) {
    const path = document.createElementNS(namespace, "path")
    path.setAttribute("d", d)
    icon.append(path)
  }
  return icon
}

let cleanupCurrentRandomWander = () => {}
const cleanupRandomWander = () => {
  const cleanup = cleanupCurrentRandomWander
  cleanupCurrentRandomWander = () => {}
  cleanup()
}

function initializeRandomWander() {
  cleanupRandomWander()
  const title = document.querySelector("h1.article-title")
  const anchor = document.querySelector(".content-meta") ?? title
  const currentSlug = document.body.dataset.slug
  const label = document.body.dataset.randomWanderLabel
  if (
    title === null ||
    anchor === null ||
    !currentSlug ||
    !label ||
    typeof fetchData === "undefined"
  ) {
    return
  }

  let active = true
  cleanupCurrentRandomWander = () => {
    active = false
  }
  window.addCleanup(cleanupRandomWander)

  fetchData.then(
    (index) => {
      if (!active) return
      const slug = pickRandomWanderSlug(index, currentSlug, Math.random())
      if (slug === undefined) return
      const href = randomWanderHref(document.body.dataset.basepath ?? "", slug)
      if (href === undefined) return

      const link = document.createElement("a")
      link.className = "random-wander-link internal"
      link.href = href
      link.title = label
      link.setAttribute("aria-label", label)
      link.dataset.noPopover = ""
      link.append(createRandomWanderIcon())

      const readLater = document.querySelector("[data-read-later-root]")
      let fallbackRoot
      if (readLater === null) {
        fallbackRoot = document.createElement("div")
        fallbackRoot.className = "random-wander"
        fallbackRoot.append(link)
        anchor.insertAdjacentElement("afterend", fallbackRoot)
      } else {
        readLater.prepend(link)
      }

      cleanupCurrentRandomWander = () => {
        active = false
        link.remove()
        fallbackRoot?.remove()
      }
    },
    () => {
      active = false
    },
  )
}

document.addEventListener("nav", initializeRandomWander)
document.addEventListener("render", initializeRandomWander)
`
