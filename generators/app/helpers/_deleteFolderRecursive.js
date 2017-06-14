/**
 * Delete Folders and Files Recursive
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

const fs = require('fs-extra');
const logMessage = require('./_logComment');

exports.deleteFolderRecursive = path => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      const currentPath = `${path}/${file}`;
      if (fs.statSync(currentPath).isDirectory()) {
        exports.deleteFolderRecursive(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const deleteFilesAndFolders = ({filelist = [], context = null} = {}) => {
  filelist.forEach(file => {
    const singleFile = context.destinationPath(file);
    if (fs.existsSync(singleFile)) {
      if (fs.statSync(singleFile).isDirectory()) {
        exports.deleteFolderRecursive(singleFile);
        logMessage({
          message: `${singleFile} deleted`,
          short: true,
          color: 'red'
        });
      } else {
        fs.unlinkSync(singleFile);
        logMessage({
          message: `${singleFile} deleted`,
          short: true,
          color: 'red'
        });
      }
    }
  });
};

module.exports = deleteFilesAndFolders;
