export const READ_LATER_LIMIT = 20

export type ReadLaterEntry = Readonly<{
  path: string
  title: string
  savedAt: number
}>

export function parseReadLaterEntry(candidate: unknown): ReadLaterEntry | undefined {
  if (typeof candidate !== "object" || candidate === null) return undefined

  const path: unknown = Reflect.get(candidate, "path")
  const title: unknown = Reflect.get(candidate, "title")
  const savedAt: unknown = Reflect.get(candidate, "savedAt")
  if (
    typeof path !== "string" ||
    path.length > 2048 ||
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.includes("\\") ||
    /[\u0000-\u0020\u007f]/u.test(path) ||
    typeof title !== "string" ||
    typeof savedAt !== "number" ||
    !Number.isSafeInteger(savedAt) ||
    savedAt < 0
  ) {
    return undefined
  }

  let resolvedPath: URL
  try {
    resolvedPath = new URL(path, "https://read-later.invalid/")
  } catch {
    return undefined
  }
  if (resolvedPath.origin !== "https://read-later.invalid") return undefined

  const normalizedTitle = title.trim().slice(0, 200)
  if (normalizedTitle.length === 0) return undefined
  return { path, title: normalizedTitle, savedAt }
}

export function parseReadLaterEntries(raw: string | null): readonly ReadLaterEntry[] {
  if (raw === null) return []

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (error) {
    if (error instanceof SyntaxError) return []
    throw error
  }
  if (!Array.isArray(parsed)) return []

  const candidates: readonly unknown[] = parsed
  const newestByPath = new Map<string, ReadLaterEntry>()
  for (const candidate of candidates) {
    const entry = parseReadLaterEntry(candidate)
    if (entry === undefined) continue
    const existing = newestByPath.get(entry.path)
    if (existing === undefined || entry.savedAt > existing.savedAt) {
      newestByPath.set(entry.path, entry)
    }
  }

  return [...newestByPath.values()]
    .sort((first, second) => second.savedAt - first.savedAt)
    .slice(0, READ_LATER_LIMIT)
}

export function readLaterEntriesToMarkdown(
  entries: readonly ReadLaterEntry[],
  baseUrl: string,
): string {
  let base: URL
  try {
    base = new URL(baseUrl)
  } catch {
    return ""
  }
  if (base.protocol !== "http:" && base.protocol !== "https:") return ""

  const lines: string[] = []
  for (const candidate of entries) {
    const entry = parseReadLaterEntry(candidate)
    if (entry === undefined) continue

    const destination = new URL(entry.path, base)
    if (destination.origin !== base.origin) continue
    const label = entry.title
      .replace(/\s+/gu, " ")
      .trim()
      .replace(/([\\[\]])/gu, "\\$1")
    lines.push(`- [ ] [${label}](<${destination.href}>)`)
  }

  return lines.join("\n")
}

export function toggleReadLaterEntry(
  entries: readonly ReadLaterEntry[],
  current: ReadLaterEntry,
): readonly ReadLaterEntry[] {
  const withoutCurrent = entries.filter((entry) => entry.path !== current.path)
  if (withoutCurrent.length !== entries.length) return withoutCurrent
  return [current, ...withoutCurrent].slice(0, READ_LATER_LIMIT)
}
