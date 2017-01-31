import webpack from 'webpack';
import merge from 'webpack-merge';
import Dashboard_plugin from 'webpack-dashboard/plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import webpack_config from './webpack_config';
<% if(projectUseVue) { %>
import vueConfig from './vue-loader-config';
<% } %>
import * as utils from './webpack_utils';
import webpack_base_config from './webpack.base.config.babel';
import './webpack_files_inject';

//add hot-reload related code to entry chunks
Object.keys(webpack_base_config.entry).forEach((name) => {
  webpack_base_config.entry[name] = ['./webpack/webpack_dev-client.js'].concat(webpack_base_config.entry[name]);
});

<% if(projectUseVue) { %>
  vueConfig.loaders = utils.cssLoaders({
      extract: false
    })
<% } %>

export default merge(webpack_base_config, {
  output: {
    filename: utils.assetsPath('js/[name].js'),
    hotUpdateChunkFilename: utils.assetsPath('[id].[hash].hot-update.js'),
    hotUpdateMainFilename: utils.assetsPath('[hash].hot-update.json'),
  },
  performance: {
    hints: false,
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': webpack_config.dev.env,
    }),
    new FriendlyErrorsWebpackPlugin(),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new Dashboard_plugin({ port: 3002 }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
});
