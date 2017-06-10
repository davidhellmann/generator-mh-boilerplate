import 'lazysizes';
import 'svgxuse'
import 'babel-polyfill';
import '../scss/app.scss'; /* eslint-disable */

<% if(typeof imports !== 'undefined') { -%>
<% imports.forEach(function(importString) { -%>
<%- importString -%>
<% }); -%>
<% } -%>

<% if(typeof applicationCode !== 'undefined') { -%>
  <%- applicationCode -%>
<% } -%>
