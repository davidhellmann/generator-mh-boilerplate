/**
 * Defines which Files gulp watches for Changes
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

/*
 |--------------------------------------------------------------------------
 | watch.js
 |--------------------------------------------------------------------------
 */

import gulp from 'gulp';
import watch from 'gulp-watch';
import config from '../../package.json';

const watch_task = () => {
  /**
   * Defined Paths to be watched and their corresponding gulp watch
   */


  const paths = {
    'move:views': [`!${config.distPaths.views}webpack-header.html`, `!${config.distPaths.views}site-scripts.html`, `${config.srcPaths.views}**/*`],
    'move:images': [`${config.srcPaths.images.base}**/*`, `!${config.srcPaths.images.base}svg/**/*`],
    'svg:sprite': `${config.srcPaths.images.svg.base + config.srcPaths.images.svg.sprite}**/*.svg`,
    'svg:single': `${config.srcPaths.images.svg.base + config.srcPaths.images.svg.single}**/*.svg`,
  };


  /**
   * loop through all the paths defined above and add a watcher for it
   * the pattern is 'gulp command': path to watched files
   */


  Object.keys(paths).forEach((key) => {
    gulp.watch(paths[key], [key]);
  });
};

gulp.task('watch', ['browser-sync'], watch_task);

export default watch_task;
