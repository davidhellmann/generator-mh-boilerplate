/**
 * Prompt Questions for Laravel
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
      type: 'laravel'
    }),
    type: 'confirm',
    name: 'laravelInstall',
    message: message({
      headline: 'Install Laravel?',
      message: 'Download and installs the latest Laravel Version',
      defaultValue: false
    }),
    default: true
  }
];

module.exports = craftPrompts;
