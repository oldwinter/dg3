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
  assert.match(html, /<button[^>]*data-theme-shuffle/)
  assert.match(html, /<button[^>]*aria-label="Try another theme"/)
  assert.match(html, /<button[^>]*disabled/)

  for (const preset of THEME_PRESETS) {
    assert.match(html, new RegExp(`<option value="${preset.id}"[^>]*>${preset.label}</option>`))
  }

  const idMatches = html.match(/id="theme-switcher-select"/g) ?? []
  assert.equal(idMatches.length, 1)

  const localizedHtml = render(
    Component({
      displayClass: "desktop-only",
      allFiles: [],
      cfg: { locale: "zh-CN" },
      children: [],
      ctx: {},
      externalResources: {},
      fileData: {},
      tree: {},
    }),
  )
  assert.match(localizedHtml, /aria-label="主题预设"/)
  assert.match(localizedHtml, /aria-label="换个主题"/)
})
