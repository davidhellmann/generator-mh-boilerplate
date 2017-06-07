const _base = require('./_base');
const {packageJsonScripts} = require('./_scripts');
const {packageJsonWebpack} = require('./devDependencies/_webpack');
const {packageJsonGulp} = require('./devDependencies/_gulp');
const {packageJsonCss} = require('./devDependencies/_css');
const {packageJsonJavascript} = require('./devDependencies/_javascript');
const {packageJsonOther} = require('./devDependencies/_other');

const packageJsonModules = (files = {}, context) => {
  _base(files, context);
  packageJsonScripts(files);
  packageJsonWebpack(files);
  packageJsonGulp(files);
  packageJsonCss(files);
  packageJsonJavascript(files);
  packageJsonOther(files);
};

module.exports = packageJsonModules;
