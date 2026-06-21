import assert from "node:assert/strict"
import test from "node:test"

import {
  REQUIRED_THEME_TOKEN_KEYS,
  THEME_PRESET_IDS,
  THEME_PRESETS,
  buildThemePresetCss,
  hexToHsl,
  validateThemeCatalog,
  type ThemePreset,
} from "../src/themes.ts"

const EXPECTED_IDS = [
  "linear",
  "raycast",
  "apple",
  "notion",
  "vercel",
  "claude",
  "stripe",
  "figma",
  "spotify",
  "tesla",
] as const

test("themeCatalog validates the complete catalog when presets are canonical", () => {
  // Given
  const ids = THEME_PRESETS.map((preset) => preset.id)
  const labels = THEME_PRESETS.map((preset) => preset.label)

  // When
  const result = validateThemeCatalog(THEME_PRESETS)

  // Then
  assert.deepEqual(result, { valid: true, errors: [] })
  assert.equal(THEME_PRESETS.length, 10)
  assert.deepEqual(ids, [...EXPECTED_IDS])
  assert.deepEqual(THEME_PRESET_IDS, EXPECTED_IDS)
  assert.equal(new Set(ids).size, THEME_PRESETS.length)
  assert.equal(new Set(labels).size, THEME_PRESETS.length)
})

test("themeCatalog covers every required light and dark token when presets are canonical", () => {
  // Given
  const modes = ["light", "dark"] as const

  for (const preset of THEME_PRESETS) {
    assert.match(preset.description, /\S/)
    assert.match(preset.previewAccent, /^#[0-9a-fA-F]{6}$/)

    for (const mode of modes) {
      for (const key of REQUIRED_THEME_TOKEN_KEYS) {
        assert.equal(typeof preset[mode][key], "string", `${preset.id}.${mode}.${key}`)
        assert.match(preset[mode][key], /\S/, `${preset.id}.${mode}.${key}`)
      }
    }
  }
})

test("themeCatalog restricts rgba tokens to highlight fields when presets are canonical", () => {
  const modes = ["light", "dark"] as const
  const rgbaKeys = new Set(["highlight", "textHighlight"])

  for (const preset of THEME_PRESETS) {
    for (const mode of modes) {
      for (const key of REQUIRED_THEME_TOKEN_KEYS) {
        const value = preset[mode][key]

        if (rgbaKeys.has(key)) {
          assert.match(value, /^(#[0-9a-fA-F]{6}|rgba\()/, `${preset.id}.${mode}.${key}`)
        } else if (key === "accentH") {
          assert.match(value, /^\d+$/, `${preset.id}.${mode}.${key}`)
        } else if (key === "accentS" || key === "accentL") {
          assert.match(value, /^\d+%$/, `${preset.id}.${mode}.${key}`)
        } else {
          assert.match(value, /^#[0-9a-fA-F]{6}$/, `${preset.id}.${mode}.${key}`)
        }
      }
    }
  }
})

test("themeCatalog derives accent HSL tokens from secondary hex colors when presets are canonical", () => {
  // Given
  const modes = ["light", "dark"] as const

  for (const preset of THEME_PRESETS) {
    for (const mode of modes) {
      const tokens = preset[mode]
      const hsl = hexToHsl(tokens.secondary)

      assert.equal(tokens.accentH, String(hsl.h), `${preset.id}.${mode}.accentH`)
      assert.equal(tokens.accentS, `${hsl.s}%`, `${preset.id}.${mode}.accentS`)
      assert.equal(tokens.accentL, `${hsl.l}%`, `${preset.id}.${mode}.accentL`)
    }
  }
})

test("themeCatalog generates scoped CSS from the canonical catalog when requested", () => {
  // Given
  const css = buildThemePresetCss(THEME_PRESETS)

  for (const id of EXPECTED_IDS) {
    assert.equal(
      (css.match(new RegExp(`:root\\[data-theme-preset='${id}'\\]`, "g")) ?? []).length,
      1,
    )
    assert.equal(
      (
        css.match(
          new RegExp(`:root\\[saved-theme='dark'\\]\\[data-theme-preset='${id}'\\]`, "g"),
        ) ?? []
      ).length,
      1,
    )
  }

  assert.doesNotMatch(css, /:root\s*\{\s*--light:/)
})

test("themeCatalog rejects malformed fixture data when a preset is duplicate or incomplete", () => {
  // Given
  const duplicate = {
    ...THEME_PRESETS[0],
    label: "Duplicate Linear",
  } satisfies ThemePreset

  const incomplete = {
    ...THEME_PRESETS[1],
    id: "raycast-incomplete",
    dark: {
      ...THEME_PRESETS[1].dark,
      secondary: "",
    },
  } satisfies ThemePreset

  // When
  const result = validateThemeCatalog([duplicate, duplicate, incomplete])

  // Then
  assert.equal(result.valid, false)
  assert.match(result.errors.join("\n"), /Duplicate theme preset id: linear/)
  assert.match(result.errors.join("\n"), /raycast-incomplete\.dark\.secondary is required/)
})
