'use strict';

// Import some prompt modules
const generalPrompts = require('./prompt-modules/_general');

function prompts() {
  return [...generalPrompts];
}

module.exports = prompts;
