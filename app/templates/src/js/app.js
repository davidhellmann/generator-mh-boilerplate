// this file gets compiles by browserify
// please import your partial files here
// your partials can be in any other folder than 'json', 'my-source' or 'single'
// these folders are used for other tasks
// you can change the name of this file in the config.json

import 'lazysizes';
import '../scss/app.scss'; /* eslint-disable */

<%_ if (projectUseVue) { _%>
import Vue from 'vue';
<%_ if (projectVuePlugins.includes('vuex')) { _%>
  import store from './store';
  <%_ } _%>
  <%_ if (projectVuePlugins.includes('vuerouter')) { _%>
  import router from './router';
  <%_ } _%>
import App from './App.vue';


  new Vue({
      el: '#app',
    <%_ if (projectVuePlugins.includes('vuerouter')) { _%>
  router,
  <%_ } _%>
  <%_ if (projectVuePlugins.includes('vuex')) { _%>
  store,
  <%_ } _%>
  render: h => h(App)
});

<%_ } _%>

<%_ if (projectUsage === 'vueapp') { _%>
import Vue from 'vue';
import store from './store';
import router from './router';
import App from './App.vue';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

<%_ } _%>