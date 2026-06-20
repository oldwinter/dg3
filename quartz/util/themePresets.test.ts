import assert from "node:assert"
import test, { describe } from "node:test"
import { joinStyles } from "./theme"
import {
  getThemePreset,
  getThemePresetFromEnvironment,
  quartzThemePresets,
  themePresetNames,
  UnknownThemePresetError,
} from "./themePresets"

describe("theme presets", () => {
  test("defines six complete light and dark Quartz theme sets", () => {
    assert.strictEqual(themePresetNames.length, 6)

    for (const name of themePresetNames) {
      const preset = getThemePreset(name)
      for (const mode of ["lightMode", "darkMode"] as const) {
        assert.deepStrictEqual(Object.keys(preset.colors[mode]).sort(), [
          "dark",
          "darkgray",
          "gray",
          "highlight",
          "light",
          "lightgray",
          "secondary",
          "tertiary",
          "textHighlight",
        ])
      }
    }
  })

  test("keeps oldwinter compatible with the existing CSS variable contract", () => {
    const css = joinStyles(quartzThemePresets.oldwinter, "")

    assert(css.includes(":root {"))
    assert(css.includes(':root[saved-theme="dark"] {'))
    assert(css.includes("--light: #faf8f7;"))
    assert(css.includes("--secondary: #28546a;"))
    assert(css.includes("--light: #151716;"))
    assert(css.includes("--secondary: #8ab2c4;"))
  })

  test("resolves a named theme preset from QUARTZ_THEME", () => {
    const preset = getThemePresetFromEnvironment({ QUARTZ_THEME: "sakura" })

    assert.strictEqual(preset, quartzThemePresets.sakura)
  })

  test("leaves the YAML theme active when QUARTZ_THEME is unset", () => {
    const preset = getThemePresetFromEnvironment({})

    assert.strictEqual(preset, undefined)
  })

  test("rejects unknown theme preset names", () => {
    assert.throws(() => getThemePreset("missing"), UnknownThemePresetError)
    assert.throws(
      () => getThemePreset("missing"),
      /Unknown Quartz theme preset "missing". Expected one of: oldwinter, ink, mist, ember, atlas, sakura/,
    )
  })
})
