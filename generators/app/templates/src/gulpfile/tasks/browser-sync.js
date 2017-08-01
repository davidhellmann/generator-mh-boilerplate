import chalk from 'chalk';

/**
 |--------------------------------------------------------------------------
 | gulp browser-sync
 |--------------------------------------------------------------------------
 *
 * Browser Sync
 * @description Refresh the Brwoser after File Change.
 * Combined with webpack for HMR or Content Reload
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

/*
 |--------------------------------------------------------------------------
 | browser-sync.js
 |--------------------------------------------------------------------------
 */

import config from '../../package.json';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackSettings from '../../webpack/webpack.config.babel';

import yargs from 'yargs';
const argv = yargs.argv;
const env = argv.env || 'development';

const browserSyncTask = () => {
  if(env !== 'browser-sync') return;
  const bundler = webpack(webpackSettings);
  browserSync.init({
    proxy: {
      target: config.proxy,
      ws: true,
    },
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false,
    },
    logLevel: 'info',
    watchTask: true,
    open: false,
    stream: true,
    ui: {
      port: 8090,
    },
    middleware: [
      webpackDevMiddleware(bundler, {
        quiet: true,
        path: webpackSettings.output.path,
        publicPath: webpackSettings.output.publicPath,
        stats: {
          colors: true,
        },
      }),
      webpackHotMiddleware(bundler, {
        log: () => {},
      }),
    ],
    files: [
      {
        match: [
          `${config.srcPaths.views}**/*.{php,html,twig}`,
          `${config.distPaths.css}**/*.css`,
          `${config.distPaths.images.base}**/*.{jpg,png,gif,svg}`,
        ],
        fn: function(event, file) {
          console.log(chalk`{green Changed ${file}}`);
          console.log(chalk`{red Event ${event}}`);
          if (event === 'change' && file.includes('.css')) {
            browserSync.reload('*.css');
          }
          if (event === 'change' && (file.includes('.php') || file.includes('.html') || file.includes('.twig'))) {
            browserSync.reload();
          }
        },
      },
    ],
  });
};


const browserSyncReload = () => {
  browserSync.reload();
};


gulp.task('browser-sync', browserSyncTask);
gulp.task('bs-reload', browserSyncReload);

export { browserSyncTask, browserSyncReload };
