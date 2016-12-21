/* eslint-disable */
import 'eventsource-polyfill';
import hot_client from 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
// var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hot_client.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})