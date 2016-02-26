import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

const typography = () => {
    return gulp
        .src(config.src.src + 'boilerplates/**/*.html')
        .pipe($.changed(config.dist.dist + 'boilerplates/'))
        .pipe(gulp.dest(config.dist.dist + 'boilerplates/'))
}

gulp.task('boilerplates', typography);
module.exports = typography;