import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

const combinemq = () => {
    return gulp
        .src(config.dist.dist + config.dist.css + '**/*.css')
        .pipe($.size({
            title: 'styles for media queries combination'
        }))
        .pipe($.combineMq({
            beautify: false
        }))
        .pipe(gulp.dest(config.dist.dist + config.dist.css))
        .pipe($.notify('combined Media Queries'))
        .pipe($.size({
            title: 'styles after media queries combination'
        }))
}

gulp.task('css:combinemq', combinemq);
module.exports = combinemq;