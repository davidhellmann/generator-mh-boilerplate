/**
   * minify Images
   **/
import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import pngquant from 'imagemin-pngquant';
import svgo from 'imagemin-pngquant';
import jpegCompress from 'imagemin-jpeg-recompress';

const $ = gulpLoadPlugins();

const minifyImages = (srcFiles, distFiles) => {
    gulp.src(srcFiles)
        .pipe($.imagemin({
            optimizationLevel: config.minify.images.optimizationLevel,
            use: [
                pngquant(config.minify.images.pngquant),
                jpegCompress({
                    loops: 3,
                    min: 75,
                    max: 95
                })
            ],
            progressive: config.minify.images.progressive,
            interlaced: config.minify.images.interlaced
        }))
        .pipe( gulp.dest(distFiles) )
        .pipe($.size())
}

module.exports = minifyImages;