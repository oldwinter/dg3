;(() => {
  const presets = __THEME_SWITCHER_PRESETS__
  const defaultPreset = "__THEME_SWITCHER_DEFAULT__"
  const storageKey = "__THEME_SWITCHER_STORAGE_KEY__"
  const controlSelector = "[data-theme-switcher]"
  const handlerProperty = "__themeSwitcherChangeHandler"
  const isValidPreset = (preset) => presets.includes(preset)
  const readPreset = () => {
    const storedPreset = localStorage.getItem(storageKey)
    const preset = isValidPreset(storedPreset) ? storedPreset : defaultPreset
    document.documentElement.dataset.themePreset = preset
    if (storedPreset !== preset) {
      localStorage.setItem(storageKey, preset)
    }
    return preset
  }
  const syncControls = (preset) => {
    for (const control of document.querySelectorAll(controlSelector)) {
      if (control instanceof HTMLSelectElement && control.value !== preset) {
        control.value = preset
      }
    }
  }
  const applyPreset = (preset, dispatchChange) => {
    document.documentElement.dataset.themePreset = preset
    localStorage.setItem(storageKey, preset)
    syncControls(preset)
    if (dispatchChange) {
      document.dispatchEvent(new CustomEvent("themepresetchange", { detail: { preset } }))
    }
  }
  const setupThemeSwitcher = () => {
    const preset = readPreset()
    syncControls(preset)
    for (const control of document.querySelectorAll(controlSelector)) {
      if (!(control instanceof HTMLSelectElement)) {
        continue
      }
      const existing = control[handlerProperty]
      if (existing) {
        control.removeEventListener("change", existing)
      }
      const handler = () => {
        const selectedPreset = isValidPreset(control.value) ? control.value : defaultPreset
        applyPreset(selectedPreset, true)
      }
      control[handlerProperty] = handler
      control.addEventListener("change", handler)
      window.addCleanup?.(() => control.removeEventListener("change", handler))
    }
  }
  readPreset()
  setupThemeSwitcher()
  document.addEventListener("nav", setupThemeSwitcher)
  document.addEventListener("render", setupThemeSwitcher)
})()
