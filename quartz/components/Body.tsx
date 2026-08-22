import { defaultTranslation, i18n, TRANSLATIONS } from "../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Body: QuartzComponent = ({ cfg, children }: QuartzComponentProps) => {
  const translation = i18n(cfg.locale)
  const fallback = TRANSLATIONS[defaultTranslation]
  const readingProgressTitle =
    translation.components.readingProgress?.title ?? fallback.components.readingProgress.title
  const backToTopTitle =
    translation.components.backToTop?.title ?? fallback.components.backToTop.title
  const mobileOutline = translation.components.mobileOutline ?? fallback.components.mobileOutline

  return (
    <>
      <progress
        class="reading-progress"
        aria-label={readingProgressTitle}
        max="100"
        value="0"
        hidden
      />
      <div id="quartz-body">{children}</div>
      <button
        class="back-to-top"
        type="button"
        disabled
        title={backToTopTitle}
        aria-label={backToTopTitle}
        aria-hidden="true"
        data-back-to-top=""
      >
        <span aria-hidden="true">↑</span>
      </button>
      <div class="mobile-outline" data-mobile-outline="" hidden>
        <button
          class="mobile-outline__trigger"
          type="button"
          title={mobileOutline.open}
          aria-label={mobileOutline.open}
          aria-controls="mobile-outline-dialog"
          aria-expanded="false"
          data-mobile-outline-trigger=""
        >
          <svg
            class="mobile-outline__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M8 6h13" />
            <path d="M8 12h13" />
            <path d="M8 18h13" />
            <path d="M3 6h.01" />
            <path d="M3 12h.01" />
            <path d="M3 18h.01" />
          </svg>
        </button>
        <dialog
          class="mobile-outline__dialog"
          id="mobile-outline-dialog"
          aria-labelledby="mobile-outline-title"
          data-mobile-outline-dialog=""
        >
          <header class="mobile-outline__header">
            <h2 id="mobile-outline-title">{mobileOutline.title}</h2>
            <button
              class="mobile-outline__close"
              type="button"
              title={mobileOutline.close}
              aria-label={mobileOutline.close}
              data-mobile-outline-close=""
            >
              <svg
                class="mobile-outline__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </header>
          <ol class="mobile-outline__list" data-mobile-outline-list="" />
        </dialog>
      </div>
    </>
  )
}

export default (() => Body) satisfies QuartzComponentConstructor
