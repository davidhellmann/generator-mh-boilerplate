const extend = require('deep-extend');

exports.configPaths = {
  default: {
    base: 'dist/',
    views: 'dist/',
    systemFiles: 'dist/public/'
  },
  craft: {
    base: `dist/public`,
    views: 'dist/craft/templates/'
  },
  laravel: {
    base: 'dist/public',
    views: 'dist/resources/views/'
  }
};

exports.writeDistPaths = function ({files = {}, projectUsage = 'default'}) {
  const assetBase = `${exports.configPaths[projectUsage].base}/assets`;
  let _distPaths = {
    base: exports.configPaths[projectUsage].base,
    views: exports.configPaths[projectUsage].views,
    systemFiles: exports.configPaths[projectUsage].systemFiles,
    css: `${assetBase}/css/`,
    favicons: `${exports.configPaths[projectUsage].base}/favicons/`,
    fonts: `${assetBase}/fonts/`,
    js: `${assetBase}/js/`,
    images: {
      svg: {
        single: `${assetBase}/images/svg/single/`,
        sprite: `${assetBase}/images/svg/sprite/`
      },
      bitmap: {
        cssimages: `${assetBase}/images/cssimages/`,
        htmlimages: `${assetBase}/images/htmlimages/`
      }
    }
  };
  extend(files.pkg, {
    distPaths: _distPaths
  });
};
