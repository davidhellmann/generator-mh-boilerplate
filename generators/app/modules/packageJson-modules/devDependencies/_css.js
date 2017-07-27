/**
 * Dependencies for CSS
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

'use strict';
const extend = require('deep-extend');

const stylelint = {
  stylelint: '^8.0.0',
  'stylelint-config-sass-guidelines': '^3.0.1',
  'stylelint-order': '^0.6.0',
  'stylelint-scss': '^1.4.3',
  'stylelint-selector-bem-pattern': '^1.0.0',
};

const postcss = {
  autoprefixer: '^7.1.1',
  cssnano: '^3.10.0',
  lost: '^8.0.0',
  'postcss-aspect-ratio': '^1.0.0',
  'postcss-assets': '^4.1.0',
  'postcss-flexbugs-fixes': '^3.0.0',
  'postcss-reporter': '^4.0.0',
  'postcss-scss': '^1.0.0',
  'rucksack-css': '^0.9.1'
};

const rest = {
  'family.scss': '^1.0.1'
};

exports.cssDependencies = Object.assign(stylelint, postcss, rest);

exports.packageJsonCss = (files = {}) => {
  extend(files.pkg, {
    devDependencies: exports.cssDependencies
  });
};
