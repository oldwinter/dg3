// allow: SIZE_OK - required ten-preset pure data table plus catalog validators.
export const REQUIRED_THEME_TOKEN_KEYS = [
  "light",
  "lightgray",
  "gray",
  "darkgray",
  "dark",
  "secondary",
  "tertiary",
  "highlight",
  "textHighlight",
  "accentH",
  "accentS",
  "accentL",
] as const

const THEME_MODES = ["light", "dark"] as const
const UNSCOPED_ROOT_THEME_OVERRIDE_PATTERN =
  /:root\s*\{\s*--(?:light|lightgray|gray|darkgray|dark|secondary|tertiary|highlight|textHighlight|accent-h|accent-s|accent-l)\s*:/
const EXTERNAL_ASSET_PATTERN = /(@import|@font-face|url\(|https?:\/\/|\blogo\b)/i

type ThemeTokenKey = (typeof REQUIRED_THEME_TOKEN_KEYS)[number]
type ThemeMode = (typeof THEME_MODES)[number]

export type ThemeTokens = Readonly<Record<ThemeTokenKey, string>>

export type ThemePreset = {
  readonly id: string
  readonly label: string
  readonly description: string
  readonly previewAccent: string
  readonly light: ThemeTokens
  readonly dark: ThemeTokens
}

type ValidationResult = {
  readonly valid: boolean
  readonly errors: readonly string[]
}

type Hsl = {
  readonly h: number
  readonly s: number
  readonly l: number
}

const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/

export const THEME_PRESETS = [
  {
    id: "linear",
    label: "Linear",
    description: "Engineered graphite and cool indigo for focused reading.",
    previewAccent: "#5e6ad2",
    light: {
      light: "#f7f8f8",
      lightgray: "#eceef1",
      gray: "#9aa3af",
      darkgray: "#3f4652",
      dark: "#15171c",
      secondary: "#5e6ad2",
      tertiary: "#7170ff",
      highlight: "rgba(94, 106, 210, 0.14)",
      textHighlight: "rgba(94, 106, 210, 0.22)",
      accentH: "234",
      accentS: "56%",
      accentL: "60%",
    },
    dark: {
      light: "#08090a",
      lightgray: "#191a1b",
      gray: "#62666d",
      darkgray: "#d0d6e0",
      dark: "#f7f8f8",
      secondary: "#828fff",
      tertiary: "#5e6ad2",
      highlight: "rgba(130, 143, 255, 0.18)",
      textHighlight: "rgba(130, 143, 255, 0.28)",
      accentH: "234",
      accentS: "100%",
      accentL: "75%",
    },
  },
  {
    id: "raycast",
    label: "Raycast",
    description: "Near-black utility chrome with precise blue interaction.",
    previewAccent: "#ff6363",
    light: {
      light: "#f9f9f9",
      lightgray: "#e8ecef",
      gray: "#9c9c9d",
      darkgray: "#34383c",
      dark: "#18191a",
      secondary: "#55b3ff",
      tertiary: "#ff6363",
      highlight: "rgba(85, 179, 255, 0.16)",
      textHighlight: "rgba(255, 99, 99, 0.24)",
      accentH: "207",
      accentS: "100%",
      accentL: "67%",
    },
    dark: {
      light: "#07080a",
      lightgray: "#101111",
      gray: "#6a6b6c",
      darkgray: "#cecece",
      dark: "#f9f9f9",
      secondary: "#55b3ff",
      tertiary: "#ff6363",
      highlight: "rgba(85, 179, 255, 0.18)",
      textHighlight: "rgba(255, 99, 99, 0.26)",
      accentH: "207",
      accentS: "100%",
      accentL: "67%",
    },
  },
  {
    id: "apple",
    label: "Apple",
    description: "Gallery-neutral clarity with thin chrome and action blue.",
    previewAccent: "#0071e3",
    light: {
      light: "#ffffff",
      lightgray: "#f5f5f7",
      gray: "#86868b",
      darkgray: "#424245",
      dark: "#1d1d1f",
      secondary: "#0071e3",
      tertiary: "#0066cc",
      highlight: "rgba(0, 113, 227, 0.12)",
      textHighlight: "rgba(0, 113, 227, 0.2)",
      accentH: "210",
      accentS: "100%",
      accentL: "45%",
    },
    dark: {
      light: "#000000",
      lightgray: "#272729",
      gray: "#6e6e73",
      darkgray: "#d2d2d7",
      dark: "#ffffff",
      secondary: "#2997ff",
      tertiary: "#0071e3",
      highlight: "rgba(41, 151, 255, 0.18)",
      textHighlight: "rgba(41, 151, 255, 0.28)",
      accentH: "209",
      accentS: "100%",
      accentL: "58%",
    },
  },
  {
    id: "notion",
    label: "Notion",
    description: "Warm paper surfaces with whisper borders and blue links.",
    previewAccent: "#0075de",
    light: {
      light: "#ffffff",
      lightgray: "#f6f5f4",
      gray: "#a39e98",
      darkgray: "#615d59",
      dark: "#31302e",
      secondary: "#0075de",
      tertiary: "#2a9d99",
      highlight: "rgba(0, 117, 222, 0.12)",
      textHighlight: "rgba(0, 117, 222, 0.2)",
      accentH: "208",
      accentS: "100%",
      accentL: "44%",
    },
    dark: {
      light: "#31302e",
      lightgray: "#3d3a36",
      gray: "#a39e98",
      darkgray: "#f0eee6",
      dark: "#ffffff",
      secondary: "#62aef0",
      tertiary: "#2a9d99",
      highlight: "rgba(98, 174, 240, 0.18)",
      textHighlight: "rgba(98, 174, 240, 0.28)",
      accentH: "208",
      accentS: "83%",
      accentL: "66%",
    },
  },
  {
    id: "vercel",
    label: "Vercel",
    description: "Monochrome infrastructure minimalism with crisp blue focus.",
    previewAccent: "#0072f5",
    light: {
      light: "#ffffff",
      lightgray: "#fafafa",
      gray: "#808080",
      darkgray: "#4d4d4d",
      dark: "#171717",
      secondary: "#0072f5",
      tertiary: "#171717",
      highlight: "rgba(0, 114, 245, 0.12)",
      textHighlight: "rgba(0, 114, 245, 0.2)",
      accentH: "212",
      accentS: "100%",
      accentL: "48%",
    },
    dark: {
      light: "#000000",
      lightgray: "#171717",
      gray: "#666666",
      darkgray: "#ebebeb",
      dark: "#ffffff",
      secondary: "#2997ff",
      tertiary: "#fafafa",
      highlight: "rgba(41, 151, 255, 0.16)",
      textHighlight: "rgba(41, 151, 255, 0.28)",
      accentH: "209",
      accentS: "100%",
      accentL: "58%",
    },
  },
  {
    id: "claude",
    label: "Claude",
    description: "Parchment warmth, charcoal text, and terracotta accents.",
    previewAccent: "#c96442",
    light: {
      light: "#f5f4ed",
      lightgray: "#faf9f5",
      gray: "#87867f",
      darkgray: "#5e5d59",
      dark: "#141413",
      secondary: "#c96442",
      tertiary: "#d97757",
      highlight: "rgba(201, 100, 66, 0.14)",
      textHighlight: "rgba(201, 100, 66, 0.24)",
      accentH: "15",
      accentS: "56%",
      accentL: "52%",
    },
    dark: {
      light: "#141413",
      lightgray: "#30302e",
      gray: "#87867f",
      darkgray: "#b0aea5",
      dark: "#faf9f5",
      secondary: "#d97757",
      tertiary: "#c96442",
      highlight: "rgba(217, 119, 87, 0.18)",
      textHighlight: "rgba(217, 119, 87, 0.3)",
      accentH: "15",
      accentS: "63%",
      accentL: "60%",
    },
  },
  {
    id: "stripe",
    label: "Stripe",
    description: "Deep navy text and premium purple financial precision.",
    previewAccent: "#533afd",
    light: {
      light: "#ffffff",
      lightgray: "#f6f9fc",
      gray: "#64748d",
      darkgray: "#273951",
      dark: "#061b31",
      secondary: "#533afd",
      tertiary: "#4434d4",
      highlight: "rgba(83, 58, 253, 0.12)",
      textHighlight: "rgba(83, 58, 253, 0.22)",
      accentH: "248",
      accentS: "98%",
      accentL: "61%",
    },
    dark: {
      light: "#0d253d",
      lightgray: "#1c1e54",
      gray: "#8ea0bd",
      darkgray: "#d6d9fc",
      dark: "#ffffff",
      secondary: "#665efd",
      tertiary: "#b9b9f9",
      highlight: "rgba(102, 94, 253, 0.18)",
      textHighlight: "rgba(102, 94, 253, 0.3)",
      accentH: "243",
      accentS: "98%",
      accentL: "68%",
    },
  },
  {
    id: "figma",
    label: "Figma",
    description: "Binary black-and-white interface with selection clarity.",
    previewAccent: "#000000",
    light: {
      light: "#ffffff",
      lightgray: "#f4f4f4",
      gray: "#8a8a8a",
      darkgray: "#333333",
      dark: "#000000",
      secondary: "#000000",
      tertiary: "#555555",
      highlight: "rgba(0, 0, 0, 0.08)",
      textHighlight: "rgba(0, 0, 0, 0.14)",
      accentH: "0",
      accentS: "0%",
      accentL: "0%",
    },
    dark: {
      light: "#000000",
      lightgray: "#1f1f1f",
      gray: "#8a8a8a",
      darkgray: "#f4f4f4",
      dark: "#ffffff",
      secondary: "#ffffff",
      tertiary: "#d6d6d6",
      highlight: "rgba(255, 255, 255, 0.16)",
      textHighlight: "rgba(255, 255, 255, 0.24)",
      accentH: "0",
      accentS: "0%",
      accentL: "100%",
    },
  },
  {
    id: "spotify",
    label: "Spotify",
    description: "Immersive charcoal layers with functional green selection.",
    previewAccent: "#1ed760",
    light: {
      light: "#fdfdfd",
      lightgray: "#eeeeee",
      gray: "#7c7c7c",
      darkgray: "#4d4d4d",
      dark: "#121212",
      secondary: "#1ed760",
      tertiary: "#1db954",
      highlight: "rgba(30, 215, 96, 0.12)",
      textHighlight: "rgba(30, 215, 96, 0.22)",
      accentH: "141",
      accentS: "76%",
      accentL: "48%",
    },
    dark: {
      light: "#121212",
      lightgray: "#181818",
      gray: "#7c7c7c",
      darkgray: "#b3b3b3",
      dark: "#ffffff",
      secondary: "#1ed760",
      tertiary: "#1db954",
      highlight: "rgba(30, 215, 96, 0.16)",
      textHighlight: "rgba(30, 215, 96, 0.28)",
      accentH: "141",
      accentS: "76%",
      accentL: "48%",
    },
  },
  {
    id: "tesla",
    label: "Tesla",
    description: "Radical subtraction with carbon text and electric blue.",
    previewAccent: "#3e6ae1",
    light: {
      light: "#ffffff",
      lightgray: "#f4f4f4",
      gray: "#8e8e8e",
      darkgray: "#393c41",
      dark: "#171a20",
      secondary: "#3e6ae1",
      tertiary: "#5c5e62",
      highlight: "rgba(62, 106, 225, 0.12)",
      textHighlight: "rgba(62, 106, 225, 0.22)",
      accentH: "224",
      accentS: "73%",
      accentL: "56%",
    },
    dark: {
      light: "#171a20",
      lightgray: "#23262c",
      gray: "#8e8e8e",
      darkgray: "#d0d1d2",
      dark: "#ffffff",
      secondary: "#6f8dff",
      tertiary: "#3e6ae1",
      highlight: "rgba(111, 141, 255, 0.16)",
      textHighlight: "rgba(111, 141, 255, 0.28)",
      accentH: "228",
      accentS: "100%",
      accentL: "72%",
    },
  },
] as const satisfies readonly ThemePreset[]

export type CanonicalThemePreset = (typeof THEME_PRESETS)[number]

export const THEME_PRESET_IDS: readonly CanonicalThemePreset["id"][] = THEME_PRESETS.map(
  (preset) => preset.id,
)

export function hexToHsl(hex: string): Hsl {
  const match = HEX_COLOR_PATTERN.exec(hex)
  if (!match) {
    return { h: 0, s: 0, l: 0 }
  }

  const value = hex.slice(1)
  const r = Number.parseInt(value.slice(0, 2), 16) / 255
  const g = Number.parseInt(value.slice(2, 4), 16) / 255
  const b = Number.parseInt(value.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(l * 100) }
  }

  const delta = max - min
  const s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
  const h = hueFromRgbMax({ r, g, b, max, delta })

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function validateThemeCatalog(presets: readonly ThemePreset[]): ValidationResult {
  const errors: string[] = []
  const ids = new Set<string>()
  const labels = new Set<string>()

  for (const preset of presets) {
    addUniqueValueError(errors, ids, preset.id, "id")
    addUniqueValueError(errors, labels, preset.label, "label")
    validatePreset(errors, preset)
  }

  return { valid: errors.length === 0, errors }
}

export function buildThemePresetCss(presets: readonly ThemePreset[] = THEME_PRESETS): string {
  const result = validateThemeCatalog(presets)
  if (!result.valid) {
    throw new ThemeCatalogError(result.errors)
  }

  const css = presets
    .flatMap((preset) => THEME_MODES.map((mode) => buildThemeBlock(preset, mode)))
    .join("\n\n")
  const violations = findThemeCssGuardViolations(css)
  if (violations.length > 0) {
    throw new ThemeCatalogError(violations)
  }

  return css
}

export function findThemeCssGuardViolations(css: string): readonly string[] {
  const violations: string[] = []

  if (UNSCOPED_ROOT_THEME_OVERRIDE_PATTERN.test(css)) {
    violations.push("unscoped Quartz theme override")
  }

  if (EXTERNAL_ASSET_PATTERN.test(css)) {
    violations.push("external asset reference")
  }

  return violations
}

class ThemeCatalogError extends Error {
  public readonly errors: readonly string[]

  public constructor(errors: readonly string[]) {
    super(`Invalid theme catalog: ${errors.join("; ")}`)
    this.name = "ThemeCatalogError"
    this.errors = errors
  }
}

function hueFromRgbMax(values: {
  readonly r: number
  readonly g: number
  readonly b: number
  readonly max: number
  readonly delta: number
}): number {
  const { r, g, b, max, delta } = values

  if (max === r) {
    return ((g - b) / delta + (g < b ? 6 : 0)) / 6
  }

  if (max === g) {
    return ((b - r) / delta + 2) / 6
  }

  return ((r - g) / delta + 4) / 6
}

function addUniqueValueError(
  errors: string[],
  seen: Set<string>,
  value: string,
  label: "id" | "label",
): void {
  if (seen.has(value)) {
    errors.push(`Duplicate theme preset ${label}: ${value}`)
    return
  }

  seen.add(value)
}

function validatePreset(errors: string[], preset: ThemePreset): void {
  validateHexValue(errors, preset.previewAccent, `${preset.id}.previewAccent`)

  for (const mode of THEME_MODES) {
    const tokens = preset[mode]

    for (const key of REQUIRED_THEME_TOKEN_KEYS) {
      const value = tokens[key]
      if (value.trim() === "") {
        errors.push(`${preset.id}.${mode}.${key} is required`)
      }
    }

    validateHexValue(errors, tokens.secondary, `${preset.id}.${mode}.secondary`)
    validateAccentTokens(errors, preset.id, mode, tokens)
  }
}

function validateHexValue(errors: string[], value: string, path: string): void {
  if (!HEX_COLOR_PATTERN.test(value)) {
    errors.push(`${path} must be a 6-digit hex color`)
  }
}

function validateAccentTokens(
  errors: string[],
  presetId: string,
  mode: ThemeMode,
  tokens: ThemeTokens,
): void {
  const hsl = hexToHsl(tokens.secondary)
  const expected = {
    accentH: String(hsl.h),
    accentS: `${hsl.s}%`,
    accentL: `${hsl.l}%`,
  } as const

  for (const key of ["accentH", "accentS", "accentL"] as const) {
    if (tokens[key] !== expected[key]) {
      errors.push(`${presetId}.${mode}.${key} must match ${tokens.secondary}`)
    }
  }
}

function buildThemeBlock(preset: ThemePreset, mode: ThemeMode): string {
  const selector =
    mode === "light"
      ? `:root[data-theme-preset='${preset.id}']`
      : `:root[saved-theme='dark'][data-theme-preset='${preset.id}']`
  const declarations = REQUIRED_THEME_TOKEN_KEYS.map(
    (key) => `  --${cssTokenName(key)}: ${preset[mode][key]};`,
  )

  return `${selector} {\n${declarations.join("\n")}\n}`
}

function cssTokenName(key: ThemeTokenKey): string {
  if (key === "textHighlight") {
    return "textHighlight"
  }

  if (key === "accentH") {
    return "accent-h"
  }

  if (key === "accentS") {
    return "accent-s"
  }

  if (key === "accentL") {
    return "accent-l"
  }

  return key
}
