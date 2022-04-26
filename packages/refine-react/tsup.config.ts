import { defineConfig } from "tsup";
import path from "path";
import fs from "fs";

const flavors = fs
  .readdirSync(path.resolve(__dirname, "src/flavors"))
  .filter((filename) => !filename.startsWith("index.ts"))
  .map((filename) => `src/flavors/${filename}`);

export default defineConfig({
  entry: ["src/index.ts", ...flavors],
  format: ["esm", "cjs"],
  dts: true,
  external: ["react"],
});
