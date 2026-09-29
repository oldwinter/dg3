import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { mkdtemp } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const repoRoot = fileURLToPath(new URL("../", import.meta.url))
const actionPath = path.join(repoRoot, "action.sh")
const skipOnWindows = process.platform === "win32"

async function createWorkspace() {
  const root = await mkdtemp(path.join(tmpdir(), "dg3-theme-action-"))
  const styles = path.join(root, "quartz", "styles")
  const theme = path.join(styles, "themes")
  const bin = path.join(root, "bin")

  mkdirSync(theme, { recursive: true })
  mkdirSync(bin)
  writeFileSync(path.join(styles, "custom.scss"), '@use "./base.scss";\n')
  writeFileSync(path.join(theme, "marker.txt"), "keep\n")

  return { root, theme, bin, gitLog: path.join(root, "git-invocations.log") }
}

function shellQuote(value) {
  return "'" + value.replaceAll("'", "'\\''") + "'"
}

function installFakeGit(bin, body) {
  const command = path.join(bin, "git")
  writeFileSync(command, "#!/usr/bin/env bash\nset -e\n" + body + "\n")
  chmodSync(command, 0o755)
}

function runAction(workspace, ...args) {
  return spawnSync("bash", [actionPath, ...args], {
    cwd: workspace.root,
    env: {
      ...process.env,
      PATH: workspace.bin + path.delimiter + process.env.PATH,
    },
    encoding: "utf8",
  })
}

test(
  "rejects traversal-like theme names before invoking git",
  { skip: skipOnWindows },
  async () => {
    const workspace = await createWorkspace()
    installFakeGit(
      workspace.bin,
      'echo "$*" >> ' + shellQuote(workspace.gitLog) + "\nexit 99",
    )

    const result = runAction(workspace, "../escape")

    assert.notEqual(result.status, 0)
    assert.equal(readFileSync(path.join(workspace.theme, "marker.txt"), "utf8"), "keep\n")
    assert.equal(existsSync(workspace.gitLog), false)
  },
)

test(
  "preserves the active theme when cloning fails",
  { skip: skipOnWindows },
  async () => {
    const workspace = await createWorkspace()
    installFakeGit(workspace.bin, 'if [[ "$1" == "clone" ]]; then exit 42; fi')

    const result = runAction(workspace, "tokyo-night")

    assert.notEqual(result.status, 0)
    assert.equal(readFileSync(path.join(workspace.theme, "marker.txt"), "utf8"), "keep\n")
  },
)

test(
  "never reuses or deletes a pre-existing quartz-themes directory",
  { skip: skipOnWindows },
  async () => {
    const workspace = await createWorkspace()
    const existingCheckout = path.join(workspace.root, "quartz-themes")
    mkdirSync(existingCheckout)
    writeFileSync(path.join(existingCheckout, "keep.txt"), "user data\n")
    installFakeGit(
      workspace.bin,
      [
        'if [[ "$1" == "clone" ]]; then',
        '  destination="${!#}"',
        '  if [[ "$destination" == https://* ]]; then exit 128; fi',
        '  mkdir -p "$destination/themes/tokyo-night"',
        "  printf '%s\\n' '// fixture theme' > \"$destination/themes/tokyo-night/_index.scss\"",
        "fi",
      ].join("\n"),
    )

    const result = runAction(workspace, "tokyo-night")

    assert.equal(result.status, 0, result.stderr)
    assert.equal(readFileSync(path.join(existingCheckout, "keep.txt"), "utf8"), "user data\n")
  },
)
