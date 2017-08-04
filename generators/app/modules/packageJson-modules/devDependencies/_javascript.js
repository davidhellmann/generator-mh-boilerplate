/**
 * Dependencies for Javascript
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

'use strict';
const extend = require('deep-extend');

const eslint = {
  eslint: '^4.0.0',
  'eslint-config-airbnb-base': '^11.1.0',
  'eslint-config-defaults': '^9.0.0',
  'eslint-formatter-pretty': '^1.1.0',
  'eslint-friendly-formatter': '^3.0.0',
  'eslint-import-resolver-webpack': '^0.8.3',
  'eslint-plugin-html': '^3.0.0',
  'eslint-plugin-import': '^2.7.0',
  'prettier-eslint-cli': '^4.1.1'
};

const babel = {
  'babel-cli': '^6.23.0',
  'babel-core': '^6.23.1',
  'babel-eslint': '^7.1.0',
  'babel-plugin-lodash': '^3.2.11',
  'babel-plugin-syntax-dynamic-import': '^6.18.0',
  'babel-plugin-transform-object-rest-spread': '^6.23.0',
  'babel-plugin-transform-runtime': '^6.23.0',
  'babel-preset-env': '^1.4.0',
  'babel-preset-es2015': '^6.24.1',
  'babel-polyfill': '^6.23.0',
  'babel-register': '^6.23.0',
  'babel-runtime': '^6.23.0'
};

exports.javascriptDependencies = Object.assign(eslint, babel);

exports.packageJsonJavascript = (files = {}) => {
  extend(files.pkg, {
    devDependencies: exports.javascriptDependencies
  });
};
