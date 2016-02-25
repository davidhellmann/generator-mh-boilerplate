/**
 * create dirs if you pull this from an existing project
 */

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()

const createDirs = () => {
    $.shell.task([
        'mkdir -p src/images/cssimages',
        'mkdir -p src/images/htmlimages',
        'mkdir -p src/images/svg/single',
        'mkdir -p src/images/svg/sprite',
        'mkdir -p src/js/json',
        'mkdir -p src/js/my-source',
        'mkdir -p src/js/single',
        'mkdir -p src/favicons'
    ])
}

gulp.task('createDirs', createDirs);
module.exports = createDirs;