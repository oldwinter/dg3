import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  THEME_PRESET_IDS,
  buildThemePresetCss,
  findThemeCssGuardViolations,
} from "../src/themes.ts"

const STYLE_PATH = new URL("../src/components/styles/themeSwitcher.scss", import.meta.url)

function countMatches(text: string, pattern: RegExp): number {
  return (text.match(pattern) ?? []).length
}

function blockFor(css: string, selector: string): string {
  const pattern = new RegExp(
    `${selector.replaceAll("[", "\\[").replaceAll("]", "\\]")}\\s*\\{([^}]*)\\}`,
  )
  return pattern.exec(css)?.[1] ?? ""
}

test("themeCss emits exactly one scoped light and dark selector for every preset", () => {
  // Given
  const css = buildThemePresetCss()

  for (const id of THEME_PRESET_IDS) {
    // When
    const lightSelector = `:root[data-theme-preset='${id}']`
    const darkSelector = `:root[saved-theme='dark'][data-theme-preset='${id}']`

    // Then
    assert.equal(
      countMatches(
        css,
        new RegExp(`${lightSelector.replaceAll("[", "\\[").replaceAll("]", "\\]")}\\s*\\{`, "g"),
      ),
      1,
      id,
    )
    assert.equal(
      countMatches(
        css,
        new RegExp(`${darkSelector.replaceAll("[", "\\[").replaceAll("]", "\\]")}\\s*\\{`, "g"),
      ),
      1,
      id,
    )
  }
})

test("themeCss includes accent HSL overrides inside every scoped block", () => {
  // Given
  const css = buildThemePresetCss()
  const accentTokens = ["--accent-h", "--accent-s", "--accent-l"] as const

  for (const id of THEME_PRESET_IDS) {
    // When
    const blocks = [
      blockFor(css, `:root[data-theme-preset='${id}']`),
      blockFor(css, `:root[saved-theme='dark'][data-theme-preset='${id}']`),
    ] as const

    // Then
    for (const block of blocks) {
      for (const token of accentTokens) {
        assert.match(block, new RegExp(`${token}:\\s*[^;]+;`), `${id} ${token}`)
      }
    }
  }
})

test("themeCss guard rejects unscoped root theme overrides", () => {
  // Given
  const badCss = ":root { --light: #ffffff; }"

  // When
  const violations = findThemeCssGuardViolations(badCss)

  // Then
  assert.deepEqual(violations, ["unscoped Quartz theme override"])
})

test("themeCss contains no logos, image URLs, remote fonts, or external assets", () => {
  // Given
  const css = buildThemePresetCss()

  // When
  const violations = findThemeCssGuardViolations(css)

  // Then
  assert.deepEqual(violations, [])
  assert.doesNotMatch(css, /:root\s*\{\s*--light:/)
  assert.doesNotMatch(css, /:root\s*\{--light:/)
})

test("themeCss component styles cover stable toolbar interaction states", () => {
  // Given
  const style = readFileSync(STYLE_PATH, "utf8")

  // Then
  assert.match(style, /\.theme-switcher\s*\{/)
  assert.match(style, /--theme-switcher-/)
  assert.match(style, /:hover/)
  assert.match(style, /:focus-visible/)
  assert.match(style, /:disabled/)
  assert.match(style, /min-inline-size/)
  assert.match(style, /inline-size:\s*min\(/)
  assert.match(style, /box-sizing:\s*border-box/)
  assert.match(style, /@media\s*\(max-width:\s*600px\)/)
})

test("themeCss mobile switcher stays compact enough for the Quartz toolbar", () => {
  // Given
  const style = readFileSync(STYLE_PATH, "utf8")

  // When
  const mobileSelectRule =
    /@media\s*\(max-width:\s*600px\)\s*\{[\s\S]*?\.theme-switcher-select\s*\{(?<rule>[\s\S]*?)\n\s*\}/.exec(
      style,
    )?.groups?.["rule"] ?? ""

  // Then
  assert.match(mobileSelectRule, /inline-size:\s*min\(6rem,\s*30vw\)/)
  assert.match(mobileSelectRule, /min-inline-size:\s*var\(--theme-switcher-size\)/)
  assert.match(mobileSelectRule, /padding-inline-start:\s*1\.25rem/)
  assert.match(mobileSelectRule, /padding-inline-end:\s*1\.125rem/)
})
