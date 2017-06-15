/**
 * Adding basic Information to the package.json
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

'use strict';
const extend = require('deep-extend');

function basePackageJson(files = {}, context) {
  extend(files.pkg, {
    name: context.props.projectName,
    description: context.props.projectDescription,
    version: context.props.projectVersion,
    projectType: context.props.projectUsage,
    proxy: context.props.projectProxy,
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
