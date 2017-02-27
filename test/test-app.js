'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var os = require('os');

describe('mh-boilerplate:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ projectUseVue: true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'config.json',
      '.gitignore',
      '.editorconfig',
      'gulpfile.babel.js',
      'package.json',
      'README.md',
      '.babelrc',
      '.eslintrc.js',
      '.postcssrc.js',
      '.stylelintrc'
    ]);
  });
});
