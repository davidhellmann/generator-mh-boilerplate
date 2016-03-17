import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import errorHandler from '../lib/errorHandler';
import postCssConfig from '../lib/postCssConfig';
import postCssNano from '../lib/postCssNano';
import yargs from 'yargs';

const argv = yargs.argv;
const $ = gulpLoadPlugins();

const compileCss = () => {
    const env = argv.env || 'development'

    return gulp
        .src(config.src.src + config.src.css + '**/*.scss')
        .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
        .pipe(env == 'development' ? $.sourcemaps.init() : $.util.noop())
        .pipe($.sass({
                precision: 10,
                includePaths: [
                    config.src.src + config.src.css + '**/*.scss'
                ]
            })
            .on('error', errorHandler))
        .pipe($.postcss(postCssConfig()))
        .on('error', errorHandler)
        .pipe(env == 'development' ? $.sourcemaps.write('.') : $.util.noop())
        .pipe(env == 'production' ? $.size({ title: 'styles before'}) : $.util.noop())
        .pipe(env == 'production' ? $.postcss(postCssNano()) : $.util.noop())
        .pipe(gulp.dest(config.dist.dist + config.dist.css))
        .pipe($.size({
            title: 'styles'
        }))
        .pipe(browserSync.stream({
            match: '**/*.css'
        }))
}

gulp.task('compile:css', compileCss);
module.exports = compileCss;