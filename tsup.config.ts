import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	clean: true,
	sourcemap: false,
	minify: true,
	dts: true,
	format: ["esm", "cjs"],
	legacyOutput: false,
	shims: true,
	outDir: "dist",
	platform: "node",
});
