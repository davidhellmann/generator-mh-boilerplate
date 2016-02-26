/**
 * delete from the Folders!
 * */

import config from '../../config.json';
import gulp from 'gulp';
import del from 'del';

var directoryToClean;

gulp.task('clean:dist', function (cb) {
    return del([
        config.dist.dist + '**/*'
    ], {
        force: true
    }, cb);
});

gulp.task('clean:views', function (cb) {
    return del([
        config.dist.dist + config.dist.views + '**/*.{php,html}'
    ], {
        force: true
    }, cb);
});

gulp.task('clean:images', function (cb) {
    return del([
        config.dist.dist + config.dist.images.base + '**/*.{jpeg,jpg,gif,png,svg}'
    ], {
        force: true
    }, cb);
});

gulp.task('clean:js', function (cb) {
    return del([
        config.dist.dist + config.dist.js + '**/*'
    ], {
        force: true
    }, cb);
});

gulp.task('clean:css', function (cb) {
    return del([
        config.dist.dist + config.dist.css + '**/*'
    ], {
        force: true
    }, cb);
});


gulp.task('clean:favicons', function (cb) {
    return del([
        config.dist.dist + config.dist.favicons + '**/*'
    ], {
        force: true
    }, cb);
});