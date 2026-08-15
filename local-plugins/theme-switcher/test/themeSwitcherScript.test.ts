import assert from "node:assert/strict"
import test from "node:test"
import vm from "node:vm"

import { JSDOM } from "jsdom"
import { ThemeSwitcher } from "../dist/components/index.js"
import { THEME_PRESET_IDS } from "../src/themes.ts"

type Listener = (event: Event) => void

type EventRecord = {
  readonly type: string
  readonly detail?: unknown
}

class MemoryLocalStorage {
  readonly values = new Map<string, string>()

  getItem(key: string): string | null {
    return this.values.get(key) ?? null
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value)
  }
}

class TestEvent extends Event {
  readonly detail?: unknown

  constructor(type: string, init?: CustomEventInit<unknown>) {
    super(type)
    this.detail = init?.detail
  }
}

function resetDom(): {
  readonly storage: MemoryLocalStorage
  readonly select: HTMLSelectElement
  readonly shuffleButton: HTMLButtonElement
  readonly records: EventRecord[]
  readonly makeEvent: (type: string) => Event
} {
  const dom = new JSDOM("<!doctype html><html><body></body></html>", {
    url: "https://example.test/",
  })
  const listeners = new Map<string, Set<Listener>>()
  const storage = new MemoryLocalStorage()
  const records: EventRecord[] = []
  const select = dom.window.document.createElement("select")
  select.className = "theme-switcher-select"
  select.dataset["themeSwitcher"] = ""
  select.innerHTML = THEME_PRESET_IDS.map(
    (preset) => `<option value="${preset}">${preset}</option>`,
  ).join("")
  const shuffleButton = dom.window.document.createElement("button")
  shuffleButton.dataset["themeShuffle"] = ""

  dom.window.document.body.replaceChildren(select, shuffleButton)
  dom.window.document.documentElement.removeAttribute("data-theme-preset")
  dom.window.document.documentElement.setAttribute("saved-theme", "dark")

  Object.defineProperty(dom.window, "localStorage", {
    value: storage,
  })
  Object.defineProperty(dom.window, "CustomEvent", {
    value: TestEvent,
  })
  Object.defineProperty(dom.window.document, "addEventListener", {
    configurable: true,
    value(type: string, listener: Listener): void {
      const typeListeners = listeners.get(type) ?? new Set<Listener>()
      typeListeners.add(listener)
      listeners.set(type, typeListeners)
    },
  })
  Object.defineProperty(dom.window.document, "removeEventListener", {
    configurable: true,
    value(type: string, listener: Listener): void {
      listeners.get(type)?.delete(listener)
    },
  })
  Object.defineProperty(dom.window.document, "dispatchEvent", {
    configurable: true,
    value(event: Event): boolean {
      records.push({ type: event.type, detail: "detail" in event ? event.detail : undefined })
      for (const listener of listeners.get(event.type) ?? []) {
        listener(event)
      }
      return true
    },
  })

  storage.setItem("theme", "dark")
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: dom.window,
  })
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: dom.window.document,
  })
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: storage,
  })
  Object.defineProperty(globalThis, "CustomEvent", {
    configurable: true,
    value: TestEvent,
  })
  Object.defineProperty(globalThis, "HTMLSelectElement", {
    configurable: true,
    value: dom.window.HTMLSelectElement,
  })
  Object.defineProperty(globalThis, "HTMLButtonElement", {
    configurable: true,
    value: dom.window.HTMLButtonElement,
  })
  return {
    storage,
    select,
    shuffleButton,
    records,
    makeEvent: (type: string) => new dom.window.Event(type, { bubbles: true }),
  }
}

type ScriptOptions = {
  readonly defaultPreset: string
  readonly storageKey: string
}

function runThemeSwitcherScript(
  options: ScriptOptions = {
    defaultPreset: "linear",
    storageKey: "themePreset",
  },
): void {
  const Component = ThemeSwitcher({
    defaultPreset: options.defaultPreset,
    storageKey: options.storageKey,
  })
  const script = `${Component.beforeDOMLoaded ?? ""}\n${Component.afterDOMLoaded ?? ""}`
  vm.runInThisContext(script)
}

test("themeSwitcher script defaults to linear when storage is empty", () => {
  // Given
  const { storage, select } = resetDom()

  // When
  runThemeSwitcherScript()

  // Then
  assert.equal(document.documentElement.dataset["themePreset"], "linear")
  assert.equal(storage.getItem("themePreset"), "linear")
  assert.equal(select.value, "linear")
})

test("themeSwitcher script clamps malformed stored presets and tolerates a missing control", () => {
  // Given
  const { storage } = resetDom()
  storage.setItem("themePreset", "not-a-theme")
  document.body.replaceChildren()

  assert.doesNotThrow(() => runThemeSwitcherScript())
  assert.equal(document.documentElement.dataset["themePreset"], "linear")
  assert.equal(storage.getItem("themePreset"), "linear")
})

