'use strict';
const extend = require('deep-extend');

exports.otherDependencies = {
  'browser-sync': '^2.18.8',
  chalk: '^1.1.3',
  del: '^2.0.2',
  path: '^0.12.7'
};

exports.packageJsonOther = (files = {}) => {
  extend(files.pkg, {
    devDependencies: exports.otherDependencies
  });
};
