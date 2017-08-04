<template>
  <div id="app">
    <% if(projectUsage === 'vueapp' || projectVuePlugins.includes('vuerouter')) { %>
    <router-view></router-view>
    <% } %>
  </div>
</template>

<script>
  export default {
    name: 'App',
  };
</script>
