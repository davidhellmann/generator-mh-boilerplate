'use strict';
const packageJsonModules = require('../packageJson-modules/');

const writePackageJson = ({
                            context,
                            files = {}
                          } = {}) => {
  packageJsonModules({
    pkg: files.pkg
  }, context);
};

module.exports = writePackageJson;
