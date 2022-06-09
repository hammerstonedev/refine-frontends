let { writeFileSync, copySync, pathExistsSync } = require('fs-extra');
let pkg = require('../package.json');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
let library = argv._[0];
let development = argv.dev;

if (!development) {
  throw new Error('Dev only for now');
}

if (pathExistsSync('./package.backup.json')) {
  throw new Error('package.backup.json already exists, not overwriting.');
}

copySync('./package.json', './package.backup.json');

writeFileSync('./package2.json', JSON.stringify(pkg, null, 2));

pkg = {
  ...pkg,
  name: `@hammerstone/refine-${library}${development ? '-dev' : ''}`,
  version: '0.1.' + ~~(Date.now() / 1000),
  module: `./dist/${library}/refine-vue.esm.js`,
  main: `./dist/${library}/refine-vue.cjs`,
};

writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
