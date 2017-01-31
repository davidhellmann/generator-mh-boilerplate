import config from '../config.json';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import webpack_base_config from './webpack.base.config.babel';
import path from 'path';

// define parts where webpack files get injected
<% if (projectUsage === 'Craft') { %>
  const chunks_inject = [
    {
      filename: path.resolve(`${config.dist.views}parts/site-header.html`),
      file: config.src.views + 'parts/site-header.html',
      inject: false
    },
    {
      filename: path.resolve(`${config.dist.views}parts/site-scripts.html`),
      file: config.src.views + 'parts/site-scripts.html',
      inject: false
    }
  ]

<% } else if (projectUsage === 'Wordpress') { %>
  const chunks_inject = [
    {
      filename: path.resolve(`${config.dist.views}header.php`),
      file: config.src.views + 'header.php',
      inject: false,
    },
    {
      filename: path.resolve(`${config.dist.views}footer.php`),
      file: config.src.views + 'footer.php',
      inject: false,
    }
  ]
<% } else if (projectUsage === 'Laravel') { %>
  const chunks_inject = [
      {
        filename: path.resolve(`${config.dist.views}_parts/site-header.blade.php`),
        file: config.src.views + '_parts/site-header.blade.php',
        inject: false,
      },
      {
        filename: path.resolve(`${config.dist.views}_parts/site-scripts.blade.php`),
        file: config.src.views + '_parts/site-scripts.blade.php',
        inject: false,
      }
    ]
<% } else { %>
  const chunks_inject = [
    {
      filename: path.resolve(`${config.dist.views}index.html`),
      file: config.src.views + 'index.html',
      inject: true
    }
  ]
<% } %>

// inject HtmlWebpackPlugin into baseConfig
// generate dist index.html with correct asset hash for caching.
// you can customize output by editing /index.html
// see https://github.com/ampedandwired/html-webpack-plugin
chunks_inject.forEach((chunk) => {
  const plugin = new HtmlWebpackPlugin({
    filename: chunk.filename,
    template: chunk.file,
    inject: chunk.inject,
    minify: false,
// necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency',
  })


  const write_plugin = new WriteFilePlugin({
    log: false,
    test: /^(?!.+(?:hot-update.(js|json))).+$/
  });

  webpack_base_config.plugins.push(plugin);
  webpack_base_config.plugins.push(write_plugin);
})
