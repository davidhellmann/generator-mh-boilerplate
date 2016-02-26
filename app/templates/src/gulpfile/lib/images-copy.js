/**
 * copy images **/

import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import errorHandler from '../lib/errorHandler';

const $ = gulpLoadPlugins();

const copyImages = (srcFiles, distFiles) => {
    return gulp
        .src(srcFiles)
        .on('error', errorHandler)
        .pipe($.changed(distFiles))
        .pipe(gulp.dest(distFiles))
        .pipe($.debug());
}

module.exports = copyImages;
