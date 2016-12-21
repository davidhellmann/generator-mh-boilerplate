import config from '../config.json';

import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import {execSync as exec} from 'child_process';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack_config from './webpack_config';
import * as utils from './webpack_utils';<% if (projectUseVue === true ) { %>
import vueConfig from './vue-loader-config';<% } %>
import webpack_base_config from './webpack.base.config.babel.js';
import './webpack_files_inject';
const env = webpack_config.build.env;

// remove old build files
exec(`rm -rf ${config.dist.js}app.* ${config.dist.js}manifest.* ${config.dist.js}vendor.*`)

<% if (projectUseVue === true ) { %>
vueConfig.loaders = utils.cssLoaders({
  extract: true,
})
<% } %>

const webpack_prod_config = merge(webpack_base_config, {
  devtool: webpack_config.build.productionSourceMap ? '#source-map' : false,
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules'),
          ) === 0
        );
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    })
  ],
});

if (webpack_config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpack_prod_config.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        `\\.(${webpack_config.build.productionGzipExtensions.join('|')})$`
      ),
      threshold: 10240,
      minRatio: 0.8,
    }),
  );
}

export default webpack_prod_config;
