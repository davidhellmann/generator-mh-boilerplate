'use strict';
const extend = require('deep-extend');

const eslint = {
  eslint: '^3.16.0',
  'eslint-config-airbnb-base': '^11.1.0',
  'eslint-config-defaults': '^9.0.0',
  'eslint-formatter-pretty': '^1.1.0',
  'eslint-friendly-formatter': '^3.0.0',
  'eslint-plugin-html': '^2.0.1',
  'eslint-plugin-import': '^2.2.0'
};

const babel = {
  'babel-cli': '^6.23.0',
  'babel-core': '^6.23.1',
  'babel-eslint': '^7.1.0',
  'babel-plugin-lodash': '^3.2.11',
  'babel-plugin-syntax-dynamic-import': '^6.18.0',
  'babel-plugin-transform-runtime': '^6.23.0',
  'babel-preset-es2015': '^6.22.0',
  'babel-preset-stage-2': '^6.22.0',
  'babel-register': '^6.23.0',
  'babel-runtime': '^6.23.0'
};

exports.javascriptDependencies = Object.assign(eslint, babel);

exports.packageJsonJavascript = (files = {}) => {
  extend(files.pkg, {
    devDependencies: exports.javascriptDependencies
  });
};
