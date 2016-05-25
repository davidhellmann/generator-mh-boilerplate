/**
 * Starting the first Build
 **/

import gulp from 'gulp';
import runSequence from 'run-sequence';

const initTask = (cb) => {
    runSequence(
        'boilerplates',
        'views',
        'systemFiles',
        'createDirs',
        'favicons',
        'js-modernizr',
        'compile:js',
        'compile:css',
        'js-plugins',
        'js-move',
        'js-json',
        'js-scripts',
        'images',
        'svg-single',
        'svg-sprite',
        cb
    )
}

gulp.task('init', initTask);
module.exports = initTask;
