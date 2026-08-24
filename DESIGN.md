# dg3 Design System

## 1. Atmosphere & Identity

dg3 is a quiet Quartz reading and workbench interface for a personal digital garden. It should feel calm, precise, and durable: the page is for reading, cross-linking, searching, and returning to notes, not for marketing, hero storytelling, or decorative spectacle.

The design system has two theme layers:

- Build-time Quartz base presets selected with `QUARTZ_THEME`: `oldwinter`, `ink`, `mist`, `ember`, `atlas`, and `sakura`.
- Runtime toolbar presets selected by `ThemeSwitcher`: `linear`, `raycast`, `apple`, `notion`, `vercel`, `claude`, `stripe`, `figma`, `spotify`, and `tesla`.

Both layers express the same reading-desk identity. Build-time presets set the default garden atmosphere for generated CSS; runtime presets let readers shift the mood locally without rebuilding. The reading rhythm, typography, toolbar placement, and content hierarchy stay stable across both layers.

Brand-inspiration guardrails are strict: do not use logos, marks, trademarked artwork, product screenshots, copied brand layouts/assets, or "copy brand" implementations. Do not reproduce any brand's navigation, hero, product cards, screenshots, illustrations, or proprietary type assets. Extract only high-level mood, contrast, accent restraint, and surface treatment into this site's own Quartz workbench.

## 2. Color

### Quartz Token Contract

Theme presets must override only the existing Quartz variable surface and preserve a readable no-JS baseline from `quartz.config.yaml`. If JavaScript fails, the site remains readable with the configured build-time theme.

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

Because `quartz/util/theme.ts` computes aliases such as `--background-primary`, `--text-normal`, `--interactive-accent`, `--nav-item-color-active`, `--tag-color`, and `--divider-color` from this surface, runtime preset CSS must scope overrides to the core tokens above. Any alias that does not update due to CSS ordering must be explicitly overridden in preset CSS, but this document remains the source of intended roles.

### Build-Time Presets

Six named build-time presets live in `quartz/util/themePresets.ts`; each preset supplies both `lightMode` and `darkMode`, and Quartz still toggles only `saved-theme="light"` or `saved-theme="dark"` at runtime.

Set the base preset with `QUARTZ_THEME=<preset>`. When `QUARTZ_THEME` is unset, Quartz uses the `theme` object in `quartz.config.yaml`, which is the `oldwinter` preset for this garden.

| Preset | Intent |
| --- | --- |
| `oldwinter` | Default warm-neutral garden palette with blue-green navigation accents. |
| `ink` | Paper-and-ink reading palette with olive and clay accents. |
| `mist` | Cool mist palette for soft cyan-green links and quiet diagrams. |
| `ember` | Warm ember palette for a more editorial, earthy reading tone. |
| `atlas` | Crisp atlas palette with blue structural accents and brass highlights. |
| `sakura` | Soft rose palette balanced by teal secondary accents. |

### Runtime Presets

The runtime theme switcher introduces ten brand-inspired presets. These are inspiration labels for palette and surface behavior only. `github.md` is not available in the local design references, so Tesla is the selected tenth preset.

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

- Component CSS uses Quartz variables and local semantic variables only. Raw runtime preset color values belong in `local-plugins/theme-switcher/src/themes.ts` and this design contract.
- Build-time presets affect the generated base theme; runtime presets apply scoped local overrides through `data-theme-preset`.
- Accent color is functional: links, focus, selected preset, active toolbar state. It is not decorative background noise.
- Presets must define both light and dark values for every token in the Quartz Token Contract.
- Runtime dark mode remains independent from preset state. Dark mode owns `saved-theme` and `localStorage.theme`; the runtime theme switcher must not mutate either.
- Runtime preset state is `localStorage.themePreset` plus `document.documentElement.dataset.themePreset`, rendered as the `data-theme-preset` HTML attribute.

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

Spacing follows Quartz's existing reading layout and a base-4 rhythm. Theme work must not introduce a marketing layout, full-bleed hero, decorative cards, or landing-page section pacing. Keep prose width constrained by Quartz frames, and keep sidebars resilient to long CJK and English note titles.

