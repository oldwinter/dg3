import { styleText } from "util"
import { execSync, spawnSync } from "child_process"
import fs from "fs"
import path from "path"

export async function handlePluginInstall(packageNames) {
  console.log(`\n${styleText(["bgGreen", "black"], " Quartz Plugin Manager ")}\n`)

  if (packageNames.length === 0) {
    console.log(styleText("red", "Error: No package names provided"))
    console.log("Usage: npx quartz plugin install <package-name> [package-name...]")
    process.exit(1)
  }

  console.log(`Installing ${packageNames.length} plugin(s)...`)

  const npmArgs = ["install", ...packageNames]
  const result = spawnSync("npm", npmArgs, { stdio: "inherit" })

  if (result.status !== 0) {
    console.log(styleText("red", "Failed to install plugins"))
    process.exit(1)
  }

  console.log(styleText("green", "✓ Plugins installed successfully"))
  console.log("\nAdd them to your quartz.config.yaml:")

  for (const pkg of packageNames) {
    console.log(`  import { Plugin } from "${pkg}"`)
  }
}

export async function handlePluginList() {
  console.log(`\n${styleText(["bgGreen", "black"], " Quartz Plugin Manager ")}\n`)

  const packageJsonPath = path.join(process.cwd(), "package.json")

  if (!fs.existsSync(packageJsonPath)) {
    console.log(styleText("red", "No package.json found"))
    process.exit(1)
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  }

  const quartzPlugins = Object.entries(allDeps).filter(([name]) => {
    return (
      name.startsWith("@quartz/") ||
      name.startsWith("quartz-") ||
      name.startsWith("@quartz-community/")
    )
  })

  if (quartzPlugins.length === 0) {
    console.log("No Quartz plugins found in this project.")
    console.log("Install plugins with: npx quartz plugin install <package-name>")
    return
  }

  console.log(`Found ${quartzPlugins.length} Quartz plugin(s):\n`)

  for (const [name, version] of quartzPlugins) {
    console.log(`  ${styleText("cyan", name)}@${version}`)
  }
}

export async function handlePluginSearch(query) {
  console.log(`\n${styleText(["bgGreen", "black"], " Quartz Plugin Manager ")}\n`)

  const searchQuery = query || "quartz-plugin"

  console.log(`Searching npm for packages matching "${searchQuery}"...`)
  console.log(styleText("gray", "(This may take a moment)\n"))

  try {
    const result = execSync(`npm search ${searchQuery} --json`, { encoding: "utf-8" })
    const packages = JSON.parse(result)

    const quartzPlugins = packages.filter(
      (pkg) =>
        pkg.name.startsWith("@quartz/") ||
        pkg.name.startsWith("quartz-") ||
        pkg.name.startsWith("@quartz-community/"),
    )

    if (quartzPlugins.length === 0) {
      console.log("No Quartz plugins found matching your query.")
      return
    }

    console.log(`Found ${quartzPlugins.length} Quartz plugin(s):\n`)

    for (const pkg of quartzPlugins.slice(0, 20)) {
      console.log(`  ${styleText("cyan", pkg.name)}@${pkg.version}`)
      if (pkg.description) {
        console.log(`    ${styleText("gray", pkg.description)}`)
      }
      console.log()
    }
  } catch {
    console.log(styleText("yellow", "Could not search npm. Try visiting:"))
    console.log("  https://www.npmjs.com/search?q=quartz-plugin")
  }
}

export async function handlePluginUninstall(packageNames) {
  console.log(`\n${styleText(["bgGreen", "black"], " Quartz Plugin Manager ")}\n`)

  if (packageNames.length === 0) {
    console.log(styleText("red", "Error: No package names provided"))
    console.log("Usage: npx quartz plugin uninstall <package-name> [package-name...]")
    process.exit(1)
  }

  console.log(`Uninstalling ${packageNames.length} plugin(s)...`)

  const npmArgs = ["uninstall", ...packageNames]
  const result = spawnSync("npm", npmArgs, { stdio: "inherit" })

  if (result.status !== 0) {
    console.log(styleText("red", "Failed to uninstall plugins"))
    process.exit(1)
  }

  console.log(styleText("green", "✓ Plugins uninstalled successfully"))
  console.log(styleText("yellow", "Don't forget to remove them from your quartz.config.yaml!"))
}
