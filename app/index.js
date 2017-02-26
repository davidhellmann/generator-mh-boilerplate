'use strict';
const path = require('path');
const util = require('util');
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const commandExists = require('command-exists');
let yarn = false;

module.exports = class extends yeoman {

  constructor(args, opts) {
    super(args, opts);

    this.option('beta');
  }

  initializing() {
    this.pkg = require('../package.json');
    this.props = {};
  }

  prompting() {

    var done = this.async();
    var wp_cli = false;
    var craft_cli = false;
    // Have Yeoman greet the user.
    const intro = `${chalk.red(`
+-----------------------------------------------------------------------------------+
|        ___           ___           ___                       ___                  |
|       /  /\\         /__/\\         /  /\\          ___        /  /\\          ___    |
|      /  /::|        \\  \\:\\       /  /:/_        /  /\\      /  /::\\        /  /\\   |
|     /  /:/:|         \\  \\:\\     /  /:/ /\\      /  /:/     /  /:/\\:\\      /  /:/   |
|    /  /:/|:|__   _____\\__\\:\\   /  /:/ /::\\    /  /:/     /  /:/~/:/     /  /:/    |
|   /__/:/ |:| /\\ /__/::::::::\\ /__/:/ /:/\\:\\  /  /::\\    /__/:/ /:/___  /  /::\\    |
|   \\__\\/  |:|/:/ \\  \\:\\~~\\~~\\/ \\  \\:\\/:/~/:/ /__/:/\\:\\   \\  \\:\\/:::::/ /__/:/\\:\\   |
|       |  |:/:/   \\  \\:\\  ~~~   \\  \\::/ /:/  \\__\\/  \\:\\   \\  \\::/~~~~  \\__\\/  \\:\\  |
|       |  |::/     \\  \\:\\        \\__\\/ /:/        \\  \\:\\   \\  \\:\\           \\  \\:\\ |
|       |  |:/       \\  \\:\\         /__/:/          \\__\\/    \\  \\:\\           \\__\\/ |
|       |__|/         \\__\\/         \\__\\/                     \\__\\/                 |
|                                                                                   |
|                                                                                   |
|                                                                    +--------------+
|                                                                    |         V.2.0|
+--------------------------------------------------------------------+--------------+
`)}|                                                                                   |
|Author: Martin Herweg (@martinherweg)                                              |
|URL: https://github.com/martinherweg/generator-mh-boilerplate                      |
|                                                                                   |
+-----------------------------------------------------------------------------------+
`
    this.log(intro);

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

    commandExists('yarn')
      .then(function(command){
        yarn = true
      }).catch(function(){
      yarn = false;
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
        message: 'Short description of the Project',
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
          "Laravel",
          "Wordpress"
        ]
      },{
        when: function(answers) {
          if(answers.projectUsage === 'Craft') {
            return true
          }
          return false
        },
        type: 'list',
        name: 'craftEnv',
        message: 'Which Craft Config Method do you want to use?',
        choices: [
          {
            'name': 'NY Studio Multienvironment with .env.php (Default)',
            'value': 'nystudio'
          },
          {
            'name': 'Default',
            'value': 'default'
          },
          {
            'name': 'Hearty Config',
            'value': 'hearty'
          }
        ],
        default: 0
      },{
        when: function(answers) {
          if(answers.projectUsage === 'Craft' && craft_cli) {
            return true
          }
          return false
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
          return answers.projectUsage === 'Laravel';
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
          'Standalone',
          'Runtime only (You have to use .vue Files or Render Functions!)'
        ]
      },{
        when: function(answers) {
          return answers.projectUseVue;
        },
        type: 'checkbox',
        name: 'projectVuePlugins',
        message: 'Which Vue Plugins do you want to install',
        choices: [
          {
            name: 'VueX (including VueX Structure, see README.md)',
            value: 'vuex',
          },
          {
            name: 'Vue Router',
            value: 'vuerouter',
          }
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
        this.craftEnv = checkAnswer(answers.craftEnv);
        this.projectUseVue = checkAnswer(answers.projectUseVue);
        this.projectVueVersion = answers.projectVueVersion;
        this.projectVuePlugins = answers.projectVuePlugins;
        this.projectVersion = answers.projectVersion;
        this.projectAuthor = answers.projectAuthor;
        this.projectMail = answers.projectMail;
        this.projectUrl = answers.projectUrl;
        this.projectRepo = answers.projectRepo;
        done();
    }.bind(this))
  }

  writing() {
    var params = {
      projectName: this.projectName,
      projectDescription: this.projectDescription,
      projectProxy: this.projectProxy,
      projectUsage: this.projectUsage,
      projectInstallWordpress: this.projectInstallWordpress,
      projectInstallLaravel: this.projectInstallLaravel,
      craftInstall: this.craftInstall,
      craftEnv: this.craftEnv,
      projectUseVue: this.projectUseVue,
      projectVersion: this.projectVersion,
      projectVueVersion: this.projectVueVersion,
      projectVuePlugins: this.projectVuePlugins,
      projectAuthor: this.projectAuthor,
      projectMail: this.projectMail,
      projectUrl: this.projectUrl,
      projectRepo: this.projectRepo
    }

    // move src folder
    this.fs.copyTpl(
      this.templatePath('src/boilerplates'),
      this.destinationPath('src/boilerplates'),
      params
    );
    this.fs.copyTpl(
      this.templatePath('src/js'),
      this.destinationPath('src/js'),
      params
    );
    this.fs.copyTpl(
      this.templatePath('src/scss'),
      this.destinationPath('src/scss'),
      params
    );
    this.fs.copyTpl(
      this.templatePath('src/gulpfile'),
      this.destinationPath('./gulpfile'),
      params
    );
    this.fs.copyTpl(
      this.templatePath('src/webpack/babelrc'),
      this.destinationPath('./webpack/.babelrc'),
      params
    );
    this.fs.copyTpl(
      this.templatePath('src/webpack'),
      this.destinationPath('./webpack'),
      params
    );
    if(this.projectUsage === 'Craft') {
      this.fs.copyTpl(
        this.templatePath('src/craft'),
        this.destinationPath('src/views/'),
        params
      );
    } else if(this.projectUsage === 'Laravel') {
      this.fs.copyTpl(
        this.templatePath('src/Laravel'),
        this.destinationPath('src/views/'),
        params
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('src/php'),
        this.destinationPath('src/views'),
        params
      );
    }
    if(this.craftEnv === 'nystudio') {
      this.fs.copyTpl(
        this.templatePath('craft/nystudio/systemFiles'),
        this.destinationPath('src/systemFiles'),
        params
      );
    } else if (this.craftEnv === 'hearty') {
      this.fs.copyTpl(
        this.templatePath('craft/hearty/config'),
        this.destinationPath('dist/config'),
        params
      );
      this.fs.copyTpl(
        this.templatePath('craft/hearty/systemFiles'),
        this.destinationPath('src/systemFiles'),
        params
      );
      mkdirp('dist/plugins');
    } else if (this.craftEnv === 'default') {
      this.fs.copyTpl(
        this.templatePath('craft/default/systemFiles'),
        this.destinationPath('src/systemFiles'),
        params
      )
    } else {
      mkdirp('src/systemFiles');
    }
    if(this.projectUseVue) {
      this.fs.copyTpl(
        this.templatePath('vue/App.vue'),
        this.destinationPath('src/js/App.vue'),
        params
      );
      mkdirp('src/js/components/');
    }


    if(this.projectVuePlugins.includes('vuex')) {
      this.fs.copy(
        this.templatePath('src/Vue/VueX/store/'),
        this.destinationPath('src/js/store/')
      )
    }

    if(this.projectVuePlugins.includes('vuerouter')) {
      this.fs.copy(
        this.templatePath('src/Vue/Router/index.js'),
        this.destinationPath('src/js/router/index.js')
      )
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
        this.templatePath('postcss.config.js'),
        this.destinationPath('.postcssrc.js'),
        params
    );
    this.fs.copyTpl(
        this.templatePath('_readme.md'),
        this.destinationPath('README.md'),
        params
    );
  }



  install() {
    var that = this;
    const params = [
      '', // Packages to Install
      {}, // Options to pass to to dargs as arguments
      function cb() {
        that.spawnCommandSync('git', ['init']);
        that.spawnCommandSync('npm', ['run', 'init']);
      },
      {} // options to pass child_process.spawn.
    ];
    // check if yarn is available and use it instead of npm
      if(yarn) {
        that.yarnInstall(...params);
      } else {
        that.npmInstall(...params)
      }

    if (this.projectInstallLaravel) {
      var done = this.async();
      this.spawnCommand('composer', ['create-project', '--prefer-dist', 'laravel/laravel', 'dist']).on('close', done);
      this.spawnCommand('rsync', ['-avz', '--exclude=css/', '--exclude=js/', 'dist/public/', 'src/systemFiles']);
    } else if (this.projectInstallWordpress) {
      var done = this.async();
      this.spawnCommand('wp', ['core', 'download', '--path=dist/', '--locale=de_DE', '--skip-themes=["twentythirteen", "twentyfourteen"]', '--skip-plugins' ]).on('close', done);
    } else if(this.craftInstall && !this.options.beta) {
      var done = this.async();
      this.spawnCommand('craft', ['install', 'dist']).on('close', done);
    } else if(this.craftInstall && this.options.beta) {
      var done = this.async();
      this.spawnCommand('composer', ['create-project', 'craftcms/craft', 'dist', '-s beta']).on('close', done);
    }

  }

  end() {

    if (this.projectInstallLaravel) {
      var done = this.async();
      this.spawnCommand('rsync', ['-avz', '--exclude=css/', '--exclude=js/', 'dist/public/', 'src/systemFiles']);
    }


    if(this.craftEnv === 'nystudio') {
      this.fs.copy(
        this.templatePath('craft/nystudio/environment/env.example.php'),
        this.destinationPath('dist/.env.example.php')
      );

      this.log('Overwrite the Original Craft Files with the ones by the NYStudio Multi Environment');

      if (this.fs.exists(this.destinationPath('dist/craft/config/db.php'))) {
        this.fs.delete(this.destinationPath('dist/craft/config/db.php'));

        this.fs.copy(
          this.templatePath('craft/nystudio/config/db.php'),
          this.destinationPath('dist/craft/config/db.php')
        );
      }

      if (this.fs.exists(this.destinationPath('dist/craft/config/general.php'))) {
        this.fs.delete(this.destinationPath('dist/craft/config/general.php'));

        this.fs.copy(
          this.templatePath('craft/nystudio/config/general.php'),
          this.destinationPath('dist/craft/config/general.php')
        );
      }
    }
  }
}