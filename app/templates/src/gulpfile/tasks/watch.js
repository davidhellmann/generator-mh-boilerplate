/**
   * Watch Task
   **/

import config from '../../config.json';
import gulp from 'gulp';
import watch from 'gulp-watch';
import gulpLoadPlugins from 'gulp-load-plugins';

const watchTask = () => {

    // watch views
    gulp.watch(config.src.src + config.src.views + '**/*.{php,html,twig}', ['views'])

    // watch sass
    gulp.watch(config.src.src + config.src.css + '**/*.scss', ['compile:css']);

    // watch js scripts
    gulp.watch(config.src.src + config.src.js.base + config.src.js.mysource + '**/*.js', ['js-scripts']);

    // watch js move
    gulp.watch(config.src.src + config.src.js.base + 'single/**/*', ['js-move']);

    // watch js json
    gulp.watch(config.src.src + config.src.js.base + config.src.js.json + '**/*.json', ['js-json']);

    // watch images
    gulp.watch(config.src.src + config.src.images.base + '**/*', ['images']);

    // watch SVG Stuff
    gulp.watch(config.src.src + config.src.images.base + config.src.images.svg.base + config.src.images.svg.single + '**/*', ['svg-single']);

    gulp.watch(config.src.src + config.src.images.base + config.src.images.svg.base + config.src.images.svg.sprite + '**/*', ['svg-sprite']);

    // reload!
    gulp.watch(config.dist.dist + '**/*.{php,html,js,jpg,png,svg}', ['bs-reload']);
}

gulp.task('watch', ['browser-sync'], watchTask);
module.exports = watchTask;