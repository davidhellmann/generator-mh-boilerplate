'use strict';
const extend = require('deep-extend');

function basePackageJson(files = {}) {
  extend(files.config, {
    proxy: this.props.projectProxy,
    favicon: {
      developerName: this.props.authorName,
      developerURL: this.props.authorHomepage
    }
  });
}

module.exports = basePackageJson;
