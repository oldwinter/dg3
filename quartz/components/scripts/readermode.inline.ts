// Check if device is mobile
const isMobile = () => {
  return window.innerWidth <= 800 // Using the same breakpoint as defined in variables.scss
}

// Load reader mode setting from localStorage or use default (false)
const getStoredReaderMode = (): boolean => {
  try {
    const stored = localStorage.getItem("reader-mode")
    return stored === "true"
  } catch {
    return false // Default: disabled
  }
}

// Save reader mode setting to localStorage
const saveReaderMode = (enabled: boolean) => {
  try {
    localStorage.setItem("reader-mode", enabled.toString())
  } catch {
    // Ignore storage errors
  }
}

// Set default reader mode based on stored preference or false as default
let isReaderMode = getStoredReaderMode()

const emitReaderModeChangeEvent = (mode: "on" | "off") => {
  const event: CustomEventMap["readermodechange"] = new CustomEvent("readermodechange", {
    detail: { mode },
  })
  document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
  const switchReaderMode = () => {
    isReaderMode = !isReaderMode
    const newMode = isReaderMode ? "on" : "off"
    document.documentElement.setAttribute("reader-mode", newMode)
    saveReaderMode(isReaderMode) // Save to localStorage
    emitReaderModeChangeEvent(newMode)
  }

  for (const readerModeButton of document.getElementsByClassName("readermode")) {
    readerModeButton.addEventListener("click", switchReaderMode)
    window.addCleanup(() => readerModeButton.removeEventListener("click", switchReaderMode))
  }

  // Set initial state
  document.documentElement.setAttribute("reader-mode", isReaderMode ? "on" : "off")
})
