/**
 * Define some global Files
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

module.exports = {
  files: [
    {
      src: '_gulpfile.babel.js',
      dest: 'gulpfile.babel.js'
    },
    {
      src: 'src/gulpfile/',
      dest: 'gulpfile/'
    },
    {
      src: 'src/webpack/babelrc',
      dest: 'webpack/.babelrc'
    },
    {
      src: 'src/webpack/webpack.config.babel.js',
      dest: 'webpack/webpack.config.babel.js'
    },
    {
      src: '_gitignore',
      dest: '.gitignore'
    },
    {
      src: '_readme.md',
      dest: 'README.md'
    },
    {
      src: '_babelrc',
      dest: '.babelrc'
    },
    {
      src: '_editorconfig',
      dest: '.editorconfig'
    },
    {
      src: '_eslintrc.js',
      dest: '.eslintrc.js'
    },
    {
      src: '_postcss.config.js',
      dest: 'postcss.config.js'
    },
    {
      src: '_stylelintrc',
      dest: '.stylelintrc'
    },
    {
      src: 'src/scss/',
      dest: 'src/scss/'
    },
    {
      src: 'src/js/',
      dest: 'src/js/'
    }
  ]
};
