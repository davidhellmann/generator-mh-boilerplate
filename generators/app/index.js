'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

// Importing modules
const promptsFunction = require('./modules/prompts');
const basePackageJson = require('./modules/writing-modules/_package.json');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.promptsFunction = promptsFunction.bind(this);
    this.basePackageJson = basePackageJson.bind(this);
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the marvelous ' + chalk.red('generator-mh-boilerplate') + ' generator!'
    ));
    // Execute function so we get its returned array;
    const prompts = promptsFunction();
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const pkg = this.fs.readJSON(this.templatePath('_package.json'), {});
    // Write Basic package.json
    this.basePackageJson({
      pkg
    });

    this.fs.writeJSON(this.destinationPath('package.json'), pkg); // eslint-disable-line no-undef
  }

  install() {
    this.installDependencies();
  }
};
