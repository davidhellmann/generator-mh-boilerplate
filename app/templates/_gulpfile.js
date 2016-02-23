var pkg = require('./package.json');
var config = require('./config.json');

/*------------------------------------*\
 Inhalte

 1. #Config
 2. #Directories
 3. #init Modules
 4. #browserSync
 5. #views
 6. #sass
 7. #js
 8. #images
 9. #svg
 \*------------------------------------*/

// Config

var vhost = config.proxy;

var autoprefixer_browsers = [
    'ie >= 9',
    'last 2 version',
];

/*------------------------------------*\
 $directories
 \*------------------------------------*/


var src = config.src.src,
    srcAssets = src,
    srcBower = src + config.src.bower,
    srcViews = srcAssets + config.src.views,
    srcCss = srcAssets + config.src.css,
    srcFonts = srcAssets + config.src.fonts,
    srcJs = srcAssets + config.src.js.base,
    srcJsMySource = srcJs + config.src.js.mysource,
    srcJsJson = srcJs + config.src.js.json,
    srcImages = srcAssets + config.src.images.base,
    srcSvg = srcImages + config.src.images.svg.base,
    srcSvgSingle = srcSvg + config.src.images.svg.single,
    srcSvgSprite = srcSvg + config.src.images.svg.sprite,
    dist = config.dist.dist,
    distAssets = dist + 'assets/',
    distViews = config.dist.views,
    distCss = distAssets + config.dist.css,
    distFonts = distAssets + config.dist.fonts,
    distJs = distAssets + config.dist.js,
    distImages = distAssets + config.dist.images.base,
    distHtmlImages = distImages + config.dist.images.bitmap.htmlimages,
    distCssImages = distImages + config.dist.images.bitmap.cssimages,
    distSvg = distImages + config.dist.images.svg.base,
    distSvgSingle = distSvg + config.dist.images.svg.single,
    distSvgSprite = distSvg + config.dist.images.svg.sprite;



/*------------------------------------*\
 #init modules
 \*------------------------------------*/


var gulp    = require('gulp');

var $       = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    del         = require('del'),
    runSequence = require('run-sequence'),
    reload      = browserSync.reload,
    pngquant    = require('imagemin-pngquant'),
    prefix      = require('autoprefixer'),
    argv        = require('yargs').argv;


// babel browserify
var watchify = require('watchify');
var browserify = require('browserify');
var babel = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var errorLog = function(err) {
    $.util.beep();
    console.log(err);
    if (this.emit) {
        this.emit('end');
    }
    return $.notify().write(err);
}

// create dirs if you pull this from an existing project

gulp.task('createDirs', $.shell.task([
    'mkdir -p src/images/cssimages',
    'mkdir -p src/images/htmlimages',
    'mkdir -p src/images/svg/single',
    'mkdir -p src/images/svg/sprite',
    'mkdir -p src/js/json',
    'mkdir -p src/js/my-source',
    'mkdir -p src/js/single',
    'mkdir -p src/favicons'
]));


gulp.task('systemFiles', function() {
    return gulp.src([src + config.src.systemFiles + '**/*', src + config.src.systemFiles + '/**/.*'])
        .pipe(gulp.dest(config.dist.systemFiles));
});

/*------------------------------------*\
 #browserSync
 \*------------------------------------*/

var browserSyncWatch = [
    distViews + '**/*.{php,html}',
    distImages + '**/*.{jpg,png,gif,svg}',
    distCss + '**/*.css',
    distJs + '**/*.js'
];

var browserSyncConfig = {
    proxy: vhost,
    ghostMode: {
        clicks: false,
        forms: true,
        scroll: false
    },
    logLevel: 'info', // info, debug, warn, silent
    watchTask: true,
    open: false, // false if you don't want to automatically open the browser
    stream: true,
    ui: {
        port: 8080
    }
}

