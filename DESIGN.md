# dg3 Design System

## 1. Atmosphere & Identity

dg3 is a quiet Quartz reading and workbench interface for a personal digital garden. It should feel calm, precise, and durable: the page is for reading, cross-linking, searching, and returning to notes, not for marketing, hero storytelling, or decorative spectacle. The signature is restrained tonal adaptation: theme presets change the site mood through Quartz tokens while the reading rhythm, typography, toolbar placement, and content hierarchy remain stable.

The theme switcher introduces ten brand-inspired presets: `linear`, `raycast`, `apple`, `notion`, `vercel`, `claude`, `stripe`, `figma`, `spotify`, and `tesla`. These are inspiration labels for palette and surface behavior only. `github.md` is not available in the local design references, so Tesla is the selected tenth preset.

Brand-inspiration guardrails are strict: do not use logos, marks, trademarked artwork, product screenshots, copied brand layouts/assets, or "copy brand" implementations. Do not reproduce any brand's navigation, hero, product cards, screenshots, illustrations, or proprietary type assets. Extract only high-level mood, contrast, accent restraint, and surface treatment into this site's own Quartz workbench.

## 2. Color

### Quartz Token Contract

Theme presets must override only the existing Quartz variable surface and preserve the no-JS baseline from `quartz.config.yaml`. The current baseline uses a soft off-white light mode, a dark charcoal mode, `#284b63` / `#7b97aa` as `--secondary`, `#84a59d` as `--tertiary`, and existing highlight values. If JavaScript fails, the site remains readable with that configured theme.

| Role | Token | Usage |
| --- | --- | --- |
| Page surface | `--light` | Main page, toolbar, and content background. |
| Subtle surface | `--lightgray` | Inline code background, toolbar hover, soft panels, dividers. |
| Muted line/text | `--gray` | Secondary metadata, muted borders, disabled hints. |
| Body text | `--darkgray` | Default readable text. |
| Strong text | `--dark` | Headings, active icons, high-emphasis text. |
| Primary accent | `--secondary` | Links, selected preset, focus color, active toolbar state. |
| Secondary accent | `--tertiary` | Hover accent, secondary link emphasis, soft brand companion. |
| Accent wash | `--highlight` | Active nav background and subtle inline emphasis. |
| Text highlight | `--textHighlight` | Marked text and search-style highlights. |
| Accent hue | `--accent-h` | Explicit HSL hue for Quartz/Obsidian alias compatibility. |
| Accent saturation | `--accent-s` | Explicit HSL saturation for Quartz/Obsidian alias compatibility. |
| Accent lightness | `--accent-l` | Explicit HSL lightness for Quartz/Obsidian alias compatibility. |

Because `quartz/util/theme.ts` computes aliases such as `--background-primary`, `--text-normal`, `--interactive-accent`, `--nav-item-color-active`, `--tag-color`, and `--divider-color` from this surface, preset CSS must scope overrides to the core tokens above. Any alias that does not update due to CSS ordering must be explicitly overridden in the preset CSS, but `DESIGN.md` remains the source of intended roles.

### Presets

| Preset | Visual Intent | Accent Use |
| --- | --- | --- |
| `linear` | Engineered graphite and cool indigo; best for focused issue-log style reading. | Indigo-violet accent, cool neutral surfaces, very restrained chroma. |
| `raycast` | Near-black blue utility console with a precise red/blue pulse. | Red may identify the preset swatch; blue should carry focus and links if needed. |
| `apple` | Gallery-like neutral clarity with thin chrome and action blue. | Blue only for links, focus, and selected action state. |
| `notion` | Warm paper, whisper borders, approachable note-taking neutrality. | Notion blue for interactive state; warm neutrals remain dominant. |
| `vercel` | Monochrome infrastructure minimalism with crisp rings. | Sparse blue focus/link signal; neutral black/white structure dominates. |
| `claude` | Parchment, warm charcoal, and quiet terracotta editorial warmth. | Terracotta for primary accent only; focus may remain blue for accessibility. |
| `stripe` | White, deep navy, and purple financial precision. | Purple for selected/interactive states; avoid decorative magenta/ruby use. |
| `figma` | Binary black/white interface with selection-like focus clarity. | Keep UI mostly monochrome; accent appears as focus/selection affordance, not decoration. |
| `spotify` | Immersive dark reading mode with content-first charcoal layers. | Green only for active/selected state, never broad fills. |
| `tesla` | Radical subtraction: white, carbon text, electric blue, minimal chrome. | Electric blue only for primary interaction and selection. |

### Rules

- Component CSS uses Quartz variables and local semantic variables only. Raw preset color values belong in the future theme catalog and this design contract.
- Accent color is functional: links, focus, selected preset, active toolbar state. It is not decorative background noise.
- Presets must define both light and dark values for every token in the Quartz Token Contract.
- Light/dark state remains independent from preset state. Dark mode owns `saved-theme` and `localStorage.theme`; the theme switcher must not mutate either.
- Preset state is `localStorage.themePreset` plus `document.documentElement.dataset.themePreset`, rendered as the `data-theme-preset` HTML attribute.

## 3. Typography

The baseline typography from `quartz.config.yaml` remains the design system contract:

| Role | Font | Usage |
| --- | --- | --- |
| Header | `Schibsted Grotesk` | Page titles, section headings, toolbar labels when needed. |
| Body | `LXGW WenKai` | Long-form reading, note bodies, lists, navigation text. |
| Code | `IBM Plex Mono` | Code blocks, inline code, technical labels, generated diagnostics. |

