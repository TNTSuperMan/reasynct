import { build } from "bun";

build({
    outdir: "dist",
    entrypoints: ["./src/index.ts"],
    minify: true
})