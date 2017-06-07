process.env.NODE_ENV = 'test';
/* eslint-disable new-cap */
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
const fs = require('fs-extra'); // eslint-disable-line no-unused-vars

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

  it('fills config.json with projectType Laravel', () => {
    assert.jsonFileContent('config.json', {
      projectType: 'laravel'
    });
  });

  it('add laravel ignore to .gitignore', () => {
    const laravelIgnore = fs.readFileSync(path.join(__dirname, '../generators/app/templates/laravel/_gitignore'), {
      encoding: 'UTF-8'
    });
    assert.fileContent('.gitignore', laravelIgnore);
  });
});

describe('if the user wants we install laravel', () => {
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
      'dist/public/',
      'dist/resources/',
      'dist/routes/',
      'dist/storage/',
      'dist/tests/',
      'dist/vendor/',
      'dist/vendor/laravel/'
    ]);
  });
});
