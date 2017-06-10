const extend = require('deep-extend');

exports.srcPaths = {
  defaults: {
    base: 'src/',
    views: 'src/views/',
    systemFiles: 'src/systemFiles/',
    css: 'src/scss/',
    fonts: 'src/fonts/',
    js: 'src/js/',
    favicons: 'src/favicons/',
    images: {
      base: 'src/images/',
      svg: {
        base: 'src/images/svg/',
        single: 'single/',
        sprite: 'sprite/'
      },
      bitmap: {
        cssimages: 'cssimages/',
        htmlimages: 'htmlimages/'
      }
    }
  }
};

exports.writeSrcPaths = function ({files = {}, projectUsage = 'defaults'}) {
  let _srcPaths;
  if (projectUsage === 'defaults') {
    _srcPaths = exports.srcPaths.defaults;
  } else {
    _srcPaths = Object.assign(exports.srcPaths.defaults, exports.srcPaths[projectUsage]);
  }

  extend(files.pkg, {
    srcPaths: _srcPaths
  });
};
