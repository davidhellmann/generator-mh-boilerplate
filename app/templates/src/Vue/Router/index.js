import Vue from 'vue';
import Router from 'vue-router';

// import your route Components here
<%_ if (projectUsage === 'vueapp') { %>
import Home from '../views/Home.vue';
<%_ } else { _%>
// import Example from '../views/Example.vue';
<%_ } _%>


Vue.use(Router);

export default new Router({
  routes: [
  <%_ if (projectUsage === 'vueapp') { _%>
    { path: '/', component: Home },
  <%_ } else { _%>
    // { path: '/Example', component: Example },
  <%_ } _%>
  ],
});
