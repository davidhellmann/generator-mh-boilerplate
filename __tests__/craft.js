process.env.NODE_ENV = 'test';
/* eslint-disable new-cap */
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
const fs = require('fs-extra'); // eslint-disable-line no-unused-vars

const run = () => helpers.run(path.join(__dirname, '../generators/app'));

describe('It is a Craft Project 🎉', () => {
  beforeAll(async () => {
    await run()
      .withPrompts({
        projectUsage: 'craft'
      });
  });

  it('fills config.json with project type craft', async () => {
    assert.JSONFileContent('config.json', {
      projectType: 'craft'
    });
  });

  it('add craft to .gitignore', () => {
    assert.noFileContent('.gitignore', '&lt;%- if(craftEnv == &#39;nystudio&#39;) { %&gt;');
    assert.fileContent('.gitignore', 'dist/craft/storage/*');
  });

  it('adds craft templates to the src folder', () => {
    assert.file([
      'src/views/index.html',
      'src/views/layout/_layout.html',
      'src/views/parts/site-header.html',
      'src/views/parts/site-scripts.html'
    ]);
  });

  it('adds webpack content to scripts and header', () => {
    assert.fileContent('src/views/parts/site-scripts.html', `<% for (var chunk in htmlWebpackPlugin.files.chunks) { %>
  <script src="<%= htmlWebpackPlugin.files.chunks[chunk].entry %>"></script>
<% } %>
`);
    assert.fileContent('src/views/parts/site-header.html', `<% for (var css in htmlWebpackPlugin.files.css) { %>
      <link href="<%= htmlWebpackPlugin.files.css[css] %>" rel="stylesheet">
    <% } %>`);
  });
});

describe('it downloads craft', () => {
  it('If the user wants to it downloads Craft', async () => {
    await run()
      .withPrompts({
        projectUsage: 'craft',
        craftInstall: true
      });

    assert.file([
      'dist/craft/'
    ]);
  });
});

describe('it is a craft project with NY Studio Environment', () => {
  beforeAll(async () => {
    await run()
      .withPrompts({
        projectUsage: 'craft',
        craftInstall: true,
        craftEnv: 'nystudio'
      });
  });

  it('adds environment file', () => {
    assert.file([
      'dist/.env.example.php',
      'dist/.env.php'
    ]);
  });

  it('adds .env.php to gitignore', () => {
    assert.noFileContent('.gitignore', '&lt;%- if(craftEnv == &#39;nystudio&#39;) { %&gt;');
    assert.fileContent('.gitignore', '.env.php');
  });

  it('adds the nystudio general and db file', () => {
    assert.fileContent('dist/craft/config/db.php', `// All environments
        '*' => array(
            'tablePrefix' => 'craft',
            'server' => getenv('CRAFTENV_DB_HOST'),
            'database' => getenv('CRAFTENV_DB_NAME'),
            'user' => getenv('CRAFTENV_DB_USER'),
            'password' => getenv('CRAFTENV_DB_PASS'),
        ),`);

    assert.fileContent('dist/craft/config/general.php', `'siteUrl' => getenv('CRAFTENV_SITE_URL'),`);
  });

  it('add nystudio index.php to systemFiles', () => {
    assert.fileContent('src/systemFiles/index.php', `if (file_exists('../.env.php'))`);
  });
});

