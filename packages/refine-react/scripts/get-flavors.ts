import path from "path";
import fs from "fs";

export const getFlavors = () =>
  fs
    .readdirSync(path.resolve(__dirname, "../src/flavors"))
    .filter((filename) => filename.endsWith(".tsx"))
    .map((filename) => path.basename(filename, ".tsx"));