| Token | Value | Usage |
| --- | --- | --- |
| `--space-1` | 4px | Icon-to-label and small internal gaps. |
| `--space-2` | 8px | Toolbar control padding and compact gaps. |
| `--space-3` | 12px | Select/input horizontal padding, small menu gaps. |
| `--space-4` | 16px | Standard block spacing and side padding. |
| `--space-6` | 24px | Reading-section separation. |
| `--space-8` | 32px | Larger content group separation. |

Toolbar placement is fixed: `ThemeSwitcher` lives in `local-plugins/theme-switcher`, in the toolbar group, with priority 32. It sits between the existing darkmode priority 30 and reader-mode priority 35 controls.

Layout rules:

- The switcher must be compact enough for the existing left toolbar group.
- Mobile must not gain horizontal page overflow from the control.
- Toolbar dimensions should remain stable when presets change.
- Preset names may be visible in a native select or accessible popover, but they must not force toolbar layout shift.

## 5. Components

### Build-Time Theme Presets

- **Structure**: named TypeScript registry in `quartz/util/themePresets.ts`.
- **Variants**: `oldwinter`, `ink`, `mist`, `ember`, `atlas`, `sakura`.
- **Selection**: `QUARTZ_THEME=<preset>` at build time, or `quartz.config.yaml` when unset.
- **States**: light and dark mode are both required for every preset.
- **Accessibility**: body text, heading text, link text, and hover text must keep readable contrast on `--light`.

### ThemeSwitcher

- **Structure**: A compact toolbar control from `local-plugins/theme-switcher`, rendered as `ThemeSwitcher`. Keep the native preset `select` and pair it with one square icon button for choosing a different preset at random. Below 341px, let its containing toolbar wrap and place the complete theme control on a second, right-aligned row so labels stay readable.
- **Variants**: Default toolbar control; disabled-safe fallback if script setup fails; dark and light compositions through `saved-theme`.
- **Spacing**: Use `--space-1`, `--space-2`, and `--space-3` equivalents only.
- **States**: Select default, hover, active/open, focus-visible, disabled, and invalid stored preset fallback; random action default, hover, pressed, focus-visible, and disabled.
- **Accessibility**: Localize accessible names for both the preset select and random action; use native keyboard-operable controls; show an opaque 2px focus outline using `--secondary`; maintain at least WCAG AA contrast for text and focus indicators; preserve readable labels for all ten presets.
- **Motion**: Token changes should feel immediate. Control hover/focus transitions may use 100-150ms opacity, color, or box-shadow transitions only.

### Theme State

- **Default**: If no valid `localStorage.themePreset` exists, set `data-theme-preset="linear"` and write `localStorage.themePreset = "linear"`.
- **Persistence**: Store only the preset ID in `localStorage.themePreset`.
- **HTML contract**: Apply the chosen ID to `document.documentElement.dataset.themePreset`, producing `data-theme-preset="<id>"`.
- **Events**: Dispatch `themepresetchange` with `{ preset }` after user changes.
- **Random action**: Choose uniformly from every preset except the active one, so each activation visibly changes the garden while preserving the same persistence and event contract as manual selection.
- **Dark mode compatibility**: Do not change `saved-theme`, `localStorage.theme`, darkmode buttons, or reader-mode state.
- **Invalid state**: Unknown preset IDs clamp to the configured default and do not throw.

### Dark Mode Toggle

- **Structure**: existing `github:quartz-community/darkmode` plugin.
- **Variants**: light mode and dark mode icons.
- **States**: hover, click, and persisted localStorage state.
- **Accessibility**: icon titles and aria labels come from i18n strings.

### BackToTop

- **Structure**: A fixed 40px circular icon button created once per page, outside the reading grid.
- **Placement**: Bottom inline-end with 16px spacing and safe-area inset support; hidden from print.
- **States**: Disabled and visually absent near the top; visible after 75% of one viewport; hover, active, and focus-visible feedback use existing Quartz tokens.
- **Accessibility**: The arrow is decorative; the button name and tooltip follow the page language. Hidden state is removed from keyboard and accessibility navigation.
- **Motion**: Visibility uses the existing 150ms micro transition. Press feedback scales to 93%, following the beui button mechanism; reduced-motion mode removes spatial and smooth-scroll motion.

