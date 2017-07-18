/**
 * Test for a Vue Project Configuration
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

const vueDependencies = require('../generators/app/modules/packageJson-modules/dependencies/_vue');

const {renderInstance} = require('../generators/app/modules/writing-modules/vue/');

const runwithVue = (plugins = []) => {
  return helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({
      projectFramework: 'vue',
      projectVuePlugins: plugins
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

  it('adds vue instance to app.js', async () => {
    await runwithVue();
    const vueCode = renderInstance([]);
    expect(vueCode).toMatchSnapshot();
    assert.fileContent('src/js/app.js', renderInstance([]));
  });

  it('adds Vue Examples', () => {
    assert.file([
      'src/js/App.vue',
      'src/js/views/Home.vue'
    ]);
  });

  it('adds vue config to webpack', () => {
    assert.fileContent('webpack/webpack.config.babel.js', `'vue$': 'vue/dist/vue.esm.js',`);
    /* eslint-disable */
    assert.fileContent('webpack/webpack.config.babel.js', `{
      test: /\\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          scss: ifProduction(
            ExtractTextPlugin.extract({
              use: [{ loader: 'css-loader', options: {url: false}}, { loader: 'sass-loader'}],
              fallback: 'vue-style-loader',
            }),
            [{ loader: 'vue-style-loader'}, { loader: 'css-loader', options: {url: false}}, { loader: 'sass-loader'}]
          ),
        },
      },
    },`);
  });

  it('copies index.html file to dist', async () => {
    await runwithVue()
      .withPrompts({
        projectUsage: 'vueapp'
      });
    assert.file('src/views/index.html');
    assert.file('dist/index.html');
  })
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

    it('adds VueX to Vue instance to app.js', async () => {
      const vueCode = renderInstance(['store']);
      expect(vueCode).toMatchSnapshot();
      assert.fileContent('src/js/app.js', renderInstance(['store']));
    });
  });

  describe('It uses Vue Router', () => {
    beforeAll(async () => {
      await runwithVue(['vuerouter']);
    });

    it('Router to dependencies', () => {
      assert.JSONFileContent('package.json', {
        dependencies: vueDependencies.routerDependencies
      });
    });

    it('adds Vue Router to Vue instance to app.js', async () => {
      const vueCode = renderInstance(['router']);
      expect(vueCode).toMatchSnapshot();
      assert.fileContent('src/js/app.js', renderInstance(['router']));
    });
  });

  describe('It uses Vue Router and VueX', () => {
    beforeAll(async () => {
      await runwithVue(['vuerouter', 'vuex']);
    });

    it('adds router and vuex dependencies', () => {
      const pluginDependencies = Object.assign(vueDependencies.vueXDependencies, vueDependencies.routerDependencies);
      assert.jsonFileContent('package.json', {
        dependencies: pluginDependencies
      });
    });

    it('adds VueX and Vue Router to Vue instance to app.js', async () => {
      const vueCode = renderInstance(['store', 'router']);
      expect(vueCode).toMatchSnapshot();
      assert.fileContent('src/js/app.js', renderInstance(['store', 'router']));
    });
  });
});
