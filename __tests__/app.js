'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

// Define some variables
const projectName = 'boilerplate-test';
const author = {
  name: 'Martin Herweg',
  email: 'martin@herweg.co'
};

const run = () => helpers.run(path.join(__dirname, '../generators/app'));

describe('mh-boilerplate', () => {
  // Test for Basic Files
  describe('Basic Files and Infos', () => {
    beforeAll(() => {
      return run()
        .withPrompts({
          projectName,
          authorName: author.name,
          authorEmail: author.email
        });
    });
    // Test package.json content
    it('fill package.json with correct Information', () => {
      assert.JSONFileContent('package.json', { // eslint-disable-line new-cap
        name: projectName,
        authors: [{name: author.name, email: author.email}]
      });
    });
  });
});
