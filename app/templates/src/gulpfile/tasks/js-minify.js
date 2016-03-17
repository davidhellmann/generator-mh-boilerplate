import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import yargs from 'yargs';

const argv = yargs.argv;
const $ = gulpLoadPlugins();

const jsMinify = () => {
    const env = argv.env || 'development';
    return gulp
        .src(config.dist.dist + config.dist.js + '**/*.js')
        .pipe($.filter('*.js'))
        .pipe($.debug())
        .pipe($.size({
            title: 'JS Files Before'
        }))
        .pipe($.uglify({
            mangle: true
        }))
        .pipe(gulp.dest(config.dist.dist + config.dist.js))
        .pipe($.size({
            title: 'JS Files after'
        }))
}

gulp.task('minify:js', jsMinify);
module.exports = jsMinify;