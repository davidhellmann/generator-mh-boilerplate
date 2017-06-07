const craftFolders = {
  COPY_AND_DELETE: [
    'dist/resources/views/',
    'dist/public/'
  ],
  DELETE: [
    'dist/resources/assets/'
  ],
  SRC: {
    files: [
      {
        src: 'templates/',
        dest: 'src/views/'
      }
    ],
    defaultConfig: {
      files: [
        {
          src: 'default/systemFiles/',
          dest: 'src/systemFiles'
        }
      ]
    }
  }
};

module.exports = craftFolders;
