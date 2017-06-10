'use strict';
const extend = require('deep-extend');

exports.faviconEntries = {
  appName: 'My App',
  appDescription: 'This is my Application',
  developerName: '',
  developerURL: '',
  background: '#020307',
  path: 'favicons',
  logging: false,
  online: false,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: true,
    favicons: true,
    firefox: true,
    opengraph: false,
    twitter: false,
    windows: true,
    yandex: true
  }
};

exports.packageJsonFavicon = (files = {}) => {
  extend(files.pkg, {
    favicon: exports.faviconEntries
  });
};
