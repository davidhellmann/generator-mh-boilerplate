<template>
  <div id="app">
    <% if(projectUsage === 'vueapp') { %>
    <router-view></router-view>
    <% } %>
  </div>
</template>

<script>
  export default {
    name: 'App',
  };
</script>
