import gulp from 'gulp';
import bundleJs from '../lib/js-bundle';
import bundleVar from '../lib/js-bundleVar';

const compileJs = () => {
    const bundler = bundleVar();

    return bundleJs(bundler);

    bundleJs(bundler);
}

gulp.task('compile:js', compileJs);
module.exports = compileJs;
