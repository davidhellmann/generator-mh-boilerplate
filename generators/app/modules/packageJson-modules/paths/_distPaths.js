/**
 * Defining the different dist Paths for different Projects
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

const extend = require('deep-extend');

exports.configPaths = {
  default: {
    base: 'dist/',
    views: 'dist/',
    systemFiles: 'dist/public/'
  },
  craft: {
    base: `dist/public`,
    views: 'dist/craft/templates/',
    systemFiles: 'dist/public/',
    pluginFolder: 'dist/craft/plugins'
  },
  laravel: {
    base: 'dist/public',
    views: 'dist/resources/views/',
    systemFiles: 'dist/public/'
  }
};

exports.writeDistPaths = function ({files = {}, projectUsage = 'default'}) {
  const projectPaths = exports.configPaths[projectUsage];
  const assetBase = `${exports.configPaths[projectUsage].base}/assets`;
  let inlineSvgPath = exports.configPaths[projectUsage].views;
  if(projectUsage === 'vueapp') {
    inlineSvgPath = `${assetBase}/js/modules/icons/`;
  }

  let _distPaths = {
    css: `${assetBase}/css/`,
    favicons: `${exports.configPaths[projectUsage].base}/favicons/`,
    fonts: `${assetBase}/fonts/`,
    js: `${assetBase}/js/`,
    images: {
      base: `${assetBase}/images/`,
      svg: {
        single: `${assetBase}/images/svg/single/`,
        sprite: `${assetBase}/images/svg/sprite/`,
        inline: inlineSvgPath,
      },
      bitmap: {
        cssimages: `${assetBase}/images/cssimages/`,
        htmlimages: `${assetBase}/images/htmlimages/`
      }
    }
  };

  extend(files.pkg, {
    distPaths: Object.assign(projectPaths, _distPaths)
  });
};
