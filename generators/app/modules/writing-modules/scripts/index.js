/**
 * Write Scripts Folder with useful Node scripts
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

/* eslint-disable */
const fs         = require('fs-extra');
const ejs        = require('ejs');
const writePaths = require('../../packageJson-modules/paths/_distPaths');

const writingScripts = () => {
  return {
    writing: context => {
      return new Promise((resolve) => {
        const files = [
          'module.js',
          'moduleTemplates/_template.html',
          'moduleTemplates/_script.js',
          'moduleTemplates/_style.scss',
          'moduleTemplates/_template.vue',
          'createDirs.js',
        ];
        files.forEach((file) => {
          context.fs.copyTpl(
            context.templatePath(`scripts/${file}`),
            context.destinationPath(`scripts/${file}`),
            {
              projectUsage: context.props.projectUsage,
            }
          );
        });
        resolve();
      });
    }
  };
};

module.exports = writingScripts;
