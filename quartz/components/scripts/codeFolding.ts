export const CODE_FOLDING_MIN_LINES = 24

export function codeFoldingLineCount(source: string, renderedLineCount = 0): number {
  if (Number.isInteger(renderedLineCount) && renderedLineCount > 0) return renderedLineCount

  const normalized = source.replace(/\r\n?/g, "\n").replace(/\n$/, "")
  return normalized === "" ? 0 : normalized.split("\n").length
}

export function shouldFoldCodeBlock(source: string, renderedLineCount = 0): boolean {
  return codeFoldingLineCount(source, renderedLineCount) > CODE_FOLDING_MIN_LINES
}

export type CodeFoldingLabels = {
  readonly expand: string
  readonly collapse: string
}

export function codeFoldingLabels(dataset: DOMStringMap): CodeFoldingLabels | undefined {
  const { codeFoldingExpand: expand, codeFoldingCollapse: collapse } = dataset
  if (!expand || !collapse) return undefined
  return { expand, collapse }
}

export const codeFoldingScript = `
const codeFoldingLineCount = ${codeFoldingLineCount.toString()}
const shouldFoldCodeBlock = ${shouldFoldCodeBlock.toString()}
const codeFoldingLabels = ${codeFoldingLabels.toString()}
const CODE_FOLDING_MIN_LINES = ${CODE_FOLDING_MIN_LINES}

function createCodeFoldingIcon(expanded) {
  const namespace = "http://www.w3.org/2000/svg"
  const icon = document.createElementNS(namespace, "svg")
  icon.classList.add("code-folding-icon")
  icon.setAttribute("viewBox", "0 0 24 24")
  icon.setAttribute("fill", "none")
  icon.setAttribute("stroke", "currentColor")
  icon.setAttribute("stroke-width", "2")
  icon.setAttribute("stroke-linecap", "round")
  icon.setAttribute("stroke-linejoin", "round")
  icon.setAttribute("aria-hidden", "true")
  const path = document.createElementNS(namespace, "path")
  path.setAttribute("d", expanded ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6")
  icon.append(path)
  return icon
}

let cleanupCurrentCodeFolding = () => {}
const cleanupCodeFolding = () => {
  const cleanup = cleanupCurrentCodeFolding
  cleanupCurrentCodeFolding = () => {}
  cleanup()
}

function initializeCodeFolding() {
  cleanupCodeFolding()
  const labels = codeFoldingLabels(document.body.dataset)
  if (labels === undefined) return

  const codeBlocks = Array.from(
    document.querySelectorAll(
      "article figure[data-rehype-pretty-code-figure] > pre > code:not(.mermaid)",
    ),
  ).filter((code) => code instanceof HTMLElement)
  const cleanups = []

  for (let index = 0; index < codeBlocks.length; index += 1) {
    const code = codeBlocks[index]
    const pre = code.parentElement
    if (pre === null || pre.tagName !== "PRE") continue

    const renderedLineCount = code.querySelectorAll("[data-line]").length
    if (!shouldFoldCodeBlock(code.textContent ?? "", renderedLineCount)) continue

    const originalId = pre.getAttribute("id")
    const hadBlockClass = pre.classList.contains("code-folding-block")
    const hadCollapsedClass = pre.classList.contains("code-folding-collapsed")
    if (pre.id === "") {
      let suffix = index + 1
      let candidate = "code-folding-" + suffix
      while (document.getElementById(candidate) !== null) {
        suffix += 1
        candidate = "code-folding-" + suffix
      }
      pre.id = candidate
    }

    const button = document.createElement("button")
    button.type = "button"
    button.className = "code-folding-trigger"
    button.setAttribute("aria-controls", pre.id)
    pre.classList.add("code-folding-block")

    let expanded = false
    const renderState = () => {
      const label = expanded ? labels.collapse : labels.expand
      pre.classList.toggle("code-folding-collapsed", !expanded)
      button.setAttribute("aria-expanded", String(expanded))
      button.setAttribute("aria-label", label)
      button.title = label
      button.replaceChildren(createCodeFoldingIcon(expanded))
    }
    const toggle = () => {
      expanded = !expanded
      renderState()
    }

    button.addEventListener("click", toggle)
    pre.prepend(button)
    renderState()

    cleanups.push(() => {
      button.removeEventListener("click", toggle)
      button.remove()
      pre.classList.toggle("code-folding-block", hadBlockClass)
      pre.classList.toggle("code-folding-collapsed", hadCollapsedClass)
      if (originalId === null) pre.removeAttribute("id")
      else pre.setAttribute("id", originalId)
    })
  }

  cleanupCurrentCodeFolding = () => {
    for (const cleanup of cleanups) cleanup()
  }
  window.addCleanup(cleanupCodeFolding)
}

document.addEventListener("nav", initializeCodeFolding)
document.addEventListener("render", initializeCodeFolding)
`
