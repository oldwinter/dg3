import assert from "node:assert/strict"
import test from "node:test"
import path from "node:path"
import fs from "node:fs"
import os from "node:os"

import {
  getPluginDir,
  installNativeDeps,
  installPlugin,
  installPlugins,
  parsePluginSource,
} from "./gitLoader"

test("parsePluginSource rejects object source names that escape the plugin install directory", () => {
  // Given
  const source = {
    repo: "./local-plugins/theme-switcher",
    name: "../outside-plugin",
  }

  assert.throws(() => parsePluginSource(source), /Plugin name must be a single safe directory name/)
})

test("parsePluginSource rejects object source refs with shell metacharacters", () => {
  // Given
  const source = {
    repo: "github:quartz-community/theme-switcher",
    ref: `main"; echo injected`,
  }

  assert.throws(() => parsePluginSource(source), /Invalid git ref/)
})

test("parsePluginSource rejects github shorthand repository owners with shell metacharacters", () => {
  // Given
  const source = "github:quartz-community$(echo injected)/theme-switcher"

  // When / Then
  assert.throws(() => parsePluginSource(source), /Invalid GitHub source/)
})

test("parsePluginSource rejects object github shorthand repositories with shell metacharacters", () => {
  // Given
  const source = {
    repo: "github:quartz-community/theme-switcher$(echo injected)",
    name: "theme-switcher",
  }

  // When / Then
  assert.throws(() => parsePluginSource(source), /Invalid GitHub source/)
})

test("parsePluginSource rejects plain github shorthand repository owners with shell metacharacters", () => {
  // Given
  const source = "quartz-community$(echo injected)/theme-switcher"

  // When / Then
  assert.throws(() => parsePluginSource(source), /Invalid GitHub source/)
})

test("parsePluginSource rejects git+https repository URLs with shell metacharacters", () => {
  // Given
  const source = "git+https://github.com/$(echo injected)/theme-switcher.git"

  // When / Then
  assert.throws(() => parsePluginSource(source), /Invalid git repository URL/)
})

test("parsePluginSource rejects direct https repository URLs with shell metacharacters", () => {
  // Given
  const source = "https://github.com/$(echo injected)/theme-switcher.git"

  // When / Then
  assert.throws(() => parsePluginSource(source), /Invalid git repository URL/)
})

