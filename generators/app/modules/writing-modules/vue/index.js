/* eslint-disable */
const fs = require('fs-extra');
const logComment = require('../../../helpers/_logComment');
const vueDependencies = require('../../packageJson-modules/dependencies/_vue');

let vueImports = [`import Vue from 'vue';`, `\nimport App from './App.vue';`];

exports.renderInstance = function (vueInstanceOptions) {
  if (!vueInstanceOptions) {
    return '';
  }
  return `
new Vue({
  el: '#app',
  render: createElement => createElement(App),
  ${vueInstanceOptions.map(keyword => keyword)}
});
    `;
};

exports.writingVue = () => {
  return {
    writing: ({ files, context }) => {
      return new Promise((resolve) => {
        const vueInstance = [];
        vueDependencies.packageJsonCss(
          files,
          context
        );

        if(context.props.projectVuePlugins.includes('vuex')) {
          if (!vueImports.includes(`\nimport store from './store';`)) {
            vueImports.push(`\nimport store from './store';`);
          }

          if (!vueInstance.includes('store')) {
            vueInstance.push('store');
          }

          context.fs.copy(
            context.templatePath('vue/VueX/store/'),
            context.destinationPath('src/js/store/')
          );
        }

        if(context.props.projectVuePlugins.includes('vuerouter')) {
          if (!vueImports.includes(`\nimport router from './router';`)) {
            vueImports.push(`\nimport router from './router';`);
          }

          if (!vueInstance.includes('router')) {
            vueInstance.push('router');
          }

          // Copy store boilerplate to the app
          context.fs.copy(
            context.templatePath('vue/Router/index.js'),
            context.destinationPath('src/js/router/index.js')
          );
        }

        context.props.imports = vueImports;
        context.props.applicationCode = exports.renderInstance(vueInstance);

        resolve();
      })
    }
  };
};
