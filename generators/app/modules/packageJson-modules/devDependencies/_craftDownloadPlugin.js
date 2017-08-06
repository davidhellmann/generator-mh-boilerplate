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

exports.craftDownloadPluginScripts = {
  'install:craftPlugins': 'node scripts/downloadPlugin.js --scripts',
  'install:craftPlugin': 'node scripts/downloadPlugin.js',
  'update:craftPlugins': 'node scripts/downloadPlugin.js --update'
};

exports.craftDownloadPluginStandardPlugins = [
  'https://github.com/aelvan/FocalPointField-Craft',
  'https://github.com/aelvan/Imager-Craft/',
  'https://github.com/aelvan/Preparse-Field-Craft',
  'https://github.com/am-impact/amcommand',
  'https://github.com/am-impact/amnav',
  'https://github.com/benjamminf/craft-neo',
  'https://github.com/benjamminf/craft-quick-field',
  'https://github.com/benjamminf/craft-relabel',
  'https://github.com/carlcs/craft-helpers',
  'https://github.com/engram-design/FieldManager',
  'https://github.com/engram-design/ImageResizer',
  'https://github.com/engram-design/SuperTable',
  'https://github.com/fruitstudios/LinkIt',
  'https://github.com/joshuabaker/craft-sitemap',
  'https://github.com/lewisjenkins/craft-lj-dynamicfields',
  'https://github.com/marionnewlevant/craft-mn_eager',
  'https://github.com/marionnewlevant/craft-twig_perversion',
  'https://github.com/martinherweg/craft_kint',
  'https://github.com/mmikkel/CpFieldLinks-Craft',
  'https://github.com/mmikkel/Reasons-Craft',
  'https://github.com/nystudio107/cookies',
  'https://github.com/nystudio107/seomatic',
  'https://github.com/Pennebaker/craftcms-thearchitect'
];

exports.packageJsonCraftDownloadPluginDependencies = (files = {}) => {
  extend(files.pkg, {
    craftPlugins: exports.craftDownloadPluginStandardPlugins,
    devDependencies: exports.craftDownloadPluginDependencies,
    scripts: exports.craftDownloadPluginScripts
  });
};
