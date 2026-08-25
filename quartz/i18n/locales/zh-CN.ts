import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "无题",
    description: "无描述",
  },
  components: {
    callout: {
      note: "笔记",
      abstract: "摘要",
      info: "提示",
      todo: "待办",
      tip: "提示",
      success: "成功",
      question: "问题",
      warning: "警告",
      failure: "失败",
      danger: "危险",
      bug: "错误",
      example: "示例",
      quote: "引用",
    },
    backlinks: {
      title: "反向链接",
      noBacklinksFound: "无法找到反向链接",
    },
    themeToggle: {
      lightMode: "亮色模式",
      darkMode: "暗色模式",
    },
    readerMode: {
      title: "阅读模式",
    },
    readingProgress: {
      title: "阅读进度",
    },
    backToTop: {
      title: "返回顶部",
    },
    headingPermalink: {
      title: "复制本节链接",
      copiedTitle: "已复制",
      copiedLabel: "本节链接已复制",
    },
    quoteLink: {
      title: "复制引用链接",
      copied: "引用链接已复制",
      failed: "浏览器未能复制这段引用",
      open: "打开这段原文",
    },
    readLater: {
      title: "稍后读",
      trigger: ({ count }) => `稍后读，已保存 ${count} 篇`,
      save: "保存当前笔记",
      removeCurrent: "从稍后读移除",
      removeItem: ({ title }) => `移除《${title}》`,
      close: "关闭稍后读",
      empty: "还没有稍后读笔记",
      saved: "已加入稍后读",
      removed: "已从稍后读移除",
      failed: "浏览器未能保存更改",
    },
    resumeReading: {
      continueFrom: "从 {percent}% 继续阅读",
      dismiss: "忽略保存的阅读位置",
      region: "继续阅读",
    },
    mobileOutline: {
      title: "本页大纲",
      open: "打开本页大纲",
      close: "关闭本页大纲",
    },
    randomWander: {
      title: "随机漫游到另一篇笔记",
    },
    noteShare: {
      title: "分享这篇笔记",
      shared: "笔记已分享",
      copied: "笔记链接已复制",
      failed: "浏览器未能分享这篇笔记",
      copyMarkdown: "复制为 Markdown 链接",
      markdownCopied: "Markdown 链接已复制",
      markdownFailed: "浏览器未能复制 Markdown 链接",
    },
    explorer: {
      title: "探索",
    },
    footer: {
      createdWith: "Created with",
    },
    graph: {
      title: "关系图谱",
    },
    recentNotes: {
      title: "最近的笔记",
      seeRemainingMore: ({ remaining }) => `查看更多${remaining}篇笔记 →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `包含${targetSlug}`,
      linkToOriginal: "指向原始笔记的链接",
    },
    search: {
      title: "搜索",
      searchBarPlaceholder: "搜索些什么",
    },
    tableOfContents: {
      title: "目录",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes}分钟阅读`,
    },
  },
  pages: {
    rss: {
      recentNotes: "最近的笔记",
      lastFewNotes: ({ count }) => `最近的${count}条笔记`,
    },
    error: {
      title: "无法找到",
      notFound: "私有笔记或笔记不存在。",
      home: "返回首页",
    },
    folderContent: {
      folder: "文件夹",
      itemsUnderFolder: ({ count }) => `此文件夹下有${count}条笔记。`,
    },
    tagContent: {
      tag: "标签",
      tagIndex: "标签索引",
      itemsUnderTag: ({ count }) => `此标签下有${count}条笔记。`,
      showingFirst: ({ count }) => `显示前${count}个标签。`,
      totalTags: ({ count }) => `总共有${count}个标签。`,
    },
  },
} as const satisfies Translation
