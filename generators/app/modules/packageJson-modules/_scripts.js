/**
 * Package.json config for scripts
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

'use strict';
const extend = require('deep-extend');

exports.scripts = {
  'dev:dashboard': 'cross-env NODE_ENV=development webpack-dashboard -p 3002 -- gulp --env=browser-sync',
  dev: 'cross-env NODE_ENV=development gulp --env=browser-sync',
  gulp: 'cross-env NODE_ENV=development gulp',
  images: 'cross-env NODE_ENV=development gulp move:images',
  init: 'npm run -s init_commands && node ./scripts/createDirs.js',
  init_commands: 'cross-env NODE_ENV=development gulp build:production --env=browserSync --changed=false && cross-env NODE_ENV=development webpack --hide-modules --config=webpack/webpack.config.babel.js',
  module: 'node ./scripts/module',
  production: 'cross-env NODE_ENV=production gulp build:production --env=production && cross-env NODE_ENV=production webpack --hide-modules --config=webpack/webpack.config.babel.js -p',
  webpack: 'cross-env NODE_ENV=production webpack --hide-modules --config=webpack/webpack.config.babel.js',
  'webpack:analyze': 'webpack-bundle-analyzer webpack/stats.json dist/public/'
};

exports.packageJsonScripts = function (files = {}) {
  extend(files.pkg, {
    scripts: exports.scripts
  });
};
