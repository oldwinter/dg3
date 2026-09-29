import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

test("build-and-test CI job is not restricted to the upstream Quartz repository", () => {
  const workflow = readFileSync(new URL("../.github/workflows/ci.yaml", import.meta.url), "utf8")
  const buildJob = workflow.split("  publish-tag:")[0]

  assert.doesNotMatch(buildJob, /github\.repository\s*==\s*['"]jackyzha0\/quartz['"]/)
})
