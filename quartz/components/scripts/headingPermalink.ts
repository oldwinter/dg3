export function headingPermalink(pageUrl: URL, fragment: string): URL {
  const permalink = new URL(pageUrl.href)
  permalink.hash = fragment
  return permalink
}
