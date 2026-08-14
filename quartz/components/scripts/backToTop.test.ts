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
  readonly scrollRequests: ScrollRequest[]
  navigate: () => void
  scrollTo: (position: number) => void
  click: () => void
}

function createScenario(reducedMotion: boolean, hasButton = true, language = "en"): Scenario {
  const documentListeners = new Map<string, () => void>()
  const windowListeners = new Map<string, () => void>()
  const buttonListeners = new Map<string, () => void>()
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
    addEventListener: (name: string, listener: () => void) => buttonListeners.set(name, listener),
    removeEventListener: (name: string, listener: () => void) => {
      if (buttonListeners.get(name) === listener) buttonListeners.delete(name)
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
    addEventListener: (name: string, listener: () => void) => windowListeners.set(name, listener),
    removeEventListener: (name: string, listener: () => void) => {
      if (windowListeners.get(name) === listener) windowListeners.delete(name)
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
    scrollRequests,
    navigate: () => documentListeners.get("nav")?.(),
    scrollTo: (position) => {
      windowState.scrollY = position
      windowListeners.get("scroll")?.()
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

  test("creates a localized accessible control when the page has none", () => {
    // Given
    const scenario = createScenario(false, false, "zh")

    // When
    scenario.navigate()

    // Then
    assert.equal(scenario.button.attached, true)
    assert.equal(scenario.button.label, "返回顶部")
    assert.equal(scenario.button.title, "返回顶部")
  })
})
