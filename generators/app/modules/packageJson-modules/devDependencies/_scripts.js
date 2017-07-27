/**
 * Dependencies for Node Scripts
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

'use strict';
const extend = require('deep-extend');

exports.scriptsDependencies = {
  'fs-extra': '^3.0.1',
  'mem-fs': '^1.1.3',
  'mem-fs-editor': '^3.0.2',
  inquirer: '^3.1.1'
};

exports.packageJsonScriptsDependencies = (files = {}) => {
  extend(files.pkg, {
    devDependencies: exports.scriptsDependencies
  });
};