test("installPlugin rejects raw direct repository specs before invoking git clone", async () => {
  // Given
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "git-loader-argv-"))
  const gitLogPath = path.join(tempDir, "git-argv.json")
  const fakeBinDir = path.join(tempDir, "bin")
  const installedPluginDir = getPluginDir("argv-token-test")
  fs.mkdirSync(fakeBinDir)

  const fakeGitPath =
    process.platform === "win32" ? path.join(fakeBinDir, "git.exe") : path.join(fakeBinDir, "git")
  const fakeGitNodeScript = [
    "const fs = require('fs')",
    "const path = require('path')",
    "const rawArgs = process.argv.slice(2)",
    "const args = rawArgs[0] === 'clone' ? rawArgs : ['clone', ...rawArgs]",
    "fs.writeFileSync(process.env.GIT_LOADER_ARGV_LOG, JSON.stringify(args))",
    "const dest = args[args.length - 1]",
    "fs.mkdirSync(path.join(dest, 'dist'), { recursive: true })",
    "fs.writeFileSync(path.join(dest, 'package.json'), '{\"peerDependencies\":{}}')",
    "fs.writeFileSync(path.join(dest, 'dist', 'index.js'), 'export {};')",
  ].join("\n")

  const fakeGitScriptPath = path.join(tempDir, "fake-git.js")
  fs.writeFileSync(fakeGitScriptPath, fakeGitNodeScript)

  if (process.platform === "win32") {
    fs.copyFileSync(process.execPath, fakeGitPath)
    fs.copyFileSync(fakeGitScriptPath, path.join(tempDir, "clone"))
  } else {
    const fakeGitScript = ["#!/usr/bin/env sh", `node "${fakeGitScriptPath}" "$@"`].join("\n")
    fs.writeFileSync(fakeGitPath, fakeGitScript)
    fs.chmodSync(fakeGitPath, 0o755)
  }

  const originalCwd = process.cwd()
  const pathEnvKey = Object.keys(process.env).find((key) => key.toLowerCase() === "path") ?? "PATH"
  const originalPath = process.env[pathEnvKey]
  process.env[pathEnvKey] = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`
  process.env.GIT_LOADER_ARGV_LOG = gitLogPath
  process.chdir(tempDir)

  try {
    // When / Then
    await assert.rejects(
      () =>
        installPlugin(
          {
            name: "argv-token-test",
            repo: "https://github.com/quartz-community/theme-switcher.git$(echo injected)",
          },
          { force: true },
        ),
      /Invalid git repository URL/,
    )
    assert.equal(fs.existsSync(gitLogPath), false)
  } finally {
    if (originalPath === undefined) {
      delete process.env[pathEnvKey]
    } else {
      process.env[pathEnvKey] = originalPath
    }
    delete process.env.GIT_LOADER_ARGV_LOG
    process.chdir(originalCwd)
    fs.rmSync(installedPluginDir, { recursive: true, force: true })
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
})

test("installPlugin rejects raw leading-dash repository specs before invoking git clone", async () => {
  // Given
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "git-loader-leading-dash-"))
  const gitLogPath = path.join(tempDir, "git-argv.json")
  const fakeBinDir = path.join(tempDir, "bin")
  const installedPluginDir = getPluginDir("leading-dash-test")
  fs.mkdirSync(fakeBinDir)

  const fakeGitPath =
    process.platform === "win32" ? path.join(fakeBinDir, "git.exe") : path.join(fakeBinDir, "git")
  const fakeGitNodeScript = [
    "const fs = require('fs')",
    "const path = require('path')",
    "const rawArgs = process.argv.slice(2)",
    "const args = rawArgs[0] === 'clone' ? rawArgs : ['clone', ...rawArgs]",
    "fs.writeFileSync(process.env.GIT_LOADER_ARGV_LOG, JSON.stringify(args))",
    "const dest = args[args.length - 1]",
    "fs.mkdirSync(path.join(dest, 'dist'), { recursive: true })",
    "fs.writeFileSync(path.join(dest, 'package.json'), '{\"peerDependencies\":{}}')",
    "fs.writeFileSync(path.join(dest, 'dist', 'index.js'), 'export {};')",
  ].join("\n")

  const fakeGitScriptPath = path.join(tempDir, "fake-git.js")
  fs.writeFileSync(fakeGitScriptPath, fakeGitNodeScript)

  if (process.platform === "win32") {
    fs.copyFileSync(process.execPath, fakeGitPath)
    fs.copyFileSync(fakeGitScriptPath, path.join(tempDir, "clone"))
  } else {
    const fakeGitScript = ["#!/usr/bin/env sh", `node "${fakeGitScriptPath}" "$@"`].join("\n")
    fs.writeFileSync(fakeGitPath, fakeGitScript)
    fs.chmodSync(fakeGitPath, 0o755)
  }

  const originalCwd = process.cwd()
  const pathEnvKey = Object.keys(process.env).find((key) => key.toLowerCase() === "path") ?? "PATH"
  const originalPath = process.env[pathEnvKey]
  process.env[pathEnvKey] = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`
  process.env.GIT_LOADER_ARGV_LOG = gitLogPath
  process.chdir(tempDir)

  try {
    // When / Then
    await assert.rejects(
      () =>
        installPlugin(
          {
            name: "leading-dash-test",
            repo: "--upload-pack=touch injected",
          },
          { force: true },
        ),
      /Cannot parse plugin source/,
    )
    assert.equal(fs.existsSync(gitLogPath), false)
  } finally {
    if (originalPath === undefined) {
      delete process.env[pathEnvKey]
    } else {
      process.env[pathEnvKey] = originalPath
    }
    delete process.env.GIT_LOADER_ARGV_LOG
    process.chdir(originalCwd)
    fs.rmSync(installedPluginDir, { recursive: true, force: true })
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
})

