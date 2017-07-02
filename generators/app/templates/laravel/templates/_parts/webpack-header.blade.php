<% for (var css in htmlWebpackPlugin.files.css) { %>
<link href="<%= htmlWebpackPlugin.files.css[css] %>" rel="stylesheet">
    <% } %>
    <% for (var chunk of webpack.chunks) {
      for (var file of chunk.files) {
      if (file.match(/\.(js|css)$/) && !file.match(/cp/)) { %>
      <link rel="<%= chunk.initial?'preload':'prefetch' %>" href="<%= htmlWebpackPlugin.files.publicPath + file %>" as="<%= file.match(/\.css$/)?'style':'script' %>"><% }}} %>
