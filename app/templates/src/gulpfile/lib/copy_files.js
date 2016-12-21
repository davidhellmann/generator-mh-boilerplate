/**
 * Boilerplate Code for a simple copy of Files
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

/*
 |--------------------------------------------------------------------------
 | copy_files.js
 |--------------------------------------------------------------------------
 */

import gulp from 'gulp';
import gulp_load_plugins from 'gulp-load-plugins';

const $ = gulp_load_plugins();

const copy_files = (srcFiles, destFiles) => {
  gulp
    .src(srcFiles)
    .pipe($.changed(destFiles))
    .pipe(gulp.dest(destFiles));
}

export default copy_files;
