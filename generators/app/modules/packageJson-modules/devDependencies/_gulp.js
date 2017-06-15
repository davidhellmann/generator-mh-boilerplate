/**
 * Dependencies for Gulp
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

'use strict';
const extend = require('deep-extend');

exports.gulpDependencies = {
  gulp: '^3.9.1',
  'gulp-changed': '^3.1.0',
  'gulp-cheerio': '^0.6.2',
  'gulp-cssnano': '^2.1.2',
  'gulp-debug': '^3.0.0',
  'gulp-favicons': '^2.2.7',
  'gulp-if': '^2.0.2',
  'gulp-imagemin': '^3.1.1',
  'gulp-load-plugins': '^1.4.0',
  'gulp-notify': '^3.0.0',
  'gulp-plumber': '^1.1.0',
  'gulp-postcss': '^7.0.0',
  'gulp-rename': '^1.2.2',
  'gulp-sass': '^3.0.0',
  'gulp-sourcemaps': '^2.6.0',
  'gulp-stylelint': '^3.7.0',
  'gulp-svg-sprite': '^1.3.6',
  'gulp-watch': '^4.3.11',
  'require-dir': '^0.3.0',
  'run-sequence': '^1.1.2',
  util: '^0.10.3',
  yargs: '^8.0.1'
};

exports.packageJsonGulp = (files = {}) => {
  extend(files.pkg, {
    devDependencies: exports.gulpDependencies
  });
};
