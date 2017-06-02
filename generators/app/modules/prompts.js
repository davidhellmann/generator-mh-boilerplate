'use strict';

// Import some prompt modules
const projectPrompts = require('./prompt-modules/_project');
const authorPrompts = require('./prompt-modules/_author');
const craftPrompts = require('./prompt-modules/_craft');

function prompts() {
  return [
    ...projectPrompts,
    ...craftPrompts,
    ...authorPrompts
  ];
}

module.exports = prompts;
