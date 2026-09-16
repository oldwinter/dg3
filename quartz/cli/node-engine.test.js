import assert from "node:assert"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import test, { describe } from "node:test"
import { fileURLToPath } from "node:url"

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../..")

function requiredNodeMajor(enginesNode) {
  const match = String(enginesNode).match(/>=\s*(\d+)/)
  assert.ok(match, `engines.node should declare a minimum major, got ${enginesNode}`)
  return Number(match[1])
}

describe("Node engine gate", () => {
  const pkg = JSON.parse(readFileSync(join(repoRoot, "package.json"), "utf8"))
  const cli = readFileSync(join(repoRoot, "quartz/bootstrap-cli.mjs"), "utf8")
  const major = requiredNodeMajor(pkg.engines.node)

  test("package.json engines require Node 26 and npm 12", () => {
    assert.equal(pkg.engines.node, ">=26")
    assert.equal(pkg.engines.npm, ">=12")
    assert.equal(major, 26)
  })

  test("CLI rejects Node below engines.node using the same major", () => {
    assert.match(cli, new RegExp(`if \\(major < ${major}\\)`))
    assert.match(cli, new RegExp(`Quartz requires Node\\.js >= ${major}`))
    assert.doesNotMatch(cli, /major < 22/)
    assert.doesNotMatch(cli, /Node\.js >= 22/)
  })
})