test("installPlugins rejects raw object repository specs before invoking git clone", async () => {
  // Given
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "git-loader-install-plugins-"))
  const gitLogPath = path.join(tempDir, "git-argv.json")
  const fakeBinDir = path.join(tempDir, "bin")
  const installedPluginDir = getPluginDir("batch-object-test")
  fs.mkdirSync(fakeBinDir)

  const fakeGitPath =
    process.platform === "win32" ? path.join(fakeBinDir, "git.exe") : path.join(fakeBinDir, "git")
  const fakeGitNodeScript = [
    "const fs = require('fs')",
    "const path = require('path')",
    "const rawArgs = process.argv.slice(2)",
    "const args = rawArgs[0] === 'clone' ? rawArgs : ['clone', ...rawArgs]",
    "fs.writeFileSync(process.env.GIT_LOADER_ARGV_LOG, JSON.stringify(args))",
    "const dest = args[args.length - 1]",
    "fs.mkdirSync(path.join(dest, 'dist'), { recursive: true })",
    "fs.writeFileSync(path.join(dest, 'package.json'), '{\"peerDependencies\":{}}')",
    "fs.writeFileSync(path.join(dest, 'dist', 'index.js'), 'export {};')",
  ].join("\n")

  const fakeGitScriptPath = path.join(tempDir, "fake-git.js")
  fs.writeFileSync(fakeGitScriptPath, fakeGitNodeScript)

  if (process.platform === "win32") {
    fs.copyFileSync(process.execPath, fakeGitPath)
    fs.copyFileSync(fakeGitScriptPath, path.join(tempDir, "clone"))
  } else {
    const fakeGitScript = ["#!/usr/bin/env sh", `node "${fakeGitScriptPath}" "$@"`].join("\n")
    fs.writeFileSync(fakeGitPath, fakeGitScript)
    fs.chmodSync(fakeGitPath, 0o755)
  }

  const originalCwd = process.cwd()
  const pathEnvKey = Object.keys(process.env).find((key) => key.toLowerCase() === "path") ?? "PATH"
  const originalPath = process.env[pathEnvKey]
  const originalConsoleError = console.error
  process.env[pathEnvKey] = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`
  process.env.GIT_LOADER_ARGV_LOG = gitLogPath
  console.error = () => {}
  process.chdir(tempDir)

  try {
    // When
    const installed = await installPlugins(
      [
        {
          name: "batch-object-test",
          repo: "https://github.com/quartz-community/theme-switcher.git$(echo injected)",
        },
      ],
      { force: true },
    )

    // Then
    assert.equal(installed.size, 0)
    assert.equal(fs.existsSync(gitLogPath), false)
  } finally {
    if (originalPath === undefined) {
      delete process.env[pathEnvKey]
    } else {
      process.env[pathEnvKey] = originalPath
    }
    delete process.env.GIT_LOADER_ARGV_LOG
    console.error = originalConsoleError
    process.chdir(originalCwd)
    fs.rmSync(installedPluginDir, { recursive: true, force: true })
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
})

test("installPlugin separates a valid raw repository spec from git clone options", async () => {
  // Given
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "git-loader-separator-"))
  const gitLogPath = path.join(tempDir, "git-argv.json")
  const fakeBinDir = path.join(tempDir, "bin")
  fs.mkdirSync(fakeBinDir)

  const fakeGitPath =
    process.platform === "win32" ? path.join(fakeBinDir, "git.exe") : path.join(fakeBinDir, "git")
  const fakeGitNodeScript = [
    "const fs = require('fs')",
    "const path = require('path')",
    "const rawArgs = process.argv.slice(2)",
    "const args = rawArgs[0] === 'clone' ? rawArgs : ['clone', ...rawArgs]",
    "fs.writeFileSync(process.env.GIT_LOADER_ARGV_LOG, JSON.stringify(args))",
    "const dest = args[args.length - 1]",
    "fs.mkdirSync(path.join(dest, 'dist'), { recursive: true })",
    "fs.writeFileSync(path.join(dest, 'package.json'), '{\"peerDependencies\":{}}')",
    "fs.writeFileSync(path.join(dest, 'dist', 'index.js'), 'export {};')",
  ].join("\n")

  const fakeGitScriptPath = path.join(tempDir, "fake-git.js")
  fs.writeFileSync(fakeGitScriptPath, fakeGitNodeScript)

  if (process.platform === "win32") {
    fs.copyFileSync(process.execPath, fakeGitPath)
    fs.copyFileSync(fakeGitScriptPath, path.join(tempDir, "clone"))
  } else {
    const fakeGitScript = ["#!/usr/bin/env sh", `node "${fakeGitScriptPath}" "$@"`].join("\n")
    fs.writeFileSync(fakeGitPath, fakeGitScript)
    fs.chmodSync(fakeGitPath, 0o755)
  }

  const originalCwd = process.cwd()
  const pathEnvKey = Object.keys(process.env).find((key) => key.toLowerCase() === "path") ?? "PATH"
  const originalPath = process.env[pathEnvKey]
  process.env[pathEnvKey] = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`
  process.env.GIT_LOADER_ARGV_LOG = gitLogPath
  process.chdir(tempDir)

  try {
    // When
    const spec = parsePluginSource({
      name: "separator-test",
      repo: "https://github.com/quartz-community/theme-switcher.git",
    })
    const installedPluginDir = getPluginDir(spec.name)
    await installPlugin(spec, { force: true })

    // Then
    const args: readonly string[] = JSON.parse(fs.readFileSync(gitLogPath, "utf-8"))
    assert.deepEqual(args, [
      "clone",
      "--depth",
      "1",
      "--",
      "https://github.com/quartz-community/theme-switcher.git",
      installedPluginDir,
    ])
    fs.rmSync(installedPluginDir, { recursive: true, force: true })
  } finally {
    if (originalPath === undefined) {
      delete process.env[pathEnvKey]
    } else {
      process.env[pathEnvKey] = originalPath
    }
    delete process.env.GIT_LOADER_ARGV_LOG
    process.chdir(originalCwd)
    fs.rmSync(getPluginDir("separator-test"), { recursive: true, force: true })
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
})

