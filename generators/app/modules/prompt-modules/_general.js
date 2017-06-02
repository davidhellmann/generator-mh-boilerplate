'use strict';
const generalPrompts = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Please provide a Project Name (without-spaces)'
  },
  {
    type: 'input',
    name: 'authorName',
    message: 'Your Name',
    store: true
  },
  {
    type: 'input',
    name: 'authorEmail',
    message: 'Your Email',
    store: true
  }
];

module.exports = generalPrompts;
