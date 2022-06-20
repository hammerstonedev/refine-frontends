let { removeSync, pathExistsSync, moveSync } = require('fs-extra');

if (pathExistsSync('./package.json')) {
  removeSync('./package.json');
}

if (pathExistsSync('./package.backup.json')) {
  moveSync('./package.backup.json', './package.json');
}
