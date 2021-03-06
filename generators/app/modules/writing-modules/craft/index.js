/**
 * Write the Craft Project
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

/* eslint-disable */
const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const download = require('download');
const downloadCraft = require('../../../helpers/_downloadFiles');
const deleteFiles = require('../../../helpers/_deleteFolderRecursive');
const writePaths = require('../../packageJson-modules/paths/_distPaths');
const commentLog = require('../../../helpers/_logComment');

const _downloadCraftScripts = () => {
  return download(url, destination, {
    extract: true,
    mode: '775'
  }).on('response', res => {
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    bar.total = res.headers['content-length'];
    res.on('data', data => bar.tick(data.length));
  }).then(() => commentLog({
    message: 'Finished Download',
    color: 'green',
    short: true
  }))
    .catch(error => console.error(error));
}

const craftFolders = {
  DELETE: [
    'dist/craft/templates',
    'dist/craft/config/db.php',
    'dist/craft/config/general.php',
    'dist/public/'
  ],
  SRC: {
    files: [
      {
        src: 'templates/',
        dest: 'src/views/'
      },
      {
        src: 'scripts/downloadPlugin.js',
        dest: 'scripts/downloadPlugin.js',
      }
    ],
    nyStudio: {
      files: [
        {
          src: 'nystudio/config/db.php',
          dest: 'dist/craft/config/db.php'
        },
        {
          src: 'nystudio/config/general.php',
          dest: 'dist/craft/config/general.php'
        },
        {
          src: 'nystudio/environment/env.example.php',
          dest: 'dist/.env.example.php'
        },
        {
          src: 'nystudio/systemFiles/',
          dest: 'src/systemFiles/'
        },
      ]
    },
    defaultConfig: {
      files: [
        {
          src: 'default/systemFiles/',
          dest: 'src/systemFiles',
        }
      ]
    }
  }
};

const writingCraft = () => {
  return {
    download: context => {
      const craftUrl = 'http://buildwithcraft.com/latest.zip?accept_license=yes';
      return downloadCraft({
        url: craftUrl,
        destination: context.destinationPath('./dist/')
      });
    },
    downloadCraftScripts: context => {
      const scriptsUrl = 'https://github.com/nystudio107/craft-scripts/archive/master.zip';
      return download(scriptsUrl, context.destinationPath('./dist/'), {
        extract: true,
        filter: file => {
          const folder = path.basename(path.dirname(file.path));
          if ((folder === 'scripts' || folder == 'common') && file.type == 'file') return file;
        },
        map: file => {
          file.path = file.path.replace('craft-scripts-master/', 'craft-scripts/');
          file.path = file.path.replace('scripts/', '');
          return file;
        },
      });
      return downloadCraft({
        url: scriptsUrl,
        destination: context.destinationPath('./dist/')
      });
    },
    writing: context => {
      return new Promise((resolve) => {
        if (context.props.craftEnv === 'nystudio') {

          //Delete Files Folder we recreate ourself
          deleteFiles({
            filelist: craftFolders.DELETE,
            context
          });

          craftFolders.SRC.nyStudio.files.forEach(file => craftFolders.SRC.files.push(file));
        } // End nystudio

        // Copy our Folders
        craftFolders.SRC.files.forEach(file => {
          context.fs.copy(
            context.templatePath(`craft/${file.src}`),
            context.destinationPath(file.dest)
          );
        });

        const craftIgnore = fs.readFileSync(context.templatePath('craft/_gitignore'), {
          encoding: 'UTF-8',
        });

        const _ignoreFile = ejs.render(craftIgnore, {
          craftEnv: context.props.craftEnv
        });


        // copy .env.example.php to .env.php
        if(context.fs.exists(context.destinationPath('dist/.env.example.php'))) {
          context.fs.copy(
            context.destinationPath('dist/.env.example.php'),
            context.destinationPath('dist/.env.php')
          )
        }

        context.props.projectIgnore = _ignoreFile;

        resolve();
      })
    }
  };
};

module.exports = writingCraft;
