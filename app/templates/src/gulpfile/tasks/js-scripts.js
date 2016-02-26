import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import yargs from 'yargs';

const argv = yargs.argv;
const $ = gulpLoadPlugins();

const jsScripts = () => {
    const env = yargs.env || 'development'
    return gulp
        .src(config.src.src + config.src.js.mysource + '**/*.js')
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe(env == 'development' ? $.sourcemaps.init() : $.util.noop())
        .pipe($.concat('scripts.min.js'))
        .pipe( argv.uncompressed ? $.util.noop() : $.uglify() )
        .pipe(env == 'development' ? $.sourcemaps.write('.') : $.util.noop())
        .pipe(gulp.dest(config.dist.dist + config.dist.js))
        .pipe($.size({
            title: 'JS'
        }))
        .pipe($.notify('compiled JS'))
}

gulp.task('js-scripts', jsScripts);
module.exports = jsScripts;