/**
 |--------------------------------------------------------------------------
 | gulp compile:css
 |--------------------------------------------------------------------------
 *
 * Compile SCSS Files
 * if in dev Mode Create Sourcemaps and Lint with Stylelint
 * also Run PostCSS defined in ../lib/postCSS_config.js and
 * minify with CSS Nano if in Production Modee
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

/*
 |--------------------------------------------------------------------------
 | compile.css.js
 |--------------------------------------------------------------------------
 */


import config from '../../config.json';
import gulp from 'gulp';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';
import yargs from 'yargs';
import browserSync from 'browser-sync';
import error_handler from '../lib/error_handler';
import postCSS_config from '../lib/postCSS_config';
import postCSS_nano from '../lib/postCSS_nano';

import browser_sync_task from './browser-sync';

const argv = yargs.argv;

const $ = gulpLoadPlugins();

const paths = {
  src: path.join(config.src.css, '**/*.scss'),
  dest: `${config.dist.css}`,
};

const compileCss = () => {
  const env = argv.env || 'development';

  return gulp
    .src(paths.src)
    .pipe($.if(env === 'development' || env === 'browser-sync', $.sourcemaps.init()))
    .pipe($.if(env === 'development' || env === 'browser-sync', $.postcss([
      require('stylelint'),
      require('postcss-reporter')({ clearReportedMessages: true }),
    ],
      {
        syntax: require('postcss-scss'),
      },
    )))
    .pipe($.sass())
    .on('error', function (err) {
      const error = `
      <div class="bs-fullscreen" 
      style="position: fixed; 
      top: 0; 
      left: 0; 
      width: 100%; 
      background: rgba(0,0,0,.85); 
      height: 
      100vh; 
      color: #e8e8e8; 
      text-align: left; 
      white-space: pre; 
      font-family: Menlo, Consolas, monospace; font-size: 13px; padding: 10px; line-height: 1.2;">
      <pre>${err}</pre> 
        ${err.message}
    </div>
`;
      browserSync.notify(error, 100000);
      this.emit('end');
    })
    .pipe($.postcss(postCSS_config()))
    .pipe($.if(env === 'development' || env === 'browser-sync', $.sourcemaps.write('.')))
    .pipe($.if(env === 'production', $.postcss(postCSS_nano())))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream({
      match: '**/*.css',
    }));
};

gulp.task('compile:css', compileCss);

export { compileCss };
