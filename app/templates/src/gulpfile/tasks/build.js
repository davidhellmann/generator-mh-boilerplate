/**
 * Starting the first Build
 **/

import gulp from 'gulp';
import runSequence from 'run-sequence';

const buildTask = (cb) => {
    runSequence(
        [
            'clean:views',
            'clean:css',
            'clean:js',
            'clean:images',
            'clean:favicons',
        ],
        [
            'boilerplates',
            'views',
            'systemFiles',
            'favicons',
            'js-modernizr',
            'scss',
            'fonts',
            'js-plugins',
            'js-move',
            'js-scripts',
            'images',
            'svg-single',
            'svg-sprite'
        ],
        cb
    );
}

gulp.task('build', buildTask);
module.exports = buildTask;