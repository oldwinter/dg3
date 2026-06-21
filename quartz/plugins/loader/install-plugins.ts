#!/usr/bin/env node
import fs from "fs"
import path from "path"
import YAML from "yaml"
import { installPlugins, parsePluginSource } from "./gitLoader.js"
import type { PluginSource } from "./types.js"

const CONFIG_PATHS = [
  "quartz.config.yaml",
  "quartz.config.yml",
  "quartz.plugins.json",
  "quartz.config.default.yaml",
  "quartz.config.default.yml",
  "quartz.plugins.default.json",
] as const

type LegacyQuartzConfig = {
  readonly externalPlugins?: readonly PluginSource[]
}

type InstallPluginEntry = {
  readonly enabled: boolean
  readonly source: PluginSource
}

type InstallPluginsConfig = {
  readonly plugins: readonly InstallPluginEntry[]
}

function resolveConfigPath(): string | null {
  for (const configPath of CONFIG_PATHS) {
    const resolved = path.join(process.cwd(), configPath)
    if (fs.existsSync(resolved)) return resolved
  }

  return null
}

function readConfiguredPluginSources(configPath: string): PluginSource[] {
  const raw = fs.readFileSync(configPath, "utf-8")
  const parsed: unknown = configPath.endsWith(".json") ? JSON.parse(raw) : YAML.parse(raw)
  const config = parseInstallPluginsConfig(parsed, configPath)

  return config.plugins.filter((entry) => entry.enabled).map((entry) => entry.source)
}

function parseInstallPluginsConfig(value: unknown, configPath: string): InstallPluginsConfig {
  if (
    typeof value === "object" &&
    value !== null &&
    "plugins" in value &&
    Array.isArray(value.plugins)
  ) {
    const plugins: InstallPluginEntry[] = []

    for (const entry of value.plugins) {
      const pluginEntry = parseInstallPluginEntry(entry)
      if (pluginEntry) {
        plugins.push(pluginEntry)
      } else {
        throw new Error(`${configPath} contains a plugin entry without enabled/source fields`)
      }
    }

    return { plugins }
  }

  throw new Error(`${configPath} must contain a plugins array`)
}

function parseInstallPluginEntry(value: unknown): InstallPluginEntry | null {
  if (
    typeof value !== "object" ||
    value === null ||
    !("enabled" in value) ||
    typeof value.enabled !== "boolean" ||
    !("source" in value) ||
    !isPluginSource(value.source)
  ) {
    return null
  }

  return { enabled: value.enabled, source: value.source }
}

function isPluginSource(value: unknown): value is PluginSource {
  if (typeof value === "string") {
    return true
  }

  return (
    typeof value === "object" &&
    value !== null &&
    "repo" in value &&
    typeof value.repo === "string" &&
    (!("subdir" in value) || value.subdir === undefined || typeof value.subdir === "string") &&
    (!("ref" in value) || value.ref === undefined || typeof value.ref === "string") &&
    (!("name" in value) || value.name === undefined || typeof value.name === "string")
  )
}

function parseLegacyQuartzConfig(value: unknown): LegacyQuartzConfig {
  if (typeof value !== "object" || value === null || !("externalPlugins" in value)) {
    return {}
  }

  if (value.externalPlugins === undefined) {
    return {}
  }

  if (Array.isArray(value.externalPlugins) && value.externalPlugins.every(isPluginSource)) {
    return { externalPlugins: value.externalPlugins }
  }

  throw new Error("Legacy quartz config externalPlugins must be an array of plugin sources")
}

async function main() {
  const configPath = resolveConfigPath()
  const externalPlugins = configPath
    ? readConfiguredPluginSources(configPath)
    : [
        ...(parseLegacyQuartzConfig((await import("../../../quartz.js")).default).externalPlugins ??
          []),
      ]

  if (externalPlugins.length === 0) {
    console.log("No external plugins to install.")
    return
  }

  console.log(`Installing ${externalPlugins.length} plugin(s) from Git...`)

  const specs = externalPlugins.map((source) => parsePluginSource(source))
  const installed = await installPlugins(specs, { verbose: true })

  if (installed.size === externalPlugins.length) {
    console.log("✓ All plugins installed successfully")
  } else {
    console.error(`✗ Only ${installed.size}/${externalPlugins.length} plugins installed`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error("Failed to install plugins:", err)
  process.exit(1)
})
