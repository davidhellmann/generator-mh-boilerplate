import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import pngquant from 'imagemin-pngquant';
import svgo from 'imagemin-pngquant';
import jpegCompress from 'imagemin-jpeg-recompress';
import chalk from 'chalk'
import yargs from 'yargs'
import errorHandler from './errorHandler.js'

const argv = yargs.argv

const $ = gulpLoadPlugins();

const minifyImages = (srcFiles, distFiles) => {
    const currentDate = new Date()

    const env = argv.env || 'development'
    let verbose = true
    if (env == 'production') {
        verbose = false
    }

    return gulp.src(srcFiles)
        .pipe($.imagemin(             {
                verbose: verbose
            }
        ))
        .on('error', errorHandler)
        .pipe( gulp.dest(distFiles) )
        .pipe($.size())
        .on('finish', function() {
            console.log('[' + chalk.dim( currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds()) + ']' + chalk.green(' finished minify Images'))
        })
}

module.exports = minifyImages;
