/**
 * Extending package.json with SVGo Configuration
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

'use strict';
const extend = require('deep-extend');

exports.svgoConfig = [
  {cleanupIDs: false},
  {removeComments: true},
  {removeViewBox: false},
  {removeDesc: true},
  {removeUselessDefs: false},
  {removeDoctype: true},
  {removeEmptyText: true},
  {removeUnknownsAndDefaults: true},
  {removeEmptyContainers: true},
  {collapseGroups: true},
  {removeUselessStrokeAndFill: true},
  {convertStyleToAttrs: true}
];

exports.packageJsonSvgo = (files = {}) => {
  extend(files.pkg, {
    svgoConfig: exports.svgoConfig
  });
};
