/**
 * List of files for Laravel Project
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

const LaravelFolders = {
  COPY_AND_DELETE: [
    {
      src: 'dist/resources/views/',
      dest: 'src/views/original/'
    },
    {
      src: 'dist/public/',
      dest: 'src/systemFiles/'
    }
  ],
  DELETE: [
    'dist/resources/assets/',
    'dist/resources/views/',
    'dist/public/'
  ],
  SRC: {
    files: [
      {
        src: 'templates/',
        dest: 'src/views/'
      }
    ]
  }
};

module.exports = LaravelFolders;
