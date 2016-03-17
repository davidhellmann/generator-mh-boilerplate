/**
 * Starting the first Build
 **/

import gulp from 'gulp';
import runSequence from 'run-sequence';

const publishTask = (cb) => {
    runSequence(
        [
            'css:combinemq',
        ],
        [
            'minify:js',
            'minify:css',
            'minify:images'
        ],
        cb
    );
}

gulp.task('publish', publishTask);
module.exports = publishTask;