/**
 * Write a Vue Project
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

/* eslint-disable */
const fs = require('fs-extra');
const logComment = require('../../../helpers/_logComment');
const vueFiles = require('./_vueFiles');
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
        vueDependencies.packageJsonVue(
          files,
          context
        );

        if (typeof context.props.projectVuePlugins !== 'undefined' || context.props.projectUsage === 'vueapp') {
          if (context.props.projectUsage === 'vueapp') {
            context.props.projectVuePlugins = [];
            context.props.projectVuePlugins.push('vuex');
            context.props.projectVuePlugins.push('vuerouter');
          }

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
        }

        if(context.props.projectUsage === 'vueapp') {
          context.fs.copy(
            context.templatePath('vue/template/index.html'),
            context.destinationPath('dist/index.html')
          );
          context.fs.copy(
            context.templatePath('vue/template/index.html'),
            context.destinationPath('src/views/index.html')
          )
        }

        context.props.imports = vueImports;
        context.props.applicationCode = exports.renderInstance(vueInstance);

        // Copy our Folders
        vueFiles.SRC.files.forEach(file => {
          context.fs.copyTpl(
            context.templatePath(`vue/${file.src}`),
            context.destinationPath(file.dest),
            {
              projectUsage: context.props.projectUsage,
              projectVuePlugins: context.projectVuePlugins || []
            },
          );
        });


        resolve();
      })
    }
  };
};
