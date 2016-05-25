/**
  * Copy Images
  **/
import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import copyImages from '../lib/images-copy';

const $ = gulpLoadPlugins();

const imagesTask = () => {
    return copyImages(config.src.src + config.src.images.base + '**/*.{png,jpeg,jpg,gif,webp,PNG,JPEG,JPG,GIF}', config.dist.dist + config.dist.images.base)
}

gulp.task('copy:images', imagesTask);
module.exports = imagesTask;
