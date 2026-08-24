export const READING_TRAIL_LIMIT = 8

export type ReadingTrailEntry = Readonly<{
  path: string
  title: string
  visitedAt: number
}>

export function parseReadingTrailEntry(candidate: unknown): ReadingTrailEntry | undefined {
  if (typeof candidate !== "object" || candidate === null) return undefined

  const path: unknown = Reflect.get(candidate, "path")
  const title: unknown = Reflect.get(candidate, "title")
  const visitedAt: unknown = Reflect.get(candidate, "visitedAt")
  if (
    typeof path !== "string" ||
    path.length > 2048 ||
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.includes("\\") ||
    /[\u0000-\u0020\u007f]/u.test(path) ||
    typeof title !== "string" ||
    typeof visitedAt !== "number" ||
    !Number.isSafeInteger(visitedAt) ||
    visitedAt < 0
  ) {
    return undefined
  }

  let resolvedPath: URL
  try {
    resolvedPath = new URL(path, "https://reading-trail.invalid/")
  } catch {
    return undefined
  }
  if (resolvedPath.origin !== "https://reading-trail.invalid") return undefined

  const normalizedTitle = title.trim().slice(0, 200)
  if (normalizedTitle.length === 0) return undefined
  return { path, title: normalizedTitle, visitedAt }
}

export function parseReadingTrailEntries(raw: string | null): readonly ReadingTrailEntry[] {
  if (raw === null) return []

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (error) {
    if (error instanceof SyntaxError) return []
    throw error
  }
  if (!Array.isArray(parsed)) return []

  const newestByPath = new Map<string, ReadingTrailEntry>()
  for (const candidate of parsed as readonly unknown[]) {
    const entry = parseReadingTrailEntry(candidate)
    if (entry === undefined) continue
    const existing = newestByPath.get(entry.path)
    if (existing === undefined || entry.visitedAt > existing.visitedAt) {
      newestByPath.set(entry.path, entry)
    }
  }

  return [...newestByPath.values()]
    .sort((first, second) => second.visitedAt - first.visitedAt)
    .slice(0, READING_TRAIL_LIMIT)
}

export function recordReadingTrailEntry(
  entries: readonly ReadingTrailEntry[],
  current: ReadingTrailEntry,
): readonly ReadingTrailEntry[] {
  return [current, ...entries.filter((entry) => entry.path !== current.path)].slice(
    0,
    READING_TRAIL_LIMIT,
  )
}
