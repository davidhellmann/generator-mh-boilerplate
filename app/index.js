'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var ora = require('ora');
var commandExists = require('command-exists');

var mhBoilerplateGenerator = yeoman.Base.extend({

  init: function() {
    this.pkg = require('../package.json');
  },

  askFor: function() {

    var done = this.async();
    var wp_cli = false;
    var craft_cli = false;
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the impressive ' + chalk.red('mh-boilerplate') + ' generator!'
    ));

    var warning =
    '\n This generator is customized for my own needs!'
    + '\n So it may not be the right thing for you!'
    + '\n Keep this in mind when you go further and please read the Readme'
    + '\n'
    + '\n Also this is very early version and maybe there are some bugs :)'
    + '\n';

    this.log(chalk.bold.red(warning));

    // check if cli tools exist
    commandExists('wp')
      .then(function(command){
        wp_cli = true
      }).catch(function(){
      wp_cli = false;
    });

    commandExists('craft')
      .then(function(command){
        craft_cli = true
      }).catch(function(){
      craft_cli = false;
    });

    return this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Name the project (name of the theme folder in Wordpress)',
        default: 'mh-boilerplate'
      },{
        type: 'input',
        name: 'projectDescription',
        message: 'Short description of the Project`',
        default: 'undefined'
      },{
        type: 'input',
        name: 'projectProxy',
        message: 'Enter the vhost for your Project'
      },{
        type: 'list',
        name: 'projectUsage',
        message: 'Which purpose does this Project have? Choose the appropriate option',
        choices: [
          "Craft",
          "laravel",
          "HTML Protoypes",
          "Wordpress"
        ]
      },{
        when: function(answers) {
          if(answers.projectUsage === 'Craft' && craft_cli) {
            return true
          }
          return false
        },
        type: 'confirm',
        name: 'craftHearty',
        message: 'Do you want to use Hearty Config?',
        default: true
      },{
        when: function(answers) {
          return answers.projectUsage === 'Craft';
        },
        type: 'confirm',
        name: 'craftInstall',
        message: 'Do you want to install Craft?',
        default: false
      },{
        when: function(answers) {
          if(answers.projectUsage === 'Wordpress' && wp_cli) {
            return true
          }
          return false
        },
        type: 'confirm',
        name: 'projectInstallWordpress',
        message: 'Do yo want to install Wordpress?',
        default: false
      },{
        when: function(answers) {
          return answers.projectUsage === 'laravel';
        },
        type: 'confirm',
        name: 'projectInstallLaravel',
        message: 'Do you want to install Laravel?',
        default: false
      },{
        type: 'confirm',
        name: 'projectUseVue',
        message: 'Do you want to use Vue on your project?',
        default: false
      },{
        when: function(answers) {
          return answers.projectUseVue;
        },
        type: 'list',
        name: 'projectVueVersion',
        message: 'Which version of Vue do you want to use',
        choices: [
          'Runtime only (You have to use .vue Files or Render Functions!',
          'Standalone'
        ]
      },{
        type: 'input',
        name: 'projectVersion',
        message: 'Project Version Number',
        default: '0.0.1'
      },{
        type: 'input',
        name: 'projectAuthor',
        message: 'Project Author or company',
        default: 'undefined',
        store: true
      },{
        type: 'input',
        name: 'projectMail',
        message: 'Mailadress of the author',
        default: 'undefined',
        store: true
      },{
        type: 'input',
        name: 'projectUrl',
        message: 'Author URl',
        default: 'http://...',
        store: true
      },{
        type: 'input',
        name: 'projectRepo',
        message: 'Git Repo URL',
        default: 'http://...'
      }
    ]).then(function(answers) {
      function checkAnswer(answer) {
        if(answer) {
          return answer
        } else {
          return false
        }
      }
      this.projectName = answers.projectName;
        this.projectDescription = answers.projectDescription;
        this.projectProxy = answers.projectProxy;
        this.projectUsage = answers.projectUsage;
        this.projectInstallWordpress = checkAnswer(answers.projectInstallWordpress);
        this.projectInstallLaravel = checkAnswer(answers.projectInstallLaravel);
        this.craftInstall = checkAnswer(answers.craftInstall);
        this.craftHearty = checkAnswer(answers.craftHearty);
        this.projectUseVue = checkAnswer(answers.projectUseVue);
        this.projectVueVersion = answers.projectVueVersion;
        this.projectVersion = answers.projectVersion;
        this.projectAuthor = answers.projectAuthor;
        this.projectMail = answers.projectMail;
        this.projectUrl = answers.projectUrl;
        this.projectRepo = answers.projectRepo;
        done();
    }.bind(this))
  },

  app: function() {

    // move src folder
    this.directory('src/boilerplates/', 'src/boilerplates/');
    this.directory('src/js/', 'src/js/');
    this.directory('src/js/', 'src/js');
    this.directory('src/scss/', 'src/scss/');
    this.directory('src/gulpfile/', 'gulpfile/');
    this.directory('src/webpack/', 'webpack/');
    if(this.projectUsage === 'Craft') {
      this.directory('src/craft/', 'src/views/');
    } else {
      this.directory('src/php/', 'src/views/');
    }
    if(this.craftHearty) {
      this.directory('craft/hearty/config/', 'dist/config');
      this.directory('craft/hearty/systemFiles', 'src/systemFiles');
      mkdirp('dist/plugins');
    } else {
      mkdirp('src/systemFiles');
    }
    mkdirp('src/images/cssimages');
    mkdirp('src/images/htmlimages');
    mkdirp('src/images/svg/single');
    mkdirp('src/images/svg/sprite');
    mkdirp('src/fonts');
    mkdirp('src/js/json');
    mkdirp('src/js/my-source');
    mkdirp('src/js/single');
    mkdirp('src/favicons');
  },

  projectfiles: function() {

    var params = {
      projectName: this.projectName,
      projectDescription: this.projectDescription,
      projectProxy: this.projectProxy,
      projectUsage: this.projectUsage,
      projectInstallWordpress: this.projectInstallWordpress,
      projectInstallLaravel: this.projectInstallLaravel,
      craftInstall: this.craftInstall,
      craftHearty: this.craftHearty,
      projectUseVue: this.projectUseVue,
      projectVersion: this.projectVersion,
      projectVueVersion: this.projectVueVersion,
      projectAuthor: this.projectAuthor,
      projectMail: this.projectMail,
      projectUrl: this.projectUrl,
      projectRepo: this.projectRepo
    }

    this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        params
    );
    this.fs.copyTpl(
        this.templatePath('_gulpfile.babel.js'),
        this.destinationPath('gulpfile.babel.js'),
        params
    );
    this.fs.copyTpl(
        this.templatePath('_config.json'),
        this.destinationPath('config.json'),
        params
    );
    this.fs.copyTpl(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore'),
        params
    );
    this.fs.copyTpl(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig'),
        params
    );
    this.fs.copyTpl(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc.js'),
        params
    );
    this.fs.copyTpl(
        this.templatePath('stylelintrc'),
        this.destinationPath('.stylelintrc'),
        params
    );
    this.fs.copyTpl(
        this.templatePath('babelrc'),
        this.destinationPath('.babelrc'),
        params
    );
    this.fs.copyTpl(
        this.templatePath('_readme.md'),
        this.destinationPath('README.md'),
        params
    );
  },



  install: function () {
    var that = this;
    const spinner = ora('Install dependencies').start();
    // check if yarn is available and use it instead of npm
    commandExists('yarn', function(err, commandExists) {
      if(commandExists) {
        var done = that.async();
        that.spawnCommand('yarn').on('close', done);
      } else {
        that.installDependencies({
          bower: false,
          npm: true
        });
      }
    });

    this.installDependencies({
      skipInstall: this.options['skip-install'],
      callback: function () {
        const git_spinner = ora('Init git repo').start();
        this.spawnCommand('git', ['init']);
        const init_spinner = ora('Running Init').start();
        this.spawnCommand('npm', ['run', 'init']);
      }.bind(this) // bind the callback to the parent scope
    });

    if (this.projectInstallLaravel) {
      this.spawnCommand('laravel', ['new', 'dist']);
    } else if (this.projectInstallWordpress) {
      this.spawnCommand('wp', ['core', 'download', '--path=dist/', '--locale=de_DE', '--skip-themes=["twentythirteen", "twentyfourteen"]', '--skip-plugins' ]);
    } else if(this.craftInstall) {
      var done = this.async();
      this.spawnCommand('craft', ['install', 'dist']).on('close', done);
    }
  }
});

module.exports = mhBoilerplateGenerator;
