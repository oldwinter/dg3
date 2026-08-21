export const QUOTE_LINK_MIN_CHARS = 3
export const QUOTE_LINK_MAX_CHARS = 280

export type QuoteLinkLabels = Readonly<{
  title: string
  copied: string
  failed: string
  open: string
}>

export type QuoteLinkPosition = Readonly<{
  left: number
  top: number
  placement: "above" | "below"
}>

export function quoteLinkLabels(dataset: DOMStringMap): QuoteLinkLabels | undefined {
  const {
    quoteLinkTitle: title,
    quoteLinkCopied: copied,
    quoteLinkFailed: failed,
    quoteLinkOpen: open,
  } = dataset
  if (!title || !copied || !failed || !open) return

  return { title, copied, failed, open }
}

export function normalizeQuoteSelection(value: string): string | undefined {
  const normalized = value.replace(/\s+/gu, " ").trim()
  const length = [...normalized].length
  if (length < QUOTE_LINK_MIN_CHARS || length > QUOTE_LINK_MAX_CHARS) return

  return normalized
}

export function quoteLinkUrl(pageUrl: URL, quote: string): URL {
  const url = new URL(pageUrl.href)
  url.hash = `:~:text=${encodeURIComponent(quote)}`
  return url
}

export function quoteLinkMarkdown(quote: string, pageUrl: URL, openLabel: string): string {
  const safeLabel = openLabel.replace(/([\\\[\]])/gu, "\\$1")
  return `> ${quote}\n\n[${safeLabel}](${quoteLinkUrl(pageUrl, quote).href})`
}

export function quoteLinkPosition(
  rect: Pick<DOMRect, "left" | "top" | "bottom" | "width">,
  viewportWidth: number,
  buttonSize = 40,
  gap = 8,
): QuoteLinkPosition {
  const viewportInset = 8
  const halfButton = buttonSize / 2
  const minimumLeft = viewportInset + halfButton
  const maximumLeft = Math.max(minimumLeft, viewportWidth - viewportInset - halfButton)
  const left = Math.min(maximumLeft, Math.max(minimumLeft, rect.left + rect.width / 2))
  const hasRoomAbove = rect.top >= buttonSize + gap + viewportInset

  return {
    left,
    top: hasRoomAbove ? rect.top - gap : rect.bottom + gap,
    placement: hasRoomAbove ? "above" : "below",
  }
}
