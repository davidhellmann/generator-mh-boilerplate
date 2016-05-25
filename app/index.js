'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

var mhBoilerplateGenerator = yeoman.Base.extend({

  init: function() {
    this.pkg = require('../package.json');
  },

  askFor: function() {
    var done = this.async();

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

    console.log(chalk.bold.red(warning));

    var prompts = [
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
          "HTML Protoypes",
          "Wordpress",
          "Craft",
          "laravel"
        ]
      },{
        when: function(response) {
          return response.projectUsage === 'Craft';
        },
        type: 'confirm',
        name: 'craftHearty',
        message: 'Do you want to use Hearty Config?',
        default: false
      },{
        when: function(response) {
          return response.projectUsage === 'Craft';
        },
        type: 'confirm',
        name: 'craftInstall',
        message: 'Do you want to install Craft?',
        default: false
      },{
        when: function(response) {
          return response.projectUsage === 'HTML Protoypes';
        },
        type: 'confirm',
        name: 'projectTwig',
        message: 'Do yo want to use Twig as Template ?',
        default: false
      },{
        when: function(response) {
          return response.projectUsage === 'Wordpress';
        },
        type: 'confirm',
        name: 'projectInstallWordpress',
        message: 'Do yo want to install Wordpress?',
        default: false
      },{
        when: function(response) {
          return response.projectUsage === 'laravel';
        },
        type: 'confirm',
        name: 'projectInstallLaravel',
        message: 'Do you want to install Laravel?',
        default: false
      },{
        when: function(response) {
          return response.projectUsage === 'laravel';
        },
        type: 'confirm',
        name: 'projectInstallLaravelFormBoilerplate',
        message: 'Do you want to install Laravel Form Boilerplate?',
        default: false
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
    ];

    this.prompt(prompts, function(props) {
      this.projectName = props.projectName;
      this.projectDescription = props.projectDescription;
      this.projectProxy = props.projectProxy;
      this.projectUsage = props.projectUsage;
      this.projectTwig = props.projectTwig;
      this.projectInstallWordpress = props.projectInstallWordpress;
      this.projectInstallLaravel = props.projectInstallLaravel;
      this.projectInstallLaravelFormBoilerplate = props.projectInstallLaravelFormBoilerplate;
      this.craftInstall = props.craftInstall;
      this.craftHearty = props.craftHearty;
      this.projectVersion = props.projectVersion;
      this.projectAuthor = props.projectAuthor;
      this.projectMail = props.projectMail;
      this.projectUrl = props.projectUrl;
      this.projectRepo = props.projectRepo;
      done();
    }.bind(this));

  },

  app: function() {
    // move src folder
    this.directory('src/boilerplates/', 'src/boilerplates/');
    this.directory('src/js/', 'src/js/');
    this.directory('src/js/', 'src/js');
    this.directory('src/scss/', 'src/scss/');
    this.directory('src/gulpfile/', 'gulpfile/');
    if(this.projectTwig) {
      this.directory('src/twig/', 'src/views/');
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
    this.copy('_package.json', 'package.json');
    this.copy('_gulpfile.babel.js', 'gulpfile.babel.js');
    this.copy('_config.json', 'config.json');
    this.copy('_gitignore', '.gitignore');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('babelrc', '.babelrc');
    this.copy('_readme.md', 'README.md');
  },

  install: function () {
    var that = this;


    console.log('Install dependencies');

    this.installDependencies({
      skipInstall: this.options['skip-install'],
      callback: function () {
        console.log('Init git repo');
        this.spawnCommand('git', ['init']);
        console.log('Running gulp init');
        this.spawnCommand('gulp', ['init']);
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

    if (this.projectInstallLaravelFormBoilerplate) {
      that.composeWith('mh-boilerplate:laravel-forms');
    }
  }
});

module.exports = mhBoilerplateGenerator;
;
