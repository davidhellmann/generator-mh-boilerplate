'use strict';

// Import some prompt modules
const projectPrompts = require('./prompt-modules/_project');
const authorPrompts = require('./prompt-modules/_author');

function prompts() {
  return [
    ...projectPrompts,
    ...authorPrompts
  ];
}

module.exports = prompts;
