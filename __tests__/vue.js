process.env.NODE_ENV = 'test';
/* eslint-disable new-cap */
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
const fs = require('fs-extra'); // eslint-disable-line no-unused-vars

const vueDependencies = require('../generators/app/modules/packageJson-modules/dependencies/_vue');

const runwithVue = (plugins = []) => {
  return helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({
      projectFramework: 'vue',
      vuePlugins: plugins
    });
};

describe('It is a Vue Project 🎉', () => {
  beforeAll(async () => {
    await runwithVue();
  });

  it('add vue devDependencies to package.json', () => {
    assert.JSONFileContent('package.json', {
      devDependencies: vueDependencies.devDependencies
    });
  });

  it('adds vue to package.json', () => {
    assert.JSONFileContent('package.json', {
      dependencies: vueDependencies.dependencies
    });
  });
});

describe('Vue Project with Plugins', () => {
  describe('It uses VueX', () => {
    beforeAll(async () => {
      await runwithVue(['vuex']);
    });

    it('adds vuex to dependencies', () => {
      assert.jsonFileContent('package.json', {
        dependencies: vueDependencies.vueXDependencies
      });
    });
  });

  describe('It uses Vue Router', () => {
    beforeAll(async () => {
      await runwithVue(['router']);
    });

    it('Router to dependencies', () => {
      assert.JSONFileContent('package.json', {
        dependencies: vueDependencies.routerDependencies
      });
    });
  });

  describe('It uses Vue Router and VueX', () => {
    beforeAll(async () => {
      await runwithVue(['router', 'vuex']);
    });

    it('adds router and vuex dependencies', () => {
      const pluginDependencies = Object.assign(vueDependencies.vueXDependencies, vueDependencies.routerDependencies);
      assert.jsonFileContent('package.json', {
        dependencies: pluginDependencies
      });
    });
  });
});
