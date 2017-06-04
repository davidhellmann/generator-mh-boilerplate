/* eslint-disable */
const fs = require('fs-extra');
const downloadCraft = require('../../../helpers/_downloadFiles');
const deleteFiles = require('../../../helpers/_deleteFolderRecursive');

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

        resolve();
      })
    }
  };
};

module.exports = writingCraft;