test("installNativeDeps rejects unsafe peer dependency names before invoking npm", () => {
  // Given
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "git-loader-npm-name-"))
  const npmLogPath = path.join(tempDir, "npm-argv.json")
  const fakeBinDir = path.join(tempDir, "bin")
  fs.mkdirSync(fakeBinDir)

  const fakeNpmScriptPath = path.join(tempDir, "fake-npm.cjs")
  fs.writeFileSync(
    fakeNpmScriptPath,
    [
      "const fs = require('fs')",
      "fs.writeFileSync(process.env.GIT_LOADER_NPM_LOG, JSON.stringify(process.argv.slice(2)))",
    ].join("\n"),
  )

  if (process.platform === "win32") {
    fs.writeFileSync(
      path.join(fakeBinDir, "npm.cmd"),
      `@"${process.execPath}" "${fakeNpmScriptPath}" %*\r\n`,
    )
  } else {
    const fakeNpmScript = ["#!/usr/bin/env sh", `node "${fakeNpmScriptPath}" "$@"`].join("\n")
    const fakeNpmPath = path.join(fakeBinDir, "npm")
    fs.writeFileSync(fakeNpmPath, fakeNpmScript)
    fs.chmodSync(fakeNpmPath, 0o755)
  }

  const originalCwd = process.cwd()
  const pathEnvKey = Object.keys(process.env).find((key) => key.toLowerCase() === "path") ?? "PATH"
  const originalPath = process.env[pathEnvKey]
  const originalNpmExecPath = process.env.npm_execpath
  const originalNpmNodeExecPath = process.env.npm_node_execpath
  process.env[pathEnvKey] = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`
  process.env.npm_execpath = fakeNpmScriptPath
  process.env.npm_node_execpath = process.execPath
  process.env.GIT_LOADER_NPM_LOG = npmLogPath
  process.chdir(tempDir)

  try {
    // When / Then
    assert.throws(
      () => installNativeDeps(new Map([["plugin-a", new Map([["bad;package", "^1.0.0"]])]]), {}),
      /Invalid native dependency package name/,
    )
    assert.equal(fs.existsSync(npmLogPath), false)
  } finally {
    if (originalPath === undefined) {
      delete process.env[pathEnvKey]
    } else {
      process.env[pathEnvKey] = originalPath
    }
    if (originalNpmExecPath === undefined) {
      delete process.env.npm_execpath
    } else {
      process.env.npm_execpath = originalNpmExecPath
    }
    if (originalNpmNodeExecPath === undefined) {
      delete process.env.npm_node_execpath
    } else {
      process.env.npm_node_execpath = originalNpmNodeExecPath
    }
    delete process.env.GIT_LOADER_NPM_LOG
    process.chdir(originalCwd)
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
})

test("installNativeDeps passes unsafe-looking peer dependency ranges as one npm argv token", () => {
  // Given
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "git-loader-npm-range-"))
  const npmLogPath = path.join(tempDir, "npm-argv.json")
  const shellExecutionPath = path.join(tempDir, "shell-executed")
  const fakeBinDir = path.join(tempDir, "bin")
  fs.mkdirSync(fakeBinDir)

  const fakeNpmScriptPath = path.join(tempDir, "fake-npm.cjs")
  fs.writeFileSync(
    fakeNpmScriptPath,
    [
      "const fs = require('fs')",
      "fs.writeFileSync(process.env.GIT_LOADER_NPM_LOG, JSON.stringify(process.argv.slice(2)))",
    ].join("\n"),
  )

  if (process.platform === "win32") {
    fs.writeFileSync(
      path.join(fakeBinDir, "npm.cmd"),
      `@"${process.execPath}" "${fakeNpmScriptPath}" %*\r\n`,
    )
  } else {
    const fakeNpmScript = ["#!/usr/bin/env sh", `node "${fakeNpmScriptPath}" "$@"`].join("\n")
    const fakeNpmPath = path.join(fakeBinDir, "npm")
    fs.writeFileSync(fakeNpmPath, fakeNpmScript)
    fs.chmodSync(fakeNpmPath, 0o755)
  }

  const originalCwd = process.cwd()
  const pathEnvKey = Object.keys(process.env).find((key) => key.toLowerCase() === "path") ?? "PATH"
  const originalPath = process.env[pathEnvKey]
  const originalNpmExecPath = process.env.npm_execpath
  const originalNpmNodeExecPath = process.env.npm_node_execpath
  process.env[pathEnvKey] = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`
  process.env.npm_execpath = fakeNpmScriptPath
  process.env.npm_node_execpath = process.execPath
  process.env.GIT_LOADER_NPM_LOG = npmLogPath
  process.chdir(tempDir)

  try {
    // When
    installNativeDeps(
      new Map([
        [
          "plugin-a",
          new Map([
            [
              "left-pad",
              `^1.0.0 $(node -e "require('fs').writeFileSync('${shellExecutionPath.replaceAll("\\", "\\\\")}', 'x')")`,
            ],
          ]),
        ],
      ]),
      {},
    )

    // Then
    const args: readonly string[] = JSON.parse(fs.readFileSync(npmLogPath, "utf-8"))
    assert.deepEqual(args, [
      "install",
      "--no-save",
      "--",
      `left-pad@^1.0.0 $(node -e "require('fs').writeFileSync('${shellExecutionPath.replaceAll("\\", "\\\\")}', 'x')")`,
    ])
    assert.equal(fs.existsSync(shellExecutionPath), false)
  } finally {
    if (originalPath === undefined) {
      delete process.env[pathEnvKey]
    } else {
      process.env[pathEnvKey] = originalPath
    }
    if (originalNpmExecPath === undefined) {
      delete process.env.npm_execpath
    } else {
      process.env.npm_execpath = originalNpmExecPath
    }
    if (originalNpmNodeExecPath === undefined) {
      delete process.env.npm_node_execpath
    } else {
      process.env.npm_node_execpath = originalNpmNodeExecPath
    }
    delete process.env.GIT_LOADER_NPM_LOG
    process.chdir(originalCwd)
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
})

