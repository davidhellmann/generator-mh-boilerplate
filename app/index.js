'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

  init: function() {
    this.pkg = require('../package.json');
  },

  askFor: function() {
    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Name the project (name of the theme folder in Wordpress)',
        default: 'mh-boilerplate'
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'Short description of the Project`',
        default: 'undefined'
      },
      {
        type: 'list',
        name: 'projectUsage',
        message: 'Which purpose does this Project have? Choose the appropriate option',
        choices: [
          "HTML Protoypes",
          "Wordpress",
          "Craft",
          "laravel"
        ]
      },
      {
        type: 'input',
        name: 'projectVersion',
        message: 'Project Version Number',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: 'Project Author or company',
        default: 'undefined'
      },
      {
        type: 'input',
        name: 'projectMail',
        message: 'Mailadress of the author',
        default: 'undefined'
      },
      {
        type: 'input',
        name: 'projectUrl',
        message: 'Author URl',
        default: 'http://...'
      },
      {
        type: 'input',
        name: 'projectRepo',
        message: 'Git Repo URL',
        default: 'http://...'
      }
    ];

    this.prompt(prompts, function() {
      this.projectName = props.projectName;
      this.projectDescription = props.projectDescription;
      this.projectUsage = props.projectUsage;
      this.projectVersion = props.projectVersion;
      this.projectAuthor = props.projectAuthor;
      this.projectMail = props.projectMail;
      this.projectUrl = props.projectUrl;
      this.projectRepo = props.projectRepo;
    }.bind(this));
  },

  app: function() {

    // move src folder
    this.directory('src/js/', 'src/js/');
    this.directory('src/scss/', 'src/scss/');
    this.directory('src/images/', 'src/images/');
    this.directory('src/templates/', 'src/templates/');

  },

  install: function () {
    this.installDependencies();
  }
});
