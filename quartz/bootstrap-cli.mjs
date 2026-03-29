#!/usr/bin/env -S node --no-deprecation
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import {
  handleBuild,
  handleCreate,
  handleUpdate,
  handleUpgrade,
  handleRestore,
  handleSync,
} from "./cli/handlers.js"
import { handleMigrate } from "./cli/migrate-handler.js"
import {
  handlePluginInstall as handleGitPluginInstall,
  handlePluginAdd,
  handlePluginRemove,
  handlePluginUpdate,
  handlePluginRestore,
  handlePluginList,
  handlePluginEnable,
  handlePluginDisable,
  handlePluginConfig,
  handlePluginCheck,
  handlePluginPrune,
  handlePluginResolve,
} from "./cli/plugin-git-handlers.js"
import {
  CommonArgv,
  BuildArgv,
  CreateArgv,
  SyncArgv,
  PluginInstallArgv,
  PluginUninstallArgv,
  PluginSearchArgv,
} from "./cli/args.js"
import { version } from "./cli/constants.js"

async function launchTui() {
  const { join } = await import("path")
  const { existsSync } = await import("fs")
  const { spawn } = await import("child_process")
  const tuiPath = join(process.cwd(), ".quartz", "plugins", "tui", "dist", "App.mjs")

  if (!existsSync(tuiPath)) {
    console.error(
      "TUI plugin not installed. Install with:\n" +
        "  npx quartz plugin add github:quartz-community/tui\n",
    )
    process.exit(1)
  }

  // OpenTUI requires Bun runtime (uses bun:ffi for Zig renderer)
  return new Promise((resolve, reject) => {
    const child = spawn("bun", ["run", tuiPath], {
      stdio: "inherit",
      cwd: process.cwd(),
    })

    child.on("error", (err) => {
      if (err.code === "ENOENT") {
        console.error(
          "Error: Bun runtime not found. The TUI requires Bun to run.\n" +
            "Install Bun: https://bun.sh/docs/installation",
        )
      }
      reject(err)
    })

    child.on("close", (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`TUI exited with code ${code}`))
      }
    })
  })
}

yargs(hideBin(process.argv))
  .scriptName("quartz")
  .version(version)
  .usage("$0 <cmd> [args]")
  .command("create", "Initialize Quartz", CreateArgv, async (argv) => {
    await handleCreate(argv)
  })
  .command(
    "update [names..]",
    "Update installed plugins to latest version",
    CommonArgv,
    async (argv) => {
      await handleUpdate(argv)
    },
  )
  .command("upgrade", "Upgrade Quartz to the latest version", CommonArgv, async (argv) => {
    await handleUpgrade(argv)
  })
  .command(
    "restore",
    "Try to restore your content folder from the cache",
    CommonArgv,
    async (argv) => {
      await handleRestore(argv)
    },
  )
  .command("sync", "Sync your Quartz to and from GitHub.", SyncArgv, async (argv) => {
    await handleSync(argv)
  })
  .command("build", "Build Quartz into a bundle of static HTML files", BuildArgv, async (argv) => {
    await handleBuild(argv)
  })
  .command("migrate", "Migrate old config to quartz.config.yaml", CommonArgv, async () => {
    await handleMigrate()
  })
  .command("tui", "Launch interactive plugin manager", CommonArgv, async () => {
    await launchTui()
  })
  .command(
    "plugin [subcommand]",
    "Manage Quartz plugins",
    (yargs) => {
      return yargs
        .command("install", "Install plugins from quartz.lock.json", CommonArgv, async () => {
          await handleGitPluginInstall()
        })
        .command(
          "add <repos..>",
          "Add plugins from Git repositories",
          {
            ...CommonArgv,
            name: {
              string: true,
              alias: ["as"],
              describe: "Override the plugin name (for resolving conflicts with duplicate names)",
            },
            subdir: {
              string: true,
              describe: "Subdirectory within the repository containing the plugin",
            },
          },
          async (argv) => {
            await handlePluginAdd(argv.repos, { name: argv.name, subdir: argv.subdir })
          },
        )
        .command("remove <names..>", "Remove installed plugins", CommonArgv, async (argv) => {
          await handlePluginRemove(argv.names)
        })
        .command(
          "update [names..]",
          "Update installed plugins to latest version",
          CommonArgv,
          async (argv) => {
            await handlePluginUpdate(argv.names)
          },
        )
        .command("list", "List all installed plugins", CommonArgv, async () => {
          await handlePluginList()
        })
        .command(
          "restore",
          "Restore plugins from lockfile (exact versions)",
          CommonArgv,
          async () => {
            await handlePluginRestore()
          },
        )
        .command(
          "enable <names..>",
          "Enable plugins in quartz.config.yaml",
          CommonArgv,
          async (argv) => {
            await handlePluginEnable(argv.names)
          },
        )
        .command(
          "disable <names..>",
          "Disable plugins in quartz.config.yaml",
          CommonArgv,
          async (argv) => {
            await handlePluginDisable(argv.names)
          },
        )
        .command(
          "config <name>",
          "View or set plugin configuration",
          {
            ...CommonArgv,
            set: {
              string: true,
              describe: "Set a config value (key=value)",
            },
          },
          async (argv) => {
            await handlePluginConfig(argv.name, { set: argv.set })
          },
        )
        .command("check", "Check for plugin updates", CommonArgv, async () => {
          await handlePluginCheck()
        })
        .command(
          "prune",
          "Remove installed plugins no longer referenced in config",
          {
            ...CommonArgv,
            "dry-run": {
              boolean: true,
              default: false,
              describe: "show what would be pruned without making changes",
            },
          },
          async (argv) => {
            await handlePluginPrune({ dryRun: argv.dryRun })
          },
        )
        .command(
          "resolve",
          "Install plugins from config that are not yet in the lockfile",
          {
            ...CommonArgv,
            "dry-run": {
              boolean: true,
              default: false,
              describe: "show what would be resolved without making changes",
            },
          },
          async (argv) => {
            await handlePluginResolve({ dryRun: argv.dryRun })
          },
        )
        .demandCommand(0, "")
    },
    async (argv) => {
      if (!argv._.includes("plugin") || argv._.length > 1) return
      await launchTui()
    },
  )
  .showHelpOnFail(false)
  .help()
  .strict()
  .demandCommand().argv
