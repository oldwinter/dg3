import { defaultTranslation, i18n } from "../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Body: QuartzComponent = ({ cfg, children }: QuartzComponentProps) => {
  const readingProgressTitle =
    i18n(cfg.locale).components.readingProgress?.title ??
    i18n(defaultTranslation).components.readingProgress!.title

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
    </>
  )
}

export default (() => Body) satisfies QuartzComponentConstructor
