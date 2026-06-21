// src/themes.ts
var REQUIRED_THEME_TOKEN_KEYS = [
  "light",
  "lightgray",
  "gray",
  "darkgray",
  "dark",
  "secondary",
  "tertiary",
  "highlight",
  "textHighlight",
  "accentH",
  "accentS",
  "accentL"
];
var THEME_MODES = ["light", "dark"];
var UNSCOPED_ROOT_THEME_OVERRIDE_PATTERN = /:root\s*\{\s*--(?:light|lightgray|gray|darkgray|dark|secondary|tertiary|highlight|textHighlight|accent-h|accent-s|accent-l)\s*:/;
var EXTERNAL_ASSET_PATTERN = /(@import|@font-face|url\(|https?:\/\/|\blogo\b)/i;
var HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;
var THEME_PRESETS = [
  {
    id: "linear",
    label: "Linear",
    description: "Engineered graphite and cool indigo for focused reading.",
    previewAccent: "#5e6ad2",
    light: {
      light: "#f7f8f8",
      lightgray: "#eceef1",
      gray: "#9aa3af",
      darkgray: "#3f4652",
      dark: "#15171c",
      secondary: "#5e6ad2",
      tertiary: "#7170ff",
      highlight: "rgba(94, 106, 210, 0.14)",
      textHighlight: "rgba(94, 106, 210, 0.22)",
      accentH: "234",
      accentS: "56%",
      accentL: "60%"
    },
    dark: {
      light: "#08090a",
      lightgray: "#191a1b",
      gray: "#62666d",
      darkgray: "#d0d6e0",
      dark: "#f7f8f8",
      secondary: "#828fff",
      tertiary: "#5e6ad2",
      highlight: "rgba(130, 143, 255, 0.18)",
      textHighlight: "rgba(130, 143, 255, 0.28)",
      accentH: "234",
      accentS: "100%",
      accentL: "75%"
    }
  },
  {
    id: "raycast",
    label: "Raycast",
    description: "Near-black utility chrome with precise blue interaction.",
    previewAccent: "#ff6363",
    light: {
      light: "#f9f9f9",
      lightgray: "#e8ecef",
      gray: "#9c9c9d",
      darkgray: "#34383c",
      dark: "#18191a",
      secondary: "#55b3ff",
      tertiary: "#ff6363",
      highlight: "rgba(85, 179, 255, 0.16)",
      textHighlight: "rgba(255, 99, 99, 0.24)",
      accentH: "207",
      accentS: "100%",
      accentL: "67%"
    },
    dark: {
      light: "#07080a",
      lightgray: "#101111",
      gray: "#6a6b6c",
      darkgray: "#cecece",
      dark: "#f9f9f9",
      secondary: "#55b3ff",
      tertiary: "#ff6363",
      highlight: "rgba(85, 179, 255, 0.18)",
      textHighlight: "rgba(255, 99, 99, 0.26)",
      accentH: "207",
      accentS: "100%",
      accentL: "67%"
    }
  },
  {
    id: "apple",
    label: "Apple",
    description: "Gallery-neutral clarity with thin chrome and action blue.",
    previewAccent: "#0071e3",
    light: {
      light: "#ffffff",
      lightgray: "#f5f5f7",
      gray: "#86868b",
      darkgray: "#424245",
      dark: "#1d1d1f",
      secondary: "#0071e3",
      tertiary: "#0066cc",
      highlight: "rgba(0, 113, 227, 0.12)",
      textHighlight: "rgba(0, 113, 227, 0.2)",
      accentH: "210",
      accentS: "100%",
      accentL: "45%"
    },
    dark: {
      light: "#000000",
      lightgray: "#272729",
      gray: "#6e6e73",
      darkgray: "#d2d2d7",
      dark: "#ffffff",
      secondary: "#2997ff",
      tertiary: "#0071e3",
      highlight: "rgba(41, 151, 255, 0.18)",
      textHighlight: "rgba(41, 151, 255, 0.28)",
      accentH: "209",
      accentS: "100%",
      accentL: "58%"
    }
  },
  {
    id: "notion",
    label: "Notion",
    description: "Warm paper surfaces with whisper borders and blue links.",
    previewAccent: "#0075de",
    light: {
      light: "#ffffff",
      lightgray: "#f6f5f4",
      gray: "#a39e98",
      darkgray: "#615d59",
      dark: "#31302e",
      secondary: "#0075de",
      tertiary: "#2a9d99",
      highlight: "rgba(0, 117, 222, 0.12)",
      textHighlight: "rgba(0, 117, 222, 0.2)",
      accentH: "208",
      accentS: "100%",
      accentL: "44%"
    },
    dark: {
      light: "#31302e",
      lightgray: "#3d3a36",
      gray: "#a39e98",
      darkgray: "#f0eee6",
      dark: "#ffffff",
      secondary: "#62aef0",
      tertiary: "#2a9d99",
      highlight: "rgba(98, 174, 240, 0.18)",
      textHighlight: "rgba(98, 174, 240, 0.28)",
      accentH: "208",
      accentS: "83%",
      accentL: "66%"
    }
  },
  {
    id: "vercel",
    label: "Vercel",
    description: "Monochrome infrastructure minimalism with crisp blue focus.",
    previewAccent: "#0072f5",
    light: {
      light: "#ffffff",
      lightgray: "#fafafa",
      gray: "#808080",
      darkgray: "#4d4d4d",
      dark: "#171717",
      secondary: "#0072f5",
      tertiary: "#171717",
      highlight: "rgba(0, 114, 245, 0.12)",
      textHighlight: "rgba(0, 114, 245, 0.2)",
      accentH: "212",
      accentS: "100%",
      accentL: "48%"
    },
    dark: {
      light: "#000000",
      lightgray: "#171717",
      gray: "#666666",
      darkgray: "#ebebeb",
      dark: "#ffffff",
      secondary: "#2997ff",
      tertiary: "#fafafa",
      highlight: "rgba(41, 151, 255, 0.16)",
      textHighlight: "rgba(41, 151, 255, 0.28)",
      accentH: "209",
      accentS: "100%",
      accentL: "58%"
    }
  },
  {
    id: "claude",
    label: "Claude",
    description: "Parchment warmth, charcoal text, and terracotta accents.",
    previewAccent: "#c96442",
    light: {
      light: "#f5f4ed",
      lightgray: "#faf9f5",
      gray: "#87867f",
      darkgray: "#5e5d59",
      dark: "#141413",
      secondary: "#c96442",
      tertiary: "#d97757",
      highlight: "rgba(201, 100, 66, 0.14)",
      textHighlight: "rgba(201, 100, 66, 0.24)",
      accentH: "15",
      accentS: "56%",
      accentL: "52%"
    },
    dark: {
      light: "#141413",
      lightgray: "#30302e",
      gray: "#87867f",
      darkgray: "#b0aea5",
      dark: "#faf9f5",
      secondary: "#d97757",
      tertiary: "#c96442",
      highlight: "rgba(217, 119, 87, 0.18)",
      textHighlight: "rgba(217, 119, 87, 0.3)",
      accentH: "15",
      accentS: "63%",
      accentL: "60%"
    }
  },
  {
    id: "stripe",
    label: "Stripe",
    description: "Deep navy text and premium purple financial precision.",
    previewAccent: "#533afd",
    light: {
      light: "#ffffff",
      lightgray: "#f6f9fc",
      gray: "#64748d",
      darkgray: "#273951",
      dark: "#061b31",
      secondary: "#533afd",
      tertiary: "#4434d4",
      highlight: "rgba(83, 58, 253, 0.12)",
      textHighlight: "rgba(83, 58, 253, 0.22)",
      accentH: "248",
      accentS: "98%",
      accentL: "61%"
    },
    dark: {
      light: "#0d253d",
      lightgray: "#1c1e54",
      gray: "#8ea0bd",
      darkgray: "#d6d9fc",
      dark: "#ffffff",
      secondary: "#665efd",
      tertiary: "#b9b9f9",
      highlight: "rgba(102, 94, 253, 0.18)",
      textHighlight: "rgba(102, 94, 253, 0.3)",
      accentH: "243",
      accentS: "98%",
      accentL: "68%"
    }
  },
  {
    id: "figma",
    label: "Figma",
    description: "Binary black-and-white interface with selection clarity.",
    previewAccent: "#000000",
    light: {
      light: "#ffffff",
      lightgray: "#f4f4f4",
      gray: "#8a8a8a",
      darkgray: "#333333",
      dark: "#000000",
      secondary: "#000000",
      tertiary: "#555555",
      highlight: "rgba(0, 0, 0, 0.08)",
      textHighlight: "rgba(0, 0, 0, 0.14)",
      accentH: "0",
      accentS: "0%",
      accentL: "0%"
    },
    dark: {
      light: "#000000",
      lightgray: "#1f1f1f",
      gray: "#8a8a8a",
      darkgray: "#f4f4f4",
      dark: "#ffffff",
      secondary: "#ffffff",
      tertiary: "#d6d6d6",
      highlight: "rgba(255, 255, 255, 0.16)",
      textHighlight: "rgba(255, 255, 255, 0.24)",
      accentH: "0",
      accentS: "0%",
      accentL: "100%"
    }
  },
  {
    id: "spotify",
    label: "Spotify",
    description: "Immersive charcoal layers with functional green selection.",
    previewAccent: "#1ed760",
    light: {
      light: "#fdfdfd",
      lightgray: "#eeeeee",
      gray: "#7c7c7c",
      darkgray: "#4d4d4d",
      dark: "#121212",
      secondary: "#1ed760",
      tertiary: "#1db954",
      highlight: "rgba(30, 215, 96, 0.12)",
      textHighlight: "rgba(30, 215, 96, 0.22)",
      accentH: "141",
      accentS: "76%",
      accentL: "48%"
    },
    dark: {
      light: "#121212",
      lightgray: "#181818",
      gray: "#7c7c7c",
      darkgray: "#b3b3b3",
      dark: "#ffffff",
      secondary: "#1ed760",
      tertiary: "#1db954",
      highlight: "rgba(30, 215, 96, 0.16)",
      textHighlight: "rgba(30, 215, 96, 0.28)",
      accentH: "141",
      accentS: "76%",
      accentL: "48%"
    }
  },
  {
    id: "tesla",
    label: "Tesla",
    description: "Radical subtraction with carbon text and electric blue.",
    previewAccent: "#3e6ae1",
    light: {
      light: "#ffffff",
      lightgray: "#f4f4f4",
      gray: "#8e8e8e",
      darkgray: "#393c41",
      dark: "#171a20",
      secondary: "#3e6ae1",
      tertiary: "#5c5e62",
      highlight: "rgba(62, 106, 225, 0.12)",
      textHighlight: "rgba(62, 106, 225, 0.22)",
      accentH: "224",
      accentS: "73%",
      accentL: "56%"
    },
    dark: {
      light: "#171a20",
      lightgray: "#23262c",
      gray: "#8e8e8e",
      darkgray: "#d0d1d2",
      dark: "#ffffff",
      secondary: "#6f8dff",
      tertiary: "#3e6ae1",
      highlight: "rgba(111, 141, 255, 0.16)",
      textHighlight: "rgba(111, 141, 255, 0.28)",
      accentH: "228",
      accentS: "100%",
      accentL: "72%"
    }
  }
];
var THEME_PRESET_IDS = THEME_PRESETS.map(
  (preset) => preset.id
);
function hexToHsl(hex) {
  const match = HEX_COLOR_PATTERN.exec(hex);
  if (!match) {
    return { h: 0, s: 0, l: 0 };
  }
  const value = hex.slice(1);
  const r2 = Number.parseInt(value.slice(0, 2), 16) / 255;
  const g2 = Number.parseInt(value.slice(2, 4), 16) / 255;
  const b2 = Number.parseInt(value.slice(4, 6), 16) / 255;
  const max = Math.max(r2, g2, b2);
  const min = Math.min(r2, g2, b2);
  const l2 = (max + min) / 2;
  if (max === min) {
    return { h: 0, s: 0, l: Math.round(l2 * 100) };
  }
  const delta = max - min;
  const s2 = l2 > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  const h2 = hueFromRgbMax({ r: r2, g: g2, b: b2, max, delta });
  return { h: Math.round(h2 * 360), s: Math.round(s2 * 100), l: Math.round(l2 * 100) };
}
function validateThemeCatalog(presets) {
  const errors = [];
  const ids = /* @__PURE__ */ new Set();
  const labels = /* @__PURE__ */ new Set();
  for (const preset of presets) {
    addUniqueValueError(errors, ids, preset.id, "id");
    addUniqueValueError(errors, labels, preset.label, "label");
    validatePreset(errors, preset);
  }
  return { valid: errors.length === 0, errors };
}
function buildThemePresetCss(presets = THEME_PRESETS) {
  const result = validateThemeCatalog(presets);
  if (!result.valid) {
    throw new ThemeCatalogError(result.errors);
  }
  const css = presets.flatMap((preset) => THEME_MODES.map((mode) => buildThemeBlock(preset, mode))).join("\n\n");
  const violations = findThemeCssGuardViolations(css);
  if (violations.length > 0) {
    throw new ThemeCatalogError(violations);
  }
  return css;
}
function findThemeCssGuardViolations(css) {
  const violations = [];
  if (UNSCOPED_ROOT_THEME_OVERRIDE_PATTERN.test(css)) {
    violations.push("unscoped Quartz theme override");
  }
  if (EXTERNAL_ASSET_PATTERN.test(css)) {
    violations.push("external asset reference");
  }
  return violations;
}
var ThemeCatalogError = class extends Error {
  errors;
  constructor(errors) {
    super(`Invalid theme catalog: ${errors.join("; ")}`);
    this.name = "ThemeCatalogError";
    this.errors = errors;
  }
};
function hueFromRgbMax(values) {
  const { r: r2, g: g2, b: b2, max, delta } = values;
  if (max === r2) {
    return ((g2 - b2) / delta + (g2 < b2 ? 6 : 0)) / 6;
  }
  if (max === g2) {
    return ((b2 - r2) / delta + 2) / 6;
  }
  return ((r2 - g2) / delta + 4) / 6;
}
function addUniqueValueError(errors, seen, value, label) {
  if (seen.has(value)) {
    errors.push(`Duplicate theme preset ${label}: ${value}`);
    return;
  }
  seen.add(value);
}
function validatePreset(errors, preset) {
  validateHexValue(errors, preset.previewAccent, `${preset.id}.previewAccent`);
  for (const mode of THEME_MODES) {
    const tokens = preset[mode];
    for (const key of REQUIRED_THEME_TOKEN_KEYS) {
      const value = tokens[key];
      if (value.trim() === "") {
        errors.push(`${preset.id}.${mode}.${key} is required`);
      }
    }
    validateHexValue(errors, tokens.secondary, `${preset.id}.${mode}.secondary`);
    validateAccentTokens(errors, preset.id, mode, tokens);
  }
}
function validateHexValue(errors, value, path) {
  if (!HEX_COLOR_PATTERN.test(value)) {
    errors.push(`${path} must be a 6-digit hex color`);
  }
}
function validateAccentTokens(errors, presetId, mode, tokens) {
  const hsl = hexToHsl(tokens.secondary);
  const expected = {
    accentH: String(hsl.h),
    accentS: `${hsl.s}%`,
    accentL: `${hsl.l}%`
  };
  for (const key of ["accentH", "accentS", "accentL"]) {
    if (tokens[key] !== expected[key]) {
      errors.push(`${presetId}.${mode}.${key} must match ${tokens.secondary}`);
    }
  }
}
function buildThemeBlock(preset, mode) {
  const selector = mode === "light" ? `:root[data-theme-preset='${preset.id}']` : `:root[saved-theme='dark'][data-theme-preset='${preset.id}']`;
  const declarations = REQUIRED_THEME_TOKEN_KEYS.map(
    (key) => `  --${cssTokenName(key)}: ${preset[mode][key]};`
  );
  return `${selector} {
${declarations.join("\n")}
}`;
}
function cssTokenName(key) {
  if (key === "textHighlight") {
    return "textHighlight";
  }
  if (key === "accentH") {
    return "accent-h";
  }
  if (key === "accentS") {
    return "accent-s";
  }
  if (key === "accentL") {
    return "accent-l";
  }
  return key;
}

// src/components/scripts/themeSwitcher.inline.ts?raw
var themeSwitcher_inline_default = ';(() => {\n  const presets = __THEME_SWITCHER_PRESETS__\n  const defaultPreset = "__THEME_SWITCHER_DEFAULT__"\n  const storageKey = "__THEME_SWITCHER_STORAGE_KEY__"\n  const controlSelector = "[data-theme-switcher]"\n  const handlerProperty = "__themeSwitcherChangeHandler"\n  const isValidPreset = (preset) => presets.includes(preset)\n  const readPreset = () => {\n    const storedPreset = localStorage.getItem(storageKey)\n    const preset = isValidPreset(storedPreset) ? storedPreset : defaultPreset\n    document.documentElement.dataset.themePreset = preset\n    if (storedPreset !== preset) {\n      localStorage.setItem(storageKey, preset)\n    }\n    return preset\n  }\n  const syncControls = (preset) => {\n    for (const control of document.querySelectorAll(controlSelector)) {\n      if (control instanceof HTMLSelectElement && control.value !== preset) {\n        control.value = preset\n      }\n    }\n  }\n  const applyPreset = (preset, dispatchChange) => {\n    document.documentElement.dataset.themePreset = preset\n    localStorage.setItem(storageKey, preset)\n    syncControls(preset)\n    if (dispatchChange) {\n      document.dispatchEvent(new CustomEvent("themepresetchange", { detail: { preset } }))\n    }\n  }\n  const setupThemeSwitcher = () => {\n    const preset = readPreset()\n    syncControls(preset)\n    for (const control of document.querySelectorAll(controlSelector)) {\n      if (!(control instanceof HTMLSelectElement)) {\n        continue\n      }\n      const existing = control[handlerProperty]\n      if (existing) {\n        control.removeEventListener("change", existing)\n      }\n      const handler = () => {\n        const selectedPreset = isValidPreset(control.value) ? control.value : defaultPreset\n        applyPreset(selectedPreset, true)\n      }\n      control[handlerProperty] = handler\n      control.addEventListener("change", handler)\n      window.addCleanup?.(() => control.removeEventListener("change", handler))\n    }\n  }\n  readPreset()\n  setupThemeSwitcher()\n  document.addEventListener("nav", setupThemeSwitcher)\n  document.addEventListener("render", setupThemeSwitcher)\n})()\n';

// src/components/styles/themeSwitcher.scss
var themeSwitcher_default = ".theme-switcher {\n  --theme-switcher-size: 2rem;\n  --theme-switcher-radius: 6px;\n  --theme-switcher-border: color-mix(in srgb, var(--gray) 42%, transparent);\n  --theme-switcher-surface: var(--light);\n  --theme-switcher-surface-hover: var(--lightgray);\n  --theme-switcher-text: var(--dark);\n  --theme-switcher-focus: var(--secondary);\n  --theme-switcher-swatch-size: 0.75rem;\n  --theme-switcher-swatch-ring: color-mix(in srgb, var(--secondary) 36%, var(--light));\n  display: inline-flex;\n  align-items: center;\n  box-sizing: border-box;\n  min-inline-size: var(--theme-switcher-size);\n  min-block-size: var(--theme-switcher-size);\n  margin: 0;\n}\n\n.theme-switcher-swatch {\n  position: absolute;\n  z-index: 1;\n  inline-size: var(--theme-switcher-swatch-size);\n  block-size: var(--theme-switcher-swatch-size);\n  margin-inline-start: 0.5rem;\n  border: 1px solid var(--theme-switcher-swatch-ring);\n  border-radius: 50%;\n  background: linear-gradient(135deg, var(--secondary), var(--tertiary)), var(--highlight);\n  pointer-events: none;\n}\n\n.theme-switcher-label {\n  position: absolute;\n  inline-size: 1px;\n  block-size: 1px;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  white-space: nowrap;\n}\n\n.theme-switcher-select {\n  box-sizing: border-box;\n  inline-size: min(9rem, 38vw);\n  min-inline-size: var(--theme-switcher-size);\n  max-inline-size: 100%;\n  min-block-size: var(--theme-switcher-size);\n  padding: 0 1.5rem 0 1.625rem;\n  border: 1px solid var(--theme-switcher-border);\n  border-radius: var(--theme-switcher-radius);\n  color: var(--theme-switcher-text);\n  background-color: var(--theme-switcher-surface);\n  font: inherit;\n  line-height: 1.2;\n  cursor: pointer;\n  transition: background-color 120ms ease-out, border-color 120ms ease-out, box-shadow 120ms ease-out, color 120ms ease-out;\n}\n\n.theme-switcher-select:hover {\n  border-color: var(--theme-switcher-focus);\n  background-color: var(--theme-switcher-surface-hover);\n  color: var(--dark);\n}\n\n.theme-switcher-select:focus-visible {\n  outline: none;\n  border-color: var(--theme-switcher-focus);\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--theme-switcher-focus) 28%, transparent);\n}\n\n.theme-switcher-select:disabled {\n  cursor: not-allowed;\n  opacity: 0.62;\n  color: var(--gray);\n  background-color: var(--lightgray);\n}\n\n@media (max-width: 600px) {\n  .theme-switcher-swatch {\n    margin-inline-start: 0.375rem;\n  }\n  .theme-switcher-select {\n    inline-size: min(6rem, 30vw);\n    min-inline-size: var(--theme-switcher-size);\n    padding-inline-start: 1.25rem;\n    padding-inline-end: 1.125rem;\n  }\n}";
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/ThemeSwitcher.tsx
function normalizeOptions(options) {
  return {
    defaultPreset: options?.defaultPreset ?? "linear",
    storageKey: options?.storageKey ?? "themePreset"
  };
}
function buildScript(options) {
  return themeSwitcher_inline_default.replace("__THEME_SWITCHER_PRESETS__", JSON.stringify(THEME_PRESET_IDS)).replace('"__THEME_SWITCHER_DEFAULT__"', JSON.stringify(options.defaultPreset)).replace('"__THEME_SWITCHER_STORAGE_KEY__"', JSON.stringify(options.storageKey));
}
function buildBeforeScript(options) {
  return `(() => {
  const presets = ${JSON.stringify(THEME_PRESET_IDS)};
  const defaultPreset = ${JSON.stringify(options.defaultPreset)};
  const storageKey = ${JSON.stringify(options.storageKey)};
  const storedPreset = localStorage.getItem(storageKey);
  const preset = presets.includes(storedPreset) ? storedPreset : defaultPreset;
  document.documentElement.dataset.themePreset = preset;
  if (storedPreset !== preset) {
    localStorage.setItem(storageKey, preset);
  }
})();`;
}
var ThemeSwitcher = ((options) => {
  const scriptOptions = normalizeOptions(options);
  const Component = ({ displayClass }) => {
    const classes = displayClass ? `${displayClass} theme-switcher` : "theme-switcher";
    return /* @__PURE__ */ u2("div", { class: classes, "data-theme-switcher-shell": true, children: [
      /* @__PURE__ */ u2("span", { class: "theme-switcher-swatch", "aria-hidden": "true" }),
      /* @__PURE__ */ u2("label", { class: "theme-switcher-label", for: "theme-switcher-select", children: "Theme" }),
      /* @__PURE__ */ u2(
        "select",
        {
          id: "theme-switcher-select",
          class: "theme-switcher-select",
          "data-theme-switcher": true,
          "aria-label": "Theme preset",
          name: "theme-preset",
          children: THEME_PRESETS.map((preset) => /* @__PURE__ */ u2("option", { value: preset.id, selected: preset.id === scriptOptions.defaultPreset, children: preset.label }))
        }
      )
    ] });
  };
  Component.beforeDOMLoaded = buildBeforeScript(scriptOptions);
  Component.afterDOMLoaded = buildScript(scriptOptions);
  Component.css = [buildThemePresetCss(), themeSwitcher_default];
  return Component;
});
var ThemeSwitcher_default = ThemeSwitcher;

// src/index.ts
var manifest = {
  name: "theme-switcher",
  displayName: "Theme Switcher",
  description: "Toolbar component for selecting local visual theme presets.",
  category: "component",
  version: "0.1.0",
  quartzVersion: ">=5.0.0",
  dependencies: [],
  defaultOrder: 45,
  defaultEnabled: true,
  defaultOptions: {
    defaultPreset: "linear",
    storageKey: "themePreset"
  },
  components: {
    ThemeSwitcher: {
      name: "ThemeSwitcher",
      displayName: "Theme Switcher",
      description: "Compact toolbar control for selecting theme presets.",
      version: "0.1.0",
      defaultPosition: "left",
      defaultPriority: 32
    }
  }
};

export { REQUIRED_THEME_TOKEN_KEYS, THEME_PRESETS, THEME_PRESET_IDS, ThemeSwitcher_default as ThemeSwitcher, buildThemePresetCss, hexToHsl, manifest, validateThemeCatalog };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map