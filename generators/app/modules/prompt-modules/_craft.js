'use strict';
// Importing message helper function
const message = require('../../helpers/promptMessage');
const when = require('../../helpers/promptsWhen');

const craftPrompts = [
  {
    when: when({
      question: 'projectUsage',
      type: 'craft'
    }),
    type: 'confirm',
    name: 'craftInstall',
    message: message({
      headline: 'Install Craft?',
      message: 'Download and installs the latest Craft Version',
      defaultValue: false
    }),
    default: true
  },
  {
    when: when({
      question: 'projectUsage',
      type: 'craft'
    }),
    type: 'list',
    name: 'craftEnv',
    message: message({
      headline: 'Craft Environment',
      description: 'Choose your preffered Craft Environment'
    }),
    choices: [
      {
        name: 'NY Studio Multienvironment with .env.php (Default)',
        value: 'nystudio'
      },
      {
        name: 'Default',
        value: 'default'
      }
    ],
    default: 0
  }
];

module.exports = craftPrompts;