### ReadLater

- **Structure**: One stable 40px bookmark trigger after content metadata opens a 320px anchored panel with a current-note toggle and a bounded list of saved links. The panel follows the beui popover attachment and dismissal contract without adding its gooey morph or a motion dependency.
- **Placement**: Inline-end below content metadata; the panel remains within `100vw - 32px`, uses the existing 6px control radius, and is hidden from print.
- **States**: Empty, populated, current note saved, current note unsaved, hover, pressed, focus-visible, browser-storage failure, and cross-tab synchronization.
- **Storage**: Keep at most 20 newest entries in `localStorage`; accept only root-relative paths and normalized plain-text titles. No content writes, accounts, cookies, analytics, or external requests.
- **Accessibility**: Chinese and English names include the current saved count. The trigger reports expanded state, the current-note toggle reports pressed state, status changes use a polite live region, Escape restores trigger focus, and every remove action names its note.
- **Motion**: Open and close are immediate. Existing 150ms micro transitions cover color and press feedback; reduced-motion mode removes the press transform.

### ResumeReading

- **Structure**: A compact inline prompt after the existing reader actions, with one localized continue command and one 40px dismiss icon button. It appears only on a long note when a fresh unfinished position exists for that exact path.
- **Behavior**: Save progress between 15% and 90% after scrolling pauses. Returning near the top never jumps automatically; the reader explicitly chooses whether to resume. Heading fragments and already-restored browser positions take priority over the prompt.
- **Storage**: Keep at most 20 path-and-progress entries in `localStorage` for 30 days. Entries contain no note text, title, account data, cookies, analytics, or external requests. Dismissing a prompt removes that note's saved position.
- **Accessibility**: The prompt is a named complementary region, both controls use localized accessible names, focus remains explicit when the prompt is removed, and the continue action focuses the article before scrolling.
- **Motion**: Resume uses smooth scrolling only when motion is allowed. Hover, focus, and press feedback follow the existing 150ms reader-control contract; reduced-motion mode removes transitions and spatial press feedback.

### QuoteLink

- **Structure**: One 40px floating quote action appears only for a 3-280 character plain-text selection inside the current article. It copies a Markdown blockquote followed by a browser Text Fragment link to the selected passage.
- **Placement**: Anchor 8px above the final selection line, fall below near the viewport top, and clamp within an 8px viewport inset. Hide when the selection collapses, leaves the viewport, enters code or authored controls, or the article is unavailable.
- **States**: Hidden, ready, copying, copied, failed, hover, pressed, and focus-visible. Copied swaps the quote glyph for a check for 1.8 seconds; failure remains available for retry.
- **Accessibility**: The icon is decorative; localized title and accessible names describe the action and result. A polite live region announces copy outcomes, Escape dismisses the action, and keyboard-created selections receive the same control.
- **Privacy**: The action uses only the current selection and URL. It does not write content or storage, send requests, or persist selection text.
- **Motion**: Existing 150ms micro transitions cover color and press feedback. Reduced-motion mode removes scale feedback, and print hides the action.

### MobileOutline

- **Structure**: One fixed 40px list button opens a native modal dialog containing links to the current article's non-transcluded `h2` and `h3` headings. The control is rendered once by `Body` and populated from the live article after navigation.
- **Placement**: Mobile only, at the bottom inline-start with 16px and safe-area inset support. Its dialog sits above the fixed controls, stays within `100vw - 32px`, uses the existing 6px radius, and is hidden from print.
- **Eligibility**: Keep the control hidden on desktop, list/404 surfaces, and articles with fewer than two eligible headings. Repeated SPA `nav` and in-place `render` events must replace the prior outline without duplicate nodes or listeners.
- **States**: Hidden, ready, open, current section, hover, pressed, focus-visible, long-list scrolling, and missing-native-dialog fallback.
- **Accessibility**: Localize the dialog title and open/close names; use native `dialog` modal behavior for focus containment and Escape; report expanded state on the trigger; mark the current section with `aria-current="location"`; keep every target as a native hash link.
- **Motion**: Opening and closing are immediate. Existing 150ms color and press transitions apply to controls and links; reduced-motion mode removes the press transform.

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
