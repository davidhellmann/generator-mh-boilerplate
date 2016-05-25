import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import yargs from 'yargs';

const argv = yargs.argv;
const $ = gulpLoadPlugins();

const jsJson = () => {
    return gulp
        .src(config.src.src + config.src.js.base + config.src.js.json + '**/*.json')
        .pipe($.changed(config.dist.dist + config.dist.js))
        .pipe(argv.source ? $.debug({verbose: true}) : $.util.noop())
        .pipe(gulp.dest(config.dist.dist + config.dist.js))
}

gulp.task('js-json', jsJson);
module.exports = jsJson;