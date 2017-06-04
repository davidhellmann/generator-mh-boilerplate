'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const filesystem = require('fs-extra'); // eslint-disable-line no-unused-vars
const commandExists = require('command-exists');

// Import Helpers
const logComment = require('./helpers/_logComment');

// Importing modules
const promptsFunction = require('./modules/prompts');
const basePackageJson = require('./modules/writing-modules/_package.json');
const baseConfigJson = require('./modules/writing-modules/_writeConfig.json');

// Craft CMS
const writingCraft = require('./modules/writing-modules/craft');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.logComment = logComment.bind(this);
    this.promptsFunction = promptsFunction.bind(this);
    this.basePackageJson = basePackageJson.bind(this);
    this.baseConfigJson = baseConfigJson.bind(this);

    // CRAFT CMS
    this.writingCraft = writingCraft.bind(this);

    this.commands = {
      composer: false,
      yarn: false
    };
  }

  async initializing() {
    this.logComment({message: 'Initializing the Generator'});
    await commandExists('composer');
    this.commands.composer = true;
    await commandExists('yarn');
    this.commands.yarn = true;
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the marvelous ' + chalk.red('generator-mh-boilerplate') + ' generator!'
    ));
    this.logComment({message: 'Prompting'});
    // Execute function so we get its returned array;
    const prompts = promptsFunction();
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  async configuring() {
    this.logComment({message: 'Configure Project'});
    // Install Craft or Laravel and configure their Folders for our needs.
    if (this.props.projectUsage === 'craft' && this.props.craftInstall) {
      try {
        await this.writingCraft().download(this);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async writing() {
    this.logComment({message: 'Writing files'});
    // Getting the template files
    const pkg = this.fs.readJSON(this.templatePath('_package.json'), {});
    const config = this.fs.readJSON(this.templatePath('_config.json'), {});

    // Write Basic package.json
    this.basePackageJson({
      pkg
    });

    // Write basic config json
    this.baseConfigJson({
      config
    });

    await this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    await this.fs.writeJSON(this.destinationPath('config.json'), config);

    /*
     |--------------------------------------------------------------------------
     | Moving Craft Boilerplate Folders
     |--------------------------------------------------------------------------
     */
    this.logComment({message: 'Moving Basic Folder', short: true});
    // Move basic js if no framework is choosen
    this.fs.copyTpl(
      this.templatePath('src/js'),
      this.destinationPath('src/js')
    );
    /*
     |--------------------------------------------------------------------------
     | Moving Basic Boilerplate Folders
     |--------------------------------------------------------------------------
     */
    this.logComment({message: 'Moving Craft Folders'});
    this.fs.copy(
      this.templatePath('src/craft'),
      this.destinationPath('src/views/')
    );
  }

  install() {
    this.installDependencies();
  }
};
