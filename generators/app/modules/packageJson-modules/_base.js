'use strict';
const extend = require('deep-extend');

function basePackageJson(files = {}, context) {
  extend(files.pkg, {
    name: context.props.projectName,
    description: context.props.projectDescription,
    version: context.props.projectVersion,
    authors: [
      {
        name: context.props.authorName,
        email: context.props.authorEmail,
        homepage: context.props.authorHomepage
      }
    ]
  });
}

module.exports = basePackageJson;
