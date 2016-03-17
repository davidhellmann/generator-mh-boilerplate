/**
 * Starting the first Build
 **/

import gulp from 'gulp';
import runSequence from 'run-sequence';

const deployTask = (cb) => {
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
            'compile:css',
            'fonts',
            'js-plugins',
            'js-move',
            'js-scripts',
            'compile:js',
            'images',
            'svg-single',
            'svg-sprite'
        ],
        [
            'css:combinemq'
        ],
        [
            'minify:js',
            'minify:css',
            'minify:images'
        ],
        cb
    );
}

gulp.task('deploy', deployTask);
module.exports = deployTask;