export type TableMarkdownLabels = Readonly<{
  title: string
  copied: string
  failed: string
}>

export function normalizeMarkdownTableCell(value: string): string {
  return value.replace(/\s+/gu, " ").trim().replace(/\\/gu, "\\\\").replace(/\|/gu, "\\|")
}

export function tableRowsToMarkdown(
  rows: ReadonlyArray<ReadonlyArray<string>>,
): string | undefined {
  if (rows.length < 2) return
  let columnCount = 0
  for (const row of rows) columnCount = Math.max(columnCount, row.length)
  if (columnCount === 0) return

  const lines: string[] = []
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex]!
    const cells: string[] = []
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      cells.push(normalizeMarkdownTableCell(row[columnIndex] ?? ""))
    }
    lines.push(`| ${cells.join(" | ")} |`)
    if (rowIndex === 0) {
      lines.push(`| ${new Array<string>(columnCount).fill("---").join(" | ")} |`)
    }
  }

  return lines.join("\n")
}

export function tableElementToMarkdown(table: HTMLTableElement): string | undefined {
  const firstRow = table.rows.item(0)
  if (
    table.rows.length < 2 ||
    firstRow === null ||
    !Array.from(firstRow.cells).some((cell) => cell.tagName === "TH")
  ) {
    return
  }

  const rows: string[][] = []
  for (const row of Array.from(table.rows)) {
    const values: string[] = []
    for (const cell of Array.from(row.cells)) {
      if (cell.rowSpan > 1) return
      values.push(cell.textContent ?? "")
      for (let index = 1; index < cell.colSpan; index++) values.push("")
    }
    rows.push(values)
  }

  return tableRowsToMarkdown(rows)
}

export function tableMarkdownLabels(dataset: DOMStringMap): TableMarkdownLabels | undefined {
  const {
    tableMarkdownTitle: title,
    tableMarkdownCopied: copied,
    tableMarkdownFailed: failed,
  } = dataset
  if (!title || !copied || !failed) return

  return { title, copied, failed }
}

export const tableMarkdownScript = `
const normalizeMarkdownTableCell = ${normalizeMarkdownTableCell.toString()}
const tableRowsToMarkdown = ${tableRowsToMarkdown.toString()}
const tableElementToMarkdown = ${tableElementToMarkdown.toString()}
const tableMarkdownLabels = ${tableMarkdownLabels.toString()}

function createTableMarkdownIcon(kind) {
  const namespace = "http://www.w3.org/2000/svg"
  const icon = document.createElementNS(namespace, "svg")
  icon.classList.add("table-markdown-icon", \`table-markdown-icon-\${kind}\`)
  icon.setAttribute("viewBox", "0 0 24 24")
  icon.setAttribute("aria-hidden", "true")

  if (kind === "copied") {
    const path = document.createElementNS(namespace, "path")
    path.setAttribute("d", "m5 12 4 4L19 6")
    icon.append(path)
    return icon
  }

  const rect = document.createElementNS(namespace, "rect")
  rect.setAttribute("x", "9")
  rect.setAttribute("y", "9")
  rect.setAttribute("width", "12")
  rect.setAttribute("height", "12")
  rect.setAttribute("rx", "2")
  const path = document.createElementNS(namespace, "path")
  path.setAttribute("d", "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1")
  icon.append(rect, path)
  return icon
}

let cleanupCurrentTableMarkdown = () => {}
const cleanupTableMarkdown = () => {
  const cleanup = cleanupCurrentTableMarkdown
  cleanupCurrentTableMarkdown = () => {}
  cleanup()
}

function initializeTableMarkdown() {
  cleanupTableMarkdown()
  const labels = tableMarkdownLabels(document.body.dataset)
  if (labels === undefined) return

  const cleanups = []
  const tables = document.querySelectorAll("article .table-container > table")
  for (const table of tables) {
    if (!(table instanceof HTMLTableElement) || table.closest("blockquote.transclude")) continue
    const markdown = tableElementToMarkdown(table)
    const container = table.parentElement
    if (markdown === undefined || container === null) continue

    const action = document.createElement("div")
    action.className = "table-markdown-action"
    const button = document.createElement("button")
    button.type = "button"
    button.className = "table-markdown-button"
    button.title = labels.title
    button.setAttribute("aria-label", labels.title)
    button.dataset.state = "ready"
    button.append(createTableMarkdownIcon("copy"), createTableMarkdownIcon("copied"))
    const status = document.createElement("span")
    status.className = "sr-only"
    status.setAttribute("aria-live", "polite")
    action.append(button, status)
    container.insertAdjacentElement("afterend", action)

    let active = true
    let resetTimer
    const setState = (state) => {
      if (!active) return
      if (resetTimer !== undefined) window.clearTimeout(resetTimer)
      button.dataset.state = state
      const label = state === "copied" ? labels.copied : state === "failed" ? labels.failed : labels.title
      button.title = label
      button.setAttribute("aria-label", label)
      status.textContent = state === "ready" ? "" : label
      if (state !== "ready") {
        resetTimer = window.setTimeout(() => setState("ready"), 1800)
      }
    }
    const copyTable = async () => {
      if (!navigator.clipboard) {
        setState("failed")
        return
      }
      button.disabled = true
      try {
        await navigator.clipboard.writeText(markdown)
        setState("copied")
      } catch {
        setState("failed")
      } finally {
        if (active) button.disabled = false
      }
    }
    button.addEventListener("click", copyTable)
    cleanups.push(() => {
      active = false
      if (resetTimer !== undefined) window.clearTimeout(resetTimer)
      button.removeEventListener("click", copyTable)
      action.remove()
    })
  }

  if (cleanups.length === 0) return
  cleanupCurrentTableMarkdown = () => {
    for (const cleanup of cleanups) cleanup()
  }
  window.addCleanup(cleanupTableMarkdown)
}

document.addEventListener("nav", initializeTableMarkdown)
document.addEventListener("render", initializeTableMarkdown)
`
