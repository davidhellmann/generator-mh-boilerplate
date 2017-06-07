const _base = require('./_base');
const {packageJsonScripts} = require('./_scripts');

const packageJsonModules = (files = {}, context) => {
  _base(files, context);
  packageJsonScripts(files);
};

module.exports = packageJsonModules;
