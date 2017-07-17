/**
 * Dependencies for Node Scripts
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

'use strict';
const extend = require('deep-extend');

exports.craftDownloadPluginDependencies = {
  'fs-extra': '^3.0.1',
  'deep-extend': '^0.5.0',
  download: '^6.2.5',
  progress: '^2.0.0'
};

exports.packageJsonCraftDownloadPluginDependencies = (files = {}) => {
  extend(files.pkg, {
    devDependencies: exports.craftDownloadPluginDependencies
  });
};
