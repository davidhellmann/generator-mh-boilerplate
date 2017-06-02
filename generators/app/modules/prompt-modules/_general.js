'use strict';
const chalk = require('chalk');

// Importing message helper function
const message = require('../../helpers/promptMessage');

const generalPrompts = [
  {
    type: 'input',
    name: 'projectName',
    message: message({
      headline: 'Project Name',
      description: 'Please provide a Project Name (without-spaces)',
      defaultValue: 'Current Name'
    }),
    default: function () {
      return process.cwd().split('/').pop(-1).toLowerCase().replace(/\s/g, '');
    },
    validate: function (input) {
      // Do async stuff
      if (input.indexOf(' ') >= 0 || /[~`!#$%^&*+=[\]\\';,/{}|\\":<>?]/g.test(input)) {
        // Pass the return value in the done callback
        console.log('\n' + chalk.styles.red.open + 'No whitespaces or special-chars allowed!' + chalk.styles.red.close);
        return false;
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'projectDescription',
    message: message({
      headline: 'Project Description',
      description: 'Please provide a description for your project.',
      defaultValue: false
    })
  },
  {
    type: 'input',
    name: 'projectVersion',
    message: message({
      headline: 'Project Version',
      description: 'Define Project Version'
    }),
    default: '0.0.1'
  },
  {
    type: 'input',
    name: 'projectProxy',
    message: message({
      headline: 'Project Local Domain',
      description: 'Define Project Local Domain, defaults to your project name'
    }),
    default: function (answers) {
      // If the
      if (answers.projectName.includes('.dev') || answers.projectName.includes('.local')) {
        return answers.projectName;
      }
      return `${answers.projectName}.dev`;
    }
  },
  {
    type: 'input',
    name: 'authorName',
    message: message({
      headline: 'Author Name',
      description: 'Please provide your name',
      defaultValue: false
    }),
    store: true
  },
  {
    type: 'input',
    name: 'authorEmail',
    message: message({
      headline: 'Author E-Mail',
      description: 'Please provide your e-mail',
      defaultValue: false
    }),
    store: true
  },
  {
    type: 'input',
    name: 'authorHomepage',
    message: message({
      headline: 'Author Homepage',
      description: 'Note the Author Homepage',
      defaultValue: false,
      store: true
    })
  }
];

module.exports = generalPrompts;
