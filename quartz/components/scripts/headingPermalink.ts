export type HeadingPermalinkLabels = Readonly<{
  defaultLabel: string
  copiedTitle: string
  copiedLabel: string
}>

export function headingPermalinkLabels(dataset: DOMStringMap): HeadingPermalinkLabels | undefined {
  const defaultLabel = dataset.headingPermalinkLabel
  const copiedTitle = dataset.headingPermalinkCopiedTitle
  const copiedLabel = dataset.headingPermalinkCopiedLabel
  if (!defaultLabel || !copiedTitle || !copiedLabel) return

  return { defaultLabel, copiedTitle, copiedLabel }
}

export function headingPermalink(pageUrl: URL, fragment: string): URL {
  const permalink = new URL(pageUrl.href)
  permalink.hash = fragment
  return permalink
}
