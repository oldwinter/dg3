export { default as ThemeSwitcher } from "./components/ThemeSwitcher"
export {
  REQUIRED_THEME_TOKEN_KEYS,
  THEME_PRESET_IDS,
  THEME_PRESETS,
  buildThemePresetCss,
  hexToHsl,
  validateThemeCatalog,
  type CanonicalThemePreset,
  type ThemePreset,
  type ThemeTokens,
} from "./themes"

export type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
  StringResource,
} from "@quartz-community/types"

type ThemeSwitcherManifest = {
  readonly name: string
  readonly displayName: string
  readonly description: string
  readonly category: "component"
  readonly version: string
  readonly quartzVersion: string
  readonly dependencies: readonly string[]
  readonly defaultOrder: number
  readonly defaultEnabled: boolean
  readonly defaultOptions: {
    readonly defaultPreset: "linear"
    readonly storageKey: "themePreset"
  }
  readonly components: {
    readonly ThemeSwitcher: {
      readonly name: "ThemeSwitcher"
      readonly displayName: string
      readonly description: string
      readonly version: string
      readonly defaultPosition: "left"
      readonly defaultPriority: 32
    }
  }
}

export const manifest = {
  name: "theme-switcher",
  displayName: "Theme Switcher",
  description: "Toolbar component for selecting local visual theme presets.",
  category: "component",
  version: "0.1.0",
  quartzVersion: ">=5.0.0",
  dependencies: [],
  defaultOrder: 45,
  defaultEnabled: true,
  defaultOptions: {
    defaultPreset: "linear",
    storageKey: "themePreset",
  },
  components: {
    ThemeSwitcher: {
      name: "ThemeSwitcher",
      displayName: "Theme Switcher",
      description: "Compact toolbar control for selecting theme presets.",
      version: "0.1.0",
      defaultPosition: "left",
      defaultPriority: 32,
    },
  },
} satisfies ThemeSwitcherManifest
