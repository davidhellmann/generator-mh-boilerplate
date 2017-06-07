'use strict';
// Importing message helper function
const message = require('../../helpers/promptMessage');
const when = require('../../helpers/promptsWhen');

const vuePrompts = [
  {
    type: 'list',
    name: 'projectVueVersion',
    message: message({
      headline: 'Choose Vue Version',
      description: 'Choose between Standalone and Runtime only which only allows you to use Vue within .vue Files or with Render Functions!',
      defaultValue: false
    }),
    choices: [
      'Standalone',
      'Runtime only (You have to use .vue Files or Render Functions!)'
    ]
  },
  {
    when: when({
      question: 'projectFramework',
      type: 'vue'
    }),
    type: 'checkbox',
    name: 'projectVuePlugins',
    message: message({
      headline: 'Vue Plugins',
      description: 'Choose which Vue Plugins you want to use',
      defaultValue: false
    }),
    choices: [
      {
        name: 'VueX (including VueX Structure, see README.md)',
        value: 'vuex'
      },
      {
        name: 'Vue Router',
        value: 'vuerouter'
      }
    ]
  }
];

module.exports = vuePrompts;
