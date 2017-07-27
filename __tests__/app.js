'use strict';
/**
 * Base Test for the Generator
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */
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
  email: 'info@martinherweg.de',
  homepage: 'https://martinherweg.de'
};

const {scripts} = require('../generators/app/modules/packageJson-modules/_scripts');
const {browsersList} = require('../generators/app/modules/packageJson-modules/_browserlist');
const {faviconEntries} = require('../generators/app/modules/packageJson-modules/_favicon');
const {webpackDependencies} = require('../generators/app/modules/packageJson-modules/devDependencies/_webpack');
const {gulpDependencies} = require('../generators/app/modules/packageJson-modules/devDependencies/_gulp');
const {cssDependencies} = require('../generators/app/modules/packageJson-modules/devDependencies/_css');
const {javascriptDependencies} = require('../generators/app/modules/packageJson-modules/devDependencies/_javascript');
const {otherDependencies} = require('../generators/app/modules/packageJson-modules/devDependencies/_other');

// Const {srcPaths} = require('../generators/app/modules/packageJson-modules/paths/_srcPaths');
// const distPaths = require('../generators/app/modules/packageJson-modules/paths/_distPaths');
// const packageJson = fs.readJsonSync(path.join(__dirname, '../generators/app/templates/_package.json'));

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

    it('adds browserlist entry to package.json', () => {
      assert.jsonFileContent('package.json', {
        browserslist: browsersList
      });
    });

    it('adds favicon configuration to package.json', () => {
      assert.jsonFileContent('package.json', {
        favicon: faviconEntries
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
        'postcss.config.js',
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

    it('adds modules script', () => {
      assert.file([
        'scripts/moduleTemplates/_template.html',
        'scripts/moduleTemplates/_script.js',
        'scripts/moduleTemplates/_style.scss',
        'scripts/moduleTemplates/_template.vue',
        'scripts/module.js'
      ]);
    });

    it('adds createDirs scripts', () => {
      assert.file([
        'scripts/createDirs.js'
      ]);
    });
  });
});
