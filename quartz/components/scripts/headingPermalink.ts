export type HeadingPermalinkLabels = Readonly<{
  defaultLabel: string
  copiedTitle: string
  copiedLabel: string
}>

export function headingPermalinkLabels(language: string): HeadingPermalinkLabels {
  if (language.toLowerCase().startsWith("zh")) {
    return {
      defaultLabel: "复制本节链接",
      copiedTitle: "已复制",
      copiedLabel: "本节链接已复制",
    }
  }

  return {
    defaultLabel: "Copy link to this section",
    copiedTitle: "Copied",
    copiedLabel: "Section link copied",
  }
}

export function headingPermalink(pageUrl: URL, fragment: string): URL {
  const permalink = new URL(pageUrl.href)
  permalink.hash = fragment
  return permalink
}
