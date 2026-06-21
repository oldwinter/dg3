import { defineConfig } from "tsup"

const SINGLETON_EXTERNALS = [
  "preact",
  "preact/hooks",
  "preact/jsx-runtime",
  "preact/compat",
  "@jackyzha0/quartz",
  "@jackyzha0/quartz/*",
  "vfile",
  "vfile/*",
  "unified",
] as const

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/index": "src/components/index.ts",
  },
  format: ["esm"],
  dts: true,
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2022",
  splitting: false,
  noExternal: [/.*/],
  external: [...SINGLETON_EXTERNALS],
  outDir: "dist",
  platform: "node",
  esbuildOptions(options) {
    options.jsx = "automatic"
    options.jsxImportSource = "preact"
  },
  esbuildPlugins: [
    {
      name: "text-loader",
      setup(build) {
        build.onLoad({ filter: /\.scss$/ }, async (args) => {
          const sass = await import("sass")
          const result = sass.compile(args.path)
          return { contents: result.css, loader: "text" }
        })

        build.onLoad({ filter: /\.inline\.ts(\?raw)?$/ }, async (args) => {
          const fs = await import("node:fs/promises")
          const text = await fs.readFile(args.path.replace(/\?raw$/, ""), "utf8")
          return {
            contents: text,
            loader: "text",
          }
        })
      },
    },
  ],
})
