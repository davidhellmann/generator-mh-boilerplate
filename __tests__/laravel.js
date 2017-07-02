/**
 * Test for a Laravel Project Configuration
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
const commandExists = require('command-exists');

const {configPaths} = require('../generators/app/modules/packageJson-modules/paths/_distPaths');

const run = () => helpers.run(path.join(__dirname, '../generators/app'));

describe('its a Laravel Application Whoops 🎉', () => {
  beforeAll(() => {
    return run()
      .withPrompts({
        projectUsage: 'laravel'
      })
      .inTmpDir(dir => {
        console.log(dir);
        return dir;
      });
  });

  it('fills package.json with projectType Laravel', () => {
    assert.jsonFileContent('package.json', {
      projectType: 'laravel'
    });
  });

  it('add dist Paths for Craft', () => {
    assert.jsonFileContent('package.json', {
      distPaths: configPaths.laravel
    });
  });

  it('add laravel ignore to .gitignore', () => {
    const laravelIgnore = fs.readFileSync(path.join(__dirname, '../generators/app/templates/laravel/_gitignore'), {
      encoding: 'UTF-8'
    });
    assert.fileContent('.gitignore', laravelIgnore);
  });

  it('adds Laravel templates to the src folder', () => {
    assert.file([
      'src/views/index.blade.php',
      'src/views/_layout/_layout.blade.php',
      'src/views/_parts/site-header.blade.php',
      'src/views/_parts/webpack-header.blade.php',
      'src/views/_parts/site-scripts.blade.php'
    ]);
  });

  it('removes original Laravel views and Public Folder', () => {
    assert.noFile([
      'dist/resources/views/welcome.blade.php'
    ]);
  });

  /* eslint-disable */
  it('adds laravel chunks to webpack config', () => {
    assert.fileContent('webpack/webpack.config.babel.js', 'const chunks_inject = [\n\
      {\n\
        filename: path.resolve(`${config.distPaths.views}_parts/webpack-header.blade.php`),\n\
        file: config.srcPaths.views + \'_parts/webpack-header.blade.php\',\n\
        inject: false,\n\
      },\n\
      {\n\
        filename: path.resolve(`${config.distPaths.views}_parts/site-scripts.blade.php`),\n\
        file: config.srcPaths.views + \'_parts/site-scripts.blade.php\',\n\
        inject: false,\n\
      }\n\
    ]');
  });
});

describe('if the user wants and composer is available we install laravel', async () => {
  try {
    await commandExists('composer');
    beforeAll(() => {
      return run()
        .withPrompts({
          projectUsage: 'laravel',
          laravelInstall: true
        });
    });

    it('adds Laravel', () => {
      assert.file([
        'dist/app/',
        'dist/bootstrap/',
        'dist/config/',
        'dist/database/',
        'dist/resources/',
        'dist/routes/',
        'dist/storage/',
        'dist/tests/',
        'dist/vendor/',
        'dist/vendor/laravel/'
      ]);
    });
  } catch(e) {
    console.error('Composer is not available, test passes');
    assert.noFile([
      'dist/app/',
      'dist/bootstrap/',
      'dist/config/',
      'dist/database/',
      'dist/resources/',
      'dist/routes/',
      'dist/storage/',
      'dist/tests/',
      'dist/vendor/',
      'dist/vendor/laravel/'
    ])
  }
});
