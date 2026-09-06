type LocalLinkWanderIndex = Readonly<Record<string, unknown>>

export function isPublishedLocalLinkWanderSlug(
  index: LocalLinkWanderIndex,
  slug: string | undefined,
): boolean {
  return (
    typeof slug === "string" && slug.length > 0 && Object.prototype.hasOwnProperty.call(index, slug)
  )
}

export function normalizeLocalLinkWanderHref(
  rawHref: string,
  currentHref: string,
  basePath: string,
): string | undefined {
  const href = rawHref.trim()
  if (href.length === 0 || href.startsWith("#") || href.includes("\\")) return undefined

  let current: URL
  let candidate: URL
  try {
    current = new URL(currentHref)
    candidate = new URL(href, current)
  } catch {
    return undefined
  }

  if (
    candidate.origin !== current.origin ||
    candidate.username.length > 0 ||
    candidate.password.length > 0 ||
    candidate.pathname === current.pathname
  ) {
    return undefined
  }

  const safePath = candidate.pathname.split("/").every((segment) => {
    const decodedSeparators = segment
      .replace(/%2e/gi, ".")
      .replace(/%2f/gi, "/")
      .replace(/%5c/gi, "\\")
    return (
      decodedSeparators !== "." &&
      decodedSeparators !== ".." &&
      !decodedSeparators.includes("/") &&
      !decodedSeparators.includes("\\")
    )
  })
  if (!safePath) return undefined

  const normalizedBasePath = basePath === "/" ? "" : basePath.replace(/\/$/, "")
  if (
    normalizedBasePath.length > 0 &&
    candidate.pathname !== normalizedBasePath &&
    !candidate.pathname.startsWith(`${normalizedBasePath}/`)
  ) {
    return undefined
  }

  return `${candidate.pathname}${candidate.search}${candidate.hash}`
}

export function pickLocalLinkWanderHref(
  rawHrefs: readonly string[],
  currentHref: string,
  basePath: string,
  random: number,
): string | undefined {
  if (!Number.isFinite(random)) return undefined
  const candidates = [
    ...new Set(
      rawHrefs
        .map((href) => normalizeLocalLinkWanderHref(href, currentHref, basePath))
        .filter((href): href is string => href !== undefined),
    ),
  ]
  if (candidates.length === 0) return undefined

  const position = Math.min(Math.max(random, 0), 1 - Number.EPSILON)
  return candidates[Math.floor(position * candidates.length)]
}

export const localLinkWanderScript = `
const isPublishedLocalLinkWanderSlug = ${isPublishedLocalLinkWanderSlug.toString()}
const normalizeLocalLinkWanderHref = ${normalizeLocalLinkWanderHref.toString()}
const pickLocalLinkWanderHref = ${pickLocalLinkWanderHref.toString()}

function createLocalLinkWanderIcon() {
  const namespace = "http://www.w3.org/2000/svg"
  const icon = document.createElementNS(namespace, "svg")
  icon.classList.add("local-link-wander-icon")
  icon.setAttribute("viewBox", "0 0 24 24")
  icon.setAttribute("aria-hidden", "true")
  for (const d of ["M3 6h3a4 4 0 0 1 4 4v4a4 4 0 0 0 4 4h7", "m18 15 3 3-3 3"]) {
    const path = document.createElementNS(namespace, "path")
    path.setAttribute("d", d)
    icon.append(path)
  }
  return icon
}

function collectLocalLinkWanderHrefs(article, index) {
  return [...article.querySelectorAll("a.internal[href]")]
    .filter(
      (link) =>
        !link.hasAttribute("download") &&
        link.getClientRects().length > 0 &&
        isPublishedLocalLinkWanderSlug(index, link.dataset.slug) &&
        link.closest(
          '.transclude, [data-footnote-ref], [data-footnote-backref], .footnotes, [aria-hidden="true"]',
        ) === null,
    )
    .map((link) => link.getAttribute("href"))
    .filter((href) => href !== null)
}

let cleanupCurrentLocalLinkWander = () => {}
const cleanupLocalLinkWander = () => {
  const cleanup = cleanupCurrentLocalLinkWander
  cleanupCurrentLocalLinkWander = () => {}
  cleanup()
}

function initializeLocalLinkWander() {
  cleanupLocalLinkWander()
  const title = document.querySelector("h1.article-title")
  const anchor = document.querySelector(".content-meta") ?? title
  const article = document.querySelector(".center > article.popover-hint")
  const label = document.body.dataset.localLinkWanderLabel
  if (
    title === null ||
    anchor === null ||
    article === null ||
    !label ||
    typeof fetchData === "undefined"
  ) {
    return
  }

  let active = true
  let link
  let ownedRoot
  cleanupCurrentLocalLinkWander = () => {
    active = false
    link?.remove()
    ownedRoot?.remove()
  }
  window.addCleanup(cleanupLocalLinkWander)

  fetchData.then(
    (index) => {
      if (!active) return
      const href = pickLocalLinkWanderHref(
        collectLocalLinkWanderHrefs(article, index),
        location.href,
        document.body.dataset.basepath ?? "",
        Math.random(),
      )
      if (href === undefined) return

      const existingRoot = document.querySelector("[data-read-later-root], .reader-actions")
      const root = existingRoot ?? document.createElement("div")
      root.classList.add("reader-actions")
      if (existingRoot === null) {
        ownedRoot = root
        root.classList.add("local-link-wander-only")
        anchor.insertAdjacentElement("afterend", root)
      }

      link = document.createElement("a")
      link.className = "local-link-wander-link internal"
      link.href = href
      link.title = label
      link.setAttribute("aria-label", label)
      link.dataset.noPopover = ""
      link.append(createLocalLinkWanderIcon())
      root.prepend(link)
    },
    () => {
      active = false
    },
  )
}

document.addEventListener("nav", initializeLocalLinkWander)
document.addEventListener("render", initializeLocalLinkWander)
`
