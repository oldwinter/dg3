;(() => {
  const presets = __THEME_SWITCHER_PRESETS__
  const defaultPreset = "__THEME_SWITCHER_DEFAULT__"
  const storageKey = "__THEME_SWITCHER_STORAGE_KEY__"
  const controlSelector = "[data-theme-switcher]"
  const shuffleSelector = "[data-theme-shuffle]"
  const changeHandlerProperty = "__themeSwitcherChangeHandler"
  const shuffleHandlerProperty = "__themeSwitcherShuffleHandler"
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
      const existing = control[changeHandlerProperty]
      if (existing) {
        control.removeEventListener("change", existing)
      }
      const handler = () => {
        const selectedPreset = isValidPreset(control.value) ? control.value : defaultPreset
        applyPreset(selectedPreset, true)
      }
      control[changeHandlerProperty] = handler
      control.addEventListener("change", handler)
      window.addCleanup?.(() => control.removeEventListener("change", handler))
    }
    for (const control of document.querySelectorAll(shuffleSelector)) {
      if (!(control instanceof HTMLButtonElement)) {
        continue
      }
      const existing = control[shuffleHandlerProperty]
      if (existing) {
        control.removeEventListener("click", existing)
      }
      const handler = () => {
        const renderedPreset = document.documentElement.dataset.themePreset
        const currentPreset = isValidPreset(renderedPreset) ? renderedPreset : readPreset()
        const alternatives = presets.filter((preset) => preset !== currentPreset)
        const selectedPreset = alternatives[Math.floor(Math.random() * alternatives.length)]
        applyPreset(selectedPreset, true)
      }
      control[shuffleHandlerProperty] = handler
      control.addEventListener("click", handler)
      control.disabled = false
      window.addCleanup?.(() => control.removeEventListener("click", handler))
    }
  }
  readPreset()
  setupThemeSwitcher()
  document.addEventListener("nav", setupThemeSwitcher)
  document.addEventListener("render", setupThemeSwitcher)
})()
