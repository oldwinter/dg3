# dg3 Design System

## 1. Atmosphere & Identity

This digital garden should feel like a quiet reading desk for technical notes, source tracking, and long-term thinking. The signature is restrained notebook depth: high-contrast text, muted surfaces, and one calm accent per theme so links and graph affordances remain clear without making the reading surface decorative.

## 2. Color

Quartz exposes nine color roles per mode through `quartz/util/theme.ts`. Six named presets live in `quartz/util/themePresets.ts`; each preset supplies both `lightMode` and `darkMode`, and Quartz still toggles only `saved-theme="light"` or `saved-theme="dark"` at runtime.

Set the build-time preset with `QUARTZ_THEME=<preset>`. When `QUARTZ_THEME` is unset, Quartz uses the `theme` object in `quartz.config.yaml`, which is the `oldwinter` preset for this garden.

### Presets

| Preset      | Intent                                                                  |
| ----------- | ----------------------------------------------------------------------- |
| `oldwinter` | Default warm-neutral garden palette with blue-green navigation accents. |
| `ink`       | Paper-and-ink reading palette with olive and clay accents.              |
| `mist`      | Cool mist palette for soft cyan-green links and quiet diagrams.         |
| `ember`     | Warm ember palette for a more editorial, earthy reading tone.           |
| `atlas`     | Crisp atlas palette with blue structural accents and brass highlights.  |
| `sakura`    | Soft rose palette balanced by teal secondary accents.                   |

### Rules

- Do not add extra CSS variable names for theme colors unless Quartz core needs a new semantic role.
- Keep body text, headings, links, and hover accents readable in both modes.
- Runtime dark mode remains the existing `saved-theme` light/dark toggle.
- Theme presets affect color and typography only; layout and component structure should stay Quartz-native.

## 3. Typography

| Level   | Size       | Weight | Line Height | Tracking | Usage         |
| ------- | ---------- | ------ | ----------- | -------- | ------------- |
| H1      | `2rem`     | 700    | 1.2         | 0        | Article title |
| H2      | `1.75rem`  | 700    | 1.25        | 0        | Major section |
| H3      | `1.4rem`   | 600    | 1.3         | 0        | Subsection    |
| Body    | `1rem`     | 400    | 1.6         | 0        | Default prose |
| Body/sm | `0.875rem` | 400    | 1.5         | 0        | Metadata      |
| Code    | `0.9rem`   | 400    | 1.5         | 0        | Code          |

Theme presets use:

- Header: `Schibsted Grotesk`, then system sans-serif.
- Body: `LXGW WenKai`, then system sans-serif for CJK-friendly reading.
- Code: `IBM Plex Mono`, then system monospace.

## 4. Spacing & Layout

Spacing follows Quartz defaults and a 4px base unit. New spacing should remain a 4px multiple. Keep prose width constrained by Quartz frames, and keep sidebars resilient to long CJK and English note titles.

## 5. Components

### Theme Presets

- **Structure**: named TypeScript registry in `quartz/util/themePresets.ts`.
- **Variants**: `oldwinter`, `ink`, `mist`, `ember`, `atlas`, `sakura`.
- **Selection**: `QUARTZ_THEME=<preset>` at build time, or `quartz.config.yaml` when unset.
- **States**: light and dark mode are both required for every preset.
- **Accessibility**: body text, heading text, link text, and hover text must keep readable contrast on `--light`.

### Dark Mode Toggle

- **Structure**: existing `github:quartz-community/darkmode` plugin.
- **Variants**: light mode and dark mode icons.
- **States**: hover, click, and persisted localStorage state.
- **Accessibility**: icon titles and aria labels come from i18n strings.

## 6. Motion & Interaction

Theme-adjacent UI uses existing Quartz transitions. Only animate `transform`, `opacity`, `fill`, or `color`; do not animate layout dimensions for theme changes.

## 7. Depth & Surface

Quartz uses restrained tonal shifts through `--light` and `--lightgray`, with borders for popovers, graph controls, code blocks, tables, and callouts.

| Type           | Value                        | Usage                              |
| -------------- | ---------------------------- | ---------------------------------- |
| Default border | `1px solid var(--lightgray)` | Controls, panels, popovers         |
| Accent rule    | `3px solid var(--secondary)` | Blockquotes and highlighted blocks |
| Surface fill   | `var(--light)`               | Main and elevated surfaces         |
| Subtle fill    | `var(--highlight)`           | Internal links and selected text   |

Do not introduce broad box-shadow styling for theme presets; Quartz should remain quiet and text-first.
