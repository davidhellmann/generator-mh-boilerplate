import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins()

const copyFonts = () => {
    return gulp
        .src(config.src.src + config.src.fonts + '**/*')
        .pipe($.changed(config.dist.dist + config.dist.fonts))
        .pipe(gulp.dest(config.dist.dist + config.dist.fonts))
}

gulp.task('fonts', copyFonts);
module.exports = copyFonts;