Typography should optimize reading comfort over brand imitation. Presets must not swap fonts to brand fonts, load remote brand typefaces, or copy proprietary typography. Inspired references may inform weight and density, but Quartz content should keep stable metrics across all presets so changing themes does not reflow the page.

Rules:

- Body text stays at the current Quartz reading scale; do not shrink body below 14px.
- Letter spacing remains `0` unless an existing Quartz style sets otherwise.
- Headings should stay calm and scannable, not hero-scale.
- Technical labels and evidence-style text use `IBM Plex Mono`, not brand-specific mono fonts.

## 4. Spacing & Layout

Spacing follows Quartz's existing reading layout and a base-4 rhythm. Theme work must not introduce a marketing layout, full-bleed hero, decorative cards, or landing-page section pacing.

| Token | Value | Usage |
| --- | --- | --- |
| `--space-1` | 4px | Icon-to-label and small internal gaps. |
| `--space-2` | 8px | Toolbar control padding and compact gaps. |
| `--space-3` | 12px | Select/input horizontal padding, small menu gaps. |
| `--space-4` | 16px | Standard block spacing and side padding. |
| `--space-6` | 24px | Reading-section separation. |
| `--space-8` | 32px | Larger content group separation. |

Toolbar placement is fixed for the future plugin: `ThemeSwitcher` lives in `local-plugins/theme-switcher`, in the toolbar group, with priority 32. It must sit between the existing darkmode priority 30 and reader-mode priority 35 controls. The intended Quartz config shape is a local plugin source named `theme-switcher`, layout position `left`, group `toolbar`, and priority `32`.

Layout rules:

- The switcher must be compact enough for the existing left toolbar group.
- Mobile must not gain horizontal page overflow from the control.
- Toolbar dimensions should remain stable when presets change.
- Preset names may be visible in a native select or accessible popover, but they must not force toolbar layout shift.

## 5. Components

### ThemeSwitcher

- **Structure**: A compact toolbar control from `local-plugins/theme-switcher`, rendered as `ThemeSwitcher`. Prefer a native `select` unless Quartz toolbar constraints require an accessible button/listbox.
- **Variants**: Default toolbar control; disabled-safe fallback if script setup fails; dark and light compositions through `saved-theme`.
- **Spacing**: Use `--space-1`, `--space-2`, and `--space-3` equivalents only.
- **States**: default, hover, active/open, focus-visible, disabled, invalid stored preset fallback.
- **Accessibility**: Expose an accessible name such as "Theme preset"; support keyboard operation; show a visible focus ring using `--secondary`; maintain at least WCAG AA contrast for text and focus indicators; preserve readable labels for all ten presets.
- **Motion**: Token changes should feel immediate. Control hover/focus transitions may use 100-150ms opacity, color, or box-shadow transitions only.

### Theme State

- **Default**: If no valid `localStorage.themePreset` exists, set `data-theme-preset="linear"` and write `localStorage.themePreset = "linear"`.
- **Persistence**: Store only the preset ID in `localStorage.themePreset`.
- **HTML contract**: Apply the chosen ID to `document.documentElement.dataset.themePreset`, producing `data-theme-preset="<id>"`.
- **Events**: Dispatch `themepresetchange` with `{ preset }` after user changes.
- **Dark mode compatibility**: Do not change `saved-theme`, `localStorage.theme`, darkmode buttons, or reader-mode state.
- **Invalid state**: Unknown preset IDs clamp to the configured default and do not throw.

## 6. Motion & Interaction

Motion is quiet utility feedback, not brand theater.

| Type | Duration | Easing | Usage |
| --- | --- | --- | --- |
| Micro | 100-150ms | ease-out | Hover, focus, active toolbar feedback. |
| Standard | 180-240ms | ease-in-out | Optional popover/listbox open and close if native select is not used. |

Rules:

- Only animate `opacity`, `color`, `background-color`, `box-shadow`, or `transform` for tiny press feedback. Never animate layout properties.
- Respect `prefers-reduced-motion`; preset changes must not trigger sweeping page animation.
- Preset switching should update variables without hiding content or interrupting reading.
- Rebinding on Quartz `nav` and `render` lifecycle events must be idempotent, so repeated navigation does not duplicate handlers.
- Focus-visible styling is mandatory for the switcher and must remain visible in every preset.

## 7. Depth & Surface

The depth strategy is tonal-shift with restrained rings. Quartz content should feel layered by small changes in `--light`, `--lightgray`, `--gray`, and `--highlight`, not by heavy shadows or decorative panels.

| Level | Treatment | Usage |
| --- | --- | --- |
| Base | `--light` | Page and reading canvas. |
| Subtle | `--lightgray` | Toolbar hover, inline code, subdued surfaces. |
| Line | `--gray` at low visual weight | Dividers, outlines, muted text support. |
| Active | `--highlight` plus `--secondary` text/icon | Selected preset, active nav, selected toolbar state. |
| Focus | Ring/outline using `--secondary` | Keyboard focus and high-confidence interaction. |

Preset-specific depth rules:

- Linear, Raycast, Spotify: dark presets may use stronger tonal steps, but must keep notes readable and avoid heavy app-like panels.
- Apple, Vercel, Figma, Tesla: light presets should stay flat and precise; avoid adding shadows just to create decoration.
- Notion and Claude: warm surfaces are allowed, but they must not turn the site into parchment-themed marketing.
- Stripe: blue-tinted shadow inspiration may appear only as a subtle focus/elevation hint for controls, not as broad decorative depth.

No preset may add logos, marks, trademarked artwork, product screenshots, copied brand layouts/assets, remote images, remote fonts, or decorative brand art.
