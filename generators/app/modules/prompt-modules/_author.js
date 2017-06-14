/**
 * Prompt Questions for the Author
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

'use strict';
// Importing message helper function
const message = require('../../helpers/promptMessage');

const authorPrompts = [
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

module.exports = authorPrompts;
