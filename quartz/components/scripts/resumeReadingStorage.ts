export const RESUME_READING_LIMIT = 20
export const RESUME_READING_MIN_PROGRESS = 0.15
export const RESUME_READING_MAX_PROGRESS = 0.9
export const RESUME_READING_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1_000

export type ResumeReadingEntry = Readonly<{
  path: string
  progress: number
  updatedAt: number
}>

export function parseResumeReadingEntry(candidate: unknown): ResumeReadingEntry | undefined {
  if (typeof candidate !== "object" || candidate === null) return undefined

  const path: unknown = Reflect.get(candidate, "path")
  const progress: unknown = Reflect.get(candidate, "progress")
  const updatedAt: unknown = Reflect.get(candidate, "updatedAt")
  if (
    typeof path !== "string" ||
    path.length > 2048 ||
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.includes("\\") ||
    path.includes("?") ||
    path.includes("#") ||
    /[\u0000-\u0020\u007f]/u.test(path) ||
    typeof progress !== "number" ||
    !Number.isFinite(progress) ||
    progress < 0 ||
    progress > 1 ||
    typeof updatedAt !== "number" ||
    !Number.isSafeInteger(updatedAt) ||
    updatedAt < 0
  ) {
    return undefined
  }

  let resolvedPath: URL
  try {
    resolvedPath = new URL(path, "https://resume-reading.invalid/")
  } catch {
    return undefined
  }
  if (resolvedPath.origin !== "https://resume-reading.invalid") return undefined

  return { path, progress, updatedAt }
}

export function parseResumeReadingEntries(
  raw: string | null,
  now = Date.now(),
): readonly ResumeReadingEntry[] {
  if (raw === null) return []

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return []
  }
  if (!Array.isArray(parsed)) return []

  const entries: ResumeReadingEntry[] = []
  const paths = new Set<string>()
  for (const candidate of parsed) {
    const entry = parseResumeReadingEntry(candidate)
    if (
      entry === undefined ||
      entry.progress < RESUME_READING_MIN_PROGRESS ||
      entry.progress > RESUME_READING_MAX_PROGRESS ||
      entry.updatedAt > now ||
      now - entry.updatedAt > RESUME_READING_MAX_AGE_MS ||
      paths.has(entry.path)
    ) {
      continue
    }

    entries.push(entry)
    paths.add(entry.path)
    if (entries.length === RESUME_READING_LIMIT) break
  }

  return entries
}

export function updateResumeReadingEntries(
  entries: readonly ResumeReadingEntry[],
  candidate: ResumeReadingEntry,
): readonly ResumeReadingEntry[] {
  const entry = parseResumeReadingEntry(candidate)
  if (entry === undefined) return entries

  const remaining = entries.filter((current) => current.path !== entry.path)
  if (
    entry.progress < RESUME_READING_MIN_PROGRESS ||
    entry.progress > RESUME_READING_MAX_PROGRESS
  ) {
    return remaining
  }

  return [entry, ...remaining].slice(0, RESUME_READING_LIMIT)
}
