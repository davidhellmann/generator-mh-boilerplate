'use strict';
process.env.NODE_ENV = 'test';
/* eslint-disable new-cap */
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
const fs = require('fs-extra'); // eslint-disable-line no-unused-vars

// Define some variables
const project = {
  name: 'boilerplate-test',
  description: 'A small Test Driven Generator',
  version: '0.0.1',
  proxy: 'boilerplate-test.dev'
};
const author = {
  name: 'Martin Herweg',
  email: 'martin@herweg.co',
  homepage: 'https://martinherweg.de'
};

const {scripts} = require('../generators/app/modules/packageJson-modules/_scripts');
const {webpackDependencies} = require('../generators/app/modules/packageJson-modules/devDependencies/_webpack');
const {gulpDependencies} = require('../generators/app/modules/packageJson-modules/devDependencies/_gulp');
const {cssDependencies} = require('../generators/app/modules/packageJson-modules/devDependencies/_css');
const {javascriptDependencies} = require('../generators/app/modules/packageJson-modules/devDependencies/_javascript');
const {otherDependencies} = require('../generators/app/modules/packageJson-modules/devDependencies/_other');

const run = () => helpers.run(path.join(__dirname, '../generators/app'));

describe('mh-boilerplate', () => {
  beforeAll(() => {
    return run()
      .withPrompts({
        projectName: project.name,
        projectVersion: project.version,
        projectDescription: project.description,
        projectProxy: project.proxy,
        authorName: author.name,
        authorEmail: author.email,
        authorHomepage: author.homepage
      });
  });
  // Test for Basic Files
  describe('Basic Files and Infos', () => {
    // Test package.json content
    it('fill package.json with correct Information', () => {
      assert.JSONFileContent('package.json', {
        name: project.name,
        description: project.description,
        version: project.version,
        authors: [{name: author.name, email: author.email, homepage: author.homepage}],
        scripts,
        devDependencies: otherDependencies
      });
    });

    it('adds devDependencies for css work', () => {
      assert.JSONFileContent('package.json', {
        devDependencies: cssDependencies
      });
    });

    it('adds devDependencies for gulp', () => {
      assert.JSONFileContent('package.json', {
        devDependencies: gulpDependencies
      });
    });

    it('adds devDependencies for javascript', () => {
      assert.JSONFileContent('package.json', {
        devDependencies: javascriptDependencies
      });
    });

    it('add webpack devDependencies to package.json', () => {
      assert.JSONFileContent('package.json', {
        devDependencies: webpackDependencies
      });
    });

    it('adds files for all projects', () => {
      assert.file([
        '.babelrc',
        '.editorconfig',
        '.eslintrc.js',
        '.gitignore',
        'gulpfile.babel.js',
        'package.json',
        '.postcss.config.js',
        'README.md',
        '.stylelintrc'
      ]);
    });

    it('adds javascript', () => {
      assert.file([
        'src/js/'
      ]);
    });

    it('adds scss', () => {
      assert.file([
        'src/scss/'
      ]);
    });

    it('copies gulp tasks', () => {
      assert.file([
        'gulpfile.babel.js',
        'gulpfile/lib/',
        'gulpfile/tasks/',
        'gulpfile/tasks/browser-sync.js'
      ]);
    });

    it('adds webpack config', () => {
      assert.file([
        'webpack/webpack.config.babel.js',
        'webpack/.babelrc'
      ]);
    });

    it('initializes a git repository', () => {
      assert.file([
        '.git/'
      ]);
    });
  });
});
