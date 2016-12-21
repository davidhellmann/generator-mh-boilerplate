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
import config from '../../config.json';

const watch_task = () => {
  /**
   * Defined Paths to be watched and their corresponding gulp watch
   */


  const paths = {
    'move:views': `${config.src.views}**/*`,
    'compile:css': `${config.src.css}**/*.scss`,
    'move:images': [
      `${config.src.images.base}**/*`,
      `!${config.src.images.base}svg/**/*`,
    ],
    'svg:sprite': `${config.src.images.base + config.src.images.svg.sprite}`,
    'svg:single': `${config.src.images.base + config.src.images.svg.single}`,
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
