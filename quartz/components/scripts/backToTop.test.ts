import assert from "node:assert"
import test, { describe } from "node:test"
import { runInNewContext } from "node:vm"
import { backToTopScript } from "./backToTop"

type ScrollRequest = Readonly<{
  top: number
  behavior: ScrollBehavior
}>

type ButtonState = {
  disabled: boolean
  visible: boolean
  ariaHidden: string
  attached: boolean
  label: string
  title: string
}

type Scenario = {
  readonly button: ButtonState
  readonly activeListeners: Readonly<{
    scroll: number
    resize: number
    click: number
  }>
  readonly scrollRequests: ScrollRequest[]
  navigate: () => void
  scrollTo: (position: number) => void
  resizeTo: (height: number) => void
  click: () => void
}

function createScenario(reducedMotion: boolean, hasButton = true, language = "en"): Scenario {
  const documentListeners = new Map<string, () => void>()
  const windowListeners = new Map<string, () => void>()
  const buttonListeners = new Map<string, () => void>()
  const activeListeners = { scroll: 0, resize: 0, click: 0 }
  const scrollRequests: ScrollRequest[] = []
  const button: ButtonState = {
    disabled: true,
    visible: false,
    ariaHidden: "true",
    attached: hasButton,
    label: "",
    title: "",
  }
  const buttonElement = {
    className: "",
    type: "",
    get disabled() {
      return button.disabled
    },
    set disabled(value: boolean) {
      button.disabled = value
    },
    get title() {
      return button.title
    },
    set title(value: string) {
      button.title = value
    },
    addEventListener: (name: string, listener: () => void) => {
      buttonListeners.set(name, listener)
      if (name === "click") activeListeners.click += 1
    },
    removeEventListener: (name: string, listener: () => void) => {
      if (buttonListeners.get(name) === listener) {
        buttonListeners.delete(name)
        if (name === "click") activeListeners.click -= 1
      }
    },
    append: () => undefined,
    setAttribute: (name: string, value: string) => {
      if (name === "aria-hidden") button.ariaHidden = value
      if (name === "aria-label") button.label = value
    },
    toggleAttribute: (_name: string, force: boolean) => {
      button.visible = force
    },
  }
  const windowState = {
    innerHeight: 800,
    scrollY: 0,
    addEventListener: (name: string, listener: () => void) => {
      windowListeners.set(name, listener)
      if (name === "scroll" || name === "resize") activeListeners[name] += 1
    },
    removeEventListener: (name: string, listener: () => void) => {
      if (windowListeners.get(name) === listener) {
        windowListeners.delete(name)
        if (name === "scroll" || name === "resize") activeListeners[name] -= 1
      }
    },
    matchMedia: () => ({ matches: reducedMotion }),
    scrollTo: (request: ScrollRequest) => scrollRequests.push(request),
  }

  runInNewContext(backToTopScript, {
    document: {
      addEventListener: (name: string, listener: () => void) =>
        documentListeners.set(name, listener),
      body: {
        append: () => {
          button.attached = true
        },
      },
      createElement: (tagName: string) =>
        tagName === "button" ? buttonElement : { setAttribute: () => undefined, textContent: "" },
      documentElement: { lang: language },
      querySelector: () => (button.attached ? buttonElement : null),
    },
    window: windowState,
  })

  return {
    button,
    activeListeners,
    scrollRequests,
    navigate: () => documentListeners.get("nav")?.(),
    scrollTo: (position) => {
      windowState.scrollY = position
      windowListeners.get("scroll")?.()
    },
    resizeTo: (height) => {
      windowState.innerHeight = height
      windowListeners.get("resize")?.()
    },
    click: () => buttonListeners.get("click")?.(),
  }
}

describe("back-to-top control", () => {
  test("shows after the reader scrolls through most of a viewport", () => {
    // Given
    const scenario = createScenario(false)
    scenario.navigate()

    // When
    scenario.scrollTo(700)

    // Then
    assert.deepEqual(scenario.button, {
      disabled: false,
      visible: true,
      ariaHidden: "false",
      attached: true,
      label: "",
      title: "",
    })
  })

  test("hides again when the reader returns near the top", () => {
    // Given
    const scenario = createScenario(false)
    scenario.navigate()
    scenario.scrollTo(700)

    // When
    scenario.scrollTo(100)

    // Then
    assert.deepEqual(scenario.button, {
      disabled: true,
      visible: false,
      ariaHidden: "true",
      attached: true,
      label: "",
      title: "",
    })
  })

  test("recalculates visibility when the viewport height changes", () => {
    // Given
    const scenario = createScenario(false)
    scenario.navigate()
    scenario.scrollTo(700)

    // When
    scenario.resizeTo(1000)

    // Then
    assert.equal(scenario.button.visible, false)
    assert.equal(scenario.button.disabled, true)
    assert.equal(scenario.button.ariaHidden, "true")
  })

  test("scrolls smoothly when motion is allowed", () => {
    // Given
    const scenario = createScenario(false)
    scenario.navigate()

    // When
    scenario.click()

    // Then
    assert.deepEqual(scenario.scrollRequests, [{ top: 0, behavior: "smooth" }])
  })

  test("avoids smooth motion when reduced motion is requested", () => {
    // Given
    const scenario = createScenario(true)
    scenario.navigate()

    // When
    scenario.click()

    // Then
    assert.deepEqual(scenario.scrollRequests, [{ top: 0, behavior: "auto" }])
  })

  test("does nothing when the layout omits the control", () => {
    // Given
    const scenario = createScenario(false, false)

    // When
    scenario.navigate()

    // Then
    assert.equal(scenario.button.attached, false)
    assert.deepEqual(scenario.scrollRequests, [])
  })

  test("keeps one active handler per event after repeated navigation", () => {
    // Given
    const scenario = createScenario(false)

    // When
    scenario.navigate()
    scenario.navigate()

    // Then
    assert.deepEqual(scenario.activeListeners, { scroll: 1, resize: 1, click: 1 })
  })
})
