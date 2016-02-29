import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import yargs from 'yargs';

const argv = yargs.argv;
const $ = gulpLoadPlugins();

const jsCombineFiles = () => {
    const env = argv.env || 'development'
    return gulp
        .src(config.files.jsCombinePlugins)
        .pipe(argv.source ? $.debug({verbose: true}) : $.util.noop())
        .pipe($.concat('plugins.js'))
        .pipe(env == 'development' ? $.uglify() : $.util.noop())
        .pipe($.size({
            title: 'combined JS Plugins'
        }))
        .pipe($.notify('combine JS Plugins'))
}

gulp.task('js-plugins', jsCombineFiles);
module.exports = jsCombineFiles;