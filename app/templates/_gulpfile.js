gulp.task('prod', function(callback) {
    runSequence(
        'clean:views',
        'clean:css',
        'clean:js',
        'clean:images',
        'clean:favicons',
        [
            'views',
            'favicons',
            'js-modernizr',
            'sass',
            'combinemq',
            'fonts',
            'js-plugins',
            'js-move',
            'js-scripts',
            'images',
            'svg-single',
            'svg-sprite',
        ],
        'sass-build',
        'js-build',
        callback
    );
});

//watch task
gulp.task('babelWatch', function() {
    return babelWatch();
});

gulp.task('watch', ['babelWatch'], function() {

    // watch template files
    $.watch(srcViews + '**/*.{php,html,twig}', $.batch(function(events, done) {
        gulp.start('views', done);
    }));

    // watch scss files
    gulp.watch(srcCss + '**/*.scss', ['sass']);

    // watch JS Task
    $.watch(srcJsMySource + '**/*.js', $.batch(function(events, done) {
        gulp.start('js-scripts', done);
    }));
    $.watch(srcJs + 'single/**/*', $.batch(function(events, done) {
        gulp.start('js-move', done);
    }));
    $.watch(srcJs + 'json/**/*', $.batch(function( events, done ) {
        gulp.start('js-json', done);
    }));

    // watch images
    $.watch(srcImages + '**/*.{jpg,png}', $.batch(function(events, done) {
        gulp.start('images');
    }));

    // watch SVG
    $.watch(srcSvgSingle + '**/*.svg', $.batch(function(events,done) {
        gulp.start('svg-single', done);
    }));
    $.watch(srcSvgSprite + '**/*.svg', $.batch(function(events, done) {
        gulp.start('svg-sprite', done);
    }));

    // reload task
    <% if( projectUsage == 'laravel') { %>
        gulp.watch(distViews + '**/*', ['bs-reload']);
    <% } %>
    gulp.watch(dist + '**/*.{php,html,js,jpg,png,svg}', ['bs-reload']);
});

// default task

gulp.task('default', ['browser-sync', 'watch']);