gulp.task('browser-sync', function() {
    browserSync.init(browserSyncWatch, browserSyncConfig);
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

/*------------------------------------*\
 /#browserSync
 \*------------------------------------*/


/*------------------------------------*\
 #views
 \*------------------------------------*/

// De-caching for Data files
function requireUncached( $module ) {
    delete require.cache[require.resolve( $module )];
    return require( $module );
}

// if using twig with json data via gulp-data use the requireUncached function
// then it should reload the correct data if you change your data file
//
// .pipe($.data(function() {
// return requireUncached('./src/data/partners.json');
// }))
gulp.task('views', function() {
    if(config.compiler == 'twig') {
        return gulp.src(srcViews + '**/*.twig')
            .pipe($.plumber())
            .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
            .pipe($.twig())
            .on('error', $.notify.onError(function(error) {
                return 'Twig Compile error';
            }))
            .on('error', function(err) {
                console.log(err.message)
            })
            .pipe(gulp.dest(distViews))
            .pipe($.notify('moved Twig Files'))
            .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() );
    } else {
        return gulp.src(srcViews + '**/*.{php,html}')
            .pipe($.changed(distViews))
            .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
            .pipe(gulp.dest(distViews))
            .pipe($.notify('moved Template Files'))
            .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() );
    }
});


gulp.task('boilerplates', function() {
    return gulp.src(src + 'boilerplates/**/*.html')
        .pipe($.changed(dist + 'boilerplates/'))
        .pipe(gulp.dest(dist + 'boilerplates/'))
});
/*------------------------------------*\
 #SASS
 \*------------------------------------*/
var postCSS = [
    //autoprefixer
    prefix({
        browsers: autoprefixer_browsers,
        cascade: false
    })
];

gulp.task('sass', function() {
    return gulp.src(srcCss + '*.scss')
        .pipe($.plumber())
        .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
                outputStyle: 'compressed',
                precision: 10,
                includePaths: [
                    srcCss + '**/*.scss'
                ]
            })
            .on('error', $.sass.logError)
            .on('error', $.notify.onError('Sass Compile Error!'))
        )
        .pipe($.postcss(postCSS))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(distCss))
        .pipe($.filter('**/*.css'))
        .pipe($.notify('Compiled <%%= file.relative %>'))
        .pipe($.size({
            title: 'styles'
        }))
        .pipe(browserSync.stream({
            match: '**/*.css'
        }));
});

gulp.task('sass-build', function() {
    return gulp.src(distCss + '**/*.css')
        .pipe($.size({
            title: 'styles before'
        }))
        .pipe($.cssnano())
        .pipe(gulp.dest(distCss))
        .pipe($.notify('Compiled <%%= file.relative %>'))
        .pipe($.size({
            title: 'styles after'
        }));
});

gulp.task('combinemq', function () {
    return gulp.src(distCss + '**/*.css')
        .pipe($.size({
            title: 'styles before media queries combination'
        }))
        .pipe($.combineMq({
            beautify: false
        }))
        .pipe(gulp.dest(distCss))
        .pipe($.notify('Combined media queries'))
        .pipe($.size({
            title: 'styles after media queries combination'
        }));
});


/*------------------------------------*\
 #JS tasks
 \*------------------------------------*/


// modernizr task

gulp.task('js-modernizr', function() {
    return gulp.src([srcCss + '**/*.scss', srcJs + '**/*.js'])
        .pipe($.modernizr({
            crawl: true,
            excludeTests: config.modernizr.excludeTests,
            options: config.modernizr.options,
            tests: config.modernizr.tests
        }))
        .pipe($.uglify())
        .pipe($.rename({ suffix: '-custom.min' }))
        .pipe(gulp.dest(distJs + 'vendor/'));
});

// combine bower components and other Plugins
gulp.task('js-plugins', function() {
    return gulp.src(config.files.jsCombinePlugins)
        .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
        .pipe($.concat('plugins.js'))
        .pipe( argv.uncompressed ? $.util.noop() : $.uglify() )
        .pipe(gulp.dest(distJs))
        .pipe($.size({
            title: 'combined JS Plugins'
        }))
        .pipe($.notify('combined JS Plguins'));
});

// move files defined in config.files.copyScripts
gulp.task('js-move', function() {
    return gulp.src(config.files.jsCopyScripts)
        .pipe($.changed(distJs))
        .pipe( argv.source ? $.debug({verbose: true}) : $.util.noop() )
        .pipe(gulp.dest(distJs))
        .pipe($.notify('copied single js Files'))
});

// move json files
gulp.task('js-json', function() {
    return gulp.src(srcJsJson + '**/*.json')
        .pipe($.changed(distJs + 'json/'))
        .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
        .pipe(gulp.dest(distJs + 'json/'))
});

// combine my own scripts
gulp.task('js-scripts', function() {
    return gulp.src(srcJsMySource + '**/*.js')
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.sourcemaps.init())
        .pipe($.concat('scripts.min.js'))
        .pipe( argv.uncompressed ? $.util.noop() : $.uglify() )
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(distJs))
        .pipe($.size({
            title: 'JS'
        }))
        .pipe($.notify('compiled JS'));
});

