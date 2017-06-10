'use strict';
const extend = require('deep-extend');

exports.browsersList = ['last 2 versions', 'ie >= 10'];

exports.packageJsonBrowsersList = (files = {}) => {
  extend(files.pkg, {
    browserslist: exports.browsersList
  });
};
