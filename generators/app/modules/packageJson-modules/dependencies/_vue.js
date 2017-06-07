'use strict';
const extend = require('deep-extend');

exports.dependencies = {
  vue: '^2.2.3'
};

exports.devDependencies = {
  'eslint-plugin-html': '^2.0.1',
  'vue-loader': '^12.0.4',
  'vue-style-loader': '^3.0.1',
  'vue-template-compiler': '^2.3.3'
};

exports.vueXDependencies = {
  vuex: '^2.3.1'
};

exports.routerDependencies = {
  'vue-router': '^2.5.3'
};

exports.packageJsonCss = (files = {}, context) => {
  extend(files.pkg, {
    devDependencies: exports.devDependencies
  });

  if (context.props.projectVuePlugins.includes('vuex')) {
    exports.dependencies = Object.assign(exports.dependencies, exports.vueXDependencies);
  }

  if (context.props.projectVuePlugins.includes('vuerouter')) {
    exports.dependencies = Object.assign(exports.dependencies, exports.routerDependencies);
  }

  extend(files.pkg, {
    dependencies: exports.dependencies
  });
};