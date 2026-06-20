import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { getThemePresetFromEnvironment } from "./quartz/util/themePresets"

const selectedTheme = getThemePresetFromEnvironment(process.env)
const config = await loadQuartzConfig(selectedTheme ? { theme: selectedTheme } : undefined)
export default config
export const layout = await loadQuartzLayout()
