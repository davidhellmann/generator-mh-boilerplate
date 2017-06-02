'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const Pleasent = require('pleasant-progress');

const progress = new Pleasent();

// Importing modules
const promptsFunction = require('./modules/prompts');
const basePackageJson = require('./modules/writing-modules/_package.json');
const baseConfigJson = require('./modules/writing-modules/_writeConfig.json');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.promptsFunction = promptsFunction.bind(this);
    this.basePackageJson = basePackageJson.bind(this);
    this.baseConfigJson = baseConfigJson.bind(this);
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the marvelous ' + chalk.red('generator-mh-boilerplate') + ' generator!'
    ));
    this.log(`${chalk.cyan.bold(`[ Prompting ]`)}`);
    // Execute function so we get its returned array;
    const prompts = promptsFunction();
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.log(`${chalk.cyan.bold(`[ Writing ]`)}`);
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

    this.fs.writeJSON(this.destinationPath('package.json'), pkg); // eslint-disable-line no-undef
    this.fs.writeJSON(this.destinationPath('config.json'), config); // eslint-disable-line no-undef

    /*
     |--------------------------------------------------------------------------
     | Moving Craft Boilerplate Folders
     |--------------------------------------------------------------------------
     */
    this.log(`${chalk.cyan.bold(`[ Moving Basic Folders ]`)}`);
    progress.start('moving base files');
    // Move basic js if no framework is choosen
    this.fs.copyTpl(
      this.templatePath('src/js'),
      this.destinationPath('src/js')
    );
    progress.stop();

    /*
     |--------------------------------------------------------------------------
     | Moving Basic Boilerplate Folders
     |--------------------------------------------------------------------------
     */
    this.log(`${chalk.cyan.bold(`[ Moving Craft Folders ]`)}`);
    progress.start('moving craft files');
    this.fs.copy(
      this.templatePath('src/craft'),
      this.destinationPath('src/views/')
    );
    progress.stop();
  }

  install() {
    this.installDependencies();
  }
};
