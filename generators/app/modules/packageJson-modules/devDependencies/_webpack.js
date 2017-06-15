/**
 * Dependencies for Webpack
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

'use strict';
const extend = require('deep-extend');

exports.webpackDependencies = {
  'babel-loader': '^7.0.0',
  'clean-webpack-plugin': '^0.1.16',
  'copy-webpack-plugin': '^4.0.1',
  'cross-env': '^5.0.0',
  'css-loader': '^0.28.3',
  'eslint-loader': '^1.6.3',
  'extract-text-webpack-plugin': '^2.0.0',
  'file-loader': '^0.11.1',
  'friendly-errors-webpack-plugin': '^1.1.3',
  'inject-loader': '^3.0.0-beta4',
  'html-webpack-plugin': '^2.28.0',
  'http-proxy-middleware': '^0.17.3',
  'json-loader': '^0.5.4',
  'lodash-webpack-plugin': '^0.11.4',
  'node-sass': '^4.5.0',
  'postcss-loader': '^2.0.5',
  'sass-loader': '^6.0.2',
  'style-loader': '^0.18.1',
  'stylelint-webpack-plugin': '^0.7.0',
  'url-loader': '^0.5.7',
  webpack: '^2.2.1',
  'webpack-bundle-analyzer': '^2.3.1',
  'webpack2-polyfill-plugin': '^0.0.2',
  'webpack-config-utils': '^2.3.0',
  'webpack-dashboard': '^0.4.0',
  'webpack-dev-middleware': '^1.10.1',
  'webpack-hot-middleware': '^2.17.0',
  'write-file-webpack-plugin': '^4.0.2'
};

exports.packageJsonWebpack = (files = {}) => {
  extend(files.pkg, {
    devDependencies: exports.webpackDependencies
  });
};
