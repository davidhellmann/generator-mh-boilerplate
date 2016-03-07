import config from '../../config.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import errorHandler from '../lib/errorHandler';
import yargs from 'yargs';

const argv = yargs.argv;
const $ = gulpLoadPlugins();

// if using twig with json data via gulp-data use the requireUncached function
// then it should reload the correct data if you change your data file
//
// De-caching for Data files
//function requireUncached( $module ) {
//    delete require.cache[require.resolve( $module )];
//    return require( $module );
//}

// .pipe($.data(function() {
// return requireUncached('./src/data/partners.json');
// }))

const views = () => {
    if (config.compiler == 'twig') {
        return gulp
            .src(config.src.src + config.src.views + '**/*.twig')
            .pipe($.plumber())
            .on('error', errorHandler)
            .pipe($.twig())
            .pipe(gulp.dest(config.dist.views))
            .pipe($.notify({
                onLast: true,
                message: 'moved Views'
            }));
    } else {
        return gulp
            .src(config.src.src + config.src.views + '**/**')
            .pipe($.changed(config.dist.views))
            .pipe( argv.source ? $.debug({ minimal: true }) : $.util.noop() )
            .pipe(gulp.dest(config.dist.views))
            .pipe($.notify({
                onLast: true,
                message: 'moved Views'
            }));
    }
}

gulp.task('views', views)
module.exports = views