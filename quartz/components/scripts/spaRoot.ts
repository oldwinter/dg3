export type DocumentRoot = {
  lang: string
  dir: string
}

export function syncDocumentRoot(current: DocumentRoot, next: DocumentRoot) {
  current.lang = next.lang
  current.dir = next.dir
}
