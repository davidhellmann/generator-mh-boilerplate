import config from '../../config.json';
import gulp from 'gulp';
import bundleJs from '../lib/js-bundle';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import merge from 'utils-merge';

const watchJs = () => {
    const args = merge(watchify.args, {debug: true})
    const bundler = watchify(
        browserify(config.src.src + config.src.js.base + config.files.jsApp.srcName, args)
    )
        .transform(
            babelify.configure({presets: ['es2015']})
        )

    bundleJs(bundler)

    bundler.on('update', function () {
        console.log('-> bundling...')
        bundleJs(bundler);
        console.log('Bundled JS Files');
    })
}

gulp.task('watch:js', watchJs);
module.exports = watchJs;
