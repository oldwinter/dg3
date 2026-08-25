import { FullSlug } from "../../util/path"

export interface CalloutTranslation {
  note: string
  abstract: string
  info: string
  todo: string
  tip: string
  success: string
  question: string
  warning: string
  failure: string
  danger: string
  bug: string
  example: string
  quote: string
}

export interface Translation {
  propertyDefaults: {
    title: string
    description: string
  }
  direction?: "ltr" | "rtl"
  components: {
    callout: CalloutTranslation
    backlinks: {
      title: string
      noBacklinksFound: string
    }
    themeToggle: {
      lightMode: string
      darkMode: string
    }
    readerMode: {
      title: string
    }
    readingProgress?: {
      title: string
    }
    backToTop?: {
      title: string
    }
    headingPermalink?: {
      title: string
      copiedTitle: string
      copiedLabel: string
    }
    quoteLink?: {
      title: string
      copied: string
      failed: string
      open: string
    }
    readLater?: {
      title: string
      trigger: (variables: { count: number }) => string
      save: string
      removeCurrent: string
      removeItem: (variables: { title: string }) => string
      close: string
      empty: string
      saved: string
      removed: string
      failed: string
    }
    resumeReading?: {
      continueFrom: string
      dismiss: string
      region: string
    }
    mobileOutline?: {
      title: string
      open: string
      close: string
    }
    randomWander?: {
      title: string
    }
    noteShare?: {
      title: string
      shared: string
      copied: string
      failed: string
      copyMarkdown: string
      markdownCopied: string
      markdownFailed: string
    }
    explorer: {
      title: string
    }
    footer: {
      createdWith: string
    }
    graph: {
      title: string
    }
    recentNotes: {
      title: string
      seeRemainingMore: (variables: { remaining: number }) => string
    }
    transcludes: {
      transcludeOf: (variables: { targetSlug: FullSlug }) => string
      linkToOriginal: string
    }
    search: {
      title: string
      searchBarPlaceholder: string
    }
    tableOfContents: {
      title: string
    }
    contentMeta: {
      readingTime: (variables: { minutes: number }) => string
    }
  }
  pages: {
    rss: {
      recentNotes: string
      lastFewNotes: (variables: { count: number }) => string
    }
    error: {
      title: string
      notFound: string
      home: string
    }
    folderContent: {
      folder: string
      itemsUnderFolder: (variables: { count: number }) => string
    }
    tagContent: {
      tag: string
      tagIndex: string
      itemsUnderTag: (variables: { count: number }) => string
      showingFirst: (variables: { count: number }) => string
      totalTags: (variables: { count: number }) => string
    }
  }
}
