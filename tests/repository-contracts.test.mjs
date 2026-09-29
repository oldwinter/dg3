import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

test("build-and-test CI job is not restricted to the upstream Quartz repository", () => {
  const workflow = readFileSync(new URL("../.github/workflows/ci.yaml", import.meta.url), "utf8")
  const buildJob = workflow.split("  publish-tag:")[0]

  assert.doesNotMatch(buildJob, /github\.repository\s*==\s*['"]jackyzha0\/quartz['"]/)
})

test("format checks exclude authored content and generated plugin bundles", () => {
  const ignores = readFileSync(new URL("../.prettierignore", import.meta.url), "utf8")
    .split(/\r?\n/)
    .filter(Boolean)

  assert.ok(ignores.includes("content"), "content should not be rewritten by the code formatter")
  assert.ok(ignores.includes("**/dist"), "generated plugin bundles should be excluded")
  assert.ok(
    ignores.includes("external-plugins"),
    "vendored external plugins should retain their own formatting contract",
  )
})
