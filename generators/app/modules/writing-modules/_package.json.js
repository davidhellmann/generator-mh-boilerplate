'use strict';
const extend = require('deep-extend');

function basePackageJson(files = {}) {
  extend(files.pkg, {
    name: this.props.projectName,
    authors: [
      {
        name: this.props.authorName,
        email: this.props.authorEmail
      }
    ]
  });
}

module.exports = basePackageJson;
