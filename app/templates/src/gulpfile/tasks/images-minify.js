/**
 * minify the images
 */

import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import minifyImages from '../lib/images-minify';

const $ = gulpLoadPlugins();


const minifyImagesTask = () => {
    return minifyImages(config.dist.dist + config.dist.images.base + '**/*.{png,jpeg,jpg,gif,webp,PNG,JPEG,JPG,GIF}', config.dist.dist + config.dist.images.base);
}

gulp.task('minify:images', minifyImagesTask);
module.exports = minifyImagesTask;