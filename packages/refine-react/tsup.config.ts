import { defineConfig } from "tsup";
import { getFlavors } from "./scripts/get-flavors";

const flavors = getFlavors().map((flavor) => `src/flavors/${flavor}.tsx`);

export default defineConfig({
  entry: ["src/index.ts", ...flavors],
  format: ["esm", "cjs"],
  dts: true,
  external: ["react"],
});
