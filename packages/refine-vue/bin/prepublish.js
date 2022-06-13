const { writeFileSync, copySync, pathExistsSync } = require('fs-extra');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

let pkg = require('../package.json');
let library = argv._[0];
let development = argv.dev;
let production = argv.prod;

if (!development && !production) {
  throw new Error('Unknown environment.');
}

let version = '0.1.' + ~~(Date.now() / 1000);

if (production) {
  // Populated by GitHub actions
  version = process.env.PACKAGE_VERSION;

  if (!version.startsWith('vue/')) {
    // Debug
    version = 'vue/0.2.3';
    // throw new Error(`"${version}" does not start with "vue/"`);
  }

  version = version.replace('vue/', '');
}

if (pathExistsSync('./package.backup.json')) {
  throw new Error('package.backup.json already exists, not overwriting.');
}

copySync('./package.json', './package.backup.json');

pkg = {
  ...pkg,
  name: `@hammerstone/refine-${library}${development ? '-dev' : ''}`,
  version: version,
  module: `./dist/${library}/refine-vue.esm.js`,
  main: `./dist/${library}/refine-vue.cjs`,
};

writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
