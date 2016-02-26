import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import yargs from 'yargs';

const argv = yargs.argv;

const $ = gulpLoadPlugins();

const jsMove = () => {
    return gulp
        .src(config.files.jsCopyScripts)
        .pipe($.changed(config.dist.dist + config.dist.js))
        .pipe(argv.source ? $.debug({minimal: true}) : $.util.noop())
        .pipe(gulp.dest(config.dist.dist + config.dist.js))
        .pipe($.notify('copied single JS Files'))
}

gulp.task('js-move', jsMove);
module.exports = jsMove;