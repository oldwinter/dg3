import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "無題",
    description: "無描述",
  },
  components: {
    callout: {
      note: "筆記",
      abstract: "摘要",
      info: "提示",
      todo: "待辦",
      tip: "提示",
      success: "成功",
      question: "問題",
      warning: "警告",
      failure: "失敗",
      danger: "危險",
      bug: "錯誤",
      example: "範例",
      quote: "引用",
    },
    backlinks: {
      title: "反向連結",
      noBacklinksFound: "無法找到反向連結",
    },
    themeToggle: {
      lightMode: "亮色模式",
      darkMode: "暗色模式",
    },
    readerMode: {
      title: "閱讀模式",
    },
    backToTop: {
      title: "返回頂部",
    },
    headingPermalink: {
      title: "複製本節連結",
      copiedTitle: "已複製",
      copiedLabel: "本節連結已複製",
    },
    quoteLink: {
      title: "複製引用連結",
      copied: "引用連結已複製",
      failed: "瀏覽器未能複製這段引用",
      open: "開啟這段原文",
    },
    readLater: {
      title: "稍後讀",
      trigger: ({ count }) => `稍後讀，已儲存 ${count} 篇`,
      save: "儲存目前筆記",
      removeCurrent: "從稍後讀移除",
      removeItem: ({ title }) => `移除《${title}》`,
      close: "關閉稍後讀",
      empty: "還沒有稍後讀筆記",
      saved: "已加入稍後讀",
      removed: "已從稍後讀移除",
      failed: "瀏覽器未能儲存變更",
    },
    resumeReading: {
      continueFrom: "從 {percent}% 繼續閱讀",
      dismiss: "忽略儲存的閱讀位置",
      region: "繼續閱讀",
    },
    mobileOutline: {
      title: "本頁大綱",
      open: "開啟本頁大綱",
      close: "關閉本頁大綱",
    },
    randomWander: {
      title: "隨機漫遊到另一篇筆記",
    },
    noteShare: {
      title: "分享這篇筆記",
      shared: "筆記已分享",
      copied: "筆記連結已複製",
      failed: "瀏覽器未能分享這篇筆記",
    },
    readingTrail: {
      title: "閱讀足跡",
      trigger: ({ count }) => `閱讀足跡，前面有 ${count} 篇筆記`,
      close: "關閉閱讀足跡",
      clear: "清空閱讀足跡",
      empty: "這個分頁還沒有之前讀過的筆記",
      cleared: "閱讀足跡已清空",
      failed: "瀏覽器未能保留閱讀足跡",
    },
    explorer: {
      title: "探索",
    },
    footer: {
      createdWith: "Created with",
    },
    graph: {
      title: "關係圖譜",
    },
    recentNotes: {
      title: "最近的筆記",
      seeRemainingMore: ({ remaining }) => `查看更多 ${remaining} 篇筆記 →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `包含 ${targetSlug}`,
      linkToOriginal: "指向原始筆記的連結",
    },
    search: {
      title: "搜尋",
      searchBarPlaceholder: "搜尋些什麼",
    },
    tableOfContents: {
      title: "目錄",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `閱讀時間約 ${minutes} 分鐘`,
    },
  },
  pages: {
    rss: {
      recentNotes: "最近的筆記",
      lastFewNotes: ({ count }) => `最近的 ${count} 條筆記`,
    },
    error: {
      title: "無法找到",
      notFound: "私人筆記或筆記不存在。",
      home: "返回首頁",
    },
    folderContent: {
      folder: "資料夾",
      itemsUnderFolder: ({ count }) => `此資料夾下有 ${count} 條筆記。`,
    },
    tagContent: {
      tag: "標籤",
      tagIndex: "標籤索引",
      itemsUnderTag: ({ count }) => `此標籤下有 ${count} 條筆記。`,
      showingFirst: ({ count }) => `顯示前 ${count} 個標籤。`,
      totalTags: ({ count }) => `總共有 ${count} 個標籤。`,
    },
  },
} as const satisfies Translation
