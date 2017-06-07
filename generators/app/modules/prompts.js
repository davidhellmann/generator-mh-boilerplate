'use strict';

// Import some prompt modules
const projectPrompts = require('./prompt-modules/_project');
const authorPrompts = require('./prompt-modules/_author');
const craftPrompts = require('./prompt-modules/_craft');
const laravelPrompts = require('./prompt-modules/_laravel');
const vuePrompts = require('./prompt-modules/_vue');

function prompts() {
  return [
    ...projectPrompts,
    ...craftPrompts,
    ...laravelPrompts,
    ...vuePrompts,
    ...authorPrompts
  ];
}

module.exports = prompts;
