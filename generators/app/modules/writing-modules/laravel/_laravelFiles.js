const craftFolders = {
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

module.exports = craftFolders;
