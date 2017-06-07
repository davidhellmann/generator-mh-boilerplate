'use strict';
const extend = require('deep-extend');

exports.scripts = {
  init_commands: 'cross-env NODE_ENV=production gulp build:production --env=development --changed=false && cross-env NODE_ENV=production webpack --hide-modules --config=webpack/webpack.config.babel.js',
  init: 'npm run -s init_commands',
  dev: 'cross-env NODE_ENV=development webpack-dashboard -p 3002 -- gulp --env=browser-sync',
  'dev:single': 'cross-env NODE_ENV=development gulp --env=browser-sync',
  production: 'cross-env NODE_ENV=production gulp build:production --env=production && cross-env NODE_ENV=production webpack --hide-modules --config=webpack/webpack.config.babel.js -p',
  gulp: 'cross-env NODE_ENV=development gulp',
  images: 'cross-env NODE_ENV=development gulp move:images',
  webpack: 'cross-env NODE_ENV=production webpack --hide-modules --config=webpack/webpack.config.babel.js',
  'webpack:analyze': 'webpack-bundle-analyzer webpack/stats.json dist/public/'
};

exports.packageJsonScripts = function (files = {}) {
  extend(files.pkg, {
    scripts: exports.scripts
  });
};
