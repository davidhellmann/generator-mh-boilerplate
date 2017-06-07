/* eslint-disable */
const fs = require('fs-extra');
const logComment = require('../../../helpers/_logComment');
const downloadCraft = require('../../../helpers/_downloadFiles');
const deleteFiles = require('../../../helpers/_deleteFolderRecursive');

const laravelFolders = require('./_laravelFiles');

const writingLaravel = () => {
  return {
    download: context => {
      if(!context.commands.composer) {
        return console.error('Please Install composer, because we use it to install Laravel');
      }
      logComment({
        message: 'Installing Laravel'
      });

      const composerArguments = ['--prefer-dist'];
      if(process.env.NODE_ENV === 'test') composerArguments.push('--quiet');
      try {
        context.spawnCommandSync('composer', ['create-project', ...composerArguments, 'laravel/laravel', 'dist']);
      } catch(e) { console.error(e) }
    },
    writing: context => {
      return new Promise((resolve) => {
        const laravelIgnore = fs.readFileSync(context.templatePath('laravel/_gitignore'), {
          encoding: 'UTF-8'
        });

        context.props.projectIgnore = laravelIgnore;

        resolve();
      })
    }
  };
};

module.exports = writingLaravel;
