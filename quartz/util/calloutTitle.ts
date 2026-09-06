export function stripCalloutTitleContinuation(title: string): string {
  if (!/(?:\\[ \t]*)+$/.test(title)) {
    return title
  }
  return title.replace(/(?:\\[ \t]*)+$/u, "").replace(/[ \t]+$/u, "")
}

const CALLOUT_OPEN = /^((?:>[ \t]*)+\[![\w-]+(?:\|[^\]]+)?\][+-]?)(.*)$/

export function stripCalloutTitleContinuationsInMarkdown(src: string): string {
  const newline = src.includes("\r\n") ? "\r\n" : src.includes("\r") ? "\r" : "\n"
  return src
    .split(/\r?\n/)
    .map((line) => {
      const match = line.match(CALLOUT_OPEN)
      if (!match) {
        return line
      }
      const [, directive, rest] = match
      return `${directive}${stripCalloutTitleContinuation(rest ?? "")}`
    })
    .join(newline)
}
