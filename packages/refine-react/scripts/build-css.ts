import { promisify } from "util";
import { exec as _exec } from "child_process";
import path from "path";
import fs from "fs/promises";
import { getFlavors } from "./get-flavors";

const exec = promisify(_exec);
const tailwindcss = path.resolve(
  __dirname,
  "../../../node_modules/.bin/tailwindcss"
);

(async () => {
  const flavors = getFlavors();

  await Promise.all(
    flavors.map(async (flavor) => {
      const input = path.resolve(__dirname, `../src/flavors/${flavor}.css`);
      const output = path.resolve(__dirname, `../dist/flavors/${flavor}.css`);
      const content = path.resolve(
        path.resolve(__dirname, `../src/flavors/**`)
      );

      try {
        await fs.stat(input);
      } catch (error) {
        if (error.code === "ENOENT") return;
      }

      await exec(
        `cd .. && ${tailwindcss} -i ${input} -o ${output} --content ${content}`
      );
    })
  );
})();
