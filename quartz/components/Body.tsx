import { defaultTranslation, i18n, TRANSLATIONS } from "../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Body: QuartzComponent = ({ cfg, children }: QuartzComponentProps) => {
  const translation = i18n(cfg.locale)
  const fallback = TRANSLATIONS[defaultTranslation]
  const readingProgressTitle =
    translation.components.readingProgress?.title ?? fallback.components.readingProgress.title
  const backToTopTitle =
    translation.components.backToTop?.title ?? fallback.components.backToTop.title

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
    </>
  )
}

export default (() => Body) satisfies QuartzComponentConstructor
