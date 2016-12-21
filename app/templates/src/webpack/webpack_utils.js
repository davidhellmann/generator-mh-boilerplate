import path from 'path';
import webpack_config from '../webpack/webpack_config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export function assetsPath(_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? webpack_config.build.assetsSubDirectory
    : webpack_config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path)
}

export function cssLoaders(options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    const sourceLoader = loaders.map(loader => {
      let extraParamChar;
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = `${loader}-loader`
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!');

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        loader: sourceLoader,
        <% if (projectUseVue) { %>
        fallbackLoader: 'vue-style-loader',
        <% } %>
      })
    } else {
      return [<% if (projectUseVue) { %>'vue-style-loader',<% } %> sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
export function styleLoaders(options) {
  const loaders = exports.cssLoaders(options);
  return loaders
}