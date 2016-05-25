/**
 * copy images **/

import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import errorHandler from '../lib/errorHandler';
import yargs from 'yargs';
import chalk from 'chalk'

const argv = yargs.argv;

const $ = gulpLoadPlugins();

const copyImages = (srcFiles, distFiles) => {
    const currentDate = new Date()
    return gulp
        .src(srcFiles)
        .on('error', errorHandler)
        .pipe($.changed(distFiles))
        .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
        .pipe(gulp.dest(distFiles))
        .on('finish', function() {
            console.log('[' + chalk.dim( currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds()) + ']' + chalk.green(' finished copying Images'))
        })
}

module.exports = copyImages;
