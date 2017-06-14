/**
 * Prompt Questions for Craft CMS
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

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
      description: 'Download the Latest Craft Version (You still need to add your Database credentials and run the Installation Process)',
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
      description: 'Choose your preffered Craft Environment',
      defaultValue: false
    }),
    choices: [
      {
        name: message({
          headline: 'NY Studio Multienvironment with .env.php (Default)',
          description: 'Please visit https://github.com/nystudio107/craft-multi-environment for further Information',
          defaultValue: false
        }),
        value: 'nystudio'
      },
      {
        name: message({
          headline: 'Craft Default Configuration',
          description: 'Please visit https://craftcms.com/docs/requirements for further Information',
          defaultValue: false
        }),
        value: 'default'
      }
    ],
    default: 0
  }
];

module.exports = craftPrompts;
