import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"
import {
  buildThemePresetCss,
  THEME_PRESET_IDS,
  THEME_PRESETS,
  type CanonicalThemePreset,
} from "../themes"
import { i18n } from "../i18n"
import themeSwitcherScriptTemplate from "./scripts/themeSwitcher.inline.ts?raw"
import styles from "./styles/themeSwitcher.scss"

type ThemeSwitcherOptions = {
  readonly defaultPreset?: string
  readonly storageKey?: string
}

type NormalizedThemeSwitcherOptions = {
  readonly defaultPreset: string
  readonly storageKey: string
}

function normalizeOptions(options?: ThemeSwitcherOptions): NormalizedThemeSwitcherOptions {
  return {
    defaultPreset: options?.defaultPreset ?? "linear",
    storageKey: options?.storageKey ?? "themePreset",
  }
}

function buildScript(options: NormalizedThemeSwitcherOptions): string {
  return themeSwitcherScriptTemplate
    .replace("__THEME_SWITCHER_PRESETS__", JSON.stringify(THEME_PRESET_IDS))
    .replace('"__THEME_SWITCHER_DEFAULT__"', JSON.stringify(options.defaultPreset))
    .replace('"__THEME_SWITCHER_STORAGE_KEY__"', JSON.stringify(options.storageKey))
}

function buildBeforeScript(options: NormalizedThemeSwitcherOptions): string {
  return `(() => {
  const presets = ${JSON.stringify(THEME_PRESET_IDS)};
  const defaultPreset = ${JSON.stringify(options.defaultPreset)};
  const storageKey = ${JSON.stringify(options.storageKey)};
  const storedPreset = localStorage.getItem(storageKey);
  const preset = presets.includes(storedPreset) ? storedPreset : defaultPreset;
  document.documentElement.dataset.themePreset = preset;
  if (storedPreset !== preset) {
    localStorage.setItem(storageKey, preset);
  }
})();`
}

const ThemeSwitcher = ((options?: ThemeSwitcherOptions): QuartzComponent => {
  const scriptOptions = normalizeOptions(options)
  const Component: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const classes = displayClass ? `${displayClass} theme-switcher` : "theme-switcher"
    const translations = i18n(cfg?.locale)

    return (
      <div class={classes} data-theme-switcher-shell>
        <span class="theme-switcher-swatch" aria-hidden="true" />
        <label class="theme-switcher-label" for="theme-switcher-select">
          {translations.label}
        </label>
        <select
          id="theme-switcher-select"
          class="theme-switcher-select"
          data-theme-switcher
          aria-label={translations.presetLabel}
          name="theme-preset"
        >
          {THEME_PRESETS.map((preset) => (
            <option value={preset.id} selected={preset.id === scriptOptions.defaultPreset}>
              {preset.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          class="theme-switcher-shuffle"
          data-theme-shuffle
          aria-label={translations.shuffleLabel}
          title={translations.shuffleLabel}
          disabled
        />
      </div>
    )
  }

  Component.beforeDOMLoaded = buildBeforeScript(scriptOptions)
  Component.afterDOMLoaded = buildScript(scriptOptions)
  Component.css = [buildThemePresetCss(), styles]

  return Component
}) satisfies QuartzComponentConstructor<ThemeSwitcherOptions>

export default ThemeSwitcher
