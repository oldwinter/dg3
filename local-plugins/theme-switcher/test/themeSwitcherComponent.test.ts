import assert from "node:assert/strict"
import test from "node:test"

import render from "preact-render-to-string"

import { ThemeSwitcher } from "../dist/components/index.js"
import { THEME_PRESETS } from "../src/themes.ts"

test("ThemeSwitcher renders a labelled compact select with every preset option", () => {
  // Given
  const Component = ThemeSwitcher({
    defaultPreset: "linear",
    storageKey: "themePreset",
  })

  // When
  const html = render(
    Component({
      displayClass: "desktop-only",
      allFiles: [],
      cfg: {},
      children: [],
      ctx: {},
      externalResources: {},
      fileData: {},
      tree: {},
    }),
  )

  // Then
  assert.match(html, /class="[^"]*theme-switcher/)
  assert.match(html, /<label[^>]*for="theme-switcher-select"/)
  assert.match(html, /<select[^>]*id="theme-switcher-select"/)
  assert.match(html, /aria-label="Theme preset"/)

  for (const preset of THEME_PRESETS) {
    assert.match(html, new RegExp(`<option value="${preset.id}"[^>]*>${preset.label}</option>`))
  }

  const idMatches = html.match(/id="theme-switcher-select"/g) ?? []
  assert.equal(idMatches.length, 1)
})