test("themeSwitcher script persists raycast changes and leaves darkmode state untouched", () => {
  // Given
  const { storage, select, records, makeEvent } = resetDom()
  runThemeSwitcherScript()
  records.length = 0

  // When
  select.value = "raycast"
  select.dispatchEvent(makeEvent("change"))

  // Then
  const presetEvents = records.filter((record) => record.type === "themepresetchange")
  assert.equal(document.documentElement.dataset["themePreset"], "raycast")
  assert.equal(storage.getItem("themePreset"), "raycast")
  assert.equal(select.value, "raycast")
  assert.equal(presetEvents.length, 1)
  assert.deepEqual(presetEvents[0]?.detail, { preset: "raycast" })
  assert.equal(document.documentElement.getAttribute("saved-theme"), "dark")
  assert.equal(storage.getItem("theme"), "dark")
})

test("themeSwitcher script switches to another preset when the random action is clicked", () => {
  // Given
  const { storage, select, shuffleButton, records, makeEvent } = resetDom()
  runThemeSwitcherScript()
  records.length = 0
  const originalRandom = Math.random
  Math.random = () => 0

  try {
    // When
    shuffleButton.dispatchEvent(makeEvent("click"))
  } finally {
    Math.random = originalRandom
  }

  // Then
  const presetEvents = records.filter((record) => record.type === "themepresetchange")
  assert.equal(document.documentElement.dataset["themePreset"], "raycast")
  assert.equal(storage.getItem("themePreset"), "raycast")
  assert.equal(select.value, "raycast")
  assert.equal(presetEvents.length, 1)
  assert.deepEqual(presetEvents[0]?.detail, { preset: "raycast" })
  assert.equal(document.documentElement.getAttribute("saved-theme"), "dark")
  assert.equal(storage.getItem("theme"), "dark")
})

test("themeSwitcher script enables the random action after setup", () => {
  // Given
  const { shuffleButton } = resetDom()
  shuffleButton.disabled = true

  // When
  runThemeSwitcherScript()

  // Then
  assert.equal(shuffleButton.disabled, false)
})

test("themeSwitcher script excludes the visibly active preset when storage changed elsewhere", () => {
  // Given
  const { storage, shuffleButton, makeEvent } = resetDom()
  runThemeSwitcherScript()
  document.documentElement.dataset["themePreset"] = "linear"
  storage.setItem("themePreset", "raycast")
  const originalRandom = Math.random
  Math.random = () => 0

  try {
    // When
    shuffleButton.dispatchEvent(makeEvent("click"))
  } finally {
    Math.random = originalRandom
  }

  // Then
  assert.equal(document.documentElement.dataset["themePreset"], "raycast")
})

test("themeSwitcher script rebinding on nav and render does not duplicate change listeners", () => {
  // Given
  const { select, records, makeEvent } = resetDom()
  runThemeSwitcherScript()
  document.dispatchEvent(makeEvent("nav"))
  document.dispatchEvent(makeEvent("render"))
  document.dispatchEvent(makeEvent("nav"))
  records.length = 0

  // When
  select.value = "raycast"
  select.dispatchEvent(makeEvent("change"))

  // Then
  assert.equal(records.filter((record) => record.type === "themepresetchange").length, 1)
})

test("themeSwitcher script rebinding on nav and render does not duplicate random listeners", () => {
  // Given
  const { shuffleButton, records, makeEvent } = resetDom()
  runThemeSwitcherScript()
  document.dispatchEvent(makeEvent("nav"))
  document.dispatchEvent(makeEvent("render"))
  document.dispatchEvent(makeEvent("nav"))
  records.length = 0

  // When
  shuffleButton.dispatchEvent(makeEvent("click"))

  // Then
  assert.equal(records.filter((record) => record.type === "themepresetchange").length, 1)
})

test("themeSwitcher script treats quote and statement characters in storageKey as data", () => {
  // Given
  const { storage } = resetDom()
  const unsafeStorageKey = `themePreset";globalThis.__themeSwitcherInjected=true;//`

  // When
  runThemeSwitcherScript({ defaultPreset: "linear", storageKey: unsafeStorageKey })

  // Then
  assert.equal(Reflect.get(globalThis, "__themeSwitcherInjected"), undefined)
  assert.equal(storage.getItem(unsafeStorageKey), "linear")
})

test("themeSwitcher script treats quote and statement characters in defaultPreset as data", () => {
  // Given
  resetDom()
  const unsafeDefaultPreset = `linear";globalThis.__themeSwitcherDefaultInjected=true;//`

  // When
  runThemeSwitcherScript({
    defaultPreset: unsafeDefaultPreset,
    storageKey: "themePresetDefaultProbe",
  })

  // Then
  assert.equal(Reflect.get(globalThis, "__themeSwitcherDefaultInjected"), undefined)
})
