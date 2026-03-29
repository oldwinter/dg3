import fs from "fs"
import path from "path"
import { spawnSync } from "child_process"
import { styleText } from "util"
import YAML from "yaml"

const CWD = process.cwd()
const QUARTZ_TS_PATH = path.join(CWD, "quartz.ts")
const CONFIG_YAML_PATH = path.join(CWD, "quartz.config.yaml")
const DEFAULT_CONFIG_YAML_PATH = path.join(CWD, "quartz.config.default.yaml")
const LEGACY_DEFAULT_JSON_PATH = path.join(CWD, "quartz.plugins.default.json")
const LOCKFILE_PATH = path.join(CWD, "quartz.lock.json")
const PLUGINS_DIR = path.join(CWD, ".quartz", "plugins")
const PACKAGE_JSON_PATH = path.join(CWD, "package.json")

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return null
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"))
  } catch {
    return null
  }
}

function hasTsx() {
  const pkg = readJson(PACKAGE_JSON_PATH)
  return Boolean(pkg?.devDependencies?.tsx || pkg?.dependencies?.tsx)
}

function extractWithTsx() {
  const script = `
    const { default: config } = await import("./quartz.ts")
    const { layout } = await import("./quartz.ts")
    const result = {
      configuration: config?.configuration ?? null,
      layoutInfo: {
        defaults: {
          afterBody: Array.isArray(layout?.defaults?.afterBody) ? layout.defaults.afterBody.length : 0,
          hasFooter: Boolean(layout?.defaults?.footer),
        },
        pageTypes: layout?.byPageType ? Object.keys(layout.byPageType) : [],
      },
    }
    console.log(JSON.stringify(result))
  `

  const res = spawnSync("node", ["--import", "tsx/esm", "--input-type=module", "-e", script], {
    encoding: "utf-8",
    cwd: CWD,
  })

  if (res.error || res.status !== 0) {
    return { ok: false, error: res.error ?? res.stderr }
  }

  try {
    return { ok: true, data: JSON.parse(res.stdout.trim()) }
  } catch (error) {
    return { ok: false, error }
  }
}

function readManifest(pluginDir) {
  const pkgPath = path.join(pluginDir, "package.json")
  if (!fs.existsSync(pkgPath)) return null
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
    return pkg.quartz ?? null
  } catch {
    return null
  }
}

function ensureLayoutDefaults(layout) {
  if (!layout.groups) layout.groups = {}
  if (!layout.groups.toolbar) {
    layout.groups.toolbar = { direction: "row", gap: "0.5rem" }
  }
  if (!layout.byPageType) layout.byPageType = {}
  if (!layout.byPageType["404"]) {
    layout.byPageType["404"] = { positions: { beforeBody: [], left: [], right: [] } }
  } else if (!layout.byPageType["404"].positions) {
    layout.byPageType["404"].positions = { beforeBody: [], left: [], right: [] }
  }
  return layout
}

function buildPluginEntry(name, entry) {
  const pluginDir = path.join(PLUGINS_DIR, name)
  const manifest = readManifest(pluginDir)
  const source = entry?.source ?? `github:quartz-community/${name}`
  const pluginEntry = {
    source,
    enabled: manifest?.defaultEnabled ?? true,
    options: manifest?.defaultOptions ?? {},
    order: manifest?.defaultOrder ?? 50,
  }

  if (manifest?.components) {
    const component = Object.values(manifest.components).find((comp) => comp?.defaultPosition)
    if (component?.defaultPosition) {
      pluginEntry.layout = {
        position: component.defaultPosition,
        priority: component.defaultPriority ?? 50,
        display: "all",
      }
    }
  }

  return pluginEntry
}

export async function handleMigrate() {
  console.log(styleText("cyan", "Migrating Quartz configuration..."))

  if (!fs.existsSync(QUARTZ_TS_PATH)) {
    console.log(styleText("red", "✗ quartz.ts not found. Aborting migration."))
    return
  }

  if (fs.existsSync(CONFIG_YAML_PATH)) {
    console.log(styleText("yellow", "⚠ quartz.config.yaml already exists. Overwriting."))
  }

  const defaultJson = readJson(DEFAULT_CONFIG_YAML_PATH) ?? readJson(LEGACY_DEFAULT_JSON_PATH)
  let configuration = defaultJson?.configuration ?? {}
  let layout = ensureLayoutDefaults(defaultJson?.layout ?? {})
  let layoutInfo = null

  console.log(styleText("gray", "→ Extracting configuration..."))
  if (hasTsx()) {
    const extracted = extractWithTsx()
    if (extracted.ok) {
      configuration = extracted.data?.configuration ?? configuration
      layoutInfo = extracted.data?.layoutInfo ?? null
    } else {
      console.log(styleText("yellow", "⚠ Failed to import TS config with tsx. Using defaults."))
    }
  } else {
    console.log(styleText("yellow", "⚠ tsx not found. Using defaults."))
  }

  if (layoutInfo?.pageTypes?.length) {
    for (const pageType of layoutInfo.pageTypes) {
      if (!layout.byPageType[pageType]) {
        layout.byPageType[pageType] = {}
      }
    }
  }

  console.log(styleText("gray", "→ Reading plugin lockfile..."))
  const lockfile = readJson(LOCKFILE_PATH)
  const plugins = []

  if (lockfile?.plugins) {
    for (const [name, entry] of Object.entries(lockfile.plugins)) {
      plugins.push(buildPluginEntry(name, entry))
    }
  } else if (defaultJson?.plugins) {
    console.log(styleText("yellow", "⚠ quartz.lock.json not found. Using default plugins."))
    for (const plugin of defaultJson.plugins) {
      plugins.push(plugin)
    }
  } else {
    console.log(styleText("yellow", "⚠ No lockfile or default plugins found. Writing empty list."))
  }

  const outputJson = {
    configuration,
    plugins,
    layout,
  }

  const header = "# yaml-language-server: $schema=./quartz/plugins/quartz-plugins.schema.json\n"
  fs.writeFileSync(CONFIG_YAML_PATH, header + YAML.stringify(outputJson, { lineWidth: 120 }))

  const quartzTsTemplate =
    'import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"\n' +
    "\n" +
    "const config = await loadQuartzConfig()\n" +
    "export default config\n" +
    "export const layout = await loadQuartzLayout()\n"

  fs.writeFileSync(QUARTZ_TS_PATH, quartzTsTemplate)

  console.log(styleText("green", "✓ Created quartz.config.yaml"))
  console.log(styleText("green", "✓ Replaced quartz.ts"))
  console.log()
  console.log(styleText("yellow", "⚠ Verify plugin options in quartz.config.yaml"))
  console.log(styleText("gray", `Plugins migrated: ${plugins.length}`))
}
