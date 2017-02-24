// this file gets compiles by browserify
// please import your partial files here
// your partials can be in any other folder than 'json', 'my-source' or 'single'
// these folders are used for other tasks
// you can change the name of this file in the config.json

import 'lazysizes';
import '../scss/app.scss';

<%_ if (projectUseVue) { _%>
import Vue from 'Vue';
import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});

<%_ } _%>