gulp.task('js-build', function() {
    return gulp.src(distJs + '**/*.js')
        .pipe($.size({
            title: 'JS FILES BEFORE'
        }))
        .pipe( argv.uncompressed ? $.util.noop() : $.uglify() )
        .pipe(gulp.dest(distJs))
        .pipe($.size({
            title: 'JS FILES AFTER'
        }));
});

// babel and browserify
function babelBuild() {
    var bundler = browserify(
        srcJs + 'application.js',
        {
            debug: true
        }
    )
        .transform(
            babel.configure({
                presets: ["es2015"]
            })
        );

    function babelRebundle() {
        bundler.bundle()
            .on('error', function (err) {
                console.error(err);
                this.emit('end');
            })
            .pipe(source('application.js'))
            .pipe(buffer())
            .pipe($.sourcemaps.init({
                loadMaps: true
            }))
            .pipe( argv.uncompressed ? $.util.noop() : $.uglify() )
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest(distJs))
    }

    return babelRebundle();
}
function babelCompile(watch) {
    var bundler = watchify(
        browserify(
            srcJs + 'application.js',
            {
                debug: true
            }
        )
            .transform(
                babel.configure({
                    presets: ["es2015"]
                })
            )
    );

    function babelRebundle() {
        bundler.bundle()
            .on('error', function (err) {
                console.error(err);
                this.emit('end');
            })
            .pipe(source('application.js'))
            .pipe(buffer())
            .pipe($.sourcemaps.init({
                loadMaps: true
            }))
            .pipe( argv.uncompressed ? $.util.noop() : $.uglify() )
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest(distJs))
    }
    if(watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            babelRebundle();
        });
    }

    babelRebundle();
}

function babelWatch() {
    return babelCompile(true);
}

gulp.task('babelBuild', function() {
    return babelBuild();
});

/*------------------------------------*\
 /#JS tasks
 \*------------------------------------*/


/*------------------------------------*\
 #images
 \*------------------------------------*/

gulp.task('images', function() {
    return gulp.src([srcImages + '**/*.{jpg,png,gif}'])
        .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
        .pipe($.changed(distImages))
        .pipe($.size({
            title: 'images before'
        }))
        .pipe($.imagemin({
            optimizationLevel: config.minify.images.optimizationLevel,
            use: [
                pngquant(config.minify.images.pngquant)
            ],
            progressive: config.minify.images.progressive,
            interlaces: config.minify.images.interlaced
        }))
        .pipe(gulp.dest(distImages))
        .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
        .pipe($.size({
            title: 'images after'
        }));
});


// favicon generator
gulp.task('favicons', function () {
    gulp.src(src + 'favicons/*.{png,jpg,svg}')
        .pipe($.favicons({
            appName: config.favicon.appName,// Your application's name. `string`
            appDescription: config.favicon.appDescription,// Your application's description. `string`
            developerName: config.favicon.developerName,// Your (or your developer's) name. `string`
            developerURL: config.favicon.developerUrl,// Your (or your developer's) URL. `string`
            background: config.favicon.background,// Background colour for flattened icons. `string`
            path: config.favicon.path,// Path for overriding default icons path. `string`
            display: "standalone",// Android display: "browser" or "standalone". `string`
            orientation: "portrait",// Android orientation: "portrait" or "landscape". `string`
            version: "1.0",// Your application's version number. `number`
            logging: config.favicon.logging,// Print logs to console? `boolean`
            online: config.favicon.online,// Use RealFaviconGenerator to create favicons? `boolean`
            icons: {
                android: config.favicon.icons.android,// Create Android homescreen icon. `boolean`
                appleIcon: config.favicon.icons.appleIcon,// Create Apple touch icons. `boolean`
                appleStartup: config.favicon.icons.appleStartup,// Create Apple startup images. `boolean`
                coast: config.favicon.icons.coast,// Create Opera Coast icon. `boolean`
                favicons: config.favicon.icons.favicons,// Create regular favicons. `boolean`
                firefox: config.favicon.icons.firefox,// Create Firefox OS icons. `boolean`
                opengraph: config.favicon.icons.opengraph,// Create Facebook OpenGraph image. `boolean`
                twitter: config.favicon.icons.twitter,// Create Twitter Summary Card image. `boolean`
                windows: config.favicon.icons.windows,// Create Windows 8 tile icons. `boolean`
                yandex: config.favicon.icons.yandex// Create Yandex browser icon. `boolean`
            }
        }))
        .pipe(gulp.dest(dist + 'favicons/'))
        .pipe($.notify('created Favicons'))
        .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() );
    });
/*------------------------------------*\
 /#images
 \*------------------------------------*/



/*------------------------------------*\
 #svg
 \*------------------------------------*/

gulp.task('svg-single', function() {
    return gulp.src(srcSvgSingle + '**/*.svg')
        .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
        .pipe($.changed(distSvgSingle))
        .pipe($.size({
            title: 'Single SVG Images before'
        }))
        .pipe($.imagemin(
            config.minify.images.svgoPlugins
        ))
        .on('error', errorLog)
        .pipe(gulp.dest(distSvgSingle))
        .pipe($.size({
            title: 'single SVG Images after'
        }));
});

gulp.task('svg-sprite', function() {
    return gulp.src(srcSvgSprite + '**/*.svg')
        .pipe( argv.source ? $.debug({ verbose: true }) : $.util.noop() )
        .pipe($.changed(distSvgSprite))
        .pipe($.size({
            title: 'Sprite SVG Images before'
        }))
        .pipe($.imagemin(
            config.minify.images.svgoPlugins
        ))
        .on('error', errorLog)
        .pipe($.svgSprite({
            mode: {
                symbol: {
                    dest: 'sprite',
                    sprite: 'svgsprite.svg',
                    inline: true
                }
            }
        }))
        .on('error', errorLog)
        .pipe(gulp.dest(distSvg))
        .pipe($.size({
            title: 'Sprite SVG Images after'
        }));
});

/*------------------------------------*\
 /#svg
 \*------------------------------------*/



/*------------------------------------*\
 #fonts
 \*------------------------------------*/

gulp.task('fonts', function() {
    return gulp.src(srcFonts + '**/*')
        .pipe($.changed(distFonts))
        .pipe(gulp.dest(distFonts))
        .pipe($.notify('moved Fonts'));
});

/*------------------------------------*\
 /#fonts
 \*------------------------------------*/



/*------------------------------------*\
 #clean
 \*------------------------------------*/
var directoryToClean;

<% if (projectUsage == 'laravel') { %>
    directoryToClean = dist + 'assets/**/*'
        <% } else { %>
    directoryToClean = dist + '**/*'
        <% } %>

gulp.task('clean:dist', function(cb) {
    return del([
        directoryToClean
    ], {
        force: true
    }, cb);
});

gulp.task('clean:views', function(cb) {
    return del([
        distViews + '**/*.{php,html}'
    ], {
        force: true
    }, cb);
});

gulp.task('clean:images', function(cb) {
    return del([
        distImages + '**/*.{jpeg,jpg,gif,png,svg}'
    ], {
        force: true
    }, cb);
});

gulp.task('clean:js', function(cb) {
    return del([
        distJs + '**/*'
    ], {
        force: true
    }, cb);
});

gulp.task('clean:css', function(cb) {
    return del([
        distCss + '**/*'
    ], {
        force: true
    }, cb);
});

gulp.task('clean:css', function(cb) {
    return del([
        distImages + '**/*'
    ], {
        force: true
    }, cb);
});

gulp.task('clean:favicons', function(cb) {
    return del([
        dist + 'favicons/**/*'
    ], {
        force: true
    }, cb);
});

/*------------------------------------*\
 /#clean
 \*------------------------------------*/

// init tasks

gulp.task('init', function() {
    runSequence(
        'boilerplates',
        'views',
        'systemFiles',
        'favicons',
        'js-modernizr',
        'sass',
        'js-plugins',
        'js-move',
        'js-scripts',
        'images',
        'svg-single',
        'svg-sprite'
    );
});

gulp.task('build', function() {
    runSequence(
        'clean:views',
        'clean:css',
        'clean:js',
        'clean:images',
        'clean:favicons',
        'boilerplates',
        'views',
        'systemFiles',
        'favicons',
        'js-modernizr',
        'sass',
        'fonts',
        'js-plugins',
        'js-move',
        'js-scripts',
        'images',
        'svg-single',
        'svg-sprite'
    );
});

gulp.task('build-css', function() {
    runSequence(
        'clean:css',
        'sass'
    );
});

gulp.task('build-js', function() {
    runSequence(
        'clean:js',
        'js-modernizr',
        'js-plugins',
        'js-move',
        'js-scripts'
    );
});

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