test("installPlugin rejects subdir traversal before clone extraction can escape the temp repo", async () => {
  // Given
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "git-loader-subdir-"))
  const gitLogPath = path.join(tempDir, "git-argv.json")
  const fakeBinDir = path.join(tempDir, "bin")
  const installedPluginDir = getPluginDir("subdir-traversal-test")
  fs.mkdirSync(fakeBinDir)

  const fakeGitPath =
    process.platform === "win32" ? path.join(fakeBinDir, "git.exe") : path.join(fakeBinDir, "git")
  const fakeGitNodeScript = [
    "const fs = require('fs')",
    "const path = require('path')",
    "const rawArgs = process.argv.slice(2)",
    "const args = rawArgs[0] === 'clone' ? rawArgs : ['clone', ...rawArgs]",
    "fs.writeFileSync(process.env.GIT_LOADER_ARGV_LOG, JSON.stringify(args))",
    "const dest = args[args.length - 1]",
    "const escaped = path.join(path.dirname(dest), 'escaped-subdir')",
    "fs.mkdirSync(path.join(dest, 'placeholder'), { recursive: true })",
    "fs.mkdirSync(path.join(escaped, 'dist'), { recursive: true })",
    "fs.writeFileSync(path.join(escaped, 'package.json'), '{\"peerDependencies\":{}}')",
    "fs.writeFileSync(path.join(escaped, 'dist', 'index.js'), 'export {};')",
  ].join("\n")

  const fakeGitScriptPath = path.join(tempDir, "fake-git.js")
  fs.writeFileSync(fakeGitScriptPath, fakeGitNodeScript)

  if (process.platform === "win32") {
    fs.copyFileSync(process.execPath, fakeGitPath)
    fs.copyFileSync(fakeGitScriptPath, path.join(tempDir, "clone"))
  } else {
    const fakeGitScript = ["#!/usr/bin/env sh", `node "${fakeGitScriptPath}" "$@"`].join("\n")
    fs.writeFileSync(fakeGitPath, fakeGitScript)
    fs.chmodSync(fakeGitPath, 0o755)
  }

  const originalCwd = process.cwd()
  const pathEnvKey = Object.keys(process.env).find((key) => key.toLowerCase() === "path") ?? "PATH"
  const originalPath = process.env[pathEnvKey]
  process.env[pathEnvKey] = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`
  process.env.GIT_LOADER_ARGV_LOG = gitLogPath
  process.chdir(tempDir)

  try {
    // When / Then
    await assert.rejects(
      () =>
        installPlugin(
          {
            name: "subdir-traversal-test",
            repo: "https://github.com/quartz-community/theme-switcher.git",
            subdir: "../escaped-subdir",
          },
          { force: true },
        ),
      /Invalid plugin subdirectory/,
    )
    assert.equal(fs.existsSync(gitLogPath), false)
  } finally {
    if (originalPath === undefined) {
      delete process.env[pathEnvKey]
    } else {
      process.env[pathEnvKey] = originalPath
    }
    delete process.env.GIT_LOADER_ARGV_LOG
    process.chdir(originalCwd)
    fs.rmSync(installedPluginDir, { recursive: true, force: true })
    fs.rmSync(path.join(path.dirname(installedPluginDir), "escaped-subdir"), {
      recursive: true,
      force: true,
    })
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
})

test("getPluginDir keeps accepted plugin names under .quartz/plugins", () => {
  // Given
  const spec = parsePluginSource({
    repo: "./local-plugins/theme-switcher",
    name: "theme-switcher-local",
  })

  // When
  const pluginDir = getPluginDir(spec.name)
  const pluginsRoot = path.resolve(".quartz", "plugins")
  const relative = path.relative(pluginsRoot, pluginDir)

  // Then
  assert.equal(relative, "theme-switcher-local")
  assert.equal(path.isAbsolute(relative), false)
  assert.equal(relative.startsWith(".."), false)
})
