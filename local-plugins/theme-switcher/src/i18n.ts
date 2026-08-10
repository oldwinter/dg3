type ThemeSwitcherTranslation = {
  readonly label: string
  readonly presetLabel: string
  readonly shuffleLabel: string
}

const enUS: ThemeSwitcherTranslation = {
  label: "Theme",
  presetLabel: "Theme preset",
  shuffleLabel: "Try another theme",
}

const translations: Record<string, ThemeSwitcherTranslation> = {
  "en-US": enUS,
  "zh-CN": {
    label: "主题",
    presetLabel: "主题预设",
    shuffleLabel: "换个主题",
  },
}

export function i18n(locale?: string): ThemeSwitcherTranslation {
  return translations[locale ?? "en-US"] ?? enUS
}